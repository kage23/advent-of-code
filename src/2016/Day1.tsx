import React from 'react'
import {
  IButton,
  IDayConfig
} from '../Config'

import INPUT from './Input/Day1'

const BUTTONS: IButton[] = [
]

const renderDay = (dayConfig: IDayConfig, inputKey: string): JSX.Element => (
  <div className="render-box">
    <h3>Input:</h3>
    <pre className="render-box--pre-wrap">{dayConfig.INPUT[inputKey]}</pre>
  </div>
)

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The Easter Bunny HQ is{' '}
      <code>{answer}</code> blocks away.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      <code>{answer}</code>
    </span>
  ),
  buttons: BUTTONS,
  day: 1,
  INPUT,
  renderDay,
  title: 'No Time for a Taxicab'
}

export default config