import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'

import INPUT from './Input/Day12'

const BUTTONS: IButton[] = [
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      <code>{answer}</code>
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      <code>{answer}</code>
    </span>
  ),
  buttons: BUTTONS,
  day: 12,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Digital Plumber'
}

export default config