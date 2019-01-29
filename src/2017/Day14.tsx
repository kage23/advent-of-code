import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'

import INPUT from './Input/Day14'

import { generateKnotHash } from '../utils/Various'

const BUTTONS: IButton[] = [
  {
    label: 'Count Used Squares',
    onClick: (inputKey) => {
      let grid = ''
      for (let i = 0; i < 128; i++) {
        const hash = generateKnotHash(`${INPUT[inputKey]}-${i}`, 256)
        for (let j = 0; j < hash.length; j++) {
          grid += parseInt(hash[j], 16).toString(2).padStart(4, '0')
        }
        grid += '\n'
      }

      return {
        answer1: grid.split('').filter(x => x === '1').length.toString()
      }
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      <code>{answer}</code> squares are used.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      <code>{answer}</code>
    </span>
  ),
  buttons: BUTTONS,
  day: 14,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Disk Defragmentation'
}

export default config