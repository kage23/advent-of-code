import inputs from '../../inputs/2018/day08'
import { DayConfig } from '../../routes/Day'

const calculateChecksum = (numbers: number[]) => {
  let total = 0
  let childNodes = numbers.shift() || 0
  let metadataNodes = numbers.shift() || 0
  while (childNodes > 0) {
    const next = calculateChecksum(numbers)
    total += next.answer1
    childNodes--
  }
  while (metadataNodes > 0) {
    total += numbers.shift() || 0
    metadataNodes--
  }
  return {
    answer1: total,
  }
}

const calculateNodeValue = (numbers: number[]): number => {
  let total = 0
  let childNodeCount = numbers.shift() || 0
  const childNodeValues: number[] = []
  let metadataNodeCount = numbers.shift() || 0
  if (childNodeCount === 0) {
    while (metadataNodeCount > 0) {
      total += numbers.shift() || 0
      metadataNodeCount--
    }
    return total
  } else {
    while (childNodeCount > 0) {
      childNodeValues.push(calculateNodeValue(numbers))
      childNodeCount--
    }
    while (metadataNodeCount > 0) {
      const childID = numbers.shift()
      total +=
        typeof childID === 'number' ? childNodeValues[childID - 1] || 0 : 0
      metadataNodeCount--
    }
  }

  return total
}

export const getChecksum = (input: string) =>
  calculateChecksum(input.split(' ').map((x) => parseInt(x)))

export const getRootNodeValue = (input: string) => {
  const numbers: number[] = input.split(' ').map((x) => parseInt(x))
  return {
    answer2: calculateNodeValue(numbers),
  }
}

const day08: Omit<DayConfig, 'year'> = {
  answer1Text: 'The checksum is answer.',
  answer2Text: 'The root node value is answer.',
  buttons: [
    {
      label: 'Calculate Checksum',
      onClick: getChecksum,
    },
    {
      label: 'Calculate Root Node Value',
      onClick: getRootNodeValue,
    },
  ],
  id: 8,
  inputs,
  title: 'Memory Maneuver',
}

export default day08
