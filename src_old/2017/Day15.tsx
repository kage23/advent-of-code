import {
  IButton,
  IDayConfig
} from '../Config'

import INPUT from '../Inputs/2017/Day15'

let genA = 0
let genB = 0
let prevInputKey = ''

const generateNext = (input: number, genKey: 'a' | 'b'): number => (
  (input * (genKey === 'a' ? 16807 : genKey === 'b' ? 48271 : 0)) % 2147483647
)

const generateNextPart2 = (input: number, genKey: 'a' | 'b'): number => {
  let next = generateNext(input, genKey)
  while (
    (genKey === 'a' && next % 4 !== 0)
    || (genKey === 'b' && next % 8 !== 0)
  ) next = generateNext(next, genKey)
  return next
}

const compareGeneratorNumbers = (): boolean => {
  const compareStringA = genA.toString(2).slice(-16)
  const compareStringB = genB.toString(2).slice(-16)
  return compareStringA === compareStringB
}

const BUTTONS: IButton[] = [
  {
    label: 'Solve Part 1',
    onClick: () => {
      const target = 40000000
      let matchCount = 0
      for (let i = 0; i < target; i++) {
        if (i % 10000 === 0) console.log(i, matchCount)
        genA = generateNext(genA, 'a')
        genB = generateNext(genB, 'b')
        if (compareGeneratorNumbers()) matchCount++
      }
      return {
        answer1: matchCount.toString()
      }
    }
  },
  {
    label: 'Solve Part 2',
    onClick: () => {
      const target = 5000000
      let matchCount = 0
      for (let i = 0; i < target; i++) {
        if (i % 10000 === 0) console.log(i, matchCount)
        genA = generateNextPart2(genA, 'a')
        genB = generateNextPart2(genB, 'b')
        if (compareGeneratorNumbers()) {
          matchCount++
          console.log(i, matchCount)
        }
      }
      return {
        answer1: matchCount.toString()
      }
    }
  }
]

const renderDay = (dayConfig: IDayConfig, inputKey: string): JSX.Element => {
  if (prevInputKey !== inputKey) {
    genA = parseInt(dayConfig.INPUT[inputKey].split('\n')[0].slice(24))
    genB = parseInt(dayConfig.INPUT[inputKey].split('\n')[1].slice(24))
    prevInputKey = inputKey
  }

  return (
    <div className="render-box">
      <h3>Generator A: {genA}</h3>
      <h3>Generator B: {genB}</h3>
    </div>
  )
}

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      After generating <code>40,000,000</code> pairs, the judge found{' '}
      <code>{answer}</code> that met the criteria.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      <code>{answer}</code>
    </span>
  ),
  buttons: BUTTONS,
  day: 15,
  INPUT,
  renderDay,
  title: 'Dueling Generators'
}

export default config