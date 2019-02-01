import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'

import INPUT from './Input/Day22'

const BUTTONS: IButton[] = [
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      After <code>10,000</code> bursts of activity,{' '}
      <code>{answer}</code> bursts caused a node to become infected.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      <code>{answer}</code>
    </span>
  ),
  buttons: BUTTONS,
  day: 22,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Sporifica Virus'
}

export default config