import React from 'react'
import {
  IButton,
  IDayConfig
} from '../Config'

import INPUT from './Input/Day21'
import OPERATIONS from '../utils/Operations';

let setOther = (other: any): void => {}

let registers: number[] = [0, 0, 0, 0, 0, 0]
let prevInputKey = ''

const runProgram = (inputKey: string, loops?: number): {
  exitCode: undefined | number
  registers: number[]
} => {
  // Get the IP_BIND so we can skip to the correct instruction
  let IP_BIND = NaN
  const input = INPUT[inputKey]
  const ipInstruction = input.split('\n').shift()
  if (ipInstruction) IP_BIND = parseInt(ipInstruction.split(' ')[1])

  const result = runLine(input, registers, loops, registers[IP_BIND])
  return result
}

const runLine = (
  INPUT: string,
  registers: number[],
  loops?: number,
  startInstruction?: number
): {
  exitCode: undefined | number
  registers: number[]
} => {
  const instructions = INPUT.split('\n')
  let exitCode

  // First set the Instruction Pointer and its bound
  let IP_BIND: number = NaN
  let IP: number = startInstruction || 0
  let ipInstruction = instructions.shift()
  if (ipInstruction) IP_BIND = parseInt(ipInstruction.split(' ')[1])

  // Then do operations
  let nextInstruction = instructions[IP]
  let count = 0
  while (nextInstruction && (!loops || count < loops)) {
    // IP 28 is the line that will lead to exiting, if register 0 matches register 5 at the time
    if (IP === 28) {
      exitCode = registers[5]
      break
    }
    registers[IP_BIND] = IP
    registers = doInstruction(nextInstruction, registers)
    IP = registers[IP_BIND] + 1
    nextInstruction = instructions[IP]
    count++
  }

  return {
    exitCode,
    registers
  }
}

const doInstruction = (inOperation: string, registers: number[]): number[] => {
  const instructionArr = inOperation.split(' ')
  const operation = instructionArr[0]
  const inputA = parseInt(instructionArr[1])
  const inputB = parseInt(instructionArr[2])
  const outputC = parseInt(instructionArr[3])

  return OPERATIONS[operation]({ inputA, inputB, outputC }, registers)
}

const incrementIPRegister = (inputKey: string) => {
  let IP_BIND = NaN
  const input = INPUT[inputKey]
  const ipInstruction = input.split('\n').shift()
  if (ipInstruction) IP_BIND = parseInt(ipInstruction.split(' ')[1])

  registers[IP_BIND] = registers[IP_BIND] + 1

  setOther({ registers })
}

const BUTTONS: IButton[] = [
  {
    label: 'Reset Registers',
    onClick: () => {
      registers = [0, 0, 0, 0, 0, 0]
      setOther({ registers })
      return {}
    }
  },
  {
    label: 'Increment IP Register',
    onClick: () => {
      incrementIPRegister(prevInputKey)
      return {}
    }
  },
  {
    label: 'Run One Line',
    onClick: () => {
      const next = runProgram(prevInputKey, 1)
      registers = next.registers
      setOther({ registers })
      return {}
    }
  },
  {
    label: 'Run Ten Lines',
    onClick: () => {
      const next = runProgram(prevInputKey, 10)
      registers = next.registers
      setOther({ registers })
      return {}
    }
  },
  {
    label: 'Run 100 Lines',
    onClick: () => {
      const next = runProgram(prevInputKey, 100)
      registers = next.registers
      setOther({ registers })
      return {}
    }
  },
  {
    label: 'Run 1000 Lines',
    onClick: () => {
      const next = runProgram(prevInputKey, 1000)
      registers = next.registers
      setOther({ registers })
      return {}
    }
  },
  {
    label: 'Find First Exit Code',
    onClick: () => {
      const next = runProgram(prevInputKey)
      registers = next.registers
      setOther({ registers })
      return {
        answer1: next.exitCode ? next.exitCode.toString() : undefined
      }
    }
  }
]

const getRegisters = () => JSON.stringify(registers)

const renderDay = (
  dayConfig: IDayConfig,
  inputKey: string,
  answer1: false | string | JSX.Element,
  answer2: false | string | JSX.Element,
  inSetOther: (other: any) => void
): JSX.Element => {
  if (inputKey !== prevInputKey) {
    prevInputKey = inputKey
  }

  setOther = inSetOther

  const registersDisplay = getRegisters()

  return (
    <div className="render-box render-box--no-wrap">
      <div>
        <h3>Input:</h3>
        <pre>{dayConfig.INPUT[inputKey]}</pre>
      </div>
      <div
        style={{
          marginLeft: '24px',
          flexShrink: 0
        }}
      >
        <h3>Registers:</h3>
        <p>
          {registersDisplay}
        </p>
      </div>
    </div>
  )
}

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The first exit code is{' '}
      <code>{answer}</code>.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      The solution is{' '}
      <code>{answer}</code>.
    </span>
  ),
  buttons: BUTTONS,
  day: 21,
  INPUT,
  renderDay,
  title: 'Chronal Conversion'
}

export default config