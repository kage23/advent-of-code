import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'

import INPUT from './Input/Day1'

const parseInput = (inputKey: string): number[] =>
  INPUT[inputKey].split('\n').map(inputStr => parseInt(inputStr))

const BUTTONS: IButton[] = [
  {
    label: 'Check Depth Increases',
    onClick: (inputKey: string) => {
      const numbers = parseInput(inputKey)
      let count = 0
      numbers.forEach((number, i, array) => {
        if (i > 0 && number > array[i - 1]) count++
      })
      return {
        answer1: count.toString()
      }
    }
  },
  {
    label: 'Check Depth Increases in 3-Windows',
    onClick: (inputKey: string) => {
      const numbers = parseInput(inputKey)
      let count = 0
      numbers.forEach((number, i, array) => {
        if (i > 0) {
          const currentSum = number + array[i + 1] + array[i + 2]
          const prevSum = number + array[i - 1] + array[i + 1]
          if (currentSum > prevSum) count ++
        }
      })
      return {
        answer2: count.toString()
      }
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The depth increases{' '}
      <code>{answer}</code> times.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      The summed depth increases{' '}
      <code>{answer}</code> times.
    </span>
  ),
  buttons: BUTTONS,
  day: 1,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Sonar Sweep'
}

export default config
