import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'

import INPUT from '../Inputs/2015/Day01'

const BUTTONS: IButton[] = [
  {
    label: 'Follow Instructions',
    onClick: (inputKey: string) => {
      const input = INPUT[inputKey]
      const { length } = input

      let floor = 0
      for (let i = 0; i < length; i++) {
        switch (input.charAt(i)) {
          case '(':
            floor++
            break

          case ')':
            floor--
            break

          default:
            break
        }
      }

      return {
        answer1: floor.toString()
      }
    }
  },
  {
    label: 'Find Basement',
    onClick: (inputKey: string) => {
      const input = INPUT[inputKey]
      const { length } = input

      let floor = 0
      let i = 0
      for (; i < length; i++) {
        switch (input.charAt(i)) {
          case '(':
            floor++
            break

          case ')':
            floor--
            break

          default:
            break
        }
        if (floor <= -1) break
      }

      return {
        answer2: (i + 1).toString()
      }
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The instructions take Santa to Floor <code>{answer}</code>.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      Santa first visits the Basement at Step <code>{answer}</code>.
    </span>
  ),
  buttons: BUTTONS,
  day: 1,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Not Quite Lisp'
}

export default config