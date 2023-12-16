import inputs from '../../inputs/2016/day09'
import { DayConfig } from '../../routes/Day'

export const decompressSequence = (input: string) => {

  let answer1 = ''

  for (let i = 0; i < input.length; i++) {
    const character = input[i]
    if (!/\s/.test(character)) {
      if (character === '(') {
        const charsToRepeat = parseInt(input.slice(i + 1))
        const timesToRepeat = parseInt(input.slice(i + 1).split('x')[1])
        const inputSlice = input.slice(i + 1)
        i = inputSlice.indexOf(')') + i + charsToRepeat + 1
        const repetitionGroup = inputSlice
          .slice(inputSlice.indexOf(')') + 1)
          .substring(0, charsToRepeat)
        for (let j = 0; j < timesToRepeat; j++) answer1 += repetitionGroup
      } else {
        answer1 += character
      }
    }
  }

  return {
    answer1: answer1.length,
  }
}

export const getDecompressedLength = (input: string) => {
  let remaining = input
  let length = 0

  while (remaining.length > 0) {
    const character = remaining.charAt(0)
    remaining = remaining.slice(1)

    if (!/\s/.test(character)) {
      if (character === '(') {
        const charsToRepeat = parseInt(remaining)
        const timesToRepeat = parseInt(remaining.split('x')[1])
        const repetitionGroup = remaining
          .slice(remaining.indexOf(')') + 1)
          .substring(0, charsToRepeat)
        remaining = remaining.slice(remaining.indexOf(')') + 1 + charsToRepeat)
        length += getDecompressedLength(repetitionGroup).answer2 * timesToRepeat
      } else {
        length++
      }
    }
  }

  return { answer2: length }
}

const day09: Omit<DayConfig, 'year'> = {
  answer1Text: 'The decompressed sequence is answer characters long.',
  answer2Text: 'The totally decompressed sequence is answer characters long.',
  buttons: [
    {
      label: 'Decompress Sequence',
      onClick: decompressSequence,
    },
    {
      label: 'Get Length of Final Decompression',
      onClick: getDecompressedLength,
    },
  ],
  id: 9,
  inputs,
  title: 'Explosives in Cyberspace',
}

export default day09
