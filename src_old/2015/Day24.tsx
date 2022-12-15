import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'

import INPUT from '../Inputs/2015/Day24'

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
      subCombos.forEach(subCombo => {
        subCombo.push(number)
        comboList.push(subCombo)
      })
    }
  }

  return comboList
}

const findBestCombo = (numbers: number[], target: number, startingIndex: number): number[] => {
  let comboList = determineCombos(numbers, target)
  let smallestGroupSize = Number.MAX_SAFE_INTEGER
  comboList.forEach(group => {
    smallestGroupSize = Math.min(smallestGroupSize, group.length)
  })
  comboList = comboList.filter(group => group.length === smallestGroupSize)
  comboList.sort((a, b) => getQE(a) - getQE(b))
  return comboList[0]
}

const getQE = (numbers: number[]): number => {
  let result = 1
  numbers.forEach(number => {
    result = result * number
  })
  return result
}

const BUTTONS: IButton[] = [
  {
    label: 'Sort the Packages!',
    onClick: (inputKey) => {
      const packageWeights: number[] = INPUT[inputKey]
        .split('\n')
        .map(x => parseInt(x))
        .sort((a, b) => b - a)
      const weightPerGroup = packageWeights.reduce((total, current) => total + current) / 3

      return {
        answer1: getQE(findBestCombo(packageWeights, weightPerGroup, 0)).toString()
      }
    }
  },
  {
    label: 'Sort the Packages (with the trunk)!',
    onClick: (inputKey) => {
      const packageWeights: number[] = INPUT[inputKey]
        .split('\n')
        .map(x => parseInt(x))
        .sort((a, b) => b - a)
      const weightPerGroup = packageWeights.reduce((total, current) => total + current) / 4

      return {
        answer2: getQE(findBestCombo(packageWeights, weightPerGroup, 0)).toString()
      }
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      In the ideal configuration, the first group of packages has a quantum{' '}
      entanglement of <code>{answer}</code>.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      In the ideal configuration (including the trunk), the first group of packages{' '}
      has a quantum entanglement of <code>{answer}</code>.
    </span>
  ),
  buttons: BUTTONS,
  day: 24,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'It Hangs in the Balance'
}

export default config