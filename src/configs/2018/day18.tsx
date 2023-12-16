import inputs from '../../inputs/2018/day18'
import { DayConfig } from '../../routes/Day'

enum Types {
  Open = '.',
  Trees = '|',
  LumberYard = '#',
}

interface Coord {
  x: number
  y: number
  type?: Types
}

interface Field {
  min: Coord
  max: Coord
  data: string[]
}

interface State {
  field: Field
  time: number
  trees: number
  lys: number
}

interface FieldHash {
  [key: string]: number
}

let state: State = {
  field: {
    min: {
      x: 0,
      y: 0,
    },
    max: {
      x: 0,
      y: 0,
    },
    data: [],
  },
  time: 0,
  trees: 0,
  lys: 0,
}

const parseInput = (input: string): State => {
  const field: Field = {
    min: { x: 0, y: 0 },
    max: { x: 0, y: 0 },
    data: input.split('\n'),
  }
  let trees = 0
  let lys = 0

  field.max.x = field.data[0].length - 1
  field.max.y = field.data.length - 1

  for (let xi = 0; xi <= field.max.x; xi++)
    for (let yi = 0; yi <= field.max.y; yi++) {
      const char = field.data[yi].charAt(xi)
      if (char === Types.Trees) trees++
      if (char === Types.LumberYard) lys++
    }

  return {
    field,
    time: 0,
    trees,
    lys,
  }
}

const getNeighbors = (xi: number, yi: number, field: Field): string[] =>
  [
    { x: xi - 1, y: yi - 1 },
    { x: xi, y: yi - 1 },
    { x: xi + 1, y: yi - 1 },
    { x: xi - 1, y: yi },
    { x: xi + 1, y: yi },
    { x: xi - 1, y: yi + 1 },
    { x: xi, y: yi + 1 },
    { x: xi + 1, y: yi + 1 },
  ]
    .filter(
      ({ x, y }) =>
        x >= field.min.x &&
        x <= field.max.x &&
        y >= field.min.y &&
        y <= field.max.y
    )
    .map(({ x, y }) => field.data[y].charAt(x))

const getNext = (
  current: string,
  treeNeighbors: number,
  lyNeighbors: number
): string => {
  switch (current) {
    case Types.Open:
      return treeNeighbors >= 3 ? Types.Trees : Types.Open

    case Types.Trees:
      return lyNeighbors >= 3 ? Types.LumberYard : Types.Trees

    case Types.LumberYard:
      return treeNeighbors >= 1 && lyNeighbors >= 1
        ? Types.LumberYard
        : Types.Open

    default:
      return ''
  }
}

const step = (
  field: Field
): {
  field: Field
  trees: number
  lys: number
} => {
  const { data, min, max } = field
  const newData: string[] = []
  let trees = 0
  let lys = 0
  for (let xi = min.x; xi <= max.x; xi++)
    for (let yi = min.y; yi <= max.y; yi++) {
      newData[yi] = newData[yi] || ''
      const neighbors = getNeighbors(xi, yi, field)
      const treeNeighbors = neighbors.filter((i) => i === Types.Trees).length
      const lyNeighbors = neighbors.filter((i) => i === Types.LumberYard).length
      const next = getNext(data[yi].charAt(xi), treeNeighbors, lyNeighbors)
      newData[yi] += next
      if (next === Types.Trees) trees++
      if (next === Types.LumberYard) lys++
    }

  return {
    field: {
      ...field,
      data: newData,
    },
    trees,
    lys,
  }
}

export const advanceTenMinutes = (input: string) => {
  state = parseInput(input)

  for (let i = 0; i < 10; i++) {
    state = {
      time: state.time + 1,
      ...step(state.field),
    }
  }

  return {
    answer1: state.trees * state.lys,
  }
}

export const skipToMinuteOneBillion = (input: string) => {
  state = parseInput(input)

  const { field, time, trees, lys } = state

  const seenBefore: FieldHash = {}
  let skippedYet = false
  seenBefore[field.data.join('')] = time

  const advance = 1000000000 - time
  let next = {
    field,
    trees,
    lys,
  }

  for (let i = 0; i < advance; i++) {
    next = step(next.field)
    if (seenBefore[next.field.data.join('')] && !skippedYet) {
      const loopLength = i - seenBefore[next.field.data.join('')]
      const remainingLoops = advance - i
      i = advance - (remainingLoops % loopLength)
      skippedYet = true
    } else seenBefore[next.field.data.join('')] = time + i
  }

  state = {
    ...next,
    time: time + advance,
  }

  return {
    answer2: state.trees * state.lys,
  }
}

const day18: Omit<DayConfig, 'year'> = {
  answer1Text: 'The total resource value after 10 minutes is answer.',
  answer2Text:
    'The total resource value after 1,000,000,000 minutes is answer.',
  buttons: [
    {
      label: 'Advance Ten Minutes',
      onClick: advanceTenMinutes,
    },
    {
      label: 'Skip to Minute 1,000,000,000',
      onClick: skipToMinuteOneBillion,
    },
  ],
  id: 18,
  inputs,
  title: 'Settlers of The North Pole',
}

export default day18
