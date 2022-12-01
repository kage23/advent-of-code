import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'

import INPUT from '../Inputs/2020/Day01'

const parseInput = (inputKey: string): number[] =>
  INPUT[inputKey].split('\n').map(inputStr => parseInt(inputStr))

const checkExpenseReport = (inputKey: string) => {
  const inputNumbers = parseInput(inputKey)
  for (let idx1 = 0; idx1 < inputNumbers.length; idx1++) {
    for (let idx2 = idx1 + 1; idx2 < inputNumbers.length; idx2++) {
      if (inputNumbers[idx1] + inputNumbers[idx2] === 2020) {
        return {
          answer1: (inputNumbers[idx1] * inputNumbers[idx2]).toString()
        }
      }
    }
  }

  return {}
}

const checkExpenseReportHarder = (inputKey: string) => {
  const inputNumbers = parseInput(inputKey)
  for (let idx1 = 0; idx1 < inputNumbers.length; idx1++) {
    for (let idx2 = idx1 + 1; idx2 < inputNumbers.length; idx2++) {
      for (let idx3 = idx2 + 1; idx3 < inputNumbers.length; idx3++) {
        if (inputNumbers[idx1] + inputNumbers[idx2] + inputNumbers[idx3] === 2020) {
          return {
            answer2: (inputNumbers[idx1] * inputNumbers[idx2] * inputNumbers[idx3]).toString()
          }
        }
      }
    }
  }

  return {}
}

const BUTTONS: IButton[] = [
  {
    label: 'Check Expense Report',
    onClick: checkExpenseReport
  },
  {
    label: 'Check Expense Report Closer',
    onClick: checkExpenseReportHarder
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The product of the two numbers is{' '}
      <code>{answer}</code>.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      The product of the three numbers is{' '}
      <code>{answer}</code>.
    </span>
  ),
  buttons: BUTTONS,
  day: 1,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Report Repair'
}

export default config