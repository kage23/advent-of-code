import React from 'react'
import {
  IButton,
  IDayConfig
} from '../Config'

import INPUT from '../Inputs/2018/Day8'

const calculateChecksum = (numbers: number[]): { answer1: string } => {
  let total = 0
  let childNodes = numbers.shift() || 0
  let metadataNodes = numbers.shift() || 0
  while (childNodes > 0) {
    const next = calculateChecksum(numbers)
    total += parseInt(next.answer1)
    childNodes--
  }
  while (metadataNodes > 0) {
    total += numbers.shift() || 0
    metadataNodes--
  }
  return {
    answer1: total.toString()
  }
}

const calculateRootNodeValue = (inputKey: string): { answer2: string } => {
  const numbers: number[] = INPUT[inputKey].split(' ').map(x => parseInt(x))
  return {
    answer2: calculateNodeValue(numbers).toString()
  }
}

const calculateNodeValue = (numbers: number[]): number => {
  let total = 0
  let childNodeCount = numbers.shift() || 0
  let childNodeValues: number[] = []
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
      total += typeof childID === 'number' ? childNodeValues[childID - 1] || 0 : 0
      metadataNodeCount--
    }
  }

  return total
}

export const renderDay = (dayConfig: IDayConfig, inputKey: string): JSX.Element => (
  <div className="render-box">
    <h3>Input:</h3>
    <p>{dayConfig.INPUT[inputKey]}</p>
  </div>
)

const BUTTONS: IButton[] = [
  {
    label: 'Calculate Checksum',
    onClick: (inputKey: string) => calculateChecksum(INPUT[inputKey].split(' ').map(x => parseInt(x)))
  },
  {
    label: 'Calculate Root Node Value',
    onClick: (inputKey: string) => calculateRootNodeValue(inputKey)
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The checksum is <code>{answer}</code>.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      The root node value is <code>{answer}</code>.
    </span>
  ),
  buttons: BUTTONS,
  day: 8,
  INPUT,
  renderDay,
  title: 'Memory Maneuver'
}

export default config