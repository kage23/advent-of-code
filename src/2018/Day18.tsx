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

const BUTTONS: IButton[] = []

const renderDay = (dayConfig: IDayConfig, inputKey: string): JSX.Element => {
  if (prevInputKey !== inputKey) {
    state = parseInput(dayConfig.INPUT[inputKey])
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
      <h3>Trees: {trees}. Lumberyards: {lys}. Time: {time}.</h3>
      <div>{displayField}</div>
    </div>
  )}

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The solution is{' '}
      <code>{answer}</code>.
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