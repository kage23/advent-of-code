import inputs from '../../inputs/2018/day21'
import { DayConfig } from '../../routes/Day'
import { Operations } from './day16'

let registers: number[] = [0, 0, 0, 0, 0, 0]

const doInstruction = (inOperation: string, registers: number[]): number[] => {
  const instructionArr = inOperation.split(' ')
  const operation = instructionArr[0]
  const inputA = parseInt(instructionArr[1])
  const inputB = parseInt(instructionArr[2])
  const outputC = parseInt(instructionArr[3])

  return Operations[operation]({ inputA, inputB, outputC }, registers)
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
  const exitCodes: number[] = []

  // First set the Instruction Pointer and its bound
  let IP_BIND = NaN
  let IP = startInstruction || 0
  const ipInstruction = instructions.shift()
  if (ipInstruction) IP_BIND = parseInt(ipInstruction.split(' ')[1])

  // Then do operations
  let nextInstruction = instructions[IP]
  while (nextInstruction) {
    // IP 28 is the line that will lead to exiting, if register 0 matches register 5 at the time
    if (IP === 28) {
      if (exitCodes.indexOf(registers[5]) === -1) {
        exitCodes.push(registers[5])
        if (exitCodes.length % 100 === 0) {
          console.log(`Exit code ${exitCodes.length}: ${registers[5]}`)
        }
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
    registers,
  }
}

const runProgram = (
  input: string,
  breakOnFirstExitCode: boolean
): {
  exitCodes: number[]
  registers: number[]
} => {
  // Get the IP_BIND so we can skip to the correct instruction
  let IP_BIND = NaN
  const ipInstruction = input.split('\n').shift()
  if (ipInstruction) IP_BIND = parseInt(ipInstruction.split(' ')[1])

  const result = runLines(
    input,
    registers,
    registers[IP_BIND],
    breakOnFirstExitCode
  )

  return result
}

export const findFirstExitCode = (input: string) => {
  const result = runProgram(input, true)
  registers = result.registers
  return {
    answer1: result.exitCodes[0],
  }
}

export const findLastExitCode = (input: string) => {
  const result = runProgram(input, false)
  registers = result.registers
  return {
    answer2: result.exitCodes[result.exitCodes.length - 1],
  }
}

const day21: Omit<DayConfig, 'year'> = {
  answer1Text: 'The first exit code is answer.',
  answer2Text: 'The last exit code is answer.',
  buttons: [
    {
      label: 'Find First Exit Code',
      onClick: findFirstExitCode,
    },
    {
      label: 'Find Last Exit Code',
      onClick: findLastExitCode,
    },
  ],
  extra: () =>
    'Warning! It will take about two minutes to find the last exit code.',
  id: 21,
  inputs,
  title: 'Chronal Conversion',
}

export default day21
