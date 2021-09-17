import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'

import INPUT from './Input/Day24'
import SLL from '../utils/SLL'

const getNeighbors = ([x, y]: [number, number], grid: Map<string, string>): [number, number][] => (
  [
    [x - 1, y] as [number, number],
    [x + 1, y] as [number, number],
    [x, y - 1] as [number, number],
    [x, y + 1] as [number, number]
  ]
  .filter(([x, y]) => {
    const fromGrid = grid.get(`${x}-${y}`)
    return fromGrid && fromGrid !== '#'
  })
)

const getDistanceBetweenNodes = (grid: Map<string, string>, start: [number, number], end: [number, number]): number => {
  const queue: SLL = new SLL(
    {
      gridNode: start,
      pathLength: 0
    }
  )
  const visited: Map<string, true> = new Map()

  while (queue.length) {
    const current = queue.shift()
    if (current) {
      if (JSON.stringify(current.gridNode) === JSON.stringify(end)) {
        return current.pathLength
      }
      if (!visited.get(current.gridNode.join('-'))) {
        visited.set(current.gridNode.join('-'), true)
        getNeighbors(current.gridNode, grid).forEach(neighbor => queue.push({
          gridNode: neighbor,
          pathLength: current.pathLength + 1
        }))
      }
    }
  }

  return 0
}

const getShortestPathLengthToAllNodes = (nodeCount: number, distances: Map<string, number>, part: 1 | 2): number => {
  interface ISearchNode {
    distance: number
    path: string
  }

  const queue: SLL = new SLL(
    {
      distance: 0,
      path: '0'
    }
  )
  let shortestPathDistance = Number.MAX_SAFE_INTEGER

  while (queue.length) {
    const currentSearchNode = queue.shift()
    if (currentSearchNode) {
      const currentLocation = currentSearchNode.path.slice(-1)
      if (
        (part === 1 && currentSearchNode.path.length === nodeCount)
        || (part === 2 && currentSearchNode.path.length === nodeCount + 1)
      ) {
        shortestPathDistance = Math.min(shortestPathDistance, currentSearchNode.distance)
      } else {
        const nexts: ISearchNode[] = []
        if (part === 2 && currentSearchNode.path.length >= nodeCount) {
          const nextDistance = (distances.get(`${currentLocation}-0`) || 0) + currentSearchNode.distance
          nexts.push({
            distance: nextDistance,
            path: `${currentSearchNode.path}0`
          })
        } else {
          for (let next = 0; next < nodeCount; next++) {
            if (!currentSearchNode.path.includes(next.toString())) {
              const nextDistance = (distances.get(`${currentLocation}-${next}`) || 0) + currentSearchNode.distance
              if (nextDistance !== undefined && nextDistance < shortestPathDistance) {
                nexts.push({
                  distance: nextDistance,
                  path: `${currentSearchNode.path}${next}`
                })
              }
            }
          }
        }
        nexts.forEach(next => {
          let insertAfter = queue.head
          if (!insertAfter) {
            queue.push(next)
          } else {
            while (
              insertAfter.next
              && insertAfter.value.distance < next.distance
              && insertAfter.next.value.distance < next.distance
            ) {
              insertAfter = insertAfter.next
            }
            queue.insertAfter(next, insertAfter)
          }
        })
      }
    }
  }

  return shortestPathDistance
}

const precompute = (input: string): {
  distances: Map<string, number>
  nodeLocations: Map<string, [number, number]>
} => {
  const nodeLocations: Map<string, [number, number]> = new Map()
  const distances: Map<string, number> = new Map()
  const grid: Map<string, string> = new Map()

  let x = 0
  let y = 0

  // Set up grid
  for (let i = 0; i < input.length; i++) {
    const char = input.charAt(i)
    if (char === '\n') {
      y++
      x = 0
    } else {
      grid.set(`${x}-${y}`, char)
      if (!isNaN(parseInt(char))) {
        nodeLocations.set(char, [x, y])
      }
      x++
    }
  }

  // Loop through all nodes and compute distances to other nodes
  for (let [nodeAKey, nodeALocation] of nodeLocations.entries()) {
    for (let [nodeBKey, nodeBLocation] of nodeLocations.entries()) {
      if (nodeAKey !== nodeBKey) {
        if (!distances.get(`${nodeAKey}-${nodeBKey}`)) {
          const distance = getDistanceBetweenNodes(grid, nodeALocation, nodeBLocation)
          distances.set(`${nodeAKey}-${nodeBKey}`, distance)
          if (!distances.get(`${nodeBKey}-${nodeAKey}`)) {
            distances.set(`${nodeBKey}-${nodeAKey}`, distance)
          }
        }
      }
    }
  }

  return { distances, nodeLocations }
}

const BUTTONS: IButton[] = [
  {
    label: 'Find Shortest Path',
    onClick: (inputKey: string) => {
      const { distances, nodeLocations } = precompute(INPUT[inputKey])
      const pathLength = getShortestPathLengthToAllNodes(nodeLocations.size, distances, 1)

      return {
        answer1: pathLength.toString()
      }
    }
  },
  {
    label: 'Find Shortest Path (incl Return)',
    onClick: (inputKey: string) => {
      const { distances, nodeLocations } = precompute(INPUT[inputKey])
      const pathLength = getShortestPathLengthToAllNodes(nodeLocations.size, distances, 2)

      return {
        answer2: pathLength.toString()
      }
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The shortest path is <code>{answer}</code> steps.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      The shortest path including returning to <code>0</code> is <code>{answer}</code>.
    </span>
  ),
  buttons: BUTTONS,
  day: 24,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Air Duct Spelunking'
}

export default config