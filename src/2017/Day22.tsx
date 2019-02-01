import React from 'react'
import {
  IButton,
  IDayConfig
} from '../Config'

import INPUT from './Input/Day22'

interface IField {
  map: string[]
  currentPosition: number[]
  currentDirection: 'U' | 'R' | 'D' | 'L'
  min: number[]
  max: number[]
}

let prevInputKey = ''
let field: IField = {
  map: ['.'],
  currentPosition: [0, 0],
  currentDirection: 'U',
  min: [0, 0],
  max: [0, 0]
}

const parseInput = (input: string): IField => {
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
    currentDirection: 'U',
    min,
    max
  }
}

const BUTTONS: IButton[] = [
]

const renderDay = (dayConfig: IDayConfig, inputKey: string): JSX.Element => {
  if (prevInputKey !== inputKey) {
    field = parseInput(dayConfig.INPUT[inputKey])
    prevInputKey = inputKey
  }

  return (
    <div className="render-box">
      <h3>Input:</h3>
      <pre>{field.map.join('\n')}</pre>
    </div>
  )
}

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      After <code>10,000</code> bursts of activity,{' '}
      <code>{answer}</code> bursts caused a node to become infected.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      <code>{answer}</code>
    </span>
  ),
  buttons: BUTTONS,
  day: 22,
  INPUT,
  renderDay,
  title: 'Sporifica Virus'
}

export default config