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
let answer2_a = ''

const runProgram = (inputKey: string, breakOnFirstExitCode: boolean): {
  exitCodes: number[]
  registers: number[]
} => {
  // Get the IP_BIND so we can skip to the correct instruction
  let IP_BIND = NaN
  const input = INPUT[inputKey]
  const ipInstruction = input.split('\n').shift()
  if (ipInstruction) IP_BIND = parseInt(ipInstruction.split(' ')[1])

  const result = runLines(input, registers, registers[IP_BIND], breakOnFirstExitCode)

  return result
}

const runLines = (
  INPUT: string,
  registers: number[],
  startInstruction: number,
  breakOnFirstExitCode: boolean
): {
  exitCodes: number[]
  registers: number[]
} => {
  const instructions = INPUT.split('\n')
  let exitCodes: number[] = []

  // First set the Instruction Pointer and its bound
  let IP_BIND: number = NaN
  let IP: number = startInstruction || 0
  let ipInstruction = instructions.shift()
  if (ipInstruction) IP_BIND = parseInt(ipInstruction.split(' ')[1])

  // Then do operations
  let nextInstruction = instructions[IP]
  while (nextInstruction) {
    // IP 28 is the line that will lead to exiting, if register 0 matches register 5 at the time
    if (IP === 28) {
      if (exitCodes.indexOf(registers[5]) === -1) {
        exitCodes.push(registers[5])
        console.log(`Exit code ${exitCodes.length}: ${registers[5]}`)
        if (breakOnFirstExitCode) break
      } else break
    }
    registers[IP_BIND] = IP
    registers = doInstruction(nextInstruction, registers)
    IP = registers[IP_BIND] + 1
    nextInstruction = instructions[IP]
  }

  return {
    exitCodes,
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
    label: 'Find First Exit Code',
    onClick: () => {
      const result = runProgram(prevInputKey, true)
      registers = result.registers
      setOther({ registers })
      return {
        answer1: result.exitCodes[0].toString()
      }
    }
  },
  {
    label: 'Find Last Exit Code',
    onClick: () => {
      const result = runProgram(prevInputKey, false)
      registers = result.registers
      setOther({ registers })
      answer2_a = result.exitCodes.length.toString()
      return {
        answer2: result.exitCodes[result.exitCodes.length - 1].toString()
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
      <div style={{ marginLeft: '24px' }}>
        <p>
          WARNING: Finding the last exit code takes a while; check your console{' '}
          for proof it's really running!
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
      The last exit code is{' '}
      <code>{answer}</code>.{' '}
      (There were <code>{answer2_a}</code>{' '} exit codes.)
    </span>
  ),
  buttons: BUTTONS,
  day: 21,
  INPUT,
  renderDay,
  title: 'Chronal Conversion'
}

export default config