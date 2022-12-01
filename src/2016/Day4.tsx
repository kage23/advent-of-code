import React from 'react'
import {
  IButton,
  IDayConfig
} from '../Config'

import INPUT from '../Inputs/2016/Day4'

let answer2_a = ''
let prevInputKey = ''

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
  },
  {
    label: 'Print Decrypted Room Names',
    onClick: inputKey => {
      INPUT[inputKey].split('\n')
        .filter(room => isRealRoom(room))
        .forEach(roomLine => {
          const split = roomLine.split('-')
          const rotate = parseInt(split[split.length - 1])
          let result = ''

          const alphabet = 'abcdefghijklmnopqrstuvwxyz'
          for (let i = 0; i < roomLine.length; i++) {
            const char = roomLine.charAt(i)

            if (alphabet.indexOf(char) !== -1) {
              result += alphabet[(alphabet.indexOf(char) + rotate) % alphabet.length]
            } else if (char === '-') {
              result += ' '
            } else if (!isNaN(parseInt(char))) break
          }

          answer2_a += `${rotate}: ${result}\n`
        })

      return {
        answer2: ''
      }
    }
  }
]

const renderDay = (dayConfig: IDayConfig, inputKey: string): JSX.Element => {
  if (inputKey !== prevInputKey) {
    prevInputKey = inputKey
    answer2_a = ''
  }

  return (
    <div className="render-box render-box--no-wrap">
      <div>
        <h3>Input:</h3>
        <pre>{dayConfig.INPUT[inputKey]}</pre>
      </div>
      {answer2_a.length > 0 && (
        <div className="render-box--left-margin">
          <h3>Decrypted Room Names:</h3>
          <pre>{answer2_a}</pre>
        </div>
      )}
    </div>
  )
}

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The sum of the sector IDs of the real rooms is{' '}
      <code>{answer}</code>.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      Hopefully you can find the answer below!
    </span>
  ),
  buttons: BUTTONS,
  day: 4,
  INPUT,
  renderDay,
  title: 'Security Through Obscurity'
}

export default config