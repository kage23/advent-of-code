import inputs from '../../inputs/2015/day20'
import { DayConfig } from '../../routes/Day'

const sumOfAllDivisors = (
  houseNumber: number,
  maxHousesPerElf?: number
): number => {
  if (houseNumber === 1) return 0

  let result = 0

  // Prime factors are always less than or equal to sqrt(num)
  for (let elfNumber = 2; elfNumber <= Math.sqrt(houseNumber); elfNumber++) {
    // If i is a divisor of num
    if (houseNumber % elfNumber === 0) {
      const otherElf = houseNumber / elfNumber
      // If both divisors are the same, add it once. Otherwise, add them both
      if (elfNumber === otherElf) {
        if (
          typeof maxHousesPerElf === 'undefined' ||
          houseNumber <= elfNumber * maxHousesPerElf
        ) {
          result += elfNumber
        }
      } else {
        if (
          typeof maxHousesPerElf === 'undefined' ||
          houseNumber <= elfNumber * maxHousesPerElf
        ) {
          result += elfNumber
        }
        if (
          typeof maxHousesPerElf === 'undefined' ||
          houseNumber <= otherElf * maxHousesPerElf
        ) {
          result += otherElf
        }
      }
    }
  }

  // One is a divisor of everything, so add 1 to the result
  return result + 1
}

export const presentsAtHouseNumber = (
  houseNumber: number,
  presentsPerElf: number,
  maxHousesPerElf?: number
): number =>
  (sumOfAllDivisors(houseNumber, maxHousesPerElf) + houseNumber) *
  presentsPerElf

export const findThePresentHouse = (input: string) => {
  const target = parseInt(input)

  let i = 1
  let presents = presentsAtHouseNumber(i, 10)
  while (presents < target) {
    i++
    presents = presentsAtHouseNumber(i, 10)
  }

  return {
    answer1: i,
  }
}

export const findThePresentHouseWithLazierElves = (input: string) => {
  const target = parseInt(input)

  let i = 1
  let presents = presentsAtHouseNumber(i, 11, 50)
  while (presents < target) {
    i++
    presents = presentsAtHouseNumber(i, 11, 50)
  }

  return {
    answer2: i,
  }
}

const day20: Omit<DayConfig, 'year'> = {
  answer1Text: 'House #answer gets that many presents.',
  answer2Text: 'With lazier elves, house #answer gets that many presents.',
  buttons: [
    {
      label: 'Find the Present House',
      onClick: findThePresentHouse,
    },
    {
      label: 'Find the Present House with Lazier Elves',
      onClick: findThePresentHouseWithLazierElves,
    },
  ],
  id: 20,
  inputs,
  title: 'Infinite Elves and Infinite Houses',
}

export default day20
