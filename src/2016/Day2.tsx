import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'

import INPUT from './Input/Day2'

const DOOR_BUTTONS = [
  '123',
  '456',
  '789'
]

const BUTTONS: IButton[] = [
  {
    label: 'Find Bathroom Code',
    onClick: inputKey => {
      const inputLines = INPUT[inputKey].split('\n')
      const currentPosition = [1, 1]
      let code = ''

      for (const line of inputLines) {
        for (let i = 0; i < line.length; i++) {
          switch (line.charAt(i)) {
            case 'U':
            currentPosition[1] = Math.max(0, currentPosition[1] - 1)
            break

            case 'D':
            currentPosition[1] = Math.min(2, currentPosition[1] + 1)
            break

            case 'L':
            currentPosition[0] = Math.max(0, currentPosition[0] - 1)
            break

            case 'R':
            currentPosition[0] = Math.min(2, currentPosition[0] + 1)
            break

            default:
            break
          }
        }
        code += DOOR_BUTTONS[currentPosition[1]].charAt(currentPosition[0])
      }

      return {
        answer1: code
      }
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The bathroom code is{' '}
      <code>{answer}</code>.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      <code>{answer}</code>
    </span>
  ),
  buttons: BUTTONS,
  day: 2,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Bathroom Security'
}

export default config