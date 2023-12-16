import inputs from '../../inputs/2017/day01'
import { DayConfig } from '../../routes/Day'

export const solveCaptcha1 = (input: string) => {
  let result = 0
  for (let i = 0; i < input.length; i++) {
    const number = parseInt(input[i])
    const nextNumber = parseInt(input[(i + 1) % input.length])
    if (number === nextNumber) result += number
  }
  return { answer1: result }
}

export const solveCaptcha2 = (input: string) => {
  const len = input.length
  let result = 0
  for (let i = 0; i < len; i++) {
    const number = parseInt(input[i])
    const nextNumber = parseInt(input[(i + len / 2) % len])
    if (number === nextNumber) result += number
  }
  return { answer2: result }
}

const day01: Omit<DayConfig, 'year'> = {
  answer1Text: 'The solution to the first half of the captcha is answer.',
  answer2Text: 'The solution to the second half of the captcha is answer.',
  buttons: [
    {
      label: 'Solve Captcha (First Half)',
      onClick: solveCaptcha1,
    },
    {
      label: 'Solve Captcha (Second Half)',
      onClick: solveCaptcha2,
    },
  ],
  id: 1,
  inputs,
  title: 'Inverse Captcha',
}

export default day01
