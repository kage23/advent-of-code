import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'

import INPUT from './Input/Day9'

const findEncryptionList = (input: number[], encryptionKey: number): number[] => {
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

const findFirstInvalid = (input: number[], preambleLength: number): number => {
  for (let i = preambleLength; i < input.length; i++) {
    if (!getValidNumbers(input.slice(i - preambleLength, i)).includes(input[i])) {
      return input[i]
    }
  }
  throw new Error('all numbers are valid')
}

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

const BUTTONS: IButton[] = [
  {
    label: 'Find First Invalid Number',
    onClick: (inputKey: string) => {
      const input = INPUT[inputKey].split('\n').map(x => parseInt(x))

      return {
        answer1: findFirstInvalid(input, inputKey.startsWith('DEMO') ? 5 : 25).toString()
      }
    }
  },
  {
    label: 'Find Encryption Weakness',
    onClick: (inputKey: string) => {
      const input = INPUT[inputKey].split('\n').map(x => parseInt(x))

      const encryptionKey = findFirstInvalid(input, inputKey.startsWith('DEMO') ? 5 : 25)
      const encryptionList = findEncryptionList(input, encryptionKey)

      let min = Number.MAX_SAFE_INTEGER
      let max = Number.MIN_SAFE_INTEGER

      encryptionList.forEach(x => {
        min = Math.min(min, x)
        max = Math.max(max, x)
      })

      return {
        answer2: (min + max).toString()
      }
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The first invalid number is <code>{answer}</code>.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      The encryption weakness in the encrypted numbers is <code>{answer}</code>.
    </span>
  ),
  buttons: BUTTONS,
  day: 9,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Encoding Error'
}

export default config