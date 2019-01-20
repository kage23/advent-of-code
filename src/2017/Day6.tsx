import React from 'react'
import {
  IButton,
  IDayConfig
} from '../Config'

import INPUT from './Input/Day6'

let prevInputKey = ''
let cycles = 0
let memoryBanks: number[] = []

const parseInput = (input: string): number[] => input.split(/\s/).map(x => parseInt(x))

const cycle = () => {
  const redistributeCount = Math.max(...memoryBanks)
  let i = memoryBanks.indexOf(redistributeCount)
  memoryBanks[i] = 0
  for (let j = 0; j < redistributeCount; j++) {
    i = (i + 1) % memoryBanks.length
    memoryBanks[i]++
  }
  cycles++
}

const BUTTONS: IButton[] = [
  {
    label: 'Cycle',
    onClick: () => {
      cycle()
      return { answer1: undefined }
    }
  },
  {
    label: 'Find Loop',
    onClick: () => {
      const stateAtTimeMap: Map<string, number> = new Map()

      let memBanksStr = JSON.stringify(memoryBanks)
      while (typeof stateAtTimeMap.get(memBanksStr) === 'undefined') {
        stateAtTimeMap.set(memBanksStr, cycles)
        cycle()
        memBanksStr = JSON.stringify(memoryBanks)
      }

      return {
        answer1: cycles.toString(),
        answer2: (cycles - (stateAtTimeMap.get(memBanksStr) || 0)).toString()
      }
    }
  }
]

export const renderDay = (dayConfig: IDayConfig, inputKey: string): JSX.Element => {
  if (prevInputKey !== inputKey) {
    cycles = 0
    memoryBanks = parseInput(dayConfig.INPUT[inputKey])
    prevInputKey = inputKey
  }

  return (
    <div>
      <h3 style={{ marginBottom: 0 }}>Steps: {cycles}</h3>
      {memoryBanks.map(number => <div>{number}</div>)}
    </div>
  )
}

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      It takes <code>{answer}</code> cycles to detect a loop.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      The loop is <code>{answer}</code> cycles long.
    </span>
  ),
  buttons: BUTTONS,
  day: 6,
  INPUT,
  renderDay,
  title: 'Memory Reallocation'
}

export default config