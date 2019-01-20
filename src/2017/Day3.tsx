import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'

import INPUT from './Input/Day3'
import { manhattanDistance } from '../utils/Various'

const Directions: Array<'R' | 'U' | 'L' | 'D'> = [
  'R', 'U', 'L', 'D'
]

const figurePositionOfSquare = (input: number): number[] => {
  let currentId = 1
  let currentPosition = [0, 0]
  let max = [0, 0]
  let min = [0, 0]
  let directionIndex = 0

  while (currentId < input) {
    switch (Directions[directionIndex]) {
      case 'R':
      currentPosition[0]++
      if (currentPosition[0] > max[0]) {
        max[0] = currentPosition[0]
        directionIndex = (directionIndex + 1) % Directions.length
      }
      break

      case 'U':
      currentPosition[1]--
      if (currentPosition[1] < min[1]) {
        min[1] = currentPosition[1]
        directionIndex = (directionIndex + 1) % Directions.length
      }
      break

      case 'L':
      currentPosition[0]--
      if (currentPosition[0] < min[0]) {
        min[0] = currentPosition[0]
        directionIndex = (directionIndex + 1) % Directions.length
      }
      break

      case 'D':
      currentPosition[1]++
      if (currentPosition[1] > max[1]) {
        max[1] = currentPosition[1]
        directionIndex = (directionIndex + 1) % Directions.length
      }
      break
    }
    currentId++
  }

  return currentPosition
}

const BUTTONS: IButton[] = [
  {
    label: 'Calculate Distance to Access Port',
    onClick: (inputKey) => ({
      answer1: manhattanDistance(
        figurePositionOfSquare(parseInt(INPUT[inputKey])),
        [0, 0]
      ).toString()
    })
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The data is carried <code>{answer}</code> steps.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      The final result is{' '}
      <code>{answer}</code>.
    </span>
  ),
  buttons: BUTTONS,
  day: 3,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Spiral Memory'
}

export default config