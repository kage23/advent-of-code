import inputs from '../../inputs/2018/day06'
import { DayConfig } from '../../routes/Day'
import manhattanDistance from '../../utils/manhattanDistance'

interface CoordMap {
  coords: number[][]
  display: string[]
  inputKey: string
  max: number[]
  min: number[]
}

const parseInput = (inputKey: string): CoordMap => {
  const coords = []
  const max = [0, 0]
  const min = [Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER]
  const coordStrs = inputs.get(inputKey)!.split('\n')
  for (const coordStr of coordStrs) {
    const coord = [
      parseInt(coordStr.split(', ')[0]),
      parseInt(coordStr.split(', ')[1]),
    ]
    coords.push(coord)
    max[0] = Math.max(max[0], coord[0])
    max[1] = Math.max(max[1], coord[1])
    min[0] = Math.min(min[0], coord[0])
    min[1] = Math.min(min[1], coord[1])
  }
  let display = new Array(max[1] + 1).fill((() => '')())
  display = display.map(() => {
    let row = ''
    for (let x = 0; x <= max[0] + 1; x++) row += '.'
    return row
  })
  const map = { coords, max, min, display, inputKey }
  markCoordsOnMapDisplay(map)
  return map
}

const markCoordsOnMapDisplay = (map: CoordMap) => {
  const { coords, display } = map
  for (let i = 0; i < coords.length; i++) {
    const coord = coords[i]
    display[coord[1]] = `${display[coord[1]].slice(0, coord[0])}${
      coords.length <= 26 ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.slice(i, i + 1) : 'X'
    }${display[coord[1]].slice(coord[0] + 1)}`
  }
}

export const findLargestNonInfinite = (inputKey: string) => {
  const inMap = parseInput(inputKey)
  const { coords, max, min } = inMap
  const coordSizeMap: Map<number[], number> = new Map()
  const nearestCoordsMap: Map<number[], number[][]> = new Map()
  for (let x = min[0]; x <= max[0]; x++) {
    for (let y = min[1]; y <= max[1]; y++) {
      const testPoint = [x, y]
      let nearestCoords: number[][] = []
      let nearestDistance = Number.MAX_SAFE_INTEGER
      for (const coord of coords) {
        const currentDistance = manhattanDistance(testPoint, coord)
        if (currentDistance < nearestDistance) {
          nearestCoords = [coord]
          nearestDistance = currentDistance
        } else if (currentDistance === nearestDistance)
          nearestCoords.push(coord)
      }
      if (nearestCoords.length === 1) {
        const nearestCoord = nearestCoords[0]
        if (x === min[0] || x === max[0] || y === min[1] || y === max[1]) {
          coordSizeMap.set(nearestCoord, Infinity)
        } else {
          const coordSize = (coordSizeMap.get(nearestCoord) || 0) + 1
          coordSizeMap.set(nearestCoord, coordSize)
        }
      }
      nearestCoordsMap.set(testPoint, nearestCoords)
    }
  }
  let largestArea = 0
  let bestCoord = [0, 0]
  for (const [coord, size] of coordSizeMap) {
    if (size !== Infinity && size > largestArea) {
      largestArea = size
      bestCoord = coord
    }
  }
  for (const [coord, nearestCoords] of nearestCoordsMap) {
    if (nearestCoords.length === 1 && nearestCoords[0] === bestCoord)
      inMap.display[coord[1]] = `${inMap.display[coord[1]].slice(
        0,
        coord[0]
      )}x${inMap.display[coord[1]].slice(coord[0] + 1)}`
  }
  markCoordsOnMapDisplay(inMap)
  return { answer1: largestArea }
}

export const findAreaClosestToMost = (inputKey: string) => {
  const inMap = parseInput(inputKey)
  const targetDistance = inputKey === 'DEMO' ? 32 : 10000
  const { coords, max, min } = inMap
  let size = 0
  for (let x = min[0]; x <= max[0]; x++) {
    for (let y = min[1]; y <= max[1]; y++) {
      let totalDistance = 0
      for (const coord of coords) {
        totalDistance += manhattanDistance(coord, [x, y])
        if (totalDistance >= targetDistance) break
      }
      if (totalDistance < targetDistance) {
        size++
        inMap.display[y] = `${inMap.display[y].slice(0, x)}x${inMap.display[
          y
        ].slice(x + 1)}`
      }
    }
  }
  markCoordsOnMapDisplay(inMap)

  return { answer2: size }
}

const day06: Omit<DayConfig, 'year'> = {
  answer1Text: 'The size of the largest non-infinite area is answer.',
  answer2Text: 'answer locations are within the distance from all coordinates.',
  buttons: [
    {
      label: 'Find Largest Non-Infinite Area',
      onClick: findLargestNonInfinite,
    },
    {
      label: 'Find Area Close to Most',
      onClick: findAreaClosestToMost,
    },
  ],
  id: 6,
  inputs,
  title: 'Chronal Coordinates',
}

export default day06
