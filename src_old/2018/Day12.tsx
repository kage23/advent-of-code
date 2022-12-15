import {
  IButton,
  IDayConfig
} from '../Config'

import INPUT from '../Inputs/2018/Day12'

let prevInputKey = ''
let generation = 0

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

const parseInput = (input: string): IState => {
  const inputArr = INPUT[input].split('\n')
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

  generation++

  return {
    pots: next,
    bottomPot: nextBottomPot
  }
}

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
    let seenBefore = seen.find(findRecord)
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

const renderDay = (dayConfig: IDayConfig, inputKey: string): JSX.Element => {
  if (inputKey !== prevInputKey) {
    state = parseInput(inputKey)
    generation = 0
  }
  prevInputKey = inputKey

  const {
    bottomPot,
    pots
  } = state

  const spaces = []
  if (bottomPot < 0) {
    for (let i = 0; i > bottomPot; i--) {
      spaces.push(<span key={i}>&nbsp;</span>)
    }
  }

  return (
    <div className="render-box render-box--no-wrap">
      <div style={{ maxWidth: '33%' }}>
        <h3>Input:</h3>
        <pre className="render-box--pre-wrap">{dayConfig.INPUT[inputKey]}</pre>
      </div>
      <div className="render-box--left-margin">
        <h3>Generation {generation}:</h3>
        <fieldset style={{ wordBreak: 'break-word' }}>
          <div>{spaces}v-- Pot {bottomPot < 0 ? '0' : bottomPot}</div>
          <div>{pots}</div>
        </fieldset>
      </div>
    </div>
  )
}

const BUTTONS: IButton[] = [
  {
    label: 'Advance Generation',
    onClick: () => {
      const next = advanceGeneration(state.pots, state.bottomPot, state.rules)
      state.pots = next.pots
      state.bottomPot = next.bottomPot
      return {
        answer1: sum(state.pots, state.bottomPot).toString()
      }
    }
  },
  {
    label: 'Advance Fifty Billion Generations',
    onClick: () => {
      const next = advanceALot(state.pots, state.bottomPot, state.rules)
      state.pots = next.pots
      state.bottomPot = next.bottomPot
      return {
        answer1: sum(state.pots, state.bottomPot).toString()
      }
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The sum of all plant-containing pots is{' '}
      <code>{answer}</code>.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      The sum of all plant-containing pots is{' '}
      <code>{answer}</code>.
    </span>
  ),
  buttons: BUTTONS,
  day: 12,
  INPUT,
  renderDay,
  title: 'Subterranean Sustainability'
}

export default config