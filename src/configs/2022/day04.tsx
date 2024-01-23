import inputs from '../../inputs/2022/day04'
import { DayConfig } from '../../routes/Day'

const isPairRedundant = (pair: string) => {
  const [a, b] = pair.split(',')
  const [a1, a2] = a.split('-').map(x => Number(x))
  const [b1, b2] = b.split('-').map(x => Number(x))
  return (a1 <= b1 && a2 >= b2) || (b1 <= a1 && b2 >= a2)
}

export const findRedundantPairs = (input: string) => ({
  answer1: input.split('\n').filter(isPairRedundant).length
})

const doesPairOverlap = (pair: string) => {
  const [a, b] = pair.split(',')
  const [a1, a2] = a.split('-').map(x => Number(x))
  const [b1, b2] = b.split('-').map(x => Number(x))
  return (
    (a1 >= b1 && a1 <= b2) || (a2 >= b1 && a2 <= b2) ||
    (b1 >= a1 && b1 <= a2) || (b2 >= a1 && b2 <= a2)
  )
}

export const findOverlappingPairs = (input: string) => ({
  answer2: input.split('\n').filter(doesPairOverlap).length
})

const day04: Omit<DayConfig, 'year'> = {
  answer1Text: 'There are answer fully redundant pairs.',
  answer2Text: 'There are answer overlapping pairs.',
  buttons: [
    {
      label: 'Find Redundant Pairs',
      onClick: findRedundantPairs
    },
    {
      label: 'Find Overlapping Pairs',
      onClick: findOverlappingPairs
    },
  ],
  id: 4,
  inputs,
  title: 'Camp Cleanup',
}

export default day04
