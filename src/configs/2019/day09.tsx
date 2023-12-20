import inputs from '../../inputs/2019/day09'
import { DayConfig } from '../../routes/Day'
import intcodeComputer from './Intcode'

const parseInput = (input: string): number[] =>
  input.split(',').map((inputStr) => parseInt(inputStr))

export const runProgramNoInput = (inputRaw: string) => {
  const input = parseInput(inputRaw)

  const results = intcodeComputer(input)

  return {
    answer1: JSON.stringify(results.outputs),
  }
}

export const runTestMode = (inputRaw: string) => {
  const input = parseInput(inputRaw)

  const results = intcodeComputer(input, [1])

  return {
    answer1: JSON.stringify(results.outputs),
  }
}

export const runSensorMode = (inputRaw: string) => {
  const input = parseInput(inputRaw)

  const results = intcodeComputer(input, [2])

  return {
    answer2: JSON.stringify(results.outputs),
  }
}

const day09: Omit<DayConfig, 'year'> = {
  answer1Text: 'The outputs were answer.',
  answer2Text: 'The coordinates of the distress signal are answer.',
  buttons: [
    {
      label: 'Run Program, No Input',
      onClick: runProgramNoInput,
    },
    {
      label: 'Run Test Mode',
      onClick: runTestMode,
    },
    {
      label: 'Run Sensor Mode',
      onClick: runSensorMode,
    },
  ],
  id: 9,
  inputs,
  title: 'Sensor Boost',
}

export default day09
