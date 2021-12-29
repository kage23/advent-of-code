import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'

import INPUT from './Input/Day25'

const takeAStep = (map: string): string => {
  const field = map.split('\n').map(row => row.split(''))
  const rows = field.length
  const cols = field[0].length
  // First the ones moving right
  for (let rowI = 0; rowI < rows; rowI++) {
    const row = field[rowI]
    const onesToMove: number[] = []
    for (let colI = 0; colI < cols; colI++) {
      const char = row[colI]
      if (char === '>') {
        let nextCol = colI + 1
        if (nextCol === cols) nextCol = 0
        if (row[nextCol] === '.') {
          onesToMove.push(colI)
        }
      }
    }
    onesToMove.forEach(fromCol => {
      let nextCol = fromCol + 1
      if (nextCol === cols) nextCol = 0
      row[fromCol] = '.'
      row[nextCol] = '>'
    })
  }
  // Then the ones moving down
  for (let colI = 0; colI < cols; colI++) {
    const onesToMove: number[] = []
    for (let rowI = 0; rowI < rows; rowI++) {
      const row = field[rowI]
      const char = row[colI]
      if (char === 'v') {
        let nextRow = rowI + 1
        if (nextRow === rows) nextRow = 0
        if (field[nextRow][colI] === '.') {
          onesToMove.push(rowI)
        }
      }
    }
    onesToMove.forEach(fromRow => {
      let nextRow = fromRow + 1
      if (nextRow === rows) nextRow = 0
      field[fromRow][colI] = '.'
      field[nextRow][colI] = 'v'
    })
  }

  return field.map(row => row.join('')).join('\n')
}

const BUTTONS: IButton[] = [
  {
    label: 'Watch the Cucumbers',
    onClick: (inputKey: string) => {
      let map = INPUT[inputKey]
      let prevMap: string = ''

      let steps = 0
      while (prevMap !== map) {
        prevMap = map
        map = takeAStep(map)
        steps++
      }

      return {
        answer1: steps.toString()
      }
    }
  },
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The sea cucumbers will stop moving after <code>{answer}</code> steps.
    </span>
  ),
  answer2Text: () => (
    <span>
      You did it!
    </span>
  ),
  buttons: BUTTONS,
  day: 25,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Sea Cucumber'
}

export default config
