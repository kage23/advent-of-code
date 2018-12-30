import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
 } from '../Config'

import INPUT from './Input/Day8'

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

const BUTTONS: IButton[] = [
  {
    label: 'Calculate Checksum',
    onClick: (inputKey: string) => calculateChecksum(INPUT[inputKey].split(' ').map(x => parseInt(x)))
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The solution is <code>{answer}</code>.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      The checksum is <code>{answer}</code>.
    </span>
  ),
  buttons: BUTTONS,
  day: 8,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Memory Maneuver'
}

export default config