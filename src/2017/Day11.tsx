import React from 'react'
import {
  IButton,
  IDayConfig
} from '../Config'

import INPUT from './Input/Day11'

import { manhattanDistance } from '../utils/Various'

const stepFn = (step: string, currentPosition: number[]) => {
  switch (step) {
    case 'nw':
    currentPosition[0]++
    currentPosition[2]--
    break

    case 'n':
    currentPosition[0]++
    currentPosition[1]--
    break

    case 'ne':
    currentPosition[1]--
    currentPosition[2]++
    break

    case 'sw':
    currentPosition[1]++
    currentPosition[2]--
    break

    case 's':
    currentPosition[0]--
    currentPosition[1]++
    break

    case 'se':
    currentPosition[0]--
    currentPosition[2]++
    break

    default:
    break
  }

  return currentPosition
}

const BUTTONS: IButton[] = [
  {
    label: 'Find Distance',
    onClick: (inputKey) => {
      const steps = INPUT[inputKey].split(',')
      let currentPosition = [0, 0, 0]

      steps.forEach(step => {
        currentPosition = stepFn(step, currentPosition)}
      )

      return {
        answer1: (manhattanDistance(currentPosition, [0, 0, 0]) / 2).toString()
      }
    }
  },
  {
    label: 'Find Furthest Distance',
    onClick: (inputKey) => {
      const steps = INPUT[inputKey].split(',')
      let currentPosition = [0, 0, 0]
      let furthestPosition = 0

      steps.forEach(step => {
        currentPosition = stepFn(step, currentPosition)
        furthestPosition = Math.max(furthestPosition, manhattanDistance(currentPosition, [0, 0, 0]) / 2)
      })

      return {
        answer2: furthestPosition.toString()
      }
    }
  }
]

const renderDay = (dayConfig: IDayConfig, inputKey: string): JSX.Element => (
  <div className="render-box">
    <h3>Input:</h3>
    <pre className="render-box--pre-wrap">{dayConfig.INPUT[inputKey]}</pre>
  </div>
)

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The final position is{' '}
      <code>{answer}</code> steps away.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      The furthest position was{' '}
      <code>{answer}</code> steps away.
    </span>
  ),
  buttons: BUTTONS,
  day: 11,
  INPUT,
  renderDay,
  title: 'Hex Ed'
}

export default config