import React from 'react'
import {
  IButton,
  IDayConfig
} from '../Config'

import INPUT from './Input/Day19'
import OPERATIONS from '../utils/Operations';

interface IInstruction {
  inputA: number
  inputB: number
  outputC: number
}

let setOther = (other: any): void => {}

let registers: number[] = [0, 0, 0, 0, 0, 0]
let prevInputKey = ''

const handleRegisterChange = (key: number, value: number) => {
  registers[key] = value
  setOther({ registers })
}

const runProgram = (inputKey: string, loops?: number): number[] => {
  // Get the IP_BIND so we can skip to the correct instruction
  let IP_BIND = NaN
  const input = INPUT[inputKey]
  const ipInstruction = input.split('\n').shift()
  if (ipInstruction) {
    IP_BIND = parseInt(ipInstruction.split(' ')[1])
    console.log(`IP_BIND: ${IP_BIND}`)
  }

  registers = runLine(input, registers, loops, registers[IP_BIND])
  return registers
}

const runLine = (INPUT: string, registers: number[], loops?: number, startInstruction?: number): number[] => {
  const instructions = INPUT.split('\n')

  // First set the Instruction Pointer and its bound
  let IP_BIND: number = NaN
  let IP: number = startInstruction || 0
  let ipInstruction = instructions.shift()
  if (ipInstruction) {
    IP_BIND = parseInt(ipInstruction.split(' ')[1])
    console.log(`IP_BIND: ${IP_BIND}`)
  }

  // Then do operations
  let nextInstruction = instructions[IP]
  let count = 0
  while (nextInstruction && (!loops || count < loops)) {
    console.group(`IP: ${IP} - ${nextInstruction}`)
    registers[IP_BIND] = IP
    console.log(`Registers before: ${JSON.stringify(registers)}.`)
    registers = doInstruction(nextInstruction, registers)
    console.log(`Registers after: ${JSON.stringify(registers)}.`)
    IP = registers[IP_BIND] + 1
    nextInstruction = instructions[IP]
    console.groupEnd()
    count++
  }

  return registers
}

const doInstruction = (inOperation: string, registers: number[]): number[] => {
  const instructionArr = inOperation.split(' ')
  const operation = instructionArr[0]
  const inputA = parseInt(instructionArr[1])
  const inputB = parseInt(instructionArr[2])
  const outputC = parseInt(instructionArr[3])

  return OPERATIONS[operation]({ inputA, inputB, outputC }, registers)
}

const getRegisterInputs = (registers: number[]) => registers.map((register, index) => (
  <input
    type="text"
    size={3}
    value={register}
    onChange={(event) => {
      handleRegisterChange(index, parseInt(event.target.value))
    }}
  />
))

const incrementIPRegister = (inputKey: string) => {
  let IP_BIND = NaN
  const input = INPUT[inputKey]
  const ipInstruction = input.split('\n').shift()
  if (ipInstruction) {
    IP_BIND = parseInt(ipInstruction.split(' ')[1])
    console.log(`IP_BIND: ${IP_BIND}`)
  }

  registers[IP_BIND] = registers[IP_BIND] + 1

  setOther({ registers })
}

const BUTTONS: IButton[] = [
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
      setOther({ registers: runProgram(prevInputKey, 1)})
      return {}
    }
  },
  {
    label: 'Run Ten Lines',
    onClick: () => {
      setOther({ registers: runProgram(prevInputKey, 10)})
      return {}
    }
  },
  {
    label: 'Run 100 Lines',
    onClick: () => {
      setOther({ registers: runProgram(prevInputKey, 100)})
      return {}
    }
  },
  {
    label: 'Run 1000 Lines',
    onClick: () => {
      setOther({ registers: runProgram(prevInputKey, 1000)})
      return {}
    }
  },
  {
    label: 'Run Until Done',
    onClick: () => {
      setOther({ registers: runProgram(prevInputKey)})
      return {
        answer1: registers[0].toString()
      }
    }
  }
]

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
  const registerInputs = getRegisterInputs(registers)

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
        <p>
          Registers: [
            {registerInputs[0]},{' '}
            {registerInputs[1]},{' '}
            {registerInputs[2]},{' '}
            {registerInputs[3]},{' '}
            {registerInputs[4]},{' '}
            {registerInputs[5]}
          ]
        </p>
      </div>
      <div
        style={{
          marginLeft: '24px',
          flexShrink: 1
        }}
      >
        <p>
          This is capable of running the program, but if you just let it run until{' '}
          it's complete, that'll be a super long loop ...
        </p>
        <p>
          It is left as an exercise for the reader to determine what, exactly, the program{' '}
          is doing, and thus, what the final value of register 0 will be when it completes.
        </p>
        <p>
          Check your console log; there's useful information in there about what's happening{' '}
          when you run the program.
        </p>
        <p>
          If you're manually running lines of instructions, make sure to increment{' '}
          the IP register in between them!
        </p>
      </div>
    </div>
  )
}

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The value left in register 0 when the program completes is{' '}
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
  day: 19,
  INPUT,
  renderDay,
  title: 'Go With The Flow'
}

export default config