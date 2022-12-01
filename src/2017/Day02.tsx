import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'

import INPUT from '../Inputs/2017/Day02'

const getChecksum = (inputKey: string): { answer1: string } => {
  const input = INPUT[inputKey]
  let sum = 0
  input.split('\n').forEach(row => {
    let min = Number.MAX_SAFE_INTEGER
    let max = Number.MIN_SAFE_INTEGER
    row.split(/\s/).forEach(numStr => {
      const num = parseInt(numStr)
      min = Math.min(min, num)
      max = Math.max(max, num)
    })
    sum += (max - min)
  })
  return {
    answer1: sum.toString()
  }
}

const divideRowNumbers = (inputKey: string): { answer2: string } => {
  const input = INPUT[inputKey]
  let sum = 0
  input.split('\n').forEach(row => {
    const numbers = row.split(/\s/)
    numLoop:
    for (let i = 0; i < numbers.length; i++) {
      const number = parseInt(numbers[i])
      for (let j = i + 1; j < numbers.length; j++) {
        const nextNumber = parseInt(numbers[j])
        const testNum = (Math.max(number, nextNumber) / Math.min(number, nextNumber))
        if (testNum === Math.floor(testNum)) {
          sum += testNum
          break numLoop
        }
      }
    }
  })
  return {
    answer2: sum.toString()
  }
}

const BUTTONS: IButton[] = [
  {
    label: 'Get Checksum',
    onClick: getChecksum
  },
  {
    label: 'Divide Row Numbers',
    onClick: divideRowNumbers
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The checksum is{' '}
      <code>{answer}</code>.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      The final result is{' '}
      <code>{answer}</code>.
    </span>
  ),
  buttons: BUTTONS,
  day: 2,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Corruption Checksum'
}

export default config