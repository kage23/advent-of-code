import md5 from 'md5'

import inputs from '../../inputs/2015/day04'
import { DayConfig } from '../../routes/Day'

export const lookForHash = (input: string) => {
  let i = 0
  while (!md5(`${input}${i}`).startsWith('00000')) i++
  return {
    answer1: i,
  }
}

export const lookForBetterHash = (input: string) => {
  let i = 0
  while (!md5(`${input}${i}`).startsWith('000000')) i++
  return {
    answer2: i,
  }
}

const day04: Omit<DayConfig, 'year'> = {
  answer1Text: 'The lowest number that produces a good hash is answer.',
  answer2Text: 'The lowest number that produces a better hash is answer.',
  buttons: [
    {
      label: 'Look for Hash',
      onClick: lookForHash,
    },
    {
      label: 'Look for Better Hash',
      onClick: lookForBetterHash,
    },
  ],
  id: 4,
  inputs,
  title: 'The Ideal Stocking Stuffer',
}

export default day04
