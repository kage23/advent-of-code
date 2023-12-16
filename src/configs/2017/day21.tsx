import inputs from '../../inputs/2017/day21'
import { DayConfig } from '../../routes/Day'

interface Rule {
  before: string[]
  after: string[]
}

let steps = 0
let patternStr = `.#.
..#
###`

const parseInput = (input: string): Rule[] =>
  input.split('\n').map((line) => {
    const [before, after] = line.split(' => ')
    return {
      before: before.split('/'),
      after: after.split('/'),
    }
  })

const revStr = (input: string): string => input.split('').reverse().join('')

const getFlips = (pattern: string[]): string[][] => {
  const flipX = pattern.map((line) => revStr(line))
  const flipY = pattern.slice().reverse()
  const flipXY = pattern.map((line) => revStr(line)).reverse()

  return [flipX, flipY, flipXY]
}

const rotate = (pattern: string[]): string[] => {
  const result = ['']
  const width = pattern.length
  for (let i = 0; i < width; i++) {
    for (let j = width - 1; j >= 0; j--) {
      if (!result[i]) result[i] = ''
      result[i] += pattern[j].charAt(i)
    }
  }
  return result
}

const getRotations = (pattern: string[]): string[][] => {
  const rotate90 = rotate(pattern)
  const rotate180 = rotate(rotate90)
  const rotate270 = rotate(rotate180)

  return [rotate90, rotate180, rotate270]
}

const getPermutations = (pattern: string[]): string[][] => {
  const flips = getFlips(pattern)
  const rotations = getRotations(pattern)
  const flippedRotations = rotations
    .map((rPattern) => getFlips(rPattern))
    .reduce((patterns, patternArray) => {
      return [...patterns, ...patternArray]
    }, [])

  return [pattern, ...flips, ...rotations, ...flippedRotations]
}

const theyMatch = (patternA: string[], patternB: string[]): boolean => {
  if (patternA.length !== patternB.length) return false
  for (let i = 0; i < patternA.length; i++) {
    if (patternA[i] !== patternB[i]) return false
  }
  return true
}

const checkForRuleMatch = (rule: Rule, pattern: string[]): boolean =>
  getPermutations(pattern).some((permutation) =>
    theyMatch(permutation, rule.before)
  )

const step = (input: string) => {
  steps++
  const rules: Rule[] = parseInput(input)
  const oldPattern: string[] = patternStr.split('\n')
  const mod = oldPattern.length % 2 === 0 ? 2 : 3
  const newWidthInPatterns = oldPattern.length / mod

  const splitPatterns: string[][] = [['']]

  let splitPatternId = -1
  for (let row = 0; row < oldPattern.length; row++) {
    const splitRowId = row % mod
    for (let col = 0; col < oldPattern.length; col++) {
      if (col % mod === 0) {
        if (col === 0) {
          if (row % mod === 0) splitPatternId++
          else {
            splitPatternId = Math.max(
              splitPatternId - (newWidthInPatterns - 1),
              0
            )
          }
        } else splitPatternId++
      }

      if (!splitPatterns[splitPatternId]) splitPatterns[splitPatternId] = ['']
      if (!splitPatterns[splitPatternId][splitRowId])
        splitPatterns[splitPatternId][splitRowId] = ''
      splitPatterns[splitPatternId][splitRowId] += oldPattern[row][col]
    }
  }

  const newPatterns: string[][] = splitPatterns.map((splitPattern) => {
    const matchingRule = rules.find((rule) =>
      checkForRuleMatch(rule, splitPattern)
    )
    if (matchingRule) {
      return matchingRule.after
    }
    return splitPattern
  })

  const newPatternWidth = newPatterns[0].length
  let newPatternId = 0
  let newRowId = 0

  patternStr = ''

  while (
    newPatternId < newPatterns.length &&
    newRowId < newPatterns[0].length
  ) {
    patternStr += newPatterns[newPatternId][newRowId]
    if ((newPatternId + 1) % newWidthInPatterns !== 0) newPatternId++
    else {
      newRowId = (newRowId + 1) % newPatternWidth
      if (newRowId === 0) newPatternId++
      else newPatternId = Math.max(newPatternId - (newWidthInPatterns - 1), 0)
      if (newPatternId < newPatterns.length && newRowId < newPatterns[0].length)
        patternStr += '\n'
    }
  }
}

const runSimulation = (input: string, stepsToTake: number) => {
  steps = 0
  patternStr = `.#.
..#
###`

  let answer1: number | undefined
  let answer2: number | undefined
  while (steps < stepsToTake) {
    step(input)
    if (steps === 5) {
      answer1 = patternStr.split('').filter((x) => x === '#').length
    }
    if (steps === 18) {
      answer2 = patternStr.split('').filter((x) => x === '#').length
    }
  }
  return {
    answer1,
    answer2,
  }
}

export const iterateFiveTimes = (input: string) => runSimulation(input, 5)

export const iterateEighteenTimes = (input: string) => runSimulation(input, 18)

const day21: Omit<DayConfig, 'year'> = {
  answer1Text: 'After 5 iterations, answer pixels are on.',
  answer2Text: 'After 18 iterations, answer pixels are on.',
  buttons: [
    {
      label: 'Iterate Five Times',
      onClick: iterateFiveTimes,
    },
    {
      label: 'Iterate Eighteen Times',
      onClick: iterateEighteenTimes,
    },
  ],
  id: 21,
  inputs,
  title: 'Fractal Art',
}

export default day21
