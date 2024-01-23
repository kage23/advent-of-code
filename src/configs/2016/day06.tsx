import inputs from '../../inputs/2016/day06'
import { DayConfig } from '../../routes/Day'

const countLettersInMessage = (input: string) => {
  const letterCountMaps: Map<string, number>[] = []
  input.split('\n').forEach((line) => {
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
  return letterCountMaps
}

export const findHighestCountMessage = (input: string) => {
  let message = ''

  const letterCountMaps = countLettersInMessage(input)
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
    answer1: message,
  }
}

export const findLowestCountMessage = (input: string) => {
  let message = ''

  const letterCountMaps = countLettersInMessage(input)
  for (const letterCountMap of letterCountMaps) {
    let lowestCount = Number.MAX_SAFE_INTEGER
    let lowestLetter = ''
    for (const [letter, count] of letterCountMap.entries()) {
      if (count < lowestCount) {
        lowestCount = count
        lowestLetter = letter
      }
    }
    message += lowestLetter
  }

  return {
    answer2: message,
  }
}

const day06: Omit<DayConfig, 'year'> = {
  answer1Text: 'The message is answer.',
  answer2Text: 'The real message is answer.',
  buttons: [
    {
      label: 'Find Highest-Count Message',
      onClick: findHighestCountMessage,
    },
    {
      label: 'Find Lowest-Count Message',
      onClick: findLowestCountMessage,
    },
  ],
  id: 6,
  inputs,
  title: 'Signals and Noise',
}

export default day06
