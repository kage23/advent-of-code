import inputs from '../../inputs/2016/day25'
import { DayConfig } from '../../routes/Day'

const halfEvenOdd = (number: number, even: boolean): boolean => (
  Math.floor(number / 2) % 2 === (even ? 0 : 1)
)

const evenOddHalves = (number: number, checkEven: boolean): boolean => {
  if (number === 0) {
    return !checkEven
  }
  if (halfEvenOdd(number, checkEven)) {
    return evenOddHalves(Math.floor(number / 2), !checkEven)
  }
  return false
}

export const findAGoodNumber = () => {
  // Find a number that will be floor-halved to even, then to odd, then to even, etc.
  // Minimum is 2551
  // Then the answer will be that number MINUS 2550
  let i = 2551
  while (!evenOddHalves(i, false)) i++

  return { answer1: (i - 2550) }
}

const day25: Omit<DayConfig, 'year'> = {
  answer1Text: 'You should manually analyze the Assembunny program and figure out what it does!',
  answer2Text: 'The number to input is answer.',
  buttons: [
    {
      label: 'Work It Out Yourself',
      onClick: () => ({ answer1: '' }),
    },
    {
      label: 'Find a Good Number',
      onClick: findAGoodNumber,
    }
  ],
  id: 25,
  inputs,
  title: 'Clock Signal'
}

export default day25
