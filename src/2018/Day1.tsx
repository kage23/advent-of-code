import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
 } from '../Config'

import INPUT from './Input/Day1'

const findFrequency = (inputKey: string) => {
  const input = parseInput(inputKey)
  let count = 0
  input.forEach(n => count += n)
  return {
    answer1: count.toString()
  }
}

const findRepeatedFrequency = (inputKey: string) => {
  const input = parseInput(inputKey)
  const n = input.length
  let freq = 0
  let foundFreqs: boolean[] = []
  let i = 0
  while(!foundFreqs[freq]) {
    foundFreqs[freq] = true
    freq += input[i]
    i += 1
    if (i >= n) i = 0
  }
  return {
    answer2: freq.toString()
  }
}

const findRepeatedFrequency__slow = (inputKey: string) => {
  const input = parseInput(inputKey)
  const n = input.length
  let freq = 0
  let foundFreqs: number[] = []
  let i = 0
  while (foundFreqs.indexOf(freq) === -1) {
    foundFreqs.push(freq)
    freq += input[i]
    i = i + 1 < n ? i + 1 : 0
  }
  return {
    answer2: freq.toString()
  }
}

const BUTTONS: IButton[] = [
  {
    label: 'Find Frequency',
    onClick: findFrequency
  },
  {
    label: 'Find Repeated Frequency',
    onClick: findRepeatedFrequency
  },
  {
    label: 'Find Repeated Frequency (Slow)',
    onClick: findRepeatedFrequency__slow
  }
]

const parseInput = (input: string): number[] => INPUT[input].split('\n').map(a => parseInt(a))

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The resulting frequency is{' '}
      <code>{answer}</code>.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      The first frequency reached twice is{' '}
      <code>{answer}</code>.
    </span>
  ),
  buttons: BUTTONS,
  day: 1,
  INPUT,
  renderDay: (inputKey) => defaultRenderDay(inputKey),
  title: 'Chronal Calibration'
}

export default config