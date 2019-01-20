import React from 'react'
import {
  IButton,
  IDayConfig
} from '../Config'

import INPUT from './Input/Day1'

const solveCaptcha = (inputKey: string): { answer1: string } => {
  const input = INPUT[inputKey]
  let result = 0
  for (let i = 0; i < input.length; i++) {
    const number = parseInt(input[i])
    const nextNumber = parseInt(input[(i + 1) % input.length])
    if (number === nextNumber) result += number
  }
  return {
    answer1: result.toString()
  }
}

const BUTTONS: IButton[] = [
  {
    label: 'Solve Captcha',
    onClick: solveCaptcha
  }
]

export const renderDay = (dayConfig: IDayConfig, inputKey: string): JSX.Element => (
  <div className="render-box">
    <h3>Input:</h3>
    <pre className="render-box--pre-wrap">{dayConfig.INPUT[inputKey]}</pre>
  </div>
)

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The captcha solution is{' '}
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
  day: 1,
  INPUT,
  renderDay,
  title: 'Inverse Captcha'
}

export default config