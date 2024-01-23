import inputs from '../../inputs/2017/day18'
import { DayConfig } from '../../routes/Day'

interface Instruction {
  command: string
  x: string
  y: string | number | undefined
}

const rcvqs: number[][] = [[], []]

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
    if (part === 1) this.registers = {}
    else {
      this.registers = {
        p: id || 0,
      }
    }
  }

  snd = (inX: string, part: number) => {
    const x = isNaN(parseInt(inX)) ? this.registers[inX] : parseInt(inX)
    if (part === 1) this.lastPlayed = x
    if (part === 2) {
      const sendTo = ((this.id || 0) + 1) % 2
      rcvqs[sendTo].push(x)
    }
  }

  set = (x: string, y: string | number) => {
    this.registers[x] = typeof y === 'number' ? y : this.registers[y]
  }

  add = (x: string, y: string | number) => {
    this.registers[x] += typeof y === 'number' ? y : this.registers[y]
  }

  mul = (x: string, y: string | number) => {
    this.registers[x] *= typeof y === 'number' ? y : this.registers[y]
  }

  mod = (x: string, y: string | number) => {
    this.registers[x] %= typeof y === 'number' ? y : this.registers[y]
  }

  rcv = (x: string, part: number): number | void => {
    if (part === 1 && this.registers[x] !== 0) return this.lastPlayed
    if (part === 2) {
      const rcvdValue = rcvqs[this.id || 0].shift()
      if (typeof rcvdValue === 'number') {
        this.registers[x] = rcvdValue
      }
      return rcvdValue
    }
  }

  jgz = (inX: string, y: string | number) => {
    const x = isNaN(parseInt(inX)) ? this.registers[inX] : parseInt(inX)
    if (x > 0) {
      this.currentInstruction +=
        (typeof y === 'number' ? y : this.registers[y]) - 1 // The minus one is to allow us to skip ahead plus one like we do after every other instruction
    }
  }
}

let SOUND_PLAYER = new Program(1)

const executeInstruction = (
  part: number,
  program: Program,
  command: string,
  x: string,
  inY: string | number | undefined
): number | boolean | void => {
  if (!SOUND_PLAYER.registers[x]) SOUND_PLAYER.registers[x] = 0
  const y = typeof inY === 'undefined' ? '' : inY
  switch (command) {
    case 'set':
    case 'add':
    case 'mul':
    case 'mod':
    case 'jgz':
      return program[command](x, y)

    case 'rcv':
    case 'snd':
      return program[command](x, part)

    default:
      break
  }
}

export const findFrequencyPart1 = (input: string) => {
  SOUND_PLAYER = new Program(1)
  SOUND_PLAYER.instructions = parseInput(input)

  let { command, x, y } =
    SOUND_PLAYER.instructions[SOUND_PLAYER.currentInstruction]
  let result = executeInstruction(1, SOUND_PLAYER, command, x, y)
  SOUND_PLAYER.currentInstruction++

  while (!result) {
    command = SOUND_PLAYER.instructions[SOUND_PLAYER.currentInstruction].command
    x = SOUND_PLAYER.instructions[SOUND_PLAYER.currentInstruction].x
    y = SOUND_PLAYER.instructions[SOUND_PLAYER.currentInstruction].y
    result = executeInstruction(1, SOUND_PLAYER, command, x, y)
    SOUND_PLAYER.currentInstruction++
  }

  return {
    answer1: result as number,
  }
}

export const runBothPrograms = (input: string) => {
  let program1Send = 0
  const program0 = new Program(2, 0)
  program0.instructions = parseInput(input)
  const program1 = new Program(2, 1)
  program1.instructions = parseInput(input)
  let result0: number | boolean | void = false
  let result1: number | boolean | void = false

  while (!result0 || !result1) {
    const instruction0 = program0.instructions[program0.currentInstruction]
    const instruction1 = program1.instructions[program1.currentInstruction]
    result0 = executeInstruction(
      2,
      program0,
      instruction0.command,
      instruction0.x,
      instruction0.y
    )
    result1 = executeInstruction(
      2,
      program1,
      instruction1.command,
      instruction1.x,
      instruction1.y
    )
    if (instruction1.command === 'snd') program1Send++
    if (instruction0.command === 'rcv') {
      if (typeof result0 === 'number') {
        program0.currentInstruction++
        result0 = undefined
      } else result0 = true
    } else program0.currentInstruction++
    if (instruction1.command === 'rcv') {
      if (typeof result1 === 'number') {
        program1.currentInstruction++
        result1 = undefined
      } else result1 = true
    } else program1.currentInstruction++
    if (!program0.instructions[program0.currentInstruction]) result0 = true
    if (!program1.instructions[program1.currentInstruction]) result1 = true
  }

  return {
    answer2: program1Send,
  }
}

const day18: Omit<DayConfig, 'year'> = {
  answer1Text: 'The first recovered (non-zero) frequency is answer.',
  answer2Text: 'Program 1 sent a value answer times.',
  buttons: [
    {
      label: 'Find Frequency (Part 1)',
      onClick: findFrequencyPart1,
    },
    {
      label: 'Run Both Programs (Part 2)',
      onClick: runBothPrograms,
    },
  ],
  id: 18,
  inputs,
  title: 'Spinlock',
}

export default day18
