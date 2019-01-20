import React from 'react'
import {
  IButton,
  IDayConfig
} from '../Config'

import INPUT from './Input/Day6'

let prevInputKey = ''
let steps = 0
let memoryBanks: number[] = []

const parseInput = (input: string): number[] => input.split(/\s/).map(x => parseInt(x))

const step = () => {
  const redistributeCount = Math.max(...memoryBanks)
  let i = memoryBanks.indexOf(redistributeCount)
  memoryBanks[i] = 0
  for (let j = 0; j < redistributeCount; j++) {
    i = (i + 1) % memoryBanks.length
    memoryBanks[i]++
  }
  steps++
}

const BUTTONS: IButton[] = [
  {
    label: 'Step',
    onClick: () => {
      step()
      return { answer1: undefined }
    }
  },
  {
    label: 'Find Loop',
    onClick: () => {
      const stateMap: Map<string, boolean> = new Map()

      let memBanksStr = JSON.stringify(memoryBanks)
      while (typeof stateMap.get(memBanksStr) === 'undefined') {
        stateMap.set(memBanksStr, true)
        step()
        memBanksStr = JSON.stringify(memoryBanks)
      }

      return {
        answer1: steps.toString()
      }
    }
  }
]

export const renderDay = (dayConfig: IDayConfig, inputKey: string): JSX.Element => {
  if (prevInputKey !== inputKey) {
    steps = 0
    memoryBanks = parseInput(dayConfig.INPUT[inputKey])
    prevInputKey = inputKey
  }

  return (
    <div>
      <h3 style={{ marginBottom: 0 }}>Steps: {steps}</h3>
      {memoryBanks.map(number => <div>{number}</div>)}
    </div>
  )
}

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      It takes <code>{answer}</code> steps to detect a loop.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      <code>{answer}</code>
    </span>
  ),
  buttons: BUTTONS,
  day: 6,
  INPUT,
  renderDay,
  title: 'Memory Reallocation'
}

export default config