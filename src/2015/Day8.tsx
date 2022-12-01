import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'

import INPUT from '../Inputs/2015/Day8'

const convertString = (string: string): string => {
  let result = ''
  for (let i = 1; i < string.length - 1; i++) {
    const char = string.charAt(i)
    if (char === '\\') {
      switch (string.charAt(i + 1)) {
        case '\\':
        case '"':
          result += string.charAt(i + 1)
          i++
          break

        case 'x':
          result += String.fromCodePoint(parseInt(`0x${string.slice(i + 2, i + 4)}`, 16))
          i += 3
          break

        default:
          break
      }
    } else {
      result += char
    }
  }
  return result
}

const encodeString = (string: string): string => {
  let result = '"'

  for (let i = 0; i < string.length; i++) {
    const char = string.charAt(i)
    if (char === '"' || char === '\\') {
      result += `\\${char}`
    } else {
      result += char
    }
  }

  result += '"'

  return result
}

const BUTTONS: IButton[] = [
  {
    label: 'Examine String Conversions',
    onClick: (inputKey) => {
      const input = INPUT[inputKey].split('\n')
      const codeLength = input.reduce((total, current) => total + current.length, 0)
      const stringsLength = input
        .map(str => convertString(str))
        .reduce((total, current) => total + current.length, 0)

      return {
        answer1: (codeLength - stringsLength).toString()
      }
    }
  },
  {
    label: 'Examine String Encodings',
    onClick: (inputKey) => {
      const input = INPUT[inputKey].split('\n')
      const codeLength = input.reduce((total, current) => total + current.length, 0)
      const encodedLength = input
        .map(str => encodeString(str))
        .reduce((total, current) => total + current.length, 0)

      return {
        answer2: (encodedLength - codeLength).toString()
      }
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The difference between the code length and the strings length is <code>{answer}</code>.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      The difference between the code length and the encoded strings length is <code>{answer}</code>.
    </span>
  ),
  buttons: BUTTONS,
  day: 8,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Matchsticks'
}

export default config