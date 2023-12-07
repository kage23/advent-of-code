import inputs from '../../inputs/2018/day12'
import { DayConfig } from '../../routes/Day'

interface IState {
  bottomPot: number
  pots: string
  rules: IRule[]
}

interface IRule { before: string, after: string }

let state: IState = {
  bottomPot: 0,
  pots: '.',
  rules: []
}

const parseInput = (inputKey: string): IState => {
  const inputArr = inputs.get(inputKey)!.split('\n')
  const initialState = (inputArr.shift() || '').slice(15)
  inputArr.shift()
  const rules = inputArr.map(ruleStr => ({
    before: ruleStr.slice(0, 5),
    after: ruleStr.slice(-1)
  }))
  return {
    bottomPot: -2,
    pots: `..${initialState}`,
    rules
  }
}

const advanceGeneration = (inPots: string, bottomPot: number, rules: IRule[]): {
  pots: string,
  bottomPot: number
} => {
  const pots = `..${inPots}..`
  let next = ''

  for (let i = 0; i < pots.length; i++) {
    let checkString = i >= 2
      ? pots.slice(i - 2, i + 3)
      : i === 1
        ? `.${pots.slice(i - 1, i + 3)}`
        : i === 0
          ? `..${pots.slice(i, i + 3)}`
          : ''
    while (checkString.length < 5) checkString += '.'
    const rule = rules.find(aRule => aRule.before === checkString)
    next += rule ? rule.after : '.'
  }
  let nextBottomPot = bottomPot - 2
  const firstFilledPot = next.indexOf('#') + nextBottomPot
  nextBottomPot = firstFilledPot
  next = next.slice(next.indexOf('#'))
  next = next.slice(0, next.lastIndexOf('#') + 2)

  return {
    pots: next,
    bottomPot: nextBottomPot
  }
}

const sum = (pots: string, bottomPot: number): number => (
  pots.split('').reduce((prevSum, currentPot, index) => (
    prevSum
    + (
      currentPot === '#'
        ? (index + bottomPot)
        : 0
    )
  ), 0)
)

const advanceALot = (inPots: string, bottomPot: number, rules: IRule[]): {
  pots: string,
  bottomPot: number
} => {
  const seen = []
  let next = {
    pots: inPots,
    bottomPot
  }

  let g = 0
  const findRecord = (potRecord: {
    bottomPot: number;
    pots: string;
    time: number;
  }) => potRecord.pots === next.pots
  while (g < 50000000000) {
    seen.push({
      bottomPot: next.bottomPot,
      pots: next.pots,
      time: g
    })

    g++
    next = advanceGeneration(next.pots, next.bottomPot, rules)
    const seenBefore = seen.find(findRecord)
    if (seenBefore) {
      const loopLength = g - seenBefore.time
      const bottomPotDiffPerLoop = next.bottomPot - seenBefore.bottomPot
      const remainingTime = 50000000000 - g
      const remainingLoops = remainingTime / loopLength
      next.bottomPot = next.bottomPot + (remainingLoops * bottomPotDiffPerLoop)
      break
    }
  }

  return next
}

export const advance20Generations = (inputKey: string) => {
  state = parseInput(inputKey)

  for (let i = 0; i < 20; i++) {
    const next = advanceGeneration(state.pots, state.bottomPot, state.rules)
    state.pots = next.pots
    state.bottomPot = next.bottomPot
  }
  return {
    answer1: sum(state.pots, state.bottomPot)
  }
}

export const advance50Billion = (inputKey: string) => {
  state = parseInput(inputKey)

  const next = advanceALot(state.pots, state.bottomPot, state.rules)
  state.pots = next.pots
  state.bottomPot = next.bottomPot
  return {
    answer2: sum(state.pots, state.bottomPot)
  }
}

const day12: Omit<DayConfig, 'year'> = {
  answer1Text: 'The sum of all plant-containing pots is answer.',
  answer2Text: 'The sum of all plant-containing pots is answer.',
  buttons: [
    {
      label: 'Advance 20 Generations',
      onClick: advance20Generations
    },
    {
      label: 'Advance Fifty Billion Generations',
      onClick: advance50Billion
    },
  ],
  id: 12,
  inputs,
  title: 'Subterranean Sustainability',
}

export default day12
