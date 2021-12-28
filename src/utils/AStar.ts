import DLL from './DLL'

// A* finds a path from start to goal.
// function A_Star(start, goal, h)
const AStar = (
  startKey: string,
  endKey: string,
  map: Map<string, number>,
  h: (startKey: string, endKey: string) => number,
  getNeighbors: (current: string, map: Map<string, number>) => string[]
): number => {
  // The set of discovered nodes that may need to be (re-)expanded.
  // Initially, only the start node is known.
  // This is usually implemented as a min-heap or priority queue rather than a hash-set.
  // openSet := {start}
  const openSet: DLL<string> = new DLL(startKey)

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

  let whileLoopRuns = 0
  let dllStepThroughs = 0

  // while openSet is not empty
  while (openSet.length) {
    // This operation can occur in O(1) time if openSet is a min-heap or a priority queue
    // current := the node in openSet having the lowest fScore[] value
    const current = openSet.head
    if (current === undefined) throw new Error('something fucked up')

    // if current = goal
    if (current.value === endKey) {
      // return reconstruct_path(cameFrom, current)
      // (except I don't care about the path, just the riskiness)
      console.log(`The main while loop ran ${whileLoopRuns} times.`)
      console.log(
        `We took ${dllStepThroughs} individual steps through the DLL.`
      )
      return gScores.get(current.value) as number
    }

    // openSet.Remove(current)
    openSet.removeNode(current)

    // for each neighbor of current
    getNeighbors(current.value, map).forEach((nKey) => {
      // d(current,neighbor) is the weight of the edge from current to neighbor
      const d = map.get(nKey) as number

      // tentative_gScore is the distance from start to the neighbor through current
      // tentative_gScore := gScore[current] + d(current, neighbor)
      const tentative_gScore = (gScores.get(current.value) as number) + d

      // if tentative_gScore < gScore[neighbor]
      if (
        gScores.get(nKey) === undefined ||
        tentative_gScore < (gScores.get(nKey) as number)
      ) {
        // This path to neighbor is better than any previous one. Record it!
        // gScore[neighbor] := tentative_gScore
        gScores.set(nKey, tentative_gScore)
        // fScore[neighbor] := tentative_gScore + h(neighbor)
        const fScore = tentative_gScore + h(nKey, endKey)
        fScores.set(nKey, fScore)
        // if neighbor not in openSet
        if (openSet.getNode(nKey) === undefined) {
          // openSet.add(neighbor)
          dllStepThroughs += openSetAdd(openSet, nKey, fScores)
        }
      }
    })
    whileLoopRuns++
  }

  // Open set is empty but goal was never reached
  // return failure
  console.log(`The main while loop ran ${whileLoopRuns} times.`)
  console.log(`We took ${dllStepThroughs} individual steps through the DLL.`)
  throw new Error('path not found!')
}

// The open set needs to be sorted by fScore, lowest first
const openSetAdd = (
  openSet: DLL<string>,
  add: string,
  fScores: Map<string, number>
) => {
  // debugger
  let dllStepThroughs = 0
  if (openSet.length === 0) {
    openSet.push(add)
  } else {
    const fScore = fScores.get(add) as number
    if (openSet.length === 1) {
      if (openSet.head === undefined) throw new Error('something fucked up')
      const setHeadFScore = fScores.get(openSet.head.value) as number
      if (fScore >= setHeadFScore) {
        openSet.insertAfter(add, openSet.head)
      } else {
        openSet.insertBefore(add, openSet.head)
      }
    } else {
      let sortNode = openSet.head
      if (sortNode === undefined) throw new Error('something fucked up')
      let sortFScore = fScores.get(sortNode.value) as number
      while (sortFScore < fScore && sortNode.next !== openSet.head) {
        sortNode = sortNode.next
        if (sortNode === undefined) throw new Error('something fucked up')
        sortFScore = fScores.get(sortNode.value) as number
        dllStepThroughs++
      }
      if (fScore < sortFScore) {
        openSet.insertBefore(add, sortNode)
      } else {
        openSet.insertAfter(add, sortNode)
      }
    }
  }
  return dllStepThroughs
}

export default AStar
