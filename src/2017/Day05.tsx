import React from 'react'
import {
  IButton,
  IDayConfig
} from '../Config'

import INPUT from '../Inputs/2017/Day05'

const parseInput = (input: string): number[] => input.split('\n').map(x => parseInt(x))

let steps = 0
let currentInstructionIndex = 0
let instructions: number[] = []
let prevInputKey = ''

const step = (v2?: boolean) => {
  const stepAmount = instructions[currentInstructionIndex]
  const newInstructionIndex = currentInstructionIndex + stepAmount
  if (!v2 || stepAmount < 3) instructions[currentInstructionIndex]++
  else instructions[currentInstructionIndex]--
  currentInstructionIndex = newInstructionIndex
  steps++
}

const BUTTONS: IButton[] = [
  {
    label: 'Step (version 1)',
    onClick: () => {
      step()
      return {
        answer1: undefined
      }
    }
  },
  {
    label: 'Step to End (version 1)',
    onClick: () => {
      while (currentInstructionIndex < instructions.length && currentInstructionIndex >= 0) step()

      return {
        answer1: steps.toString()
      }
    }
  },
  {
    label: 'Step (version 2)',
    onClick: () => {
      step(true)
      return {
        answer2: undefined
      }
    }
  },
  {
    label: 'Step to End (version 2)',
    onClick: () => {
      while (currentInstructionIndex < instructions.length && currentInstructionIndex >= 0) step(true)

      return {
        answer2: steps.toString()
      }
    }
  }
]

export const renderDay = (dayConfig: IDayConfig, inputKey: string): JSX.Element => {
  if (prevInputKey !== inputKey) {
    steps = 0
    currentInstructionIndex = 0
    instructions = parseInput(dayConfig.INPUT[inputKey])
    prevInputKey = inputKey
  }

  return (
    <div>
      <h3 style={{ marginBottom: 0 }}>Steps: {steps}</h3>
      {instructions.map((number, i) => (
        i === currentInstructionIndex
          ? <div>({number})</div>
          : <div>&nbsp;{number}&nbsp;</div>
      ))}
    </div>
  )
}

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      It takes <code>{answer}</code> steps to reach the exit.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      It takes <code>{answer}</code> steps to reach the exit.
    </span>
  ),
  buttons: BUTTONS,
  day: 5,
  INPUT,
  renderDay,
  title: 'A Maze of Twisty Trampolines, All Alike'
}

export default config