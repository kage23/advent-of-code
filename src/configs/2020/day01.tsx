import inputs from '../../inputs/2020/day01'
import { DayConfig } from '../../routes/Day'

const parseInput = (input: string): number[] =>
  input.split('\n').map(inputStr => parseInt(inputStr))

export const checkExpenseReport = (input: string) => {
  const inputNumbers = parseInput(input)
  for (let idx1 = 0; idx1 < inputNumbers.length; idx1++) {
    for (let idx2 = idx1 + 1; idx2 < inputNumbers.length; idx2++) {
      if (inputNumbers[idx1] + inputNumbers[idx2] === 2020) {
        return {
          answer1: (inputNumbers[idx1] * inputNumbers[idx2])
        }
      }
    }
  }
}

export const checkExpenseReportHarder = (input: string) => {
  const inputNumbers = parseInput(input)
  for (let idx1 = 0; idx1 < inputNumbers.length; idx1++) {
    for (let idx2 = idx1 + 1; idx2 < inputNumbers.length; idx2++) {
      for (let idx3 = idx2 + 1; idx3 < inputNumbers.length; idx3++) {
        if (inputNumbers[idx1] + inputNumbers[idx2] + inputNumbers[idx3] === 2020) {
          return {
            answer2: (inputNumbers[idx1] * inputNumbers[idx2] * inputNumbers[idx3])
          }
        }
      }
    }
  }
}

const day01: Omit<DayConfig, 'year'> = {
  answer1Text: 'The product of the two numbers is answer.',
  answer2Text: 'The product of the three numbers is answer.',
  buttons: [
    {
      label: 'Check Expense Report',
      onClick: checkExpenseReport
    },
    {
      label: 'Check Expense Report Closer',
      onClick: checkExpenseReportHarder
    },
  ],
  id: 1,
  inputs,
  title: 'Report Repair',
}

export default day01
