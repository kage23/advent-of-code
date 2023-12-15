import inputs from '../../inputs/2015/day12'
import { DayConfig } from '../../routes/Day'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const findSum = (input: any, runningTotal = 0, part: 1 | 2): number => {
  if (typeof input === 'string') {
    return runningTotal
  }

  if (typeof input === 'number') {
    return runningTotal + input
  }

  if (Array.isArray(input)) {
    return input.reduce(
      (total, current) => findSum(current, total, part),
      runningTotal
    )
  }

  if (part === 2 && Object.values(input).includes('red')) {
    return runningTotal
  }

  return Object.keys(input).reduce(
    (total, current) => findSum(input[current], total, part),
    runningTotal
  )
}

export const sumInput = (inputStr: string) => {
  const input = JSON.parse(inputStr)
  const sum = findSum(input, 0, 1)
  return {
    answer1: sum,
  }
}

export const sumInputNoRed = (inputStr: string) => {
  const input = JSON.parse(inputStr)
  const sum = findSum(input, 0, 2)
  return {
    answer2: sum,
  }
}

const day12: Omit<DayConfig, 'year'> = {
  answer1Text: 'The total sum is answer.',
  answer2Text: 'The total sum without red is answer.',
  buttons: [
    {
      label: 'Sum Input',
      onClick: sumInput,
    },
    {
      label: 'Sum Input, No Red',
      onClick: sumInputNoRed,
    },
  ],
  id: 12,
  inputs,
  title: 'JSAbacusFramework.io',
}

export default day12
