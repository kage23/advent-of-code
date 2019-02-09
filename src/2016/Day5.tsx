import React from 'react'
import md5 from 'md5'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'

import INPUT from './Input/Day5'

const BUTTONS: IButton[] = [
  {
    label: 'Find Password',
    onClick: inputKey => {
      const input = INPUT[inputKey]
      let password = ''

      letterLoop:
      for (let i = 0; true; i++) {
        const hash = md5(`${input}${i}`)
        if (hash.startsWith('00000')) {
          password += hash.charAt(5)
          console.log(`Hash found at index ${i}: ${hash}. Password: ${password}.`)
          if (password.length === 8) break letterLoop
        } else if (i % 10000 === 0) console.log('Searching...')
      }

      return {
        answer1: password
      }
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The password is{' '}
      <code>{answer}</code>.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      <code>{answer}</code>
    </span>
  ),
  buttons: BUTTONS,
  day: 5,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'How About a Nice Game of Chess?'
}

export default config