import inputs from '../../inputs/2018/day05'
import { DayConfig } from '../../routes/Day'

const reactPolymer = (input: string, filter?: string) => {
  let result = input
    .split('')
    .filter(
      (letter) => !filter || letter.toLowerCase() !== filter.toLowerCase()
    )
    .join('')
  let i = 0
  while (i < result.length) {
    const currentLetter = result[i]
    const nextLetter = result[i + 1]
    if (
      nextLetter &&
      currentLetter !== nextLetter &&
      currentLetter.toLowerCase() === nextLetter.toLowerCase()
    ) {
      result = `${result.slice(0, i)}${result.slice(i + 2)}`
      i = Math.max(0, i - 1)
    } else i++
  }
  return result
}

export const part1 = (input: string) => {
  const result = reactPolymer(input)
  return {
    answer1: result.length,
  }
}

const findPolymerFilter = (input: string) => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let shortestPolymer = ''
  let bestFilter = ''
  for (const letter of alphabet) {
    const result = reactPolymer(input, letter)
    if (bestFilter.length === 0 || result.length < shortestPolymer.length) {
      shortestPolymer = result
      bestFilter = letter
    }
  }
  return shortestPolymer
}

export const part2 = (input: string) => {
  const result = findPolymerFilter(input)
  return {
    answer2: result.length,
  }
}

const day05: Omit<DayConfig, 'year'> = {
  answer1Text: 'The length of the resulting polymer is answer.',
  answer2Text: 'The length of the resulting polymer is answer.',
  buttons: [
    {
      label: 'React Polymer',
      onClick: part1,
    },
    {
      label: 'Find Polymer Filter',
      onClick: part2,
    },
  ],
  id: 5,
  inputs,
  title: 'Alchemical Reduction',
}

export default day05
