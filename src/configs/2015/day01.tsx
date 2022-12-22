import inputs from '../../inputs/2015/day01'
import { DayConfig } from '../../routes/Day'

export const followInstructions = (inputKey: string) => {
  const input = inputs.get(inputKey)!
  const { length } = input

  let floor = 0
  for (let i = 0; i < length; i++) {
    switch (input.charAt(i)) {
      case '(':
        floor++
        break

      case ')':
        floor--
        break

      default:
        break
    }
  }

  return {
    answer1: floor,
  }
}

export const findBasement = (inputKey: string) => {
  const input = inputs.get(inputKey)!
  const { length } = input

  let floor = 0
  let i = 0
  for (; i < length; i++) {
    switch (input.charAt(i)) {
      case '(':
        floor++
        break

      case ')':
        floor--
        break

      default:
        break
    }
    if (floor <= -1) break
  }

  return {
    answer2: i + 1,
  }
}

const day01: Omit<DayConfig, 'year'> = {
  answer1Text: 'The instructions take Santa to Floor answer.',
  answer2Text: 'Santa first visits the Basement at Step answer.',
  buttons: [
    {
      label: 'Follow Instructions',
      onClick: followInstructions,
    },
    {
      label: 'Find Basement',
      onClick: findBasement,
    },
  ],
  id: 1,
  inputs,
  title: 'Not Quite Lisp',
}

export default day01
