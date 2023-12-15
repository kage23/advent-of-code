import inputs from '../../inputs/2015/day24'
import { DayConfig } from '../../routes/Day'

const getQuantumEntanglement = (numbers: number[]): number => {
  let result = 1
  numbers.forEach((number) => {
    result = result * number
  })
  return result
}

const determineCombos = (numbers: number[], target: number): number[][] => {
  if (target <= 0) return []
  if (numbers.length === 0) return []
  if (numbers.length === 1) return numbers[0] === target ? [numbers] : []

  const comboList: number[][] = []
  for (let i = 0; i < numbers.length; i++) {
    const number = numbers[i]
    if (number === target) {
      comboList.push([number])
    } else {
      const subCombos = determineCombos(numbers.slice(i + 1), target - number)
      subCombos.forEach((subCombo) => {
        subCombo.push(number)
        comboList.push(subCombo)
      })
    }
  }

  return comboList
}

const findBestCombo = (numbers: number[], target: number): number[] => {
  let comboList = determineCombos(numbers, target)
  let smallestGroupSize = Number.MAX_SAFE_INTEGER
  comboList.forEach((group) => {
    smallestGroupSize = Math.min(smallestGroupSize, group.length)
  })
  comboList = comboList.filter((group) => group.length === smallestGroupSize)
  comboList.sort(
    (a, b) => getQuantumEntanglement(a) - getQuantumEntanglement(b)
  )
  return comboList[0]
}

export const sortThePackages = (input: string) => {
  const packageWeights: number[] = input
    .split('\n')
    .map((x) => parseInt(x))
    .sort((a, b) => b - a)
  const weightPerGroup =
    packageWeights.reduce((total, current) => total + current) / 3

  return {
    answer1: getQuantumEntanglement(
      findBestCombo(packageWeights, weightPerGroup)
    ),
  }
}

export const sortThePackagesWithTheTrunk = (input: string) => {
  const packageWeights: number[] = input
    .split('\n')
    .map((x) => parseInt(x))
    .sort((a, b) => b - a)
  const weightPerGroup =
    packageWeights.reduce((total, current) => total + current) / 4

  return {
    answer2: getQuantumEntanglement(
      findBestCombo(packageWeights, weightPerGroup)
    ),
  }
}

const day24: Omit<DayConfig, 'year'> = {
  answer1Text:
    'In the ideal configuration, the first group of packages has a quantum entanglement of answer.',
  answer2Text:
    'In the ideal configuration (including the trunk), the first group of packages has a quantum entanglement of answer.',
  buttons: [
    {
      label: 'Sort the Packages!',
      onClick: sortThePackages,
    },
    {
      label: 'Sort the Packages (with the trunk)!',
      onClick: sortThePackagesWithTheTrunk,
    },
  ],
  id: 24,
  inputs,
  title: 'It Hangs in the Balance',
}

export default day24
