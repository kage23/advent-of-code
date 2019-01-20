import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'

import INPUT from './Input/Day4'

const noRepeatedWordsValidity = (passphrase: string): boolean => {
  const words = passphrase.split(' ')
  return !words.some(word => words.indexOf(word) !== words.lastIndexOf(word))
}

const BUTTONS: IButton[] = [
  {
    label: 'Count Valid Passphrases (No Repeated Words)',
    onClick: (inputKey) => ({
      answer1: INPUT[inputKey]
        .split('\n')
        .filter(passphrase => noRepeatedWordsValidity(passphrase))
        .length
        .toString()
    })
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      <code>{answer}</code> passphrases are valid.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      <code>{answer}</code>
    </span>
  ),
  buttons: BUTTONS,
  day: 4,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'High-Entropy Passphrases'
}

export default config