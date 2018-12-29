import React from 'react'
import {
  IButton,
  IDayConfig
 } from '../Config'

import INPUT from './Input/Day5'

const renderDay = (
  dayConfig: IDayConfig,
  inputKey: string,
  answer1: false | string,
  answer2: false | string
): JSX.Element => {
  const display = typeof answer2 === 'string'
    ? answer2
    : typeof answer1 === 'string'
      ? answer1
      : dayConfig.INPUT[inputKey]

  return (
    <div>
      <p>Polymer:</p>
      <pre>{display}</pre>
    </div>
  )
}

let answer2_a = ''

const reactPolymer = (inputKey: string, filter?: string): { answer1: string } => {
  let result = INPUT[inputKey]
    .split('')
    .filter(letter => !filter || letter.toLowerCase() !== filter.toLowerCase())
    .join('')
  let i = 0
  while (i < result.length) {
    const currentLetter = result[i]
    const nextLetter = result[i + 1]
    if (nextLetter && currentLetter !== nextLetter && currentLetter.toLowerCase() === nextLetter.toLowerCase()) {
      result = `${result.slice(0, i)}${result.slice(i + 2)}`
      i = Math.max(0, i - 1)
    } else i++
  }
  return {
    answer1: result
  }
}

const findPolymerFilter = (input: string): { answer2: string } => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let shortestPolymer = ''
  let bestFilter = ''
  for (const letter of alphabet) {
    const result = reactPolymer(input, letter)
    if (bestFilter.length === 0 || result.answer1.length < shortestPolymer.length) {
      shortestPolymer = result.answer1
      bestFilter = letter
    }
  }
  answer2_a = bestFilter
  return { answer2: shortestPolymer }
}

const BUTTONS: IButton[] = [
  {
    label: 'React Polymer',
    onClick: reactPolymer
  },
  {
    label: 'Find Polymer Filter',
    onClick: findPolymerFilter
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The length of the resulting polymer length <code>{answer.length}</code>.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      The best filter for the polymer is <code>{answer2_a}</code>.{' '}
      The length of the resulting polymer length <code>{answer.length}</code>.
    </span>
  ),
  buttons: BUTTONS,
  day: 5,
  INPUT,
  renderDay,
  title: 'Alchemical Reduction'
}

export default config