import inputs from '../../inputs/2020/day06'
import { DayConfig } from '../../routes/Day'

const countGroupYesses = (groupInput: string): number => {
  let uniqueYesses = ''
  groupInput.split('').forEach((char) => {
    if (char !== '\n' && !uniqueYesses.includes(char)) {
      uniqueYesses += char
    }
  })

  return uniqueYesses.length
}

const properlyCountGroupYesses = (groupInput: string): number => {
  let everyoneYesCount = 0
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'
  alphabet.split('').forEach((letter) => {
    if (
      groupInput
        .split('\n')
        .every((personInput) => personInput.includes(letter))
    ) {
      everyoneYesCount++
    }
  })
  return everyoneYesCount
}

export const checkAllGroupInputs = (input: string) => {
  const groupInputs = input.split('\n\n')

  return {
    answer1: groupInputs.reduce(
      (sum, groupInput): number => sum + countGroupYesses(groupInput),
      0
    ),
  }
}

export const properlyCheckAllGroupInputs = (input: string) => {
  const groupInputs = input.split('\n\n')

  return {
    answer2: groupInputs.reduce(
      (sum, groupInput): number => sum + properlyCountGroupYesses(groupInput),
      0
    ),
  }
}

const day06: Omit<DayConfig, 'year'> = {
  answer1Text: `The checksum for all the groups' inputs is answer.`,
  answer2Text: `The real checksum for all the groups' inputs is answer.`,
  buttons: [
    {
      label: 'Check All Group Inputs',
      onClick: checkAllGroupInputs,
    },
    {
      label: 'Properly Check All Group Inputs',
      onClick: properlyCheckAllGroupInputs,
    },
  ],
  id: 6,
  inputs,
  title: 'Custom Customs',
}

export default day06
