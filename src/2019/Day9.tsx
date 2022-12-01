import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'
import { intcodeComputer2019 } from '../utils/Various'

import INPUT from '../Inputs/2019/Day9'

const parseInput = (inputKey: string): number[] =>
  INPUT[inputKey].split(',').map(inputStr => parseInt(inputStr))

const BUTTONS: IButton[] = [
  {
    label: 'Run Program, No Input',
    onClick: (inputKey: string) => {
      const input = parseInput(inputKey)

      const results = intcodeComputer2019(input)

      return {
        answer1: JSON.stringify(results.outputs)
      }
    }
  },
  {
    label: 'Run Test Mode (Input 1)',
    onClick: (inputKey: string) => {
      const input = parseInput(inputKey)

      const results = intcodeComputer2019(input, [1])

      return {
        answer1: JSON.stringify(results.outputs)
      }
    }
  },
  {
    label: 'Run Sensor Mode (Input 2)',
    onClick: (inputKey: string) => {
      const input = parseInput(inputKey)

      const results = intcodeComputer2019(input, [2])

      return {
        answer2: JSON.stringify(results.outputs)
      }
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The outputs were <code>{answer}</code>.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      The coordinates of the distress signal are{' '}
      <code>{answer}</code>.
    </span>
  ),
  buttons: BUTTONS,
  day: 9,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Sensor Boost'
}

export default config
