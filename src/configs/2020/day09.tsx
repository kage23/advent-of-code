import inputs from '../../inputs/2020/day09'
import { DayConfig } from '../../routes/Day'

const getValidNumbers = (inputSlice: number[]): number[] => {
  const validNumbers: number[] = []
  for (let i = 0; i < inputSlice.length; i++) {
    for (let j = i + 1; j < inputSlice.length; j++) {
      const sum = inputSlice[i] + inputSlice[j]
      if (!validNumbers.includes(sum)) {
        validNumbers.push(sum)
      }
    }
  }
  return validNumbers
}

const findFirstInvalid = (input: number[], preambleLength: number): number => {
  for (let i = preambleLength; i < input.length; i++) {
    if (
      !getValidNumbers(input.slice(i - preambleLength, i)).includes(input[i])
    ) {
      return input[i]
    }
  }
  throw new Error('all numbers are valid')
}

export const findFirstInvalidNumber = (
  inputRaw: string,
  preambleLength = 25
) => {
  const input = inputRaw.split('\n').map((x) => parseInt(x))

  return {
    answer1: findFirstInvalid(input, preambleLength),
  }
}

const findEncryptionList = (
  input: number[],
  encryptionKey: number
): number[] => {
  for (let i = 0; i < input.length; i++) {
    let localSum = input[i]
    let j = 0
    for (j = i + 1; localSum < encryptionKey && j < input.length; j++) {
      localSum += input[j]
    }
    if (localSum === encryptionKey) {
      return input.slice(i, j)
    }
  }
  throw new Error('encryption list not found')
}

export const findEncryptionWeakness = (
  inputRaw: string,
  preambleLength = 25
) => {
  const input = inputRaw.split('\n').map((x) => parseInt(x))

  const encryptionKey = findFirstInvalid(input, preambleLength)
  const encryptionList = findEncryptionList(input, encryptionKey)

  let min = Number.MAX_SAFE_INTEGER
  let max = Number.MIN_SAFE_INTEGER

  encryptionList.forEach((x) => {
    min = Math.min(min, x)
    max = Math.max(max, x)
  })

  return {
    answer2: min + max,
  }
}

const day09: Omit<DayConfig, 'year'> = {
  answer1Text: 'The first invalid number is answer.',
  answer2Text: 'The encryption weakness in the encrypted numbers is answer.',
  buttons: [
    {
      label: 'Find First Invalid Number',
      onClick: findFirstInvalidNumber,
    },
    {
      label: 'Find Encryption Weakness',
      onClick: findEncryptionWeakness,
    },
  ],
  id: 9,
  inputs,
  title: 'Encoding Error',
}

export default day09
