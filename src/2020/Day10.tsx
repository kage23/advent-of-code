import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'

import INPUT from '../Inputs/2020/Day10'

const BUTTONS: IButton[] = [
  {
    label: 'Find Joltage Differences',
    onClick: (inputKey: string) => {
      const adapters = INPUT[inputKey].split('\n').map(x => parseInt(x)).sort((a, b) => a - b)
      adapters.unshift(0)
      adapters.push(adapters[adapters.length - 1] + 3)

      let oneDiff = 0
      let threeDiff = 0

      for (let i = 1; i < adapters.length; i++) {
        if (adapters[i] - adapters[i - 1] === 1) oneDiff++
        if (adapters[i] - adapters[i - 1] === 3) threeDiff++
      }

      return {
        answer1: (oneDiff * threeDiff).toString()
      }
    }
  },
  {
    label: 'Find Possible Configurations',
    onClick: (inputKey: string) => {
      const adapters = INPUT[inputKey].split('\n').map(x => parseInt(x)).sort((a, b) => b - a)
      adapters.push(0)
      adapters.unshift(adapters[0] + 3)

      const adaptersToSolutionCounts: Map<number, number> = new Map()

      adapters.forEach((adapter, adapterIdx, adapterList) => {
        let solutionCount = 0
        if (adapterIdx === 0) {
          adaptersToSolutionCounts.set(adapter, 1)
        } else {
          for (let i = 1; i <= 3 && adapterIdx - i >= 0; i++) {
            if (adapterList[adapterIdx - i] - adapter <= 3) {
              solutionCount += adaptersToSolutionCounts.get(adapterList[adapterIdx - i]) || 0
            }
          }
          adaptersToSolutionCounts.set(adapter, solutionCount)
        }
      })

      const solution = adaptersToSolutionCounts.get(0)

      if (!solution) throw new Error('fuck')

      return {
        answer2: solution.toString()
      }
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The product of the one-diff and three-diff counts is <code>{answer}</code>.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      There are <code>{answer}</code> possible adapter chains.
    </span>
  ),
  buttons: BUTTONS,
  day: 10,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Adapter Array'
}

export default config