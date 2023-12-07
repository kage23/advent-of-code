import inputs from '../../inputs/2018/day17'
import { DayConfig } from '../../routes/Day'

interface OccupiedTiles {
  [key: string]: '#' | '~' | '|'
}

interface Coord {
  x: number
  y: number
}

interface Field {
  occupied: OccupiedTiles
  min: Coord
  max: Coord
}

interface WaterState extends Coord {
  type: '|' | '~' | '+'
}

const pathKey = ({ x, y }: Coord): string => `${x},${y}`

const getCoord = (xy: string): Coord => ({
  x: parseInt(xy.split(',')[0]),
  y: parseInt(xy.split(',')[1])
})

const parseInput = (input: string): Field => {
  const occupied: { [key: string]: '#' | '~' | '|' } = {}
  const field = input.split('\n')
  let minX = 500
  let minY = Number.MAX_SAFE_INTEGER
  let maxX = 500
  let maxY = Number.MIN_SAFE_INTEGER

  for (const row of field) {
    const things = row.split(', ')
    let xStr = '', yStr = '',
      localMinX = Number.MAX_VALUE, localMinY = Number.MAX_VALUE,
      localMaxX = Number.MIN_VALUE, localMaxY = Number.MIN_VALUE
    for (const thing of things) {
      if (thing.slice(0, 1) === 'x') xStr = thing.split('=')[1]
      if (thing.slice(0, 1) === 'y') yStr = thing.split('=')[1]
    }
    if (xStr.indexOf('..') === -1) {
      localMinX = parseInt(xStr)
      localMaxX = parseInt(xStr)
      localMinY = parseInt(yStr.split('..')[0])
      localMaxY = parseInt(yStr.split('..')[1])
    }
    if (yStr.indexOf('..') === -1) {
      localMinY = parseInt(yStr)
      localMaxY = parseInt(yStr)
      localMinX = parseInt(xStr.split('..')[0])
      localMaxX = parseInt(xStr.split('..')[1])
    }
    minX = Math.min(minX, localMinX - 2)
    minY = Math.min(minY, localMinY)
    maxX = Math.max(maxX, localMaxX + 2)
    maxY = Math.max(maxY, localMaxY)
    for (let x = localMinX; x <= localMaxX; x++) {
      for (let y = localMinY; y <= localMaxY; y++) {
        occupied[pathKey({ x, y })] = '#'
      }
    }
  }

  return {
    occupied,
    min: { x: minX, y: minY },
    max: { x: maxX, y: maxY }
  }
}

const isEmpty = (coord: Coord, occupied: OccupiedTiles): boolean => !occupied[pathKey(coord)]

const isClay = (coord: Coord, occupied: OccupiedTiles): boolean => occupied[pathKey(coord)] === '#'

const isFull = (coord: Coord, occupied: OccupiedTiles): boolean => (
  occupied[pathKey(coord)] === '~'
  || isClay(coord, occupied)
)

const hasWall = (coord: Coord, occupied: OccupiedTiles, dir: 'l' | 'r'): Coord | false => {
  let offset = dir === 'l' ? -1 : 1
  const offsetMod = dir === 'l' ? -1 : 1
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const next: Coord = { x: coord.x + offset, y: coord.y }
    if (isEmpty(next, occupied)) return false
    if (isClay(next, occupied)) return next
    offset += offsetMod
  }
}

// This should fill NON-inclusively between the two coords provided!
const fillSquares = (occupied: OccupiedTiles, a: Coord, b: Coord) => {
  // The coords must be on the same y-level
  if (a.y !== b.y) return

  const startX = Math.min(a.x, b.x) + 1
  const stopBefore = Math.max(a.x, b.x)
  for (let i = startX; i < stopBefore; i++)
    occupied[pathKey({ x: i, y: a.y })] = '~'
}

const flow = (field: Field, water: WaterState): Field => {
  // OK, let's do a recursion
  const { x, y } = water

  // If the water has flowed off the bottom of the map, it's done
  if (y > field.max.y) return field

  const downCoord = { x, y: y + 1 }
  const leftCoord = { x: x - 1, y }
  const rightCoord = { x: x + 1, y }

  // If the water can flow down, it should do so, and continue
  if (isEmpty(downCoord, field.occupied)) {
    const nextState = '|'
    field.occupied[pathKey(downCoord)] = nextState
    flow(field, { ...downCoord, type: nextState })
  }

  // If the water can't flow down, but it can flow left, it should do so
  if (isFull(downCoord, field.occupied) && isEmpty(leftCoord, field.occupied)) {
    const nextState = '|'
    field.occupied[pathKey(leftCoord)] = nextState
    flow(field, { ...leftCoord, type: nextState })
  }

  // If the water can't flow down, but it can flow right, it should do so
  if (isFull(downCoord, field.occupied) && isEmpty(rightCoord, field.occupied)) {
    const nextState = '|'
    field.occupied[pathKey(rightCoord)] = nextState
    flow(field, { ...rightCoord, type: nextState })
  }

  // If the water can't flow down, and is contained within walls, it should fill and stop flowing
  const wallLeft = hasWall(water, field.occupied, 'l')
  const wallRight = hasWall(water, field.occupied, 'r')
  if (isFull(downCoord, field.occupied) && wallLeft && wallRight) {
    fillSquares(field.occupied, wallLeft, wallRight)
  }

  return field
}

const countWater = (field: Field): {
  totalWater: number
  settledWater: number
} => {
  const { occupied,
    min: { y: minY },
    max: { y: maxY }
  } = field
  let totalWater = 0
  let settledWater = 0

  for (const xy in occupied) {
    const { y } = getCoord(xy)
    if (
      (y <= maxY && y >= minY)
      && (occupied[xy] === '|' || occupied[xy] === '~')
    ) {
      totalWater++
      if (occupied[xy] === '~') settledWater++
    }
  }

  return {
    totalWater,
    settledWater
  }
}

export const flowWater = (inputKey: string) => {
  let field = parseInput(inputs.get(inputKey)!)

  field = flow(field, { x: 500, y: 0, type: '+' })
  const {
    totalWater,
    settledWater
  } = countWater(field)
  return {
    answer1: totalWater,
    answer2: settledWater
  }
}

const day17: Omit<DayConfig, 'year'> = {
  answer1Text: 'The total amount of water is answer.',
  answer2Text: 'answer of that water has settled and will not flow away.',
  buttons: [
    {
      label: 'Flow',
      onClick: flowWater
    },
  ],
  id: 17,
  inputs,
  title: 'Reservoir Research',
}

export default day17
