import React from 'react'
import {
  IButton,
  IDayConfig
} from '../Config'

import INPUT from '../Inputs/2017/Day01'

const solveCaptcha1 = (inputKey: string): { answer1: string } => {
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

const solveCaptcha2 = (inputKey: string): { answer2: string } => {
  const input = INPUT[inputKey]
  const len = input.length
  let result = 0
  for (let i = 0; i < len; i++) {
    const number = parseInt(input[i])
    const nextNumber = parseInt(input[(i + (len / 2)) % len])
    if (number === nextNumber) result += number
  }
  return {
    answer2: result.toString()
  }
}

const BUTTONS: IButton[] = [
  {
    label: 'Solve Captcha (First Half)',
    onClick: solveCaptcha1
  },
  {
    label: 'Solve Captcha (Second Half)',
    onClick: solveCaptcha2
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
      The solution to the first half of the captcha is{' '}
      <code>{answer}</code>.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      The solution to the second half of the captcha is{' '}
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