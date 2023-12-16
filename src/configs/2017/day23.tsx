import inputs from '../../inputs/2017/day23'
import { DayConfig } from '../../routes/Day'

interface Instruction {
  command: string
  x: string
  y: string | number | undefined
}

let mulCount = 0

class Program {
  currentInstruction: number
  instructions: Instruction[]
  lastPlayed: number
  registers: { [key: string]: number }
  id?: number

  constructor(part: 1 | 2, id?: number) {
    this.currentInstruction = 0
    this.instructions = []
    this.lastPlayed = NaN
    if (typeof id === 'number') this.id = id
    if (part === 1)
      this.registers = {
        a: 0,
        b: 0,
        c: 0,
        d: 0,
        e: 0,
        f: 0,
        g: 0,
        h: 0,
      }
    else {
      this.registers = {
        a: 1,
        b: 0,
        c: 0,
        d: 0,
        e: 0,
        f: 0,
        g: 0,
        h: 0,
      }
    }
  }

  set = (x: string, y: string | number) => {
    this.registers[x] = typeof y === 'number' ? y : this.registers[y]
  }

  sub = (x: string, y: string | number) => {
    this.registers[x] -= typeof y === 'number' ? y : this.registers[y]
  }

  mul = (x: string, y: string | number) => {
    mulCount++
    this.registers[x] *= typeof y === 'number' ? y : this.registers[y]
  }

  jnz = (inX: string, y: string | number) => {
    const x = isNaN(parseInt(inX)) ? this.registers[inX] : parseInt(inX)
    if (x !== 0) {
      this.currentInstruction +=
        (typeof y === 'number' ? y : this.registers[y]) - 1 // The minus one is to allow us to skip ahead plus one like we do after every other instruction
    }
  }
}

let REGISTERS = new Program(1)

const parseInput = (input: string): Instruction[] => {
  return input.split('\n').map((line) => {
    const [command, x, y] = line.split(' ')

    return {
      command,
      x,
      y:
        typeof y !== 'undefined'
          ? !isNaN(parseInt(y))
            ? parseInt(y)
            : y
          : undefined,
    }
  })
}

const executeInstruction = (
  program: Program,
  command: string,
  x: string,
  inY: string | number | undefined
) => {
  const y = typeof inY === 'undefined' ? '' : inY
  switch (command) {
    case 'set':
    case 'sub':
    case 'mul':
    case 'jnz':
      program[command](x, y)
      break

    default:
      break
  }
}

export const runProgram = (input: string) => {
  mulCount = 0
  REGISTERS = new Program(1)
  REGISTERS.instructions = parseInput(input)

  let { command, x, y } = REGISTERS.instructions[REGISTERS.currentInstruction]

  while (REGISTERS.instructions[REGISTERS.currentInstruction]) {
    command = REGISTERS.instructions[REGISTERS.currentInstruction].command
    x = REGISTERS.instructions[REGISTERS.currentInstruction].x
    y = REGISTERS.instructions[REGISTERS.currentInstruction].y
    executeInstruction(REGISTERS, command, x, y)
    REGISTERS.currentInstruction++
  }

  return {
    answer1: mulCount,
  }
}

export const solvePart2 = () => ({ answer2: '' })

const day23: Omit<DayConfig, 'year'> = {
  answer1Text: 'The mul command was run answer times.',
  answer2Text:
    'Solving Part 2 (i.e. optimizing the code and figuring out what it does and what the final value of Register h will be) is left as a challenge to the reader!',
  buttons: [
    {
      label: 'Run Program',
      onClick: runProgram,
    },
    {
      label: 'Solve Part Two',
      onClick: solvePart2,
    },
  ],
  id: 23,
  inputs,
  title: 'Coprocessor Conflagration',
}

export default day23
