import React from 'react'
import {
  IButton,
  IDayConfig
} from '../Config'

import INPUT from './Input/Day16'

let prevInputKey = ''
let programs = ''

const BUTTONS: IButton[] = [
]

const renderDay = (dayConfig: IDayConfig, inputKey: string): JSX.Element => {
  if (prevInputKey !== inputKey) {
    programs = inputKey === 'DEMO'
      ? 'abcde'
      : 'abcdefghijklmnop'
    prevInputKey = inputKey
  }

  return (
    <div className="render-box">
      <h3>Programs:</h3>
      <pre>{programs}</pre>
      <h3>Input:</h3>
      <pre className="render-box--pre-wrap">{dayConfig.INPUT[inputKey]}</pre>
    </div>
  )
}

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The programs' final order is{' '}
      <code>{answer}</code>.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      <code>{answer}</code>
    </span>
  ),
  buttons: BUTTONS,
  day: 16,
  INPUT,
  renderDay,
  title: 'Permutation Promenade'
}

export default config