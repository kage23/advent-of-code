import {
  IButton,
  IDayConfig
} from '../Config'

import INPUT from '../Inputs/2019/Day16'
import { lcmTwoNumbers } from '../utils/Various'

const basePattern = [0, 1, 0, -1]
let phases = 0
let output = ''

const generateOneDigitOfNewOutput = (index: number, inputKey: string): number => {
  console.log(`Phase ${phases}. Generating digit ${index} of output...`)
  const lcm = lcmTwoNumbers(basePattern.length * (index + 1), INPUT[inputKey].length)
  const repetitions = Math.ceil((INPUT[inputKey].length) / lcm)
  let oneRepetition = 0
  const loopLength = Math.min(lcm, output.length)
  for (let i = 0; i < loopLength; i++) {
    const left = parseInt(output[i])
    const right = getNumberFromPattern(i, index + 1)
    oneRepetition += left * right
  }
  return Math.abs((oneRepetition * repetitions) % 10)
}

const getNumberFromPattern = (requestedIndex: number, patternMultiplier: number): number => {
  const indexToGet = Math.floor((requestedIndex + 1) / patternMultiplier)
  return basePattern[indexToGet % basePattern.length]
}

const renderDay = (dayConfig: IDayConfig, inputKey: string) => {
  return (
    <div>
      <h3>Input: {dayConfig.INPUT[inputKey]}</h3>
      <h3>Phases: {phases}</h3>
      {output.length <= 1000 && <h3>Output: {output}</h3>}
      {output.length > 1000 && (
        <h3>
          Output is super long so here's the first 100 digits{' '}
          (Note: This is dumb for Part 2, but whatever.):{' '}
          {output.substr(0, 100)}</h3>
      )}
    </div>
  )
}

const runOnePhase = (inputKey: string) => {
  phases++
  output = output.split('').map(x => parseInt(x))
    .map((x, index) => generateOneDigitOfNewOutput(index, inputKey))
    .join('')
}

const runOnePhasePartTwo = () => {
  phases++
  console.log(`Running phase ${phases}...`)
  const newOutputReversedUnmodded: number[] = []
  output.split('').map(x => parseInt(x)).reverse()
    .forEach((value, negativeIndex) => {
      if (negativeIndex < output.length / 2) {
        const runningTotal = newOutputReversedUnmodded[newOutputReversedUnmodded.length - 1] || 0
        newOutputReversedUnmodded.push(value + runningTotal)
      } else {
        // Whatever, I don't need this part
        newOutputReversedUnmodded.push(NaN)
      }
    })
  output = newOutputReversedUnmodded
    .reverse()
    .map(x => isNaN(x) ? '*' : (x % 10).toString())
    .join('')
}

const BUTTONS: IButton[] = [
  {
    label: 'Reset',
    onClick: (inputKey: string) => {
      phases = 0
      output = INPUT[inputKey]
      return {}
    }
  },
  {
    label: 'Run One Phase',
    onClick: (inputKey: string) => {
      runOnePhase(inputKey)
      return {}
    }
  },
  {
    label: 'Run Up to 100 Phases',
    onClick: (inputKey: string) => {
      while (phases < 100) runOnePhase(inputKey)
      return {
        answer1: output.slice(0, 8)
      }
    }
  },
  {
    label: 'Reset for Part 2',
    onClick: (inputKey: string) => {
      phases = 0
      output = ''
      for (let i = 0; i < 10000; i++) output += INPUT[inputKey]
      return {}
    }
  },
  {
    label: 'Run One Phase, Part 2',
    onClick: () => {
      runOnePhasePartTwo()
      return {}
    }
  },
  {
    label: 'Run Up to One Hundred Phases, Part 2',
    onClick: (inputKey: string) => {
      const offset = parseInt(INPUT[inputKey].slice(0, 7))
      while (phases < 100) runOnePhasePartTwo()
      return {
        answer2: output.slice(offset, offset + 8)
      }
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The first 8 digits of the result after 100 phases are{' '}
      <code>{answer}</code>.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      The eight-digit message embedded in the final output list is{' '}
      <code>{answer}</code>.
    </span>
  ),
  buttons: BUTTONS,
  day: 16,
  INPUT,
  renderDay: (dayConfig, inputKey) => renderDay(dayConfig, inputKey),
  title: 'Flawed Frequency Transmission'
}

export default config
