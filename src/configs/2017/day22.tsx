import inputs from '../../inputs/2017/day22'
import { DayConfig } from '../../routes/Day'

interface Field {
  map: string[]
  currentPosition: number[]
  currentDirection: number
  min: number[]
  max: number[]
}

const DIRECTIONS: ((currentPosition: number[]) => number[])[] = [
  // 'U',
  (currentPosition) => [currentPosition[0], currentPosition[1] - 1],
  // 'R',
  (currentPosition) => [currentPosition[0] + 1, currentPosition[1]],
  // 'D',
  (currentPosition) => [currentPosition[0], currentPosition[1] + 1],
  // 'L'
  (currentPosition) => [currentPosition[0] - 1, currentPosition[1]],
]

let bursts = 0
let field: Field = {
  map: ['.'],
  currentPosition: [0, 0],
  currentDirection: 0,
  min: [0, 0],
  max: [0, 0],
}

const parseInput = (input: string): Field => {
  const map = input.split('\n')
  const width = map[0].length
  const height = map.length
  const wOffset = (width - 1) / 2
  const hOffset = (height - 1) / 2
  const min = [wOffset * -1, hOffset * -1]
  const max = [wOffset, hOffset]

  return {
    map,
    currentPosition: [0, 0],
    currentDirection: 0,
    min,
    max,
  }
}

const getCurrentNode = (field: Field): string => {
  const positionToGet = [
    field.currentPosition[0] - field.min[0],
    field.currentPosition[1] - field.min[1],
  ]

  return field.map[positionToGet[1]].charAt(positionToGet[0])
}

// Returns whether a node was _infected_
const toggleCurrentPosition = (field: Field): boolean => {
  const currentNode = getCurrentNode(field)
  const positionInField = [
    field.currentPosition[0] - field.min[0],
    field.currentPosition[1] - field.min[1],
  ]
  const newNode = currentNode === '.' ? '#' : '.'

  field.map[positionInField[1]] = `${field.map[positionInField[1]].slice(
    0,
    positionInField[0]
  )}${newNode}${field.map[positionInField[1]].slice(positionInField[0] + 1)}`

  return newNode === '#'
}

// Returns whether a node was _infected_
const evolveCurrentPosition = (field: Field): boolean => {
  const currentNode = getCurrentNode(field)
  const positionInField = [
    field.currentPosition[0] - field.min[0],
    field.currentPosition[1] - field.min[1],
  ]
  const newNode =
    currentNode === '.'
      ? 'W'
      : currentNode === 'W'
      ? '#'
      : currentNode === '#'
      ? 'F'
      : '.'

  field.map[positionInField[1]] = `${field.map[positionInField[1]].slice(
    0,
    positionInField[0]
  )}${newNode}${field.map[positionInField[1]].slice(positionInField[0] + 1)}`

  return newNode === '#'
}

const updatePosition = (field: Field) => {
  field.currentPosition = DIRECTIONS[field.currentDirection](
    field.currentPosition
  )
  if (field.currentPosition[0] < field.min[0]) {
    field.min[0] = field.currentPosition[0]
    field.map = field.map.map((line) => `.${line}`)
  }
  if (field.currentPosition[0] > field.max[0]) {
    field.max[0] = field.currentPosition[0]
    field.map = field.map.map((line) => `${line}.`)
  }
  if (field.currentPosition[1] < field.min[1]) {
    field.min[1] = field.currentPosition[1]
    field.map.unshift(''.padStart(field.map[0].length, '.'))
  }
  if (field.currentPosition[1] > field.max[1]) {
    field.max[1] = field.currentPosition[1]
    field.map.push(''.padStart(field.map[0].length, '.'))
  }
}

// Performs the burst and returns whether a node was _infected_
const burst = (field: Field, part: 1 | 2): boolean => {
  let infected = false
  const currentNode = getCurrentNode(field)
  // Change direction based on current location
  switch (currentNode) {
    case '.':
      field.currentDirection = (field.currentDirection + 3) % DIRECTIONS.length
      break

    case '#':
      field.currentDirection = (field.currentDirection + 1) % DIRECTIONS.length
      break

    case 'F':
      field.currentDirection = (field.currentDirection + 2) % DIRECTIONS.length
      break

    case 'W':
    default:
      break
  }
  // Clean or infect current location
  if (part === 1) infected = toggleCurrentPosition(field)
  if (part === 2) infected = evolveCurrentPosition(field)
  // Change current location based on (new) direction
  updatePosition(field)

  return infected
}

export const burstToTenThousand = (input: string) => {
  let infectionCount = 0
  bursts = 0
  field = parseInput(input)

  while (bursts !== 10000) {
    if (burst(field, 1)) infectionCount++
    bursts++
  }

  return {
    answer1: infectionCount,
  }
}

export const burstToTenMillion = (input: string) => {
  let infectionCount = 0
  bursts = 0
  field = parseInput(input)

  while (bursts !== 10000000) {
    if (burst(field, 2)) infectionCount++
    bursts++
  }

  return {
    answer2: infectionCount,
  }
}

const day22: Omit<DayConfig, 'year'> = {
  answer1Text:
    'After 10,000 bursts of activity, answer bursts caused a node to become infected.',
  answer2Text:
    'After 10,00,000 bursts of activity, answer bursts caused a node to become infected.',
  buttons: [
    {
      label: 'Burst to 10,000 (Part 1)',
      onClick: burstToTenThousand,
    },
    {
      label: 'Burst to 10,000,000 (Part 2)',
      onClick: burstToTenMillion,
    },
  ],
  id: 22,
  inputs,
  title: 'Sporifica Virus',
}

export default day22
