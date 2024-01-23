import inputs from '../../inputs/2017/day05'
import { DayConfig } from '../../routes/Day'

const parseInput = (input: string): number[] =>
  input.split('\n').map((x) => parseInt(x))

const step = (
  instructions: number[],
  currentInstructionIndex: number,
  v2?: boolean
) => {
  const stepAmount = instructions[currentInstructionIndex]
  const newInstructionIndex = currentInstructionIndex + stepAmount
  if (!v2 || stepAmount < 3) instructions[currentInstructionIndex]++
  else instructions[currentInstructionIndex]--
  return { newInstructionIndex }
}

export const stepToEnd1 = (input: string) => {
  let steps = 0
  let currentInstructionIndex = 0
  const instructions = parseInput(input)

  while (
    currentInstructionIndex < instructions.length &&
    currentInstructionIndex >= 0
  ) {
    const result = step(instructions, currentInstructionIndex)
    currentInstructionIndex = result.newInstructionIndex
    steps++
  }

  return { answer1: steps }
}

export const stepToEnd2 = (input: string) => {
  let steps = 0
  let currentInstructionIndex = 0
  const instructions = parseInput(input)

  while (
    currentInstructionIndex < instructions.length &&
    currentInstructionIndex >= 0
  ) {
    const result = step(instructions, currentInstructionIndex, true)
    currentInstructionIndex = result.newInstructionIndex
    steps++
  }

  return { answer2: steps }
}

const day05: Omit<DayConfig, 'year'> = {
  answer1Text: 'It takes answer steps to reach the exit.',
  answer2Text: 'It takes answer steps to reach the exit.',
  buttons: [
    {
      label: 'Step to End (version 1)',
      onClick: stepToEnd1,
    },
    {
      label: 'Step to End (version 2)',
      onClick: stepToEnd2,
    },
  ],
  id: 5,
  inputs,
  title: 'A Maze of Twisty Trampolines, All Alike',
}

export default day05
