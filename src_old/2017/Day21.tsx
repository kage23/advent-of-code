import {
  IButton,
  IDayConfig
} from '../Config'

import INPUT from '../Inputs/2017/Day21'

let prevInputKey = ''
let steps = 0
let patternStr =
  `.#.
..#
###`

interface IRule {
  before: string[]
  after: string[]
}

const revStr = (input: string): string => input.split('').reverse().join('')

const parseInput = (input: string): IRule[] => (
  input.split('\n').map(line => {
    const [before, after] = line.split(' => ')
    return {
      before: before.split('/'),
      after: after.split('/')
    }
  })
)

const checkForRuleMatch = (rule: IRule, pattern: string[]): boolean => (
  getPermutations(pattern).some(permutation => theyMatch(permutation, rule.before))
)

const theyMatch = (patternA: string[], patternB: string[]): boolean => {
  if (patternA.length !== patternB.length) return false
  for (let i = 0; i < patternA.length; i++) {
    if (patternA[i] !== patternB[i]) return false
  }
  return true
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

const getFlips = (pattern: string[]): string[][] => {
  const flipX = pattern.map(line => revStr(line))
  const flipY = pattern.slice().reverse()
  const flipXY = pattern.map(line => revStr(line)).reverse()

  return [
    flipX, flipY, flipXY
  ]
}

const getRotations = (pattern: string[]): string[][] => {
  const rotate90 = rotate(pattern)
  const rotate180 = rotate(rotate90)
  const rotate270 = rotate(rotate180)

  return [
    rotate90, rotate180, rotate270
  ]
}

const getPermutations = (pattern: string[]): string[][] => {
  const flips = getFlips(pattern)
  const rotations = getRotations(pattern)
  const flippedRotations = rotations
    .map(rPattern => getFlips(rPattern))
    .reduce((patterns, patternArray) => {
      return [
        ...patterns,
        ...patternArray
      ]
    }, [])

  return [
    pattern,
    ...flips,
    ...rotations,
    ...flippedRotations
  ]
}

const step = (inputKey: string) => {
  steps++
  const rules: IRule[] = parseInput(INPUT[inputKey])
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
            splitPatternId = Math.max(splitPatternId - (newWidthInPatterns - 1), 0)
          }
        } else splitPatternId++
      }

      if (!splitPatterns[splitPatternId]) splitPatterns[splitPatternId] = ['']
      if (!splitPatterns[splitPatternId][splitRowId]) splitPatterns[splitPatternId][splitRowId] = ''
      splitPatterns[splitPatternId][splitRowId] += oldPattern[row][col]
    }
  }

  const newPatterns: string[][] = splitPatterns.map(splitPattern => {
    const matchingRule = rules.find(rule => checkForRuleMatch(rule, splitPattern))
    if (matchingRule) {
      return matchingRule.after
    }
    return splitPattern
  })

  const newPatternWidth = newPatterns[0].length
  let newPatternId = 0
  let newRowId = 0

  patternStr = ''

  while (newPatternId < newPatterns.length && newRowId < newPatterns[0].length) {
    patternStr += newPatterns[newPatternId][newRowId]
    if ((newPatternId + 1) % newWidthInPatterns !== 0) newPatternId++
    else {
      newRowId = (newRowId + 1) % newPatternWidth
      if (newRowId === 0) newPatternId++
      else newPatternId = Math.max(newPatternId - (newWidthInPatterns - 1), 0)
      if (newPatternId < newPatterns.length && newRowId < newPatterns[0].length) patternStr += '\n'
    }
  }
}

const BUTTONS: IButton[] = [
  {
    label: 'Step',
    onClick: (inputKey) => {
      step(inputKey)
      let answer1: string | undefined
      let answer2: string | undefined
      if (steps === 5) {
        answer1 = patternStr.split('').filter(x => x === '#').length.toString()
      }
      if (steps === 18) {
        answer2 = patternStr.split('').filter(x => x === '#').length.toString()
      }
      if (answer1) return { answer1 }
      else if (answer2) return { answer2 }
      else return {}
    }
  },
  {
    label: 'Step to Eighteen',
    onClick: (inputKey) => {
      let answer1: string | undefined
      let answer2: string | undefined
      while (steps < 18) {
        console.log(`Round ${steps + 1}...`)
        step(inputKey)
        if (steps === 5) {
          answer1 = patternStr.split('').filter(x => x === '#').length.toString()
        }
        if (steps === 18) {
          answer2 = patternStr.split('').filter(x => x === '#').length.toString()
        }
      }
      return {
        answer1, answer2
      }
    }
  }
]

const renderDay = (dayConfig: IDayConfig, inputKey: string): JSX.Element => {
  if (prevInputKey !== inputKey) {
    prevInputKey = inputKey
    steps = 0
    patternStr =
      `.#.
..#
###`
  }

  const onCount = patternStr.split('').filter(x => x === '#').length

  return (
    <div className="render-box render-box--no-wrap">
      <div>
        <h3>Input:</h3>
        <pre>{dayConfig.INPUT[inputKey]}</pre>
      </div>
      <div className="render-box--left-margin">
        <p>Pattern: (Steps: {steps}) (On pixels: {onCount})</p>
        <pre>{steps < 10 ? patternStr : 'The pattern is too big to display!'}</pre>
      </div>
    </div>
  )
}

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      After <code>5</code> iterations,{' '}
      <code>{answer}</code> pixels are on.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      After <code>18</code> iterations,{' '}
      <code>{answer}</code> pixels are on.
    </span>
  ),
  buttons: BUTTONS,
  day: 21,
  INPUT,
  renderDay,
  title: 'Fractal Art'
}

export default config