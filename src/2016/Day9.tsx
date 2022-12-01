import React from 'react'
import {
  IButton,
  IDayConfig
} from '../Config'

import INPUT from '../Inputs/2016/Day9'

let prevInputKey = ''
let answer1_a = ''

const getDecompressedLength = (input: string): number => {
  let remaining = input
  let length = 0

  while (remaining.length > 0) {
    const character = remaining.charAt(0)
    remaining = remaining.slice(1)

    if (!/\s/.test(character)) {
      if (character === '(') {
        const charsToRepeat = parseInt(remaining)
        const timesToRepeat = parseInt(remaining.split('x')[1])
        const repetitionGroup = remaining.slice(remaining.indexOf(')') + 1).substring(0, charsToRepeat)
        remaining = remaining.slice(remaining.indexOf(')') + 1 + charsToRepeat)
        length += (getDecompressedLength(repetitionGroup) * timesToRepeat)
      } else { length++ }
    }
  }

  return length
}

const BUTTONS: IButton[] = [
  {
    label: 'Decompress Sequence',
    onClick: inputKey => {
      const input = INPUT[inputKey]

      answer1_a = ''

      for (let i = 0; i < input.length; i++) {
        const character = input[i]
        if (!/\s/.test(character)) {
          if (character === '(') {
            const charsToRepeat = parseInt(input.slice(i + 1))
            const timesToRepeat = parseInt(input.slice(i + 1).split('x')[1])
            const inputSlice = input.slice(i + 1)
            i = inputSlice.indexOf(')') + i + charsToRepeat + 1
            const repetitionGroup = inputSlice.slice(inputSlice.indexOf(')') + 1).substring(0, charsToRepeat)
            for (let j = 0; j < timesToRepeat; j++) answer1_a += repetitionGroup
          } else {
            answer1_a += character
          }
        }
      }

      return {
        answer1: answer1_a.length.toString()
      }
    }
  },
  {
    label: 'Get Length of Final Decompression',
    onClick: inputKey => ({
      answer2: getDecompressedLength(INPUT[inputKey]).toString()
    })
  }
]

const renderDay = (dayConfig: IDayConfig, inputKey: string): JSX.Element => {
  if (prevInputKey !== inputKey) {
    prevInputKey = inputKey
    answer1_a = ''
  }

  return (
    <div className="render-box">
      <h3>Input:</h3>
      <pre className="render-box--pre-wrap">{dayConfig.INPUT[inputKey]}</pre>
      {answer1_a.length > 0 && (
        <h3>Decompressed:</h3>
      )}
      {answer1_a.length > 0 && (
        <pre className="render-box--pre-wrap">{answer1_a}</pre>
      )}
    </div>
  )
}

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The decompressed sequence is{' '}
      <code>{answer}</code> characters long.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      The totally decompressed sequence is{' '}
      <code>{answer}</code> characters long.
    </span>
  ),
  buttons: BUTTONS,
  day: 9,
  INPUT,
  renderDay,
  title: 'Explosives in Cyberspace'
}

export default config