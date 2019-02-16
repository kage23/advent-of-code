import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'

import INPUT from './Input/Day6'

const BUTTONS: IButton[] = [
  {
    label: 'Find Error-Corrected Message',
    onClick: (inputKey) => {
      let message = ''
      const letterCountMaps: Map<string, number>[] = []
      const input = INPUT[inputKey]
      input.split('\n').forEach(line => {
        for (let i = 0; i < line.length; i++) {
          if (!letterCountMaps[i]) letterCountMaps[i] = new Map()
          const letter = line[i]
          const letterMap = letterCountMaps[i]
          if (letterMap) {
            const letterCount = letterMap.get(letter) || 0
            letterMap.set(letter, letterCount + 1)
          }
        }
      })

      for (const letterCountMap of letterCountMaps) {
        let highestCount = 0
        let highestLetter = ''
        for (const [letter, count] of letterCountMap.entries()) {
          if (count > highestCount) {
            highestCount = count
            highestLetter = letter
          }
        }
        message += highestLetter
      }

      return {
        answer1: message
      }
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The message is{' '}
      <code>{answer}</code>.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      <code>{answer}</code>
    </span>
  ),
  buttons: BUTTONS,
  day: 6,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Signals and Noise'
}

export default config