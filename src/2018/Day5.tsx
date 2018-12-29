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

const reactPolymer = (inputKey: string): { answer1: string } => {
  let result = INPUT[inputKey]
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

const BUTTONS: IButton[] = [
  {
    label: 'React Polymer',
    onClick: reactPolymer
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The resulting polymer length is <code>{answer.length}</code>.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      {/* The sleepiest guard-minute is <code>#{answer2_a}-{answer2_b}</code>. */}
      The solution is <code>{answer}</code>.
    </span>
  ),
  buttons: BUTTONS,
  day: 5,
  INPUT,
  renderDay,
  title: 'Alchemical Reduction'
}

export default config