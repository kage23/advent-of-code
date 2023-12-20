import inputs from '../../inputs/2019/day02'
import { DayConfig } from '../../routes/Day'
import intcodeComputer from './Intcode'

const parseInput = (input: string): number[] =>
  input.split(',').map((inputStr) => parseInt(inputStr))

export const find1202AlarmState = (rawInput: string) => {
  const input = parseInput(rawInput)
  input[1] = 12
  input[2] = 2

  const { program } = intcodeComputer(input)

  return {
    answer1: program[0],
  }
}

export const findCorrectInputs = (rawInput: string) => {
  const target = 19690720
  let noun = 0
  let verb = 0

  nounLoop: for (noun = 0; noun <= 99; noun++) {
    for (verb = 0; verb <= 99; verb++) {
      const input = parseInput(rawInput)
      input[1] = noun
      input[2] = verb
      const { program } = intcodeComputer(input)
      console.log(`noun ${noun} verb ${verb} result ${program[0]}`)
      if (program[0] === target) {
        break nounLoop
      }
    }
  }

  return {
    answer2: noun * 100 + verb,
  }
}

const day02: Omit<DayConfig, 'year'> = {
  answer1Text: 'TThe value at position 0 after the program halts is answer.',
  answer2Text: '`(100 * noun) + verb` is answer.',
  buttons: [
    {
      label: 'Find 1202 Alarm State',
      onClick: find1202AlarmState,
    },
    {
      label: 'Find Correct Inputs',
      onClick: findCorrectInputs,
    },
  ],
  id: 2,
  inputs,
  title: '1202 Program Alarm',
}

export default day02
