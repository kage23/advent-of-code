import inputs from '../../inputs/2020/day04'
import { DayConfig } from '../../routes/Day'

const isValidPassport = (passport: string): boolean => {
  const requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']

  const fields = passport
    .split(/\s+/)
    .map((keyValue: string) => keyValue.split(':')[0])

  return requiredFields.every((field) => fields.includes(field))
}

const isValidField = (keyValue: string): boolean => {
  const [key, value] = keyValue.split(':')
  switch (key) {
    case 'byr':
      return Number(value) >= 1920 && Number(value) <= 2002

    case 'iyr':
      return Number(value) >= 2010 && Number(value) <= 2020

    case 'eyr':
      return Number(value) >= 2020 && Number(value) <= 2030

    case 'hgt': {
      const height = parseInt(value)
      const format = value.slice(-2)
      return format === 'cm'
        ? height >= 150 && height <= 193
        : format === 'in'
        ? height >= 59 && height <= 76
        : false
    }

    case 'hcl':
      return (
        value.charAt(0) === '#' &&
        value
          .slice(1)
          .split('')
          .every(
            (char) =>
              (Number(char) >= 0 && Number(char) <= 9) ||
              char === 'a' ||
              char === 'b' ||
              char === 'c' ||
              char === 'd' ||
              char === 'e' ||
              char === 'f'
          )
      )

    case 'ecl':
      return ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(value)

    case 'pid':
      return (
        value.length === 9 &&
        value.split('').every((char) => !isNaN(Number(char)))
      )

    case 'cid':
      return true

    default:
      return false
  }
}

const isActuallyValidPassport = (passport: string): boolean => {
  if (!isValidPassport(passport)) return false

  return passport.split(/\s+/).every(isValidField)
}

export const validatePassports = (input: string) => ({
  answer1: input.split('\n\n').filter(isValidPassport).length,
})

export const properlyValidatePassports = (input: string) => ({
  answer2: input.split('\n\n').filter(isActuallyValidPassport).length,
})

const day04: Omit<DayConfig, 'year'> = {
  answer1Text: 'answer passports are valid (ignoring cid).',
  answer2Text: 'answer passports are ACTUALLY valid (ignoring cid).',
  buttons: [
    {
      label: 'Validate Passports',
      onClick: validatePassports,
    },
    {
      label: 'Properly Validate Passports',
      onClick: properlyValidatePassports,
    },
  ],
  id: 4,
  inputs,
  title: 'Passport Processing',
}

export default day04
