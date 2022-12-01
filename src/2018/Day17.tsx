import React from 'react'
import {
  IButton,
  IDayConfig
} from '../Config'

import INPUT from '../Inputs/2018/Day17'

interface ICoord {
  x: number
  y: number
}

interface IOccupiedTiles {
  [key: string]: '#' | '~' | '|'
}

interface IField {
  occupied: IOccupiedTiles
  min: ICoord
  max: ICoord
}

interface IWaterState extends ICoord {
  type: '|' | '~' | '+'
}

let field: IField = {
  occupied: {},
  min: { x: 0, y: 0 },
  max: { x: 0, y: 0 }
}
let prevInputKey = ''
let answer1_a = ''

const pathKey = ({ x, y }: ICoord): string => `${x},${y}`
const getCoord = (xy: string): ICoord => ({
  x: parseInt(xy.split(',')[0]),
  y: parseInt(xy.split(',')[1])
})

const parseInput = (input: string): IField => {
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

const flow = (field: IField, water: IWaterState): IField => {
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

// This should fill NON-inclusively between the two coords provided!
const fillSquares = (occupied: IOccupiedTiles, a: ICoord, b: ICoord) => {
  // The coords must be on the same y-level
  if (a.y !== b.y) return

  const startX = Math.min(a.x, b.x) + 1
  const stopBefore = Math.max(a.x, b.x)
  for (let i = startX; i < stopBefore; i++)
    occupied[pathKey({ x: i, y: a.y })] = '~'
}

const hasWall = (coord: ICoord, occupied: IOccupiedTiles, dir: 'l' | 'r')
  : ICoord | false => {
  let offset = dir === 'l' ? -1 : 1
  let offsetMod = dir === 'l' ? -1 : 1
  while (true) {
    let next: ICoord = { x: coord.x + offset, y: coord.y }
    if (isEmpty(next, occupied)) return false
    if (isClay(next, occupied)) return next
    offset += offsetMod
  }
}

const isClay = (coord: ICoord, occupied: IOccupiedTiles): boolean => occupied[pathKey(coord)] === '#'

const isEmpty = (coord: ICoord, occupied: IOccupiedTiles): boolean => !occupied[pathKey(coord)]

const isFull = (coord: ICoord, occupied: IOccupiedTiles): boolean => (
  occupied[pathKey(coord)] === '~'
  || isClay(coord, occupied)
)

const countWater = (field: IField): {
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

  answer1_a = (minY - 1).toString()

  return {
    totalWater,
    settledWater
  }
}

const BUTTONS: IButton[] = [
  {
    label: 'Flow',
    onClick: () => {
      field = flow(field, { x: 500, y: 0, type: '+' })
      const {
        totalWater,
        settledWater
      } = countWater(field)
      return {
        answer1: totalWater.toString(),
        answer2: settledWater.toString()
      }
    }
  }
]

const renderDay = (dayConfig: IDayConfig, inputKey: string): JSX.Element => {
  if (inputKey !== prevInputKey) {
    field = parseInput(dayConfig.INPUT[inputKey])
    prevInputKey = inputKey
  }

  const {
    occupied,
    min: { x: minX },
    max: { x: maxX, y: maxY }
  } = field

  const rows: string[][] = new Array(maxY)
  for (const xy in occupied) {
    const { x, y } = getCoord(xy)
    if (!rows[y]) rows[y] = []
    rows[y][x] = occupied[xy] || '.'
  }

  const displayRows: JSX.Element[] = []
  for (let y = 0; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) {
      if (!rows[y]) rows[y] = []
      if (x === 500 && y === 0) rows[y][x] = '+'
      else if (!rows[y][x]) rows[y][x] = '.'
    }
    const rowString = rows[y].join('')
    displayRows.push(<div key={y}>{rowString}</div>)
  }

  return (
    <div className="render-box render-box--no-wrap">
      <div>
        <h3>Input:</h3>
        <pre>{dayConfig.INPUT[inputKey]}</pre>
      </div>
      <div style={{ marginLeft: '24px' }}>
        <fieldset>
          {displayRows}
        </fieldset>
      </div>
    </div>
  )
}

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The total amount of water is{' '}
      <code>{answer}</code> (not counting the <code>{answer1_a}</code>
      {' '}water tiles that are above any clay, so out of the officially-defined range).
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      <code>{answer}</code>
      {' '}of that water has settled and will not flow away.
    </span>
  ),
  buttons: BUTTONS,
  day: 17,
  INPUT,
  renderDay,
  title: 'Reservoir Research'
}

export default config