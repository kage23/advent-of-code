import inputs from '../../inputs/2015/day08'
import { DayConfig } from '../../routes/Day'

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

export const examineStringConversions = (inputKey: string) => {
  const input = inputs.get(inputKey)!.split('\n')
  const codeLength = input.reduce((total, current) => total + current.length, 0)
  const stringsLength = input
    .map(str => convertString(str))
    .reduce((total, current) => total + current.length, 0)

  return {
    answer1: codeLength - stringsLength
  }
}

export const examineStringEncodings = (inputKey: string) => {
  const input = inputs.get(inputKey)!.split('\n')
  const codeLength = input.reduce((total, current) => total + current.length, 0)
  const encodedLength = input
    .map(str => encodeString(str))
    .reduce((total, current) => total + current.length, 0)

  return {
    answer2: encodedLength - codeLength
  }
}

const day08: Omit<DayConfig, 'year'> = {
  answer1Text: 'The difference between the code length and the strings length is answer.',
  answer2Text: 'The difference between the code length and the encoded strings length is answer.',
  buttons: [
    {
      label: 'Examine String Conversions',
      onClick: examineStringConversions
    },
    {
      label: 'Examine String Encodings',
      onClick: examineStringEncodings
    }
  ],
  id: 8,
  inputs,
  title: `Matchsticks`,
}

export default day08
