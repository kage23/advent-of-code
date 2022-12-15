import {
  IButton,
  IDayConfig
} from '../Config'

import INPUT from '../Inputs/2018/Day18'

enum TYPES {
  OPEN = '.',
  TREES = '|',
  LY = '#'
}

interface ICoord {
  x: number
  y: number
  type?: TYPES
}

interface IField {
  min: ICoord
  max: ICoord
  data: string[]
}

interface IFieldHash {
  [key: string]: number
}

interface IState {
  field: IField
  time: number
  trees: number
  lys: number
}

let state: IState = {
  field: {
    min: {
      x: 0,
      y: 0
    },
    max: {
      x: 0,
      y: 0
    },
    data: []
  },
  time: 0,
  trees: 0,
  lys: 0
}
let prevInputKey = ''

const parseInput = (INPUT: string): IState => {
  const field: IField = {
    min: { x: 0, y: 0 },
    max: { x: 0, y: 0 },
    data: INPUT.split('\n')
  }
  let trees = 0
  let lys = 0

  field.max.x = field.data[0].length - 1
  field.max.y = field.data.length - 1

  for (let xi = 0; xi <= field.max.x; xi++)
    for (let yi = 0; yi <= field.max.y; yi++) {
      const char = field.data[yi].charAt(xi)
      if (char === TYPES.TREES) trees++
      if (char === TYPES.LY) lys++
    }

  return {
    field,
    time: 0,
    trees,
    lys
  }
}

const getNeighbors = (xi: number, yi: number, field: IField): string[] => (
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
    .filter(({ x, y }) => x >= field.min.x && x <= field.max.x && y >= field.min.y && y <= field.max.y)
    .map(({ x, y }) => field.data[y].charAt(x))
)

const getNext = (current: string, treeNeighbors: number, lyNeighbors: number): string => {
  switch (current) {
    case TYPES.OPEN:
      return treeNeighbors >= 3 ? TYPES.TREES : TYPES.OPEN

    case TYPES.TREES:
      return lyNeighbors >= 3 ? TYPES.LY : TYPES.TREES

    case TYPES.LY:
      return (treeNeighbors >= 1 && lyNeighbors >= 1) ? TYPES.LY : TYPES.OPEN

    default:
      return ''
  }
}

const step = (field: IField)
  : {
    field: IField
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
      const treeNeighbors = neighbors.filter(i => i === TYPES.TREES).length
      const lyNeighbors = neighbors.filter(i => i === TYPES.LY).length
      const next = getNext(data[yi].charAt(xi), treeNeighbors, lyNeighbors)
      newData[yi] += next
      if (next === TYPES.TREES) trees++
      if (next === TYPES.LY) lys++
    }

  return {
    field: {
      ...field,
      data: newData
    },
    trees,
    lys
  }
}

let answer1_a: undefined | string = undefined
let answer1_b = ''
let answer1_c = ''

let answer2_a: undefined | string = undefined
let answer2_b = ''
let answer2_c = ''

const BUTTONS: IButton[] = [
  {
    label: 'Advance',
    onClick: () => {
      state = {
        time: state.time + 1,
        ...step(state.field)
      }

      if (state.time === 10) {
        answer1_a = (state.trees * state.lys).toString()
        answer1_b = state.trees.toString()
        answer1_c = state.lys.toString()
      }

      return {
        answer1: answer1_a
      }
    }
  },
  {
    label: 'Skip to Minute 1,000,000,000',
    onClick: () => {
      const {
        field,
        time,
        trees,
        lys
      } = state

      const seenBefore: IFieldHash = {}
      let skippedYet = false
      seenBefore[field.data.join('')] = time

      const advance = 1000000000 - time
      let next = {
        field,
        trees,
        lys
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
        time: time + advance
      }

      if (state.time === 1000000000) {
        answer2_a = (state.trees * state.lys).toString()
        answer2_b = state.trees.toString()
        answer2_c = state.lys.toString()
      }

      return {
        answer2: answer2_a
      }
    }
  }
]

const renderDay = (dayConfig: IDayConfig, inputKey: string): JSX.Element => {
  if (prevInputKey !== inputKey) {
    state = parseInput(dayConfig.INPUT[inputKey])
    answer1_a = undefined
    answer1_b = ''
    answer1_c = ''
    prevInputKey = inputKey
  }

  const {
    field,
    time,
    trees,
    lys
  } = state

  const displayField = field.data.map((row, index) => <div key={index}>{row}</div>)

  return (
    <div className="render-box">
      <h3>Trees: {trees}. Lumberyards: {lys}. Time: {time} minutes.</h3>
      <div>{displayField}</div>
    </div>
  )
}

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The total resource value after 10 minutes is{' '}
      <code>{answer}</code> (<code>{answer1_b}</code> x <code>{answer1_c}</code>).
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      The total resource value after 1,000,000,000 minutes is{' '}
      <code>{answer}</code> (<code>{answer2_b}</code> x <code>{answer2_c}</code>).
    </span>
  ),
  buttons: BUTTONS,
  day: 18,
  INPUT,
  renderDay,
  title: 'Settlers of The North Pole'
}

export default config