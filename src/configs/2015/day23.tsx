import inputs from '../../inputs/2015/day23'
import { DayConfig } from '../../routes/Day'

export const runCode = (registers: { [key: string]: number }, instructions: string[]): { [key: string]: number } => {
  let instructionPointer = 0

  while (instructionPointer < instructions.length) {
    const instruction = instructions[instructionPointer].split(' ')
    const register = instruction[1].slice(0, 1)
    const jumpOffset = instruction[0].startsWith('j') ? parseInt(instruction[instruction.length - 1]) : 1
    const value = registers[register]
    switch (instruction[0]) {
      case 'hlf':
        registers[register] = Math.floor(value / 2)
        instructionPointer += jumpOffset
        break

      case 'tpl':
        registers[register] = Math.floor(value * 3)
        instructionPointer += jumpOffset
        break

      case 'inc':
        registers[register] = value + 1
        instructionPointer += jumpOffset
        break

      case 'jmp':
        instructionPointer += jumpOffset
        break

      case 'jie':
        instructionPointer += (value % 2 === 0 ? jumpOffset : 1)
        break

      case 'jio':
        instructionPointer += (value === 1 ? jumpOffset : 1)
        break
    }
  }

  return registers
}

export const runCodePart1 = (inputKey: string) => {
  const registers: { [key: string]: number } = { a: 0, b: 0 }
  const instructions = inputs.get(inputKey)!.split('\n')
  return {
    answer1: runCode(registers, instructions).b
  }
}

export const runCodePart2 = (inputKey: string) => {
  const registers: { [key: string]: number } = { a: 1, b: 0 }
  const instructions = inputs.get(inputKey)!.split('\n')
  return {
    answer2: runCode(registers, instructions).b
  }
}

const day23: Omit<DayConfig, 'year'> = {
  answer1Text: 'At the end of execution, the value answer is left in register b.',
  answer2Text: 'At the end of execution, the value answer is left in register b.',
  buttons: [
    {
      label: 'Run Code',
      onClick: runCodePart1
    },
    {
      label: 'Run Code with 1 in A',
      onClick: runCodePart2
    }
  ],
  id: 23,
  inputs,
  title: 'Opening the Turing Lock',
}

export default day23
