// A* finds a path from start to goal.

import BinaryHeap from './BinaryHeap'

// function A_Star(start, goal, h)
const AStar = (
  startKey: string,
  endKey: string,
  /**
   * Weight/distance to one node from another
   */
  dFn: (to: string, from: string) => number,
  /**
   * Heuristic for estimating weight/distance from one node to another
   */
  h: (from: string, to: string) => number,
  /**
   * Method for getting neighbor nodes from current node
   */
  getNeighbors: (current: string) => string[],
  /**
   * Handy to identify if a given node is the end, aside from string equality
   * (Normally, we just check current === endKey)
   */
  isEnd?: (current: string) => boolean
): {
  cost: number
  path: string[]
} => {
  const parentNodes = new Map<string, string>()

  // For node n, gScore[n] is the cost of the cheapest path from start to n currently known.
  // gScore := map with default value of Infinity
  // gScore[start] := 0
  const gScores: Map<string, number> = new Map([[startKey, 0]])

  // For node n, fScore[n] := gScore[n] + h(n). fScore[n] represents our current best guess as to
  // how short a path from start to finish can be if it goes through n.
  // fScore := map with default value of Infinity
  // fScore[start] := h(start)
  const fScores: Map<string, number> = new Map([
    [startKey, h(startKey, endKey)],
  ])

  // The set of discovered nodes that may need to be (re-)expanded.
  // Initially, only the start node is known.
  // This is usually implemented as a min-heap or priority queue rather than a hash-set.
  // openSet := {start}
  const openSet = new BinaryHeap<string>(
    (node: string) => fScores.get(node)!,
    'min',
    startKey
  )

  let whileLoopRuns = 0

  const reconstructPath = (current: string) => {
    const path = [current]
    let parent = parentNodes.get(current)
    while (parent) {
      path.push(parent)
      parent = parentNodes.get(parent)
    }
    return path.reverse()
  }

  // while openSet is not empty
  while (openSet.size()) {
    // This operation can occur in O(1) time if openSet is a min-heap or a priority queue
    // current := the node in openSet having the lowest fScore[] value
    const current = openSet.pop()!

    // if current = goal
    if (current === endKey || (isEnd && isEnd(current))) {
      const path = reconstructPath(current)
      // console.log('path:', path)
      // console.log(`The main while loop ran ${whileLoopRuns} times.`)
      return {
        cost: gScores.get(current)!,
        path,
      }
    }

    // for each neighbor of current
    getNeighbors(current).forEach((nKey) => {
      // d(current,neighbor) is the weight of the edge from current to neighbor
      const d = dFn(nKey, current)

      // tentative_gScore is the distance from start to the neighbor through current
      // tentative_gScore := gScore[current] + d(current, neighbor)
      const tentative_gScore = gScores.get(current)! + d

      // if tentative_gScore < gScore[neighbor]
      if (
        gScores.get(nKey) === undefined ||
        tentative_gScore < gScores.get(nKey)!
      ) {
        // This path to neighbor is better than any previous one. Record it!
        // gScore[neighbor] := tentative_gScore
        gScores.set(nKey, tentative_gScore)
        parentNodes.set(nKey, current)
        // fScore[neighbor] := tentative_gScore + h(neighbor)
        const fScore = tentative_gScore + h(nKey, endKey)
        fScores.set(nKey, fScore)
        // if neighbor not in openSet
        if (!openSet.content.includes(nKey)) {
          // openSet.add(neighbor)
          openSet.push(nKey)
        }
        // If neighbor is in openSet, make sure it's sorted properly
        else {
          const nIndex = openSet.content.indexOf(nKey)
          openSet.bubbleUp(nIndex)
          openSet.sinkDown(nIndex)
        }
      }
    })
    whileLoopRuns++
  }

  // Open set is empty but goal was never reached
  // return failure
  console.log(`The main while loop ran ${whileLoopRuns} times.`)
  throw new Error('path not found!')
}

export default AStar
