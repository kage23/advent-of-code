import inputs from '../../inputs/2019/day04'
import { DayConfig } from '../../routes/Day'

const parseInput = (input: string): number[] => {
  const range = input.split('-').map((num) => parseInt(num))
  const result = []

  for (let i = range[0]; i <= range[1]; i++) result.push(i)

  return result
}

const numberHasAdjacentEqualDigits = (number: number): boolean => {
  const str = number.toString()
  const { length } = str
  for (let i = 0; i < length; i++) {
    if (str.charAt(i) === str.charAt(i + 1)) return true
  }
  return false
}

const numberHasPairOfAdjacentEqualDigits = (number: number): boolean => {
  const str = number.toString()
  const { length } = str
  let i = 0

  whileLoop: while (i < length) {
    if (str.charAt(i) !== str.charAt(i + 1)) {
      i++
    } else {
      if (str.charAt(i) !== str.charAt(i + 2)) {
        return true
      } else {
        for (let j = i + 3; j < length; j++) {
          if (str.charAt(j) !== str.charAt(i)) {
            i = j
            continue whileLoop
          }
        }
        i = length
      }
    }
  }

  return false
}

const numberNeverDecreases = (number: number): boolean => {
  const digits = number
    .toString()
    .split('')
    .map((str) => parseInt(str))
  const { length } = digits
  for (let i = length - 1; i > 0; i--) {
    if (digits[i] < digits[i - 1]) return false
  }
  return true
}

const isItAPassword = (number: number, part: number): boolean =>
  // It is a six-digit number.
  number >= 100000 &&
  number <= 999999 &&
  // The value is within the range given in your puzzle input. - This is handled in the input before we get here.
  true &&
  // Two adjacent digits are the same (like 22 in 122345).
  numberHasAdjacentEqualDigits(number) &&
  // Part 2 only: The two adjacent matching digits are not part of a larger group of matching digits.
  (part === 1 || numberHasPairOfAdjacentEqualDigits(number)) &&
  // Going from left to right, the digits never decrease; they only ever increase or stay the same (like 111123 or 135679).
  numberNeverDecreases(number)

export const findPossiblePasswords = (input: string) => ({
  answer1: parseInput(input).filter((number) => isItAPassword(number, 1))
    .length,
})

export const findPossibleNewPasswords = (input: string) => ({
  answer2: parseInput(input).filter((number) => isItAPassword(number, 2))
    .length,
})

const day04: Omit<DayConfig, 'year'> = {
  answer1Text: 'The input contains answer possible passwords.',
  answer2Text: 'The input contains answer possible passwords.',
  buttons: [
    {
      label: 'Find Possible Passwords',
      onClick: findPossiblePasswords,
    },
    {
      label: 'Find Possible Passwords w/ New Rule',
      onClick: findPossibleNewPasswords,
    },
  ],
  id: 4,
  inputs,
  title: 'Secure Container',
}

export default day04
