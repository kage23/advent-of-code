import React from 'react'
import {
  IButton,
  IDayConfig
} from '../Config'

import INPUT from './Input/Day18'

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

interface IFieldData {
  [key:string]: string
}

interface IField {
  min: ICoord
  max: ICoord
  data: IFieldData
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
    data: {}
  },
  time: 0,
  trees: 0,
  lys: 0
}
let prevInputKey = ''

const pathKey = ({ x, y }: ICoord): string => `${x},${y}`

const parseInput = (INPUT: string): IState => {
  const field: IField = {
    min: { x: 0, y: 0 },
    max: { x: 0, y: 0 },
    data: {}
  }
  let trees = 0
  let lys = 0

  const INPUT_ROWS = INPUT.split('\n')
  field.max.x = INPUT_ROWS[0].length - 1
  field.max.y = INPUT_ROWS.length - 1

  for (let xi = 0; xi <= field.max.x; xi++)
    for (let yi = 0; yi <= field.max.y; yi++) {
      const char = INPUT_ROWS[yi].charAt(xi)
      field.data[pathKey({ x: xi, y: yi })] = char
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

const getNeighbors = (xi: number, yi: number, data: IFieldData): string[] => (
  [
    { x: xi - 1, y: yi - 1 },
    { x: xi,     y: yi - 1 },
    { x: xi + 1, y: yi - 1 },
    { x: xi - 1, y: yi },
    { x: xi + 1, y: yi },
    { x: xi - 1, y: yi + 1 },
    { x: xi,     y: yi + 1 },
    { x: xi + 1, y: yi + 1 },
  ]
  .map(({ x, y }) => data[pathKey({ x, y })])
  .filter(item => typeof item !== 'undefined')
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
  const newData: IFieldData = {}
  let trees = 0
  let lys = 0
  for (let xi = min.x; xi <= max.x; xi++)
    for (let yi = min.y; yi <= max.y; yi++) {
      const neighbors = getNeighbors(xi, yi, data)
      const treeNeighbors = neighbors.filter(i => i === TYPES.TREES).length
      const lyNeighbors = neighbors.filter(i => i === TYPES.LY).length
      const next = getNext(data[pathKey({ x: xi, y: yi })], treeNeighbors, lyNeighbors)
      newData[pathKey({ x: xi, y: yi })] = next
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

  const displayField = new Array(field.max.x - field.min.x + 1).fill((() => '')())

  for (let yi = field.min.y; yi <= field.max.y; yi++) {
    let row = ''
    for (let xi = field.min.x; xi <= field.max.x; xi++)
      row += field.data[pathKey({ x: xi, y: yi })]
    displayField[yi] = <div key={yi}>{row}</div>
  }

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
      The solution is{' '}
      <code>{answer}</code>.
    </span>
  ),
  buttons: BUTTONS,
  day: 18,
  INPUT,
  renderDay,
  title: 'Settlers of The North Pole'
}

export default config