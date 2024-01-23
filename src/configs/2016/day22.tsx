import inputs from '../../inputs/2016/day22'
import { DayConfig } from '../../routes/Day'
import manhattanDistance from '../../utils/manhattanDistance'
import SLL from '../../utils/SLL'

interface INode {
  avail: number
  name: string
  neighbors: string[]
  render: '.' | '_' | '#' | 'G'
  size: number
  used: number
  usePercent: number
  x: number
  y: number
}

const maxX = 31
const maxY = 29

const getRender = (
  nodeLine: string,
  isDemo: boolean
): '.' | '_' | '#' | 'G' => {
  const size = parseInt(nodeLine.slice(23))
  const usePercent = parseInt(nodeLine.slice(42))
  const x = parseInt(nodeLine.split('node-x')[1])
  const y = parseInt(nodeLine.split('-y')[1])

  const localMaxX = isDemo ? 2 : maxX
  const maxSize = isDemo ? 30 : 100

  if (usePercent === 0) return '_'
  if (size > maxSize) return '#'
  if (x === localMaxX && y === 0) return 'G'
  return '.'
}

const parseInput = (input: string, isDemo: boolean): Map<string, INode> => {
  const nodes: Map<string, INode> = new Map()

  input
    .split('\n')
    .slice(2)
    .forEach((nodeLine) => {
      const node: INode = {
        avail: parseInt(nodeLine.slice(34)),
        name: nodeLine.split(' ')[0],
        neighbors: [],
        render: getRender(nodeLine, isDemo),
        size: parseInt(nodeLine.slice(23)),
        used: parseInt(nodeLine.slice(29)),
        usePercent: parseInt(nodeLine.slice(42)),
        x: parseInt(nodeLine.split('node-x')[1]),
        y: parseInt(nodeLine.split('-y')[1]),
      }
      const neighbors = [
        [node.x - 1, node.y],
        [node.x + 1, node.y],
        [node.x, node.y - 1],
        [node.x, node.y + 1],
      ]
        .filter(([fx, fy]) => fx >= 0 && fx <= maxX && fy >= 0 && fy <= maxY)
        .map(([x, y]) => `/dev/grid/node-x${x}-y${y}`)
      node.neighbors = neighbors
      nodes.set(node.name, node)
    })

  return nodes
}

const isViablePair = (a: INode, b: INode): boolean =>
  // Node A is not empty (its Used is not zero).
  a.used !== 0 &&
  // Nodes A and B are not the same node.
  a !== b &&
  // The data on node A (its Used) would fit on node B (its Avail).
  a.used <= b.avail

const renderGridString = (
  grid: Map<string, INode>,
  lineBreaks: boolean,
  isDemo: boolean
): string => {
  let gridStr = ''
  const localMaxX = isDemo ? 2 : maxX
  const localMaxY = isDemo ? 2 : maxY

  for (let y = 0; y <= localMaxY; y++) {
    for (let x = 0; x <= localMaxX; x++) {
      const nodeName = `/dev/grid/node-x${x}-y${y}`
      const node = grid.get(nodeName)
      if (node) {
        gridStr += node.render
      }
      if (x === localMaxX && lineBreaks) {
        gridStr += '\n'
      }
    }
  }

  return gridStr
}

const getCoordsFromStringIndex = (
  index: number,
  width: number
): [number, number] => [index % width, Math.floor(index / width)]

const getStringIndexFromCoords = (
  x: number,
  y: number,
  width: number
): number => x + y * (width + 1)

const getContentsFromCoords = (
  gridStr: string,
  x: number,
  y: number,
  isDemo: boolean
): string => {
  const localMaxX = isDemo ? 2 : maxX

  return gridStr.charAt(getStringIndexFromCoords(x, y, localMaxX))
}

const moveEmptyToCoords = (
  gridStr: string,
  nextCoords: [number, number],
  width: number,
  isDemo: boolean
): string => {
  // Remove old empty
  const nextGridStr = gridStr.replace(
    '_',
    getContentsFromCoords(gridStr, nextCoords[0], nextCoords[1], isDemo)
  )
  // Insert new empty
  const newEmptyStringIndex = getStringIndexFromCoords(
    nextCoords[0],
    nextCoords[1],
    width
  )
  return `${nextGridStr.slice(0, newEmptyStringIndex)}_${nextGridStr.slice(
    newEmptyStringIndex + 1
  )}`
}

const getPossibleNexts = (
  gridStr: string,
  visited: Map<string, true>,
  isDemo: boolean
): string[] => {
  const localMaxX = isDemo ? 2 : maxX
  const localMaxY = isDemo ? 2 : maxY
  // Find the x,y coords of the empty node and the G node
  const emptyIndex = gridStr.indexOf('_')
  const [emptyX, emptyY] = getCoordsFromStringIndex(emptyIndex, localMaxX + 1)

  // From there, you can get possible next steps (i.e. move empty up, down, left, right)
  return (
    [
      [emptyX - 1, emptyY] as [number, number],
      [emptyX + 1, emptyY] as [number, number],
      [emptyX, emptyY - 1] as [number, number],
      [emptyX, emptyY + 1] as [number, number],
    ]
      .filter(
        ([x, y]) =>
          // Within the allowed space
          x >= 0 &&
          x <= localMaxX &&
          y >= 0 &&
          y <= localMaxY &&
          // Not a full node
          getContentsFromCoords(gridStr, x, y, isDemo) !== '#'
      )
      .map((nextCoords) =>
        moveEmptyToCoords(gridStr, nextCoords, localMaxX, isDemo)
      )
      // Filter nexts against the visited list
      .filter((gridStr) => !visited.get(gridStr))
      .sort((a, b) => {
        // First priority is moving the Goal square closer to [0,0]
        const aGoalCoords = getCoordsFromStringIndex(
          a.indexOf('G'),
          localMaxX + 1
        )
        const bGoalCoords = getCoordsFromStringIndex(
          b.indexOf('G'),
          localMaxX + 1
        )
        const aGoalDistance = manhattanDistance(aGoalCoords, [0, 0])
        const bGoalDistance = manhattanDistance(bGoalCoords, [0, 0])
        if (aGoalDistance !== bGoalDistance)
          return aGoalDistance - bGoalDistance
        // Second priority is moving the Empty square left of the Goal square
        const aEmptyCoords = getCoordsFromStringIndex(
          a.indexOf('_'),
          localMaxX + 1
        )
        const bEmptyCoords = getCoordsFromStringIndex(
          b.indexOf('_'),
          localMaxX + 1
        )
        const aEmptyDistance = manhattanDistance(aEmptyCoords, [
          aGoalCoords[0] - 1,
          aGoalCoords[1],
        ])
        const bEmptyDistance = manhattanDistance(bEmptyCoords, [
          bGoalCoords[0] - 1,
          bGoalCoords[1],
        ])
        return aEmptyDistance - bEmptyDistance
      })
  )
}

const findShortestPath = (
  grid: Map<string, INode>,
  input: string,
  isDemo: boolean
): number => {
  const visited: Map<string, true> = new Map()

  const queue = new SLL({
    gridStr: renderGridString(grid, false, isDemo),
    pathLength: 0,
  })

  while (queue.length) {
    const currentSearchNode = queue.shift()
    if (currentSearchNode) {
      if (currentSearchNode.gridStr.charAt(0) === 'G') {
        return currentSearchNode.pathLength
      }
      // Add this search node to the visited list
      visited.set(currentSearchNode.gridStr, true)
      const nexts = getPossibleNexts(currentSearchNode.gridStr, visited, isDemo)
      nexts.forEach((next) =>
        queue.push({
          gridStr: next,
          pathLength: currentSearchNode.pathLength + 1,
        })
      )
    }
  }

  return NaN
}

export const findViablePairs = (input: string, isDemo = false) => {
  const nodes = parseInput(input, isDemo)

  const nodeNames = Array.from(nodes.keys())
  let viablePairCount = 0

  for (const keyA of nodeNames) {
    for (const keyB of nodeNames) {
      const nodeA = nodes.get(keyA)
      const nodeB = nodes.get(keyB)
      if (nodeA && nodeB && isViablePair(nodeA, nodeB)) viablePairCount++
    }
  }

  return {
    answer1: viablePairCount,
  }
}

export const accessData = (input: string, isDemo = false) => {
  const nodes = parseInput(input, isDemo)

  const pathLength = findShortestPath(nodes, input, isDemo)

  return {
    answer2: pathLength,
  }
}

const day22: Omit<DayConfig, 'year'> = {
  answer1Text: 'There are answer viable pairs of nodes.',
  answer2Text: 'It will take answer steps to access the data.',
  buttons: [
    {
      label: 'Find Viable Pairs',
      onClick: findViablePairs,
    },
    {
      label: 'Access Data',
      onClick: accessData,
    },
  ],
  id: 22,
  inputs,
  title: 'Grid Computing',
}

export default day22
