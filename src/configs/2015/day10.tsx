import inputs from '../../inputs/2015/day10'
import { DayConfig } from '../../routes/Day'

export const doLookAndSay = (input: string): string => {
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

export const doHowManyLookAndSays = (inputKey: string, count: number) => {
  let input = inputs.get(inputKey)!

  for (let i = 0; i < count; i++) {
    input = doLookAndSay(input)
  }

  return {
    answer1: count === 40 ? input.length : undefined,
    answer2: count === 50 ? input.length : undefined
  }
}

const day10: Omit<DayConfig, 'year'> = {
  answer1Text: 'The length of the final result is answer.',
  answer2Text: 'The length of the final result is answer.',
  buttons: [
    {
      label: 'Do 40 Look-and-Says',
      onClick: (inputKey) => doHowManyLookAndSays(inputKey, 40)
    },
    {
      label: 'Do 50 Look-and-Says',
      onClick: (inputKey) => doHowManyLookAndSays(inputKey, 50)
    },
  ],
  id: 10,
  inputs,
  title: `Elves Look, Elves Say`,
}

export default day10
