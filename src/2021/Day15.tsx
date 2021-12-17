import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'
import DLL from '../utils/DLL'
import { manhattanDistance } from '../utils/Various'

import INPUT from './Input/Day15'

const parseInput = (input: string): Map<string, number> => {
  const map: Map<string, number> = new Map()
  const rows = input.split('\n')
  for (let y = 0; y < rows.length; y++) {
    for (let x = 0; x < rows[y].length; x++) {
      map.set(`${x},${y}`, Number(rows[y].charAt(x)))
    }
  }
  map.set('size', rows.length)
  return map
}

const getTheBigMap = (input: string): Map<string, number> => {
  const smallMap = parseInput(input)
  const smallMapSize = smallMap.get('size') as number
  const bigMapSize = smallMapSize * 5
  const bigMap: Map<string, number> = new Map([['size', bigMapSize]])

  for (let y = 0; y < bigMapSize; y++) {
    for (let x = 0; x < bigMapSize; x++) {
      const highestRisk = 9
      const mapXOffset = Math.floor(x / smallMapSize)
      const mapYOffset = Math.floor(y / smallMapSize)
      const smallMapX = x % smallMapSize
      const smallMapY = y % smallMapSize
      let value = ((smallMap.get(`${smallMapX},${smallMapY}`) as number) + mapXOffset + mapYOffset) % highestRisk
      if (value === 0) value = highestRisk
      bigMap.set(`${x},${y}`, value)
    }
  }

  return bigMap
}

// A* finds a path from start to goal.
// function A_Star(start, goal, h)
const findLowestRiskPath = (map: Map<string, number>): number => {
  const startKey = '0,0'
  // The set of discovered nodes that may need to be (re-)expanded.
  // Initially, only the start node is known.
  // This is usually implemented as a min-heap or priority queue rather than a hash-set.
  // openSet := {start}
  const openSet: DLL<string> = new DLL(startKey)
  const size = map.get('size')
  if (size === undefined) throw new Error('something fucked up')
  const endKey = `${size - 1},${size - 1}`

  // For node n, gScore[n] is the cost of the cheapest path from start to n currently known.
  // gScore := map with default value of Infinity
  // gScore[start] := 0
  const gScores: Map<string, number> = new Map([[startKey, 0]])

  // For node n, fScore[n] := gScore[n] + h(n). fScore[n] represents our current best guess as to
  // how short a path from start to finish can be if it goes through n.
  // fScore := map with default value of Infinity
  // fScore[start] := h(start)
  const fScores: Map<string, number> = new Map([[startKey, h(startKey, endKey)]])

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
      console.log(`We took ${dllStepThroughs} individual steps through the DLL.`)
      return gScores.get(current.value) as number
    }

    // openSet.Remove(current)
    openSet.removeNode(current)

    // for each neighbor of current
    getNeighbors(current.value, map).forEach(nKey => {
      // d(current,neighbor) is the weight of the edge from current to neighbor
      const d = map.get(nKey) as number

      // tentative_gScore is the distance from start to the neighbor through current
      // tentative_gScore := gScore[current] + d(current, neighbor)
      const tentative_gScore = (gScores.get(current.value) as number) + d

      // if tentative_gScore < gScore[neighbor]
      if (gScores.get(nKey) === undefined || tentative_gScore < (gScores.get(nKey) as number)) {
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
// h is the heuristic function. h(n) estimates the cost to reach goal from node n.
const h = (startKey: string, endKey: string): number =>
  manhattanDistance(
    startKey.split(',').map(n => Number(n)),
    endKey.split(',').map(n => Number(n))
  )

const getNeighbors = (current: string, map: Map<string, number>): string[] => {
  const [x, y] = current.split(',').map(n => Number(n))
  return [
    [x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]
  ]
    .filter(([nx, ny]) => {
      const key = `${nx},${ny}`
      return map.get(key) !== undefined
    })
    .map(([nx, ny]) => `${nx},${ny}`)
}

// The open set needs to be sorted by fScore, lowest first
const openSetAdd = (openSet: DLL<string>, add: string, fScores: Map<string, number>) => {
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
      while (
        sortFScore < fScore &&
        sortNode.next !== openSet.head
      ) {
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

const BUTTONS: IButton[] = [
  {
    label: 'Find Lowest-Risk Path',
    onClick: (inputKey: string) => {
      const map = parseInput(INPUT[inputKey])
      const startTime = new Date().getTime()
      const pathRiskLevel = findLowestRiskPath(map)
      console.log(`Total run time: ${(new Date().getTime() - startTime) / 1000} seconds.`)
      // Breadth-first sample data
      // The main while loop ran 36105 times.
      // We took 1186762715 individual steps through the DLL.
      // Total run time: 12.229 seconds.

      // Breadth-first sample data improved:
      // The main while loop ran 277 times.
      // We took 12505 individual steps through the DLL.
      // Total run time: 0.004 seconds.

      // Depth-first sample data:
      // The main while loop ran 339 times.
      // We took 12505 individual steps through the DLL.
      // Total run time: 0.005 seconds.

      // A* search algorithm sample data:
      // The main while loop ran 84 times.
      // We took 497 individual steps through the DLL.
      // Total run time: 0.003 seconds.
      return {
        answer1: pathRiskLevel.toString()
      }
    }
  },
  {
    label: 'Find Lowest-Risk Path Through the Big Map',
    onClick: (inputKey: string) => {
      const map = getTheBigMap(INPUT[inputKey])
      const startTime = new Date().getTime()
      const pathRiskLevel = findLowestRiskPath(map)
      console.log(`Total run time: ${(new Date().getTime() - startTime) / 1000} seconds.`)

      return {
        answer2: pathRiskLevel.toString()
      }
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The least-risky path has a risk level of <code>{answer}</code>.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      The least-risky path through the big map has a risk level of <code>{answer}</code>.
    </span>
  ),
  buttons: BUTTONS,
  day: 15,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Chiton'
}

export default config
