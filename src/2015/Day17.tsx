import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'

import INPUT from './Input/Day17'

const determineCombos = (containerSizes: number[], targetSize: number, currentContainerStack: number[]): number[][] => {
  const comboList: number[][] = []
  const currentStored = currentContainerStack.reduce((total, current) => total + current, 0)
  const localTarget = targetSize - currentStored
  for (let i = 0; i < containerSizes.length; i++) {
    const size = containerSizes[i]
    if (size === localTarget) {
      comboList.push([...currentContainerStack, size])
    } else if (size < localTarget) {
      comboList.push(
        ...determineCombos([
          ...containerSizes.slice(i + 1)
        ], targetSize, [...currentContainerStack, size])
      )
    }
  }
  return comboList
}

const BUTTONS: IButton[] = [
  {
    label: 'Determine Container Combos',
    onClick: (inputKey) => {
      const containerSizes = INPUT[inputKey]
        .split('\n')
        .map(x => parseInt(x))
        .sort((a, b) => a - b)
      const eggnog = inputKey === 'DEMO' ? 25 : 150
      const combos = determineCombos(containerSizes, eggnog, [])
      return {
        answer1: combos.length.toString()
      }
    }
  },
  {
    label: 'Determine Efficient Container Combos',
    onClick: (inputKey) => {
      const containerSizes = INPUT[inputKey]
        .split('\n')
        .map(x => parseInt(x))
        .sort((a, b) => a - b)
      const eggnog = inputKey === 'DEMO' ? 25 : 150
      const combos = determineCombos(containerSizes, eggnog, [])
      let minNumOfContainers = Number.MAX_SAFE_INTEGER
      for (let combo of combos) {
        minNumOfContainers = Math.min(minNumOfContainers, combo.length)
      }
      let minNumCount = 0
      for (let combo of combos) {
        if (combo.length === minNumOfContainers) {
          minNumCount++
        }
      }

      return {
        answer2: minNumCount.toString()
      }
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      There are <code>{answer}</code> potential combinations of containers{' '}
      to hold the eggnog.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      There are <code>{answer}</code> potential most efficient combinations of{' '}
      containers to hold the eggnog.
    </span>
  ),
  buttons: BUTTONS,
  day: 17,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'No Such Thing as Too Much'
}

export default config