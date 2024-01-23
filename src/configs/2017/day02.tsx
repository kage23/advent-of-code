import inputs from '../../inputs/2017/day02'
import { DayConfig } from '../../routes/Day'

export const getChecksum = (input: string) => {
  let answer1 = 0
  input.split('\n').forEach((row) => {
    let min = Number.MAX_SAFE_INTEGER
    let max = Number.MIN_SAFE_INTEGER
    row.split(/\s/).forEach((numStr) => {
      const num = parseInt(numStr)
      min = Math.min(min, num)
      max = Math.max(max, num)
    })
    answer1 += max - min
  })
  return { answer1 }
}

export const divideRowNumbers = (input: string) => {
  let answer2 = 0
  input.split('\n').forEach((row) => {
    const numbers = row.split(/\s/)
    numLoop: for (let i = 0; i < numbers.length; i++) {
      const number = parseInt(numbers[i])
      for (let j = i + 1; j < numbers.length; j++) {
        const nextNumber = parseInt(numbers[j])
        const testNum =
          Math.max(number, nextNumber) / Math.min(number, nextNumber)
        if (testNum === Math.floor(testNum)) {
          answer2 += testNum
          break numLoop
        }
      }
    }
  })
  return { answer2 }
}

const day02: Omit<DayConfig, 'year'> = {
  answer1Text: 'The checksum is answer.',
  answer2Text: 'The final result is answer.',
  buttons: [
    {
      label: 'Get Checksum',
      onClick: getChecksum,
    },
    {
      label: 'Divide Row Numbers',
      onClick: divideRowNumbers,
    },
  ],
  id: 2,
  inputs,
  title: 'Corruption Checksum',
}

export default day02
