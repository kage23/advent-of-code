import inputs from '../../inputs/2020/day10'
import { DayConfig } from '../../routes/Day'

export const findJoltageDifferences = (input: string) => {
  const adapters = input
    .split('\n')
    .map((x) => parseInt(x))
    .sort((a, b) => a - b)
  adapters.unshift(0)
  adapters.push(adapters[adapters.length - 1] + 3)

  let oneDiff = 0
  let threeDiff = 0

  for (let i = 1; i < adapters.length; i++) {
    if (adapters[i] - adapters[i - 1] === 1) oneDiff++
    if (adapters[i] - adapters[i - 1] === 3) threeDiff++
  }

  return {
    answer1: oneDiff * threeDiff,
  }
}

export const findPossibleConfigurations = (input: string) => {
  const adapters = input
    .split('\n')
    .map((x) => parseInt(x))
    .sort((a, b) => b - a)
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
          solutionCount +=
            adaptersToSolutionCounts.get(adapterList[adapterIdx - i]) || 0
        }
      }
      adaptersToSolutionCounts.set(adapter, solutionCount)
    }
  })

  const solution = adaptersToSolutionCounts.get(0)

  if (!solution) throw new Error('fuck')

  return {
    answer2: solution,
  }
}

const day10: Omit<DayConfig, 'year'> = {
  answer1Text: 'The product of the one-diff and three-diff counts is answer.',
  answer2Text: 'There are answer possible adapter chains.',
  buttons: [
    {
      label: 'Find Joltage Differences',
      onClick: findJoltageDifferences,
    },
    {
      label: 'Find Possible Configurations',
      onClick: findPossibleConfigurations,
    },
  ],
  id: 10,
  inputs,
  title: 'Adapter Array',
}

export default day10
