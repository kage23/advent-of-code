import React from 'react'
import {
  IButton,
  IDayConfig
} from '../Config'

import INPUT from './Input/Day18'

interface IInstruction {
  command: string
  x: string
  y: string | number | undefined
}

let prevInputKey = ''

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

const SOUND_PLAYER = {
  currentInstruction: 0,
  instructions: [],
  lastPlayed: NaN,
  registers: {},
  snd: function (x) {
    this.lastPlayed = this.registers[x]
  },
  set: function (x, y) {
    this.registers[x] = typeof y === 'number'
      ? y
      : this.registers[y]
  },
  add: function (x, y) {
    this.registers[x] += typeof y === 'number'
    ? y
    : this.registers[y]
  },
  mul: function (x, y) {
    this.registers[x] *= typeof y === 'number'
    ? y
    : this.registers[y]
  },
  mod: function (x, y) {
    this.registers[x] %= typeof y === 'number'
    ? y
    : this.registers[y]
  },
  rcv: function (x) {
    if (this.registers[x] !== 0) return this.lastPlayed
  },
  jgz: function (x, y) {
    if (this.registers[x] > 0) {
      this.currentInstruction += (
        typeof y === 'number'
          ? y
          : this.registers[y]
      ) - 1 // The minus one is to allow us to skip ahead plus one like we do after every other instruction
    }
  }
} as {
  currentInstruction: number
  instructions: IInstruction[]
  lastPlayed: number
  registers: { [key:string]: number }
  snd: (x: string) => void
  set: (x: string, y: string | number) => void
  add: (x: string, y: string | number) => void
  mul: (x: string, y: string | number) => void
  mod: (x: string, y: string | number) => void
  rcv: (x: string) => number | void
  jgz: (x: string, y: string | number) => void
}

const executeInstruction = (command: string, x: string, inY: string | number | undefined): number | void => {
  if (!SOUND_PLAYER.registers[x]) SOUND_PLAYER.registers[x] = 0
  const y = typeof inY === 'undefined' ? '' : inY
  switch (command) {
    case 'snd':
    case 'set':
    case 'add':
    case 'mul':
    case 'mod':
    case 'jgz':
    case 'rcv':
    return SOUND_PLAYER[command](x, y)

    default:
    break
  }
}

const BUTTONS: IButton[] = [
  {
    label: 'Find Frequency',
    onClick: () => {
      let {
        command,
        x,
        y
      } = SOUND_PLAYER.instructions[SOUND_PLAYER.currentInstruction]
      let result = executeInstruction(command, x, y)
      SOUND_PLAYER.currentInstruction++

      while (!result) {
        command = SOUND_PLAYER.instructions[SOUND_PLAYER.currentInstruction].command
        x = SOUND_PLAYER.instructions[SOUND_PLAYER.currentInstruction].x
        y = SOUND_PLAYER.instructions[SOUND_PLAYER.currentInstruction].y
        result = executeInstruction(command, x, y)
        SOUND_PLAYER.currentInstruction++
      }

      return {
        answer1: result.toString()
      }
    }
  }
]

const renderDay = (dayConfig: IDayConfig, inputKey: string): JSX.Element => {
  if (prevInputKey !== inputKey) {
    prevInputKey = inputKey
    SOUND_PLAYER.instructions = parseInput(dayConfig.INPUT[inputKey])
  }

  const registerDisplay: JSX.Element[] = []
  for (let key of Object.keys(SOUND_PLAYER.registers)) {
    registerDisplay.push((
      <div key={key}>{key}: {SOUND_PLAYER.registers[key]}</div>
    ))
  }

  return (
    <div className="render-box">
      <div>
        <h3>Input:</h3>
        <pre>{dayConfig.INPUT[inputKey]}</pre>
      </div>
      <div className="render-box--left-margin">
        <h3>Registers:</h3>
        {registerDisplay}
      </div>
      <div className="render-box--left-margin">
        <h3>Next Instruction:</h3>
        <h3>
          {SOUND_PLAYER.currentInstruction}:{' '}
          {SOUND_PLAYER.instructions[SOUND_PLAYER.currentInstruction].command}{' '}
          {SOUND_PLAYER.instructions[SOUND_PLAYER.currentInstruction].x}{' '}
          {SOUND_PLAYER.instructions[SOUND_PLAYER.currentInstruction].y}{' '}
        </h3>
      </div>
    </div>
  )
}

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The first recovered (non-zero) frequency is{' '}
      <code>{answer}</code>.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      <code>{answer}</code>
    </span>
  ),
  buttons: BUTTONS,
  day: 18,
  INPUT,
  renderDay,
  title: 'Duet'
}

export default config