import inputs from '../../inputs/2019/day05'
import { DayConfig } from '../../routes/Day'
import intcodeComputer from './Intcode'

const parseInput = (input: string): number[] =>
  input.split(',').map((inputStr) => parseInt(inputStr))

export const runACDiagnostic = (inputRaw: string) => {
  const input = parseInput(inputRaw)

  const { outputs } = intcodeComputer(input, [1])
  const output = outputs.pop()

  return { answer1: output }
}

export const getRadiatorCode = (inputRaw: string) => {
  const input = parseInput(inputRaw)

  const { outputs } = intcodeComputer(input, [5])
  const output = outputs.pop()

  return {
    answer2: output,
  }
}

const day05: Omit<DayConfig, 'year'> = {
  answer1Text: 'The final output code is answer.',
  answer2Text: 'The diagnostic code for system ID 5 is answer.',
  buttons: [
    {
      label: 'Run AC Diagnostic',
      onClick: runACDiagnostic,
    },
    {
      label: 'Get Radiator Code',
      onClick: getRadiatorCode,
    },
  ],
  id: 5,
  inputs,
  title: 'Sunny with a Chance of Asteroids',
}

export default day05
