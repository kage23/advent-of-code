import inputs from '../../inputs/2016/day21'
import { DayConfig } from '../../routes/Day'

const performScramble = (toScramble: string, instruction: string): string => {
  const instructionWords = instruction.split(' ')
  let temp = []
  switch (instructionWords[0]) {
    case 'swap': {
      let posA = -1
      let posB = -1
      switch (instructionWords[1]) {
        case 'position': {
          posA = parseInt(instructionWords[2])
          posB = parseInt(instructionWords[5])
          break
        }
        case 'letter': {
          posA = toScramble.indexOf(instructionWords[2])
          posB = toScramble.indexOf(instructionWords[5])
          break
        }
      }
      const letterA = toScramble.charAt(posA)
      const letterB = toScramble.charAt(posB)
      temp = toScramble.split('')
      temp[posA] = letterB
      temp[posB] = letterA
      return temp.join('')
    }
    case 'rotate': {
      let r = -1
      switch (instructionWords[1]) {
        case 'left': {
          r = parseInt(instructionWords[2]) % toScramble.length
          return `${toScramble.slice(r)}${toScramble.slice(0, r)}`
        }
        case 'right': {
          r = parseInt(instructionWords[2]) % toScramble.length
          return `${toScramble.slice(r * -1)}${toScramble.slice(0, r * -1)}`
        }
        case 'based': {
          const letterIndex = toScramble.indexOf(instructionWords[6])
          r = (letterIndex + (letterIndex >= 4 ? 2 : 1)) % toScramble.length
          return performScramble(toScramble, `rotate right ${r} steps`)
        }
      }
      break
    }
    case 'reverse': {
      const begin = parseInt(instructionWords[2])
      const end = parseInt(instructionWords[4])
      const split = toScramble.split('')
      return [
        ...split.slice(0, begin),
        ...split.slice(begin, end + 1).reverse(),
        ...split.slice(end + 1),
      ].join('')
    }

    case 'move': {
      const fromPosX = parseInt(instructionWords[2])
      const toPosY = parseInt(instructionWords[5])
      const letter = toScramble.charAt(fromPosX)
      temp = toScramble.replace(letter, '').split('')
      temp.splice(toPosY, 0, letter)
      return temp.join('')
    }

    default: {
      return toScramble
    }
  }
  return ''
}

const performUnscramble = (
  toUnscramble: string,
  instruction: string
): string => {
  const instructionWords = instruction.split(' ')
  switch (instructionWords[0]) {
    case 'rotate': {
      switch (instructionWords[1]) {
        case 'left':
        case 'right': {
          const newDir = instructionWords[1] === 'left' ? 'right' : 'left'
          return performScramble(
            toUnscramble,
            `rotate ${newDir} ${instructionWords[2]} steps`
          )
        }
        case 'based': {
          const currentIndex = toUnscramble.indexOf(instructionWords[6])
          let prevIndex = -1
          let r = -1
          for (let i = toUnscramble.length - 1; i >= 0; i--) {
            if (
              (i + i + (i >= 4 ? 2 : 1)) % toUnscramble.length ===
              currentIndex
            ) {
              prevIndex = i
              r =
                prevIndex < currentIndex
                  ? currentIndex - prevIndex
                  : currentIndex - prevIndex + toUnscramble.length
              break
            }
          }
          return performScramble(toUnscramble, `rotate left ${r}`)
        }
      }
      break
    }
    case 'move': {
      const fromPosX = parseInt(instructionWords[5])
      const toPosY = parseInt(instructionWords[2])
      return performScramble(
        toUnscramble,
        `move position ${fromPosX} to position ${toPosY}`
      )
    }
    default: {
      return performScramble(toUnscramble, instruction)
    }
  }
  return ''
}

export const scramblePassword = (inputKey: string) => {
  const password = inputKey.startsWith('DEMO') ? 'abcde' : 'abcdefgh'

  return {
    answer1: inputs
      .get(inputKey)!
      .split('\n')
      .reduce(
        (toScramble, instruction) => performScramble(toScramble, instruction),
        password
      ),
  }
}

export const unscramblePassword = (inputKey: string) => {
  const scramble = inputKey.startsWith('DEMO') ? 'decab' : 'fbgdceah'

  return {
    answer2: inputs
      .get(inputKey)!
      .split('\n')
      .reverse()
      .reduce(
        (toScramble, instruction) => performUnscramble(toScramble, instruction),
        scramble
      ),
  }
}

const day21: Omit<DayConfig, 'year'> = {
  answer1Text: 'The scrambled password is answer.',
  answer2Text: 'The descrambled password is answer.',
  buttons: [
    {
      label: 'Scramble Password',
      onClick: scramblePassword,
    },
    {
      label: 'Unscramble Password',
      onClick: unscramblePassword,
    },
  ],
  id: 21,
  inputs,
  title: 'Scrambled Letters and Hash',
}

export default day21
