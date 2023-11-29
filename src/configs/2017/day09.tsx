import inputs from '../../inputs/2017/day09'
import { DayConfig } from '../../routes/Day'

export const processStream = (inputKey: string) => {
  const input = inputs.get(inputKey)!
  const len = input.length
  let score = 0
  let garbage = 0
  let parentScore = 0
  let inGarbage = false

  for (let i = 0; i < len; i++) {
    switch (input.charAt(i)) {
      case '{':
        if (!inGarbage) {
          parentScore++
          score += parentScore
        }
        if (inGarbage) garbage++
        break

      case '}':
        if (!inGarbage) parentScore--
        if (inGarbage) garbage++
        break

      case '<':
        if (inGarbage) garbage++
        inGarbage = true
        break

      case '>':
        inGarbage = false
        break

      case '!':
        i++
        break

      default:
        if (inGarbage) garbage++
        break
    }
  }

  return {
    answer1: score,
    answer2: garbage,
  }
}

const day09: Omit<DayConfig, 'year'> = {
  answer1Text: 'The total score is answer.',
  answer2Text: 'There was answer uncancelled garbage.',
  buttons: [
    {
      label: 'Process Stream',
      onClick: processStream,
    },
  ],
  id: 9,
  inputs,
  title: 'Stream Processing',
}

export default day09
