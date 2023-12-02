import inputs from '../../inputs/2017/day15'
import { DayConfig } from '../../routes/Day'

const generateNext = (input: number, genKey: 'a' | 'b'): number =>
  (input * (genKey === 'a' ? 16807 : genKey === 'b' ? 48271 : 0)) % 2147483647

const compareGeneratorNumbers = (genA: number, genB: number): boolean => {
  const compareStringA = genA.toString(2).slice(-16)
  const compareStringB = genB.toString(2).slice(-16)
  return compareStringA === compareStringB
}

const generateNextPart2 = (input: number, genKey: 'a' | 'b'): number => {
  let next = generateNext(input, genKey)
  while (
    (genKey === 'a' && next % 4 !== 0) ||
    (genKey === 'b' && next % 8 !== 0)
  )
    next = generateNext(next, genKey)
  return next
}

export const solvePart1 = (inputKey: string) => {
  let genA = parseInt(inputs.get(inputKey)!.split('\n')[0].slice(24))
  let genB = parseInt(inputs.get(inputKey)!.split('\n')[1].slice(24))

  const target = 40000000
  let matchCount = 0
  for (let i = 0; i < target; i++) {
    genA = generateNext(genA, 'a')
    genB = generateNext(genB, 'b')
    if (compareGeneratorNumbers(genA, genB)) matchCount++
  }
  return {
    answer1: matchCount,
  }
}

export const solvePart2 = (inputKey: string) => {
  let genA = parseInt(inputs.get(inputKey)!.split('\n')[0].slice(24))
  let genB = parseInt(inputs.get(inputKey)!.split('\n')[1].slice(24))

  const target = 5000000
  let matchCount = 0
  for (let i = 0; i < target; i++) {
    genA = generateNextPart2(genA, 'a')
    genB = generateNextPart2(genB, 'b')
    if (compareGeneratorNumbers(genA, genB)) {
      matchCount++
    }
  }
  return {
    answer2: matchCount,
  }
}

const day15: Omit<DayConfig, 'year'> = {
  answer1Text:
    'After generating 40,000,000 pairs, the judge found answer that met the criteria.',
  answer2Text:
    'After generating 5,000,000 new pairs, the judge found answer that met the criteria.',
  buttons: [
    {
      label: 'Solve Part 1',
      onClick: solvePart1,
    },
    {
      label: 'Solve Part 2',
      onClick: solvePart2,
    },
  ],
  id: 15,
  inputs,
  title: 'Dueling Generators',
}

export default day15
