import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'

import INPUT from './Input/Day7'

const hasAbba = (input: string): boolean => {
  for (let i = 0; i <= input.length - 4; i++) {
    const a = input[i]
    const b = input[i + 1]
    if (a !== b && input.slice(i, i + 4) === `${a}${b}${b}${a}`) return true
  }
  return false
}

const checkForTLS = (input: string): boolean => {
  const nonHypernetSequences: string[] = ['']
  const hypernetSequences: string[] = []
  let inHyper = false
  let nonHyperIndex = 0
  let hyperIndex = -1

  for (const character of input) {
    switch (character) {
      case '[':
      inHyper = true
      hyperIndex++
      hypernetSequences[hyperIndex] = ''
      break

      case ']':
      inHyper = false
      nonHyperIndex++
      nonHypernetSequences[nonHyperIndex] = ''
      break

      default:
      if (inHyper) hypernetSequences[hyperIndex] += character
      else nonHypernetSequences[nonHyperIndex] += character
    }
  }

  return (
    nonHypernetSequences.some(sequence => hasAbba(sequence))
    && !hypernetSequences.some(sequence => hasAbba(sequence))
  )
}

const BUTTONS: IButton[] = [
  {
    label: 'Check IPs for TLS Support',
    onClick: inputKey => {
      return {
        answer1: INPUT[inputKey].split('\n').filter(line => checkForTLS(line)).length.toString()
      }
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      <code>{answer}</code> IPs support TLS.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      <code>{answer}</code>
    </span>
  ),
  buttons: BUTTONS,
  day: 7,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Internet Protocol Version 7'
}

export default config