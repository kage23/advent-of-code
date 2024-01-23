import inputs from '../../inputs/2021/day18'
import { DayConfig } from '../../routes/Day'

type SnailfishNumber = [number | SnailfishNumber, number | SnailfishNumber]

const getExplosionIndex = (number: string): number => {
  let nestCount = 0
  for (let i = 0; i < number.length; i++) {
    const char = number.charAt(i)
    if (char === '[') nestCount++
    if (char === ']') nestCount--
    if (nestCount === 5) return i
  }
  return -1
}

const processExplosion = (number: string, explosionIndex: number): string => {
  // Left part of number, before the exploding pair
  const newNumber = number.slice(0, explosionIndex).split('')

  const pairRegex = /\[\d{1,2},\d{1,2}]/
  const pair = (number.slice(explosionIndex).match(pairRegex) as RegExpMatchArray)[0]
  const [left, right]: [number, number] = JSON.parse(`${pair}`)

  // Find the next number to the left (if any) to add the left value to
  for (let li = explosionIndex - 1; li >= 0; li--) {
    const lChar = newNumber[li]
    const lnChar = Number(lChar)
    if (!isNaN(lnChar)) {
      const doubleDigit = !isNaN(Number(newNumber[li - 1]))
      if (doubleDigit) {
        const prevNumber = Number(`${newNumber[li - 1]}${newNumber[li]}`)
        newNumber.splice(li - 1, 2, `${prevNumber + left}`)
      } else {
        newNumber.splice(li, 1, `${lnChar + left}`)
      }
      break
    }
  }

  // Replace the pair itself with a 0
  newNumber.push('0')

  // Find the next number to the right (if any) to add the right value to
  let remainingNumber = number.slice(explosionIndex + pair.length)
  while (remainingNumber.length) {
    const rChar = remainingNumber.charAt(0)
    if (isNaN(Number(rChar))) {
      newNumber.push(rChar)
      remainingNumber = remainingNumber.slice(1)
    } else {
      const rNum = (remainingNumber.match(/\d{1,2}/) as RegExpMatchArray)[0]
      remainingNumber = remainingNumber.slice(rNum.length)
      newNumber.push(`${Number(rNum) + Number(right)}`)
      break
    }
  }
  newNumber.push(remainingNumber)

  return newNumber.join('')
}

const getFirstSplit = (number: string): number | undefined => {
  let array = JSON.parse(number) as unknown[]
  while (array.some(x => typeof x !== 'number')) array = array.flat()
  return (array as number[]).find(n => n >= 10)
}

const processSplit = (number: string, split: number): string => {
  const splitIndex = number.indexOf(`${split}`)

  const splitLeft = Math.floor(split / 2)
  const splitRight = Math.ceil(split / 2)

  return `${number.slice(0, splitIndex)
    }[${splitLeft},${splitRight}]${number.slice(splitIndex + split.toString().length)
    }`
}

const reduce = (number: string): string => {
  const explosionIndex = getExplosionIndex(number)
  if (explosionIndex > -1) {
    return reduce(processExplosion(number, explosionIndex))
  }
  const firstSplit = getFirstSplit(number)
  if (firstSplit !== undefined) {
    return reduce(processSplit(number, firstSplit))
  }
  return number
}

const sum = (numberA: string, numberB: string): string => reduce(`[${numberA},${numberB}]`)

const magnitude = (number: SnailfishNumber): number => {
  const leftMagnitude = (
    typeof number[0] === 'number' ?
      number[0] :
      magnitude(number[0])
  ) * 3

  const rightMagnitude = (
    typeof number[1] === 'number' ?
      number[1] :
      magnitude(number[1])
  ) * 2

  return leftMagnitude + rightMagnitude
}

export const sumNumbers = (input: string) => {
  const numbers = input.split('\n')

  let number = numbers.shift() as string

  while (numbers.length) {
    number = sum(number, numbers.shift() as string)
  }

  return {
    answer1: magnitude(JSON.parse(number))
  }
}

export const findLargestMagnitude = (input: string) => {
  const numbers = input.split('\n')
  const magnitudes: number[] = []

  for (let a = 0; a < numbers.length; a++) {
    for (let b = 0; b < numbers.length; b++) {
      if (a !== b) {
        magnitudes.push(magnitude(JSON.parse(sum(numbers[a], numbers[b]))))
      }
    }
  }

  return {
    answer2: Math.max(...magnitudes)
  }
}

const day18: Omit<DayConfig, 'year'> = {
  answer1Text: 'The magnitude of the final sum is answer.',
  answer2Text: 'The largest magnitude of any two numbers is answer.',
  buttons: [
    {
      label: 'Sum the Numbers',
      onClick: sumNumbers
    },
    {
      label: 'Find Largest Magnitude',
      onClick: findLargestMagnitude
    }
  ],
  id: 18,
  inputs,
  title: 'Snailfish',
}

export default day18
