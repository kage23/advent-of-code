import DLL from './DLL'
import { MapWithDefault } from './Various'

const reconstructPath = <T>(cameFrom: Map<T, T>, end: T): T[] => {
  let current: T | undefined = end
  const totalPath: T[] = [current]
  while (current && cameFrom.has(current)) {
    current = cameFrom.get(current)
    totalPath.push(current as T)
  }
  return totalPath.reverse()
}

// A* finds a path from start to goal.
// h is the heuristic function. h(n) estimates the cost to reach goal from node n.
// d should give the distance from one node to the next
const AStar = <T>(
  start: T,
  goal: T,
  h: (n: T) => number,
  getNeighbors: (n: T) => T[],
  d: (from: T, to: T) => number
) => {
  const openSet: DLL<T> = new DLL(start)
  const cameFrom: Map<T, T> = new Map()

  // For node n, gScore[n] is the cost of the cheapest path from start to n currently known.
  const gScore = new MapWithDefault<T, number>(() => Infinity)
  gScore.set(start, 0)

  // For node n, fScore[n] := gScore[n] + h(n). fScore[n] represents our current best guess as to
  // how short a path from start to finish can be if it goes through n.
  const fScore = new MapWithDefault<T, number>(() => Infinity)
  fScore.set(start, h(start))

  while (openSet.length) {
    const current = openSet.head
    if (current === undefined) throw new Error('something fucked up')

    if (current.value === goal) {
      return reconstructPath(cameFrom, current.value)
    }

    openSet.removeNode(current)

    getNeighbors(current.value).forEach((n) => {
      // tentative_gScore is the distance from start to the neighbor through current
      const tentativeGScore = gScore.get(current.value) + d(current.value, n)

      if (tentativeGScore < gScore.get(n)) {
        // This path to neighbor is better than any previous one. Record it!
        cameFrom.set(n, current.value)
        gScore.set(n, tentativeGScore)
        fScore.set(n, tentativeGScore + h(n))
        if (openSet.getNode(n) === undefined) {
          openSetAdd<T>(openSet, n, fScore)
        }
      }
    })
  }
  // Open set is empty but goal was never reached
  throw new Error('Path not found!')
}

// The open set needs to be sorted by fScore, lowest first
const openSetAdd = <T>(
  openSet: DLL<T>,
  add: T,
  fScores: MapWithDefault<T, number>
) => {
  if (openSet.length === 0) {
    openSet.push(add)
  } else {
    const fScore = fScores.get(add)
    if (openSet.length === 1) {
      if (openSet.head === undefined) throw new Error('something fucked up')
      const setHeadFScore = fScores.get(openSet.head.value)
      if (fScore >= setHeadFScore) {
        openSet.insertAfter(add, openSet.head)
      } else {
        openSet.insertBefore(add, openSet.head)
      }
    } else {
      let sortNode = openSet.head
      if (sortNode === undefined) throw new Error('something fucked up')
      let sortFScore = fScores.get(sortNode.value)
      while (sortFScore < fScore && sortNode.next !== openSet.head) {
        sortNode = sortNode.next
        if (sortNode === undefined) throw new Error('something fucked up')
        sortFScore = fScores.get(sortNode.value)
      }
      if (fScore < sortFScore) {
        openSet.insertBefore(add, sortNode)
      } else {
        openSet.insertAfter(add, sortNode)
      }
    }
  }
}

export const sumPathDistance = <T>(path: T[], map: Map<T, number>): number =>
  path.reduce(
    (sum, currentNode, i) =>
      i === 0 ? sum : sum + (map.get(currentNode) as number),
    0
  )

export default AStar
