import React from 'react'
import {
  IButton,
  IDayConfig
} from '../Config'

import INPUT from './Input/Day23'

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
  registers: { [key:string]: number }
  id?: number

  constructor(part: 1 | 2, id?: number) {
    this.currentInstruction = 0
    this.instructions = []
    this.lastPlayed = NaN
    if (typeof id === 'number') this.id = id
    if (part === 1) this.registers = {}
    else {
      this.registers = {
        p: id || 0
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
  if (!REGISTERS.registers[x]) REGISTERS.registers[x] = 0
  const y = typeof inY === 'undefined' ? '' : inY
  switch (command) {
    case 'set':
    case 'sub':
    case 'mul':
    case 'jnz':
    return program[command](x, y)

    default:
    break
  }
}

const BUTTONS: IButton[] = [
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

  return (
    <div className="render-box">
      <div>
        <h3>Input:</h3>
        <pre>{dayConfig.INPUT[inputKey]}</pre>
      </div>
      <div className="render-box--left-margin">
        <h3>Registers (Part 1):</h3>
        {registerDisplay}
      </div>
      <div className="render-box--left-margin">
        <h3>Next Instruction (Part 1):</h3>
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
  answer2Text: (answer) => (
    <span>
      <code>{answer}</code>
    </span>
  ),
  buttons: BUTTONS,
  day: 23,
  INPUT,
  renderDay,
  title: 'Coprocessor Conflagration'
}

export default config