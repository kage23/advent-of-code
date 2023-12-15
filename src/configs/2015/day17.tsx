import inputs from '../../inputs/2015/day17'
import { DayConfig } from '../../routes/Day'

const determineCombos = (
  containerSizes: number[],
  targetSize: number,
  currentContainerStack: number[]
): number[][] => {
  const comboList: number[][] = []
  const currentStored = currentContainerStack.reduce(
    (total, current) => total + current,
    0
  )
  const localTarget = targetSize - currentStored
  for (let i = 0; i < containerSizes.length; i++) {
    const size = containerSizes[i]
    if (size === localTarget) {
      comboList.push([...currentContainerStack, size])
    } else if (size < localTarget) {
      comboList.push(
        ...determineCombos([...containerSizes.slice(i + 1)], targetSize, [
          ...currentContainerStack,
          size,
        ])
      )
    }
  }
  return comboList
}

export const determineContainerCombos = (input: string, eggnog = 150) => {
  const containerSizes = input
    .split('\n')
    .map((x) => parseInt(x))
    .sort((a, b) => a - b)
  const combos = determineCombos(containerSizes, eggnog, [])
  return {
    answer1: combos.length,
  }
}

export const determineEfficientContainerCombos = (input: string, eggnog = 150) => {
  const containerSizes = input
    .split('\n')
    .map((x) => parseInt(x))
    .sort((a, b) => a - b)
  const combos = determineCombos(containerSizes, eggnog, [])
  let minNumOfContainers = Number.MAX_SAFE_INTEGER
  for (const combo of combos) {
    minNumOfContainers = Math.min(minNumOfContainers, combo.length)
  }
  let minNumCount = 0
  for (const combo of combos) {
    if (combo.length === minNumOfContainers) {
      minNumCount++
    }
  }

  return {
    answer2: minNumCount,
  }
}

const day17: Omit<DayConfig, 'year'> = {
  answer1Text:
    'There are answer potential combinations of containers to hold the eggnog.',
  answer2Text:
    'There are answer potential most efficient combinations of containers to hold the eggnog.',
  buttons: [
    {
      label: 'Determine Container Combos',
      onClick: determineContainerCombos,
    },
    {
      label: 'Determine Efficient Container Combos',
      onClick: determineEfficientContainerCombos,
    },
  ],
  id: 17,
  inputs,
  title: 'No Such Thing as Too Much',
}

export default day17
