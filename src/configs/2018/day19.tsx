import inputs from '../../inputs/2018/day19'
import { DayConfig } from '../../routes/Day'
import { Operations } from './day16'

let registers = [0, 0, 0, 0, 0, 0]
let IP = 0
let IP_BIND = NaN

const resetRegisters = () => {
  IP_BIND = NaN
  IP = 0
  registers = [0, 0, 0, 0, 0, 0]
  console.log(`Registers reset: ${registers}`)

  return {
    answer1: 0,
  }
}

const setupForPart2 = () => {
  IP_BIND = NaN
  IP = 0
  registers = [1, 0, 0, 0, 0, 0]
  console.log(`Registers reset: ${registers}`)

  return {
    answer1: registers[0],
  }
}

const doInstruction = (inOperation: string, registers: number[]): number[] => {
  const instructionArr = inOperation.split(' ')
  const operation = instructionArr[0]
  const inputA = parseInt(instructionArr[1])
  const inputB = parseInt(instructionArr[2])
  const outputC = parseInt(instructionArr[3])

  return Operations[operation]({ inputA, inputB, outputC }, registers)
}

const runLines = (
  input: string,
  registers: number[],
  loops?: number
): number[] => {
  const instructions = input.split('\n')

  // First set the Instruction Pointer and its bound
  IP_BIND = NaN
  // IP = startInstruction || 0
  const ipInstruction = instructions.shift()
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

const runProgram = (input: string, loops?: number) => {
  // Get the IP_BIND so we can skip to the correct instruction
  IP_BIND = NaN
  const ipInstruction = input.split('\n').shift()

  if (ipInstruction) {
    IP_BIND = parseInt(ipInstruction.split(' ')[1])
    console.log(`IP_BIND: ${IP_BIND}`)
  }

  registers = runLines(input, registers, loops)

  return {
    answer1: registers[0],
  }
}

const runOneLine = (input: string) => runProgram(input, 1)

const runThreeLines = (input: string) => runProgram(input, 3)

const runTenLines = (input: string) => runProgram(input, 10)

const run100Lines = (input: string) => runProgram(input, 100)

const run1000Lines = (input: string) => runProgram(input, 1000)

const getExtra = () => (
  <>
    <p>
      This is capable of running the program, but if you just let it run until
      it&apos;s complete, that&apos;ll be a super long loop... So use the `Run
      Until Done` button with care!
    </p>
    <p>
      It is left as an exercise for the reader to determine what, exactly, the
      program is doing, and thus, what the final value of register 0 will be
      when it completes.
    </p>
    <p>
      Check your console log; there&apos;s useful information in there about
      what&apos;s happening when you run the program.
    </p>
    <p>Registers: [{registers.join(', ')}]</p>
  </>
)

export const runUntilDone = (input: string) => runProgram(input)

const day19: Omit<DayConfig, 'year'> = {
  answer1Text: 'The value currently in register 0 is answer.',
  answer2Text: 'The solution is answer.',
  buttons: [
    {
      label: 'Reset Registers',
      onClick: resetRegisters,
    },
    {
      label: 'Setup for Part 2',
      onClick: setupForPart2,
    },
    {
      label: 'Run One Line',
      onClick: runOneLine,
    },
    {
      label: 'Run Three Lines',
      onClick: runThreeLines,
    },
    {
      label: 'Run Ten Lines',
      onClick: runTenLines,
    },
    {
      label: 'Run 100 Lines',
      onClick: run100Lines,
    },
    {
      label: 'Run 1000 Lines',
      onClick: run1000Lines,
    },
    {
      label: 'Run Until Done',
      onClick: runUntilDone,
    },
  ],
  extra: getExtra,
  id: 19,
  inputs,
  title: 'Go With The Flow',
}

export default day19
