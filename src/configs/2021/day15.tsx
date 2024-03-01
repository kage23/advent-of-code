import inputs from '../../inputs/2021/day15'
import { DayConfig } from '../../routes/Day'
import AStar from '../../utils/AStar'
import manhattanDistance from '../../utils/manhattanDistance'

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

const getNeighbors = (current: string, map: Map<string, number>): string[] => {
  const [x, y] = current.split(',').map((n) => Number(n))
  return [
    [x - 1, y],
    [x + 1, y],
    [x, y - 1],
    [x, y + 1],
  ]
    .filter(([nx, ny]) => {
      const key = `${nx},${ny}`
      return map.get(key) !== undefined
    })
    .map(([nx, ny]) => `${nx},${ny}`)
}

export const findLowestRiskPath = (input: string) => {
  const map = parseInput(input)
  const startKey = '0,0'
  const size = map.get('size')
  if (size === undefined) throw new Error('something fucked up')
  const endKey = `${size - 1},${size - 1}`
  const dFn = (_: string, n: string) => map.get(n) as number
  const h = (startKey: string): number =>
    manhattanDistance(
      startKey.split(',').map((n) => Number(n)),
      endKey.split(',').map((n) => Number(n))
    )
  const getNeighborsFn = (n: string) => getNeighbors(n, map)
  const pathRiskLevel = AStar(startKey, endKey, dFn, h, getNeighborsFn).cost
  return {
    answer1: pathRiskLevel,
  }
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
      let value =
        ((smallMap.get(`${smallMapX},${smallMapY}`) as number) +
          mapXOffset +
          mapYOffset) %
        highestRisk
      if (value === 0) value = highestRisk
      bigMap.set(`${x},${y}`, value)
    }
  }

  return bigMap
}

export const findLowestRiskPathBigMap = (input: string) => {
  const map = getTheBigMap(input)
  const startKey = '0,0'
  const size = map.get('size')
  if (size === undefined) throw new Error('something fucked up')
  const endKey = `${size - 1},${size - 1}`

  const dFn = (_: string, n: string) => map.get(n) as number
  const h = (startKey: string): number =>
    manhattanDistance(
      startKey.split(',').map((n) => Number(n)),
      endKey.split(',').map((n) => Number(n))
    )
  const getNeighborsFn = (n: string) => getNeighbors(n, map)

  const pathRiskLevel = AStar(startKey, endKey, dFn, h, getNeighborsFn).cost

  return {
    answer2: pathRiskLevel,
  }
}

const day15: Omit<DayConfig, 'year'> = {
  answer1Text: 'The least-risky path has a risk level of answer.',
  answer2Text:
    'The least-risky path through the big map has a risk level of answer.',
  buttons: [
    {
      label: 'Find Lowest-Risk Path',
      onClick: findLowestRiskPath,
    },
    {
      label: 'Find Lowest-Risk Path Through the Big Map',
      onClick: findLowestRiskPathBigMap,
    },
  ],
  id: 15,
  inputs,
  title: 'Chiton',
}

export default day15
