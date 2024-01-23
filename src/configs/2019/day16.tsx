import inputs from '../../inputs/2019/day16'
import { DayConfig } from '../../routes/Day'
import { lcmTwoNumbers } from '../../utils/Math'

const basePattern = [0, 1, 0, -1]
let phases = 0
let output = ''

export const reset = (input: string) => {
  phases = 0
  output = input
}

const getNumberFromPattern = (
  requestedIndex: number,
  patternMultiplier: number
): number => {
  const indexToGet = Math.floor((requestedIndex + 1) / patternMultiplier)
  return basePattern[indexToGet % basePattern.length]
}

const generateOneDigitOfNewOutput = (index: number, input: string): number => {
  // console.log(`Phase ${phases}. Generating digit ${index} of output...`)
  const lcm = lcmTwoNumbers(basePattern.length * (index + 1), input.length)
  const repetitions = Math.ceil(input.length / lcm)
  let oneRepetition = 0
  const loopLength = Math.min(lcm, output.length)
  for (let i = 0; i < loopLength; i++) {
    const left = parseInt(output[i])
    const right = getNumberFromPattern(i, index + 1)
    oneRepetition += left * right
  }
  return Math.abs((oneRepetition * repetitions) % 10)
}

const runOnePhase = (input: string) => {
  phases++
  output = output
    .split('')
    .map((x) => parseInt(x))
    .map((x, index) => generateOneDigitOfNewOutput(index, input))
    .join('')
}

export const run100Phases = (input: string) => {
  while (phases < 100) runOnePhase(input)
  return {
    answer1: output.slice(0, 8),
  }
}

export const resetForPart2 = (input: string) => {
  phases = 0
  output = ''
  for (let i = 0; i < 10000; i++) output += input
}

const runOnePhasePartTwo = () => {
  phases++
  // console.log(`Running phase ${phases}...`)
  const newOutputReversedUnmodded: number[] = []
  output
    .split('')
    .map((x) => parseInt(x))
    .reverse()
    .forEach((value, negativeIndex) => {
      if (negativeIndex < output.length / 2) {
        const runningTotal =
          newOutputReversedUnmodded[newOutputReversedUnmodded.length - 1] || 0
        newOutputReversedUnmodded.push(value + runningTotal)
      } else {
        // Whatever, I don't need this part
        newOutputReversedUnmodded.push(NaN)
      }
    })
  output = newOutputReversedUnmodded
    .reverse()
    .map((x) => (isNaN(x) ? '*' : (x % 10).toString()))
    .join('')
}

export const run100PhasesPart2 = (input: string) => {
  const offset = parseInt(input.slice(0, 7))
  while (phases < 100) runOnePhasePartTwo()
  return {
    answer2: output.slice(offset, offset + 8),
  }
}

const day16: Omit<DayConfig, 'year'> = {
  answer1Text: 'The first 8 digits of the result after 100 phases are answer.',
  answer2Text:
    'The eight-digit message embedded in the final output list is answer.',
  buttons: [
    {
      label: 'Reset',
      onClick: reset,
    },
    {
      label: 'Run One Phase',
      onClick: runOnePhase,
    },
    {
      label: 'Run Up to 100 Phases',
      onClick: run100Phases,
    },
    {
      label: 'Reset for Part 2',
      onClick: resetForPart2,
    },
    {
      label: 'Run One Phase, Part 2',
      onClick: runOnePhasePartTwo,
    },
    {
      label: 'Run Up to One Hundred Phases, Part 2',
      onClick: run100PhasesPart2,
    },
  ],
  id: 16,
  inputs,
  title: 'Flawed Frequency Transmission',
}

export default day16
