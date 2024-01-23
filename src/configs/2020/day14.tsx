import inputs from '../../inputs/2020/day14'
import { DayConfig } from '../../routes/Day'
import { binToDec, decToBin } from '../../utils/Math'

const applyMask = (origValue: string, mask: string): string => {
  origValue = origValue.padStart(36, '0')
  const newValue = origValue.split('')
  for (let i = 0; i < mask.length; i++) {
    const maskChar = mask.charAt(i)
    if (maskChar === '0' || maskChar === '1') {
      newValue[i] = maskChar
    }
  }
  return newValue.join('')
}

export const runInitializer = (input: string) => {
  let mask = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
  const mem: Map<number, number> = new Map()

  input.split('\n').forEach((memInstruction) => {
    if (memInstruction.startsWith('mask')) {
      mask = memInstruction.split(' = ')[1]
    } else {
      const memAddress = parseInt(memInstruction.split('mem[')[1])
      const origDecimalValue = parseInt(memInstruction.split(' = ')[1])
      const origBinaryValue = decToBin(origDecimalValue)
      const maskedBinaryValue = applyMask(origBinaryValue, mask)
      const maskedDecimalValue = binToDec(maskedBinaryValue)
      mem.set(memAddress, maskedDecimalValue)
    }
  })

  return {
    answer1: [...mem.values()].reduce((a, b) => a + b, 0),
  }
}

const applyMask__v2 = (origValue: string, mask: string): string => {
  origValue = origValue.padStart(36, '0')
  const newValue = origValue.split('')
  for (let i = 0; i < mask.length; i++) {
    const maskChar = mask.charAt(i)
    if (maskChar === '1' || maskChar === 'X') {
      newValue[i] = maskChar
    }
  }
  return newValue.join('')
}

const getMemAddresses = (mask: string[], memAddresses?: number[]): number[] => {
  memAddresses = memAddresses || ([] as number[])

  if (!mask.includes('X')) {
    memAddresses.push(binToDec(mask.join('')))
    return memAddresses
  }

  const firstXIndex = mask.findIndex((x) => x === 'X')
  const newMask = JSON.parse(JSON.stringify(mask))
  newMask[firstXIndex] = '0'
  const zeroVersion = newMask.join('').split('')
  newMask[firstXIndex] = '1'
  const oneVersion = newMask.join('').split('')
  memAddresses = memAddresses?.concat(
    getMemAddresses(zeroVersion),
    getMemAddresses(oneVersion)
  )

  return memAddresses
}

export const runInitializer2 = (input: string) => {
  let mask = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
  const mem: Map<number, number> = new Map()

  input.split('\n').forEach((memInstruction) => {
    if (memInstruction.startsWith('mask')) {
      mask = memInstruction.split(' = ')[1]
    } else {
      const value = parseInt(memInstruction.split(' = ')[1])
      const address = parseInt(memInstruction.split('mem[')[1])
      const origBinaryAddress = decToBin(address)
      const maskedBinaryAddress = applyMask__v2(origBinaryAddress, mask).split(
        ''
      )
      const memAddresses = getMemAddresses(maskedBinaryAddress)
      memAddresses.forEach((memAddress) => {
        mem.set(memAddress, value)
      })
    }
  })

  return {
    answer2: [...mem.values()].reduce((a, b) => a + b, 0),
  }
}

const day14: Omit<DayConfig, 'year'> = {
  answer1Text: 'The sum of all memory values is answer.',
  answer2Text: 'The sum of all memory values in version 2 is answer.',
  buttons: [
    {
      label: 'Run Initializer',
      onClick: runInitializer,
    },
    {
      label: 'Run Initializer, v2',
      onClick: runInitializer2,
    },
  ],
  id: 14,
  inputs,
  title: 'Docking Data',
}

export default day14
