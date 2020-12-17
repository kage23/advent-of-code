import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'

import INPUT from './Input/Day12'

const findSum = (input: any, runningTotal = 0, part: 1 | 2): number => {
  if (typeof input === 'string') {
    return runningTotal
  }

  if (typeof input === 'number') {
    return runningTotal + input
  }

  if (Array.isArray(input)) {
    return input.reduce((total, current) => findSum(current, total, part), runningTotal)
  }

  if (part === 2 && Object.values(input).includes('red')) {
    return runningTotal
  }

  return Object.keys(input).reduce(
    (total, current) => findSum(input[current], total, part),
    runningTotal
  )
}

const BUTTONS: IButton[] = [
  {
    label: 'Sum Input',
    onClick: (inputKey) => {
      const input = JSON.parse(INPUT[inputKey])
      const sum = findSum(input, 0, 1)
      return {
        answer1: sum.toString()
      }
    }
  },
  {
    label: 'Sum Input, No Red',
    onClick: (inputKey) => {
      const input = JSON.parse(INPUT[inputKey])
      const sum = findSum(input, 0, 2)
      return {
        answer2: sum.toString()
      }
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The total sum is <code>{answer}</code>.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      The total sum without red is <code>{answer}</code>.
    </span>
  ),
  buttons: BUTTONS,
  day: 12,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'JSAbacusFramework.io'
}

export default config