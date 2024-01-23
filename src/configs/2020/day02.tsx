import inputs from '../../inputs/2020/day02'
import { DayConfig } from '../../routes/Day'

export const analyzePasswords = (input: string) => {
  let validPasswordCount = 0
  input.split('\n').forEach((inputString) => {
    const [rule, password] = inputString.split(': ')
    const [numbers, letter] = rule.split(' ')
    const min = Number(numbers.split('-')[0])
    const max = Number(numbers.split('-')[1])
    const letterCountInPassword = password.split(letter).length - 1
    if (letterCountInPassword >= min && letterCountInPassword <= max) {
      validPasswordCount++
    }
  })
  return { answer1: validPasswordCount }
}

export const properlyAnalyzePasswords = (input: string) => {
  let validPasswordCount = 0
  input.split('\n').forEach((inputString) => {
    const [rule, password] = inputString.split(': ')
    const [numbers, letter] = rule.split(' ')
    const pos1 = Number(numbers.split('-')[0]) - 1
    const pos2 = Number(numbers.split('-')[1]) - 1
    if (
      (password.charAt(pos1) === letter && password.charAt(pos2) !== letter) ||
      (password.charAt(pos1) !== letter && password.charAt(pos2) === letter)
    ) {
      validPasswordCount++
    }
  })
  return { answer2: validPasswordCount }
}

const day02: Omit<DayConfig, 'year'> = {
  answer1Text: 'answer passwords are valid.',
  answer2Text: 'answer passwords are ACTUALLY valid.',
  buttons: [
    {
      label: 'Analyze Passwords',
      onClick: analyzePasswords,
    },
    {
      label: 'Properly Analyze Passwords',
      onClick: properlyAnalyzePasswords,
    },
  ],
  id: 2,
  inputs,
  title: 'Password Philosophy',
}

export default day02
