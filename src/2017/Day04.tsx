import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'

import INPUT from '../Inputs/2017/Day04'

const areAnagrams = (word1: string, word2: string): boolean => {
  if (word1.length !== word2.length) return false
  else {
    let testWord = word2.split('')
    for (let i = 0; i < word1.length; i++) {
      const foundIndex = testWord.indexOf(word1[i])
      if (foundIndex !== -1) testWord.splice(foundIndex, 1)
    }
    return testWord.length === 0
  }
}

const noAnagramsValidity = (passphrase: string): boolean => {
  const words = passphrase.split(' ')
  return !(
    words.some((word, i) => (
      words.some((someWord, j) => i !== j && areAnagrams(word, someWord))
    ))
  )
}

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
  },
  {
    label: 'Count Valid Passphrases (No Anagrams)',
    onClick: (inputKey) => ({
      answer2: INPUT[inputKey]
        .split('\n')
        .filter(passphrase => noAnagramsValidity(passphrase))
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
      <code>{answer}</code> passphrases are valid.
    </span>
  ),
  buttons: BUTTONS,
  day: 4,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'High-Entropy Passphrases'
}

export default config