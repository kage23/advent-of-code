import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'

import INPUT from '../Inputs/2015/Day10'

const doLookAndSay = (input: string): string => {
  let result = ''

  let prevChar = input.charAt(0)
  let charCount = 1
  for (let i = 1; i < input.length + 1; i++) {
    const char = input.charAt(i)
    if (char === prevChar) {
      charCount++
    } else {
      result += `${charCount}${prevChar}`
      charCount = 1
      prevChar = char
    }
  }

  return result
}

const BUTTONS: IButton[] = [
  {
    label: 'Do 40 Look-and-Says',
    onClick: (inputKey) => {
      let input = INPUT[inputKey]

      for (let i = 0; i < 40; i++) {
        input = doLookAndSay(input)
      }

      return {
        answer1: input.length.toString()
      }
    }
  },
  {
    label: 'Do 50 Look-and-Says',
    onClick: (inputKey) => {
      let input = INPUT[inputKey]

      for (let i = 0; i < 50; i++) {
        input = doLookAndSay(input)
      }

      return {
        answer2: input.length.toString()
      }
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The length of the final result is <code>{answer}</code>.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      The length of the final result is <code>{answer}</code>.
    </span>
  ),
  buttons: BUTTONS,
  day: 10,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Elves Look, Elves Say'
}

export default config