import React from 'react'
import {
  IButton,
  IDayConfig
} from '../Config'

import INPUT from './Input/Day23'

import { detectPrime } from '../utils/Various'

interface IInstruction {
  command: string
  x: string
  y: string | number | undefined
}

let prevInputKey = ''
let mulCount = 0

const parseInput = (input: string): IInstruction[] => {
  return input.split('\n').map(line => {
    const [
      command,
      x,
      y
    ] = line.split(' ')

    return {
      command,
      x,
      y: typeof y !== 'undefined'
        ? !isNaN(parseInt(y))
          ? parseInt(y)
          : y
        : undefined
    }
  })
}

class Program {
  currentInstruction: number
  instructions: IInstruction[]
  lastPlayed: number
  registers: { [key: string]: number }
  id?: number

  constructor(part: 1 | 2, id?: number) {
    this.currentInstruction = 0
    this.instructions = []
    this.lastPlayed = NaN
    if (typeof id === 'number') this.id = id
    if (part === 1) this.registers = {
      a: 0,
      b: 0,
      c: 0,
      d: 0,
      e: 0,
      f: 0,
      g: 0,
      h: 0
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
        h: 0
      }
    }
  }

  set = (x: string, y: string | number) => {
    this.registers[x] = typeof y === 'number'
      ? y
      : this.registers[y]
  }

  sub = (x: string, y: string | number) => {
    this.registers[x] -= typeof y === 'number'
      ? y
      : this.registers[y]
  }

  mul = (x: string, y: string | number) => {
    mulCount++
    this.registers[x] *= typeof y === 'number'
      ? y
      : this.registers[y]
  }

  jnz = (inX: string, y: string | number) => {
    const x = isNaN(parseInt(inX)) ? this.registers[inX] : parseInt(inX)
    if (x !== 0) {
      this.currentInstruction += (
        typeof y === 'number'
          ? y
          : this.registers[y]
      ) - 1 // The minus one is to allow us to skip ahead plus one like we do after every other instruction
    }
  }
}

let REGISTERS = new Program(1)

const executeInstruction = (program: Program, command: string, x: string, inY: string | number | undefined) => {
  const y = typeof inY === 'undefined' ? '' : inY
  switch (command) {
    case 'set':
    case 'sub':
    case 'mul':
    case 'jnz':
      program[command](x, y)

    default:
      break
  }
}

const BUTTONS: IButton[] = [
  {
    label: 'Run One Instruction',
    onClick: () => {
      let {
        command,
        x,
        y
      } = REGISTERS.instructions[REGISTERS.currentInstruction]

      console.group(`${REGISTERS.currentInstruction}: ${command} ${x} ${y}`)
      console.log(`Registers before: ${JSON.stringify(REGISTERS.registers)}`)
      executeInstruction(REGISTERS, command, x, y)
      console.log(`Registers after: ${JSON.stringify(REGISTERS.registers)}`)
      console.groupEnd()
      REGISTERS.currentInstruction++

      return {}
    }
  },
  {
    label: 'Run 1000 Instructions',
    onClick: () => {
      let {
        command,
        x,
        y
      } = REGISTERS.instructions[REGISTERS.currentInstruction]

      for (let i = 0; i < 1000; i++) {
        command = REGISTERS.instructions[REGISTERS.currentInstruction].command
        x = REGISTERS.instructions[REGISTERS.currentInstruction].x
        y = REGISTERS.instructions[REGISTERS.currentInstruction].y
        console.group(`${REGISTERS.currentInstruction}: ${command} ${x} ${y}`)
        console.log(`Registers before: ${JSON.stringify(REGISTERS.registers)}`)
        executeInstruction(REGISTERS, command, x, y)
        console.log(`Registers after: ${JSON.stringify(REGISTERS.registers)}`)
        console.groupEnd()
        REGISTERS.currentInstruction++
      }

      return {}
    }
  },
  {
    label: 'Run Program',
    onClick: () => {
      let {
        command,
        x,
        y
      } = REGISTERS.instructions[REGISTERS.currentInstruction]

      while (REGISTERS.instructions[REGISTERS.currentInstruction]) {
        command = REGISTERS.instructions[REGISTERS.currentInstruction].command
        x = REGISTERS.instructions[REGISTERS.currentInstruction].x
        y = REGISTERS.instructions[REGISTERS.currentInstruction].y
        executeInstruction(REGISTERS, command, x, y)
        REGISTERS.currentInstruction++
      }

      return {
        answer1: mulCount.toString()
      }
    }
  },
  {
    label: 'Reset to Part 1',
    onClick: (inputKey) => {
      mulCount = 0
      REGISTERS = new Program(1)
      REGISTERS.instructions = parseInput(INPUT[inputKey])
      return {
        answer1: undefined,
        answer2: undefined
      }
    }
  },
  {
    label: 'Reset to Part 2',
    onClick: (inputKey) => {
      mulCount = 0
      REGISTERS = new Program(2)
      REGISTERS.instructions = parseInput(INPUT[inputKey])
      return {
        answer2: ' '
      }
    }
  },
  {
    label: 'Set a Register',
    onClick: () => {
      REGISTERS.registers[prompt('Which register? (Default a)') || 'a'] = parseInt(prompt('What value?') || '0')
      return {}
    }
  }
]

const renderDay = (dayConfig: IDayConfig, inputKey: string): JSX.Element => {
  if (prevInputKey !== inputKey) {
    prevInputKey = inputKey
    mulCount = 0
    REGISTERS = new Program(1)
    REGISTERS.instructions = parseInput(dayConfig.INPUT[inputKey])
  }

  const registerDisplay: JSX.Element[] = []
  for (let key of Object.keys(REGISTERS.registers)) {
    registerDisplay.push((
      <div key={key}>{key}: {REGISTERS.registers[key]}</div>
    ))
  }

  let nonPrimes = 0
  let primes = 0
  for (let i = 106500; i <= 123500; i += 17) {
    const isPrime = detectPrime(i)
    console.log(`detectPrime ${i}`, isPrime)
    if (isPrime) primes++
    else nonPrimes++
  }
  console.log(`Total primes: ${primes}. Total non-primes: ${nonPrimes}.`)

  return (
    <div className="render-box">
      <div>
        <h3>Input:</h3>
        <div>
          {
            dayConfig.INPUT[inputKey].split('\n').map((line, i) => (
              <div key={i}>{i}: {line}</div>
            ))
          }
        </div>
      </div>
      <div className="render-box--left-margin">
        <h3>Registers:</h3>
        {registerDisplay}
      </div>
      <div className="render-box--left-margin">
        <h3>Next Instruction:</h3>
        {REGISTERS.instructions[REGISTERS.currentInstruction] && (
          <h3>
            {REGISTERS.currentInstruction}:{' '}
            {REGISTERS.instructions[REGISTERS.currentInstruction].command}{' '}
            {REGISTERS.instructions[REGISTERS.currentInstruction].x}{' '}
            {REGISTERS.instructions[REGISTERS.currentInstruction].y}{' '}
          </h3>
        )}
      </div>
    </div>
  )
}

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The <code>mul</code> command was run{' '}
      <code>{answer}</code> times.
    </span>
  ),
  answer2Text: () => (
    <span>
      Solving Part 2 (i.e. optimizing the code and figuring out what it does and what the final value{' '}
      of Register <code>h</code> will be) is left as a challenge to the reader!
    </span>
  ),
  buttons: BUTTONS,
  day: 23,
  INPUT,
  renderDay,
  title: 'Coprocessor Conflagration'
}

export default config