import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'

import INPUT from './Input/Day18'

const getNextRow = (row: string): string => {
  let newRow = ''
  for (let i = 0; i < row.length; i++) {
    const lcr = [
      i === 0 ? '.' : row.charAt(i - 1),
      row.charAt(i),
      i === row.length - 1 ? '.' : row.charAt(i + 1)
    ]
    if (
      (lcr[0] === '^' && lcr[1] === '^' && lcr[2] === '.')
      || (lcr[0] === '.' && lcr[1] === '^' && lcr[2] === '^')
      || (lcr[0] === '^' && lcr[1] === '.' && lcr[2] === '.')
      || (lcr[0] === '.' && lcr[1] === '.' && lcr[2] === '^')
    ) {
      newRow += '^'
    } else {
      newRow += '.'
    }
  }
  return newRow
}

const BUTTONS: IButton[] = [
  {
    label: 'Count Safe Tiles in Field',
    onClick: (inputKey) => {
      const field: string[] = [INPUT[inputKey]]
      const fieldLength = inputKey.startsWith('DEMO')
        ? field[0].length === 5 ? 3 : 10
        : 40

      while (field.length < fieldLength) {
        const lastRow = field[field.length - 1]
        field.push(getNextRow(lastRow))
      }

      const safeCount = field.reduce((count, row) => count + row.split('').filter(x => x === '.').length, 0)

      return {
        answer1: safeCount.toString()
      }
    }
  },
  {
    label: 'Count Safe Tiles in Huge Field',
    onClick: (inputKey) => {
      const field: string[] = [INPUT[inputKey]]
      const fieldLength = 400000

      while (field.length < fieldLength) {
        const lastRow = field[field.length - 1]
        field.push(getNextRow(lastRow))
      }

      const safeCount = field.reduce((count, row) => count + row.split('').filter(x => x === '.').length, 0)

      return {
        answer2: safeCount.toString()
      }
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      There are <code>{answer}</code> safe tiles in the field.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      There are <code>{answer}</code> safe tiles in the huge field.
    </span>
  ),
  buttons: BUTTONS,
  day: 18,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Like a Rogue'
}

export default config