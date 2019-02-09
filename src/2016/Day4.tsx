import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'

import INPUT from './Input/Day4'

const isRealRoom = (room: string): boolean => {
  const letterMap: Map<string, number> = new Map()
  const letterArr: Array<{ letter: string, count: number }> = []

  for (let i = 0; i < room.length; i++) {
    const char = room.charAt(i)

    if (char === '[') break

    if (char.match(/[a-z]/i)) {
      letterMap.set(char, (letterMap.get(char) || 0) + 1)
    }
  }

  for (const [letter, count] of letterMap.entries()) letterArr.push({ letter, count })

  const topFiveLetters = letterArr.sort((a, b) => (
    b.count !== a.count
      ? b.count - a.count
      : a.letter > b.letter ? 1 : -1
  )).map(x => x.letter).slice(0, 5)

  const checksum = room.split('[')[1].slice(0, 5).split('')

  return !(checksum.some(letter => topFiveLetters.indexOf(letter) === -1))
}

const BUTTONS: IButton[] = [
  {
    label: 'Sum Real Rooms',
    onClick: inputKey => (
      {
        answer1: INPUT[inputKey].split('\n')
          .filter(room => isRealRoom(room))
          .map(roomLine => {
            const split = roomLine.split('-')
            return parseInt(split[split.length - 1])
          })
          .reduce((sum, id) => sum + id, 0)
          .toString()
      }
    )
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The sum of the sector IDs of the real rooms is{' '}
      <code>{answer}</code>.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      <code>{answer}</code>
    </span>
  ),
  buttons: BUTTONS,
  day: 4,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Security Through Obscurity'
}

export default config