import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'

import INPUT from './Input/Day21'

const performScramble = (toScramble: string, instruction: string): string => {
  const instructionWords = instruction.split(' ')
  let temp = []
  switch (instructionWords[0]) {
    case 'swap':
      let posA = -1
      let posB = -1
      switch (instructionWords[1]) {
        case 'position':
          posA = parseInt(instructionWords[2])
          posB = parseInt(instructionWords[5])
          break

        case 'letter':
          posA = toScramble.indexOf(instructionWords[2])
          posB = toScramble.indexOf(instructionWords[5])
          break
      }
      const letterA = toScramble.charAt(posA)
      const letterB = toScramble.charAt(posB)
      temp = toScramble.split('')
      temp[posA] = letterB
      temp[posB] = letterA
      return temp.join('')

    case 'rotate':
      let r = -1
      switch (instructionWords[1]) {
        case 'left':
          r = (parseInt(instructionWords[2])) % toScramble.length
          return `${toScramble.slice(r)}${toScramble.slice(0, r)}`

        case 'right':
          r = (parseInt(instructionWords[2])) % toScramble.length
          return `${toScramble.slice(r * -1)}${toScramble.slice(0, r * -1)}`

        case 'based':
          const letterIndex = toScramble.indexOf(instructionWords[6])
          r = (letterIndex + (letterIndex >= 4 ? 2 : 1)) % toScramble.length
          return performScramble(toScramble, `rotate right ${r} steps`)
      }

    case 'reverse':
      const begin = parseInt(instructionWords[2])
      const end = parseInt(instructionWords[4])
      const split = toScramble.split('')
      return [
        ...split.slice(0, begin),
        ...split.slice(begin, end + 1).reverse(),
        ...split.slice(end + 1)
      ].join('')

    case 'move':
      const fromPosX = parseInt(instructionWords[2])
      const toPosY = parseInt(instructionWords[5])
      const letter = toScramble.charAt(fromPosX)
      temp = toScramble.replace(letter, '').split('')
      temp.splice(toPosY, 0, letter)
      return temp.join('')

    default:
      return toScramble
  }
  throw new Error('the default in the switch should prevent this error')
}

const performUnscramble = (toUnscramble: string, instruction: string): string => {
  const instructionWords = instruction.split(' ')
  switch (instructionWords[0]) {
    case 'rotate':
      switch (instructionWords[1]) {
        case 'left':
        case 'right':
          const newDir = instructionWords[1] === 'left' ? 'right' : 'left'
          return performScramble(toUnscramble, `rotate ${newDir} ${instructionWords[2]} steps`)

        case 'based':
          const currentIndex = toUnscramble.indexOf(instructionWords[6])
          let prevIndex = -1
          let r = -1
          for (let i = toUnscramble.length - 1; i >= 0; i--) {
            if ((i + i + (i >= 4 ? 2 : 1)) % toUnscramble.length === currentIndex) {
              prevIndex = i
              r = prevIndex < currentIndex
                ? currentIndex - prevIndex
                : currentIndex - prevIndex + toUnscramble.length
              break
            }
          }
          return performScramble(toUnscramble, `rotate left ${r}`)
      }
      
    case 'move':
      const fromPosX = parseInt(instructionWords[5])
      const toPosY = parseInt(instructionWords[2])
      return performScramble(toUnscramble, `move position ${fromPosX} to position ${toPosY}`)

    default:
      return performScramble(toUnscramble, instruction)
  }
  throw new Error('the default in the switch should prevent this error')
}

const BUTTONS: IButton[] = [
  {
    label: 'Scramble Password',
    onClick: (inputKey: string) => {
      const password = inputKey.startsWith('DEMO') ? 'abcde' : 'abcdefgh'

      return {
        answer1: INPUT[inputKey]
          .split('\n')
          .reduce((toScramble, instruction) => performScramble(toScramble, instruction), password)
      }
    }
  },
  {
    label: 'Unscramble Password',
    onClick: (inputKey: string) => {
      const scramble = inputKey.startsWith('DEMO') ? 'decab' : 'fbgdceah'

      return {
        answer2: INPUT[inputKey]
          .split('\n')
          .reverse()
          .reduce((toScramble, instruction) => performUnscramble(toScramble, instruction), scramble)
      }
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The scrambled password is <code>{answer}</code>.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      The descrambled password is <code>{answer}</code>.
    </span>
  ),
  buttons: BUTTONS,
  day: 21,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Scrambled Letters and Hash'
}

export default config