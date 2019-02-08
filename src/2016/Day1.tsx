import React from 'react'
import {
  IButton,
  IDayConfig
} from '../Config'

import { manhattanDistance } from '../utils/Various'

import INPUT from './Input/Day1'

// increase directions index to turn right; decrease to turn left
const DIRECTIONS = [
  [-1, 0], // moving north
  [0, 1], // moving east
  [1, 0], // moving south
  [0, -1] // moving west
]

const BUTTONS: IButton[] = [
  {
    label: 'Find Easter Bunny HQ',
    onClick: inputKey => {
      const directions = INPUT[inputKey].split(', ')
      const currentPosition = [0, 0]
      let currentDirectionIndex = 0

      for (const directionRaw of directions) {
        // Turn
        currentDirectionIndex += directionRaw.charAt(0) === 'R'
          ? 1 : -1
        currentDirectionIndex = currentDirectionIndex % DIRECTIONS.length
        if (currentDirectionIndex < 0) currentDirectionIndex = DIRECTIONS.length - 1

        // Then move
        const numberOfBlocks = parseInt(directionRaw.slice(1))
        currentPosition[0] += (DIRECTIONS[currentDirectionIndex][0] * numberOfBlocks)
        currentPosition[1] += (DIRECTIONS[currentDirectionIndex][1] * numberOfBlocks)
      }

      return {
        answer1: manhattanDistance(currentPosition, [0, 0]).toString()
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
      The Easter Bunny HQ is{' '}
      <code>{answer}</code> blocks away.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      <code>{answer}</code>
    </span>
  ),
  buttons: BUTTONS,
  day: 1,
  INPUT,
  renderDay,
  title: 'No Time for a Taxicab'
}

export default config