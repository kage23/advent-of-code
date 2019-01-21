import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'

import INPUT from './Input/Day9'

let groups = 0
let prevInputKey = ''

const processStream = (input: string): number => {
  let len = input.length
  let score = 0
  let parentScore = 0
  let inGarbage = false

  for (let i = 0; i < len; i++) {
    switch (input.charAt(i)) {
      case '{':
      if (!inGarbage) {
        groups++
        parentScore++
        score += parentScore
      }
      break

      case '}':
      if (!inGarbage) parentScore--
      break

      case '<':
      inGarbage = true
      break

      case '>':
      inGarbage = false
      break

      case '!':
      i++
      break

      default:
      break
    }
  }

  return score
}

const BUTTONS: IButton[] = [
  {
    label: 'Process Stream',
    onClick: (inputKey) => ({
      answer1: processStream(INPUT[inputKey]).toString()
    })
  }
]

export const renderDay = (dayConfig: IDayConfig, inputKey: string): JSX.Element => {
  if (prevInputKey !== inputKey) {
    groups = 0
    prevInputKey = inputKey
  }

  return (
    <div className="render-box">
      <h3>Input:</h3>
      <pre className="render-box--pre-wrap">{dayConfig.INPUT[inputKey]}</pre>
    </div>
  )
}


const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      There are <code>{groups}</code> groups, with a total score of <code>{answer}</code>.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      <code>{answer}</code>
    </span>
  ),
  buttons: BUTTONS,
  day: 9,
  INPUT,
  renderDay,
  title: 'Stream Processing'
}

export default config