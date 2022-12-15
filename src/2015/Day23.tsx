import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'

import INPUT from '../Inputs/2015/Day23'

const runCode = (registers: { [key: string]: number }, instructions: string[]): { [key: string]: number } => {
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

const BUTTONS: IButton[] = [
  {
    label: 'Run Code',
    onClick: (inputKey) => {
      const registers: { [key: string]: number } = { a: 0, b: 0 }
      const instructions = INPUT[inputKey].split('\n')
      return {
        answer1: runCode(registers, instructions).b.toString()
      }
    }
  },
  {
    label: 'Run Code with 1 in A',
    onClick: (inputKey) => {
      const registers: { [key: string]: number } = { a: 1, b: 0 }
      const instructions = INPUT[inputKey].split('\n')
      return {
        answer2: runCode(registers, instructions).b.toString()
      }
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      At the end of execution, the value <code>{answer}</code> is left in register <code>b</code>.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      At the end of execution, the value <code>{answer}</code> is left in register <code>b</code>.
    </span>
  ),
  buttons: BUTTONS,
  day: 23,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Opening the Turing Lock'
}

export default config