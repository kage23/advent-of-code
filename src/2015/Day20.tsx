import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'

import INPUT from '../Inputs/2015/Day20'

const presentsAtHouseNumber = (houseNumber: number, presentsPerElf: number, maxHousesPerElf?: number): number =>
  (sumOfAllDivisors(houseNumber, maxHousesPerElf) + houseNumber) * presentsPerElf

const sumOfAllDivisors = (houseNumber: number, maxHousesPerElf?: number): number => {
  if (houseNumber === 1) return 0

  let result = 0

  // Prime factors are always less than or equal to sqrt(num)
  for (let elfNumber = 2; elfNumber <= Math.sqrt(houseNumber); elfNumber++) {
    // If i is a divisor of num
    if (houseNumber % elfNumber === 0) {
      const otherElf = houseNumber / elfNumber
      // If both divisors are the same, add it once. Otherwise, add them both
      if (elfNumber === otherElf) {
        if (typeof maxHousesPerElf === 'undefined' || houseNumber <= (elfNumber * maxHousesPerElf)) {
          result += elfNumber
        }
      } else {
        if (typeof maxHousesPerElf === 'undefined' || houseNumber <= (elfNumber * maxHousesPerElf)) {
          result += elfNumber
        }
        if (typeof maxHousesPerElf === 'undefined' || houseNumber <= (otherElf * maxHousesPerElf)) {
          result += otherElf
        }
      }
    }
  }

  // One is a divisor of everything, so add 1 to the result
  return result + 1
}

const BUTTONS: IButton[] = [
  {
    label: 'Find the Present House',
    onClick: (inputKey) => {
      const target = parseInt(INPUT[inputKey])

      let i = 1
      let presents = presentsAtHouseNumber(i, 10)
      while (presents < target) {
        if (i % 1000 === 0) console.log(`House number ${i} received ${presents} presents, which is${presents < target ? ' not ' : ' '}enough.`)
        i++
        presents = presentsAtHouseNumber(i, 10)
      }

      return {
        answer1: i.toString()
      }
    }
  },
  {
    label: 'Find the Present House, v2',
    onClick: (inputKey) => {
      const target = parseInt(INPUT[inputKey])

      let i = 1
      let presents = presentsAtHouseNumber(i, 11, 50)
      while (presents < target) {
        if (i % 1000 === 0) console.log(`House number ${i} received ${presents} presents, which is${presents < target ? ' not ' : ' '}enough.`)
        i++
        presents = presentsAtHouseNumber(i, 11, 50)
      }

      return {
        answer2: i.toString()
      }
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      House #<code>{answer}</code> gets that many presents.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      House #<code>{answer}</code> gets that many presents.
    </span>
  ),
  buttons: BUTTONS,
  day: 20,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Infinite Elves and Infinite Houses'
}

export default config