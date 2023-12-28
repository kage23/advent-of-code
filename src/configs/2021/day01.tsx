import inputs from '../../inputs/2021/day01'
import { DayConfig } from '../../routes/Day'

const parseInput = (input: string): number[] =>
  input.split('\n').map(inputStr => parseInt(inputStr))

export const checkDepthIncreases = (input: string) => {
  const numbers = parseInput(input)
  let count = 0
  numbers.forEach((number, i, array) => {
    if (i > 0 && number > array[i - 1]) count++
  })
  return {
    answer1: count
  }
}

export const checkSummedDepthIncreases = (input: string) => {
  const numbers = parseInput(input)
  let count = 0
  numbers.forEach((number, i, array) => {
    if (i > 0) {
      const currentSum = number + array[i + 1] + array[i + 2]
      const prevSum = number + array[i - 1] + array[i + 1]
      if (currentSum > prevSum) count++
    }
  })
  return {
    answer2: count
  }
}

const day01: Omit<DayConfig, 'year'> = {
  answer1Text: 'The depth increases answer times.',
  answer2Text: 'The summed depth increases answer times.',
  buttons: [
    {
      label: 'Check Depth Increases',
      onClick: checkDepthIncreases
    },
    {
      label: 'Check Depth Increases in 3-Windows',
      onClick: checkSummedDepthIncreases
    }
  ],
  id: 1,
  inputs,
  title: 'Sonar Sweep',
}

export default day01
