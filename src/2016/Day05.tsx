import React from 'react'
import md5 from 'md5'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'

import INPUT from '../Inputs/2016/Day05'

const BUTTONS: IButton[] = [
  {
    label: 'Find Password',
    onClick: inputKey => {
      const input = INPUT[inputKey]
      let password = ''

      for (let i = 0; true; i++) {
        const hash = md5(`${input}${i}`)
        if (hash.startsWith('00000')) {
          password += hash.charAt(5)
          console.log(`Hash found at index ${i}: ${hash}. Password: ${password}.`)
          if (password.length === 8) break
        } else if (i % 10000 === 0) console.log('Searching...')
      }

      return {
        answer1: password
      }
    }
  },
  {
    label: 'Find Password, v. 2',
    onClick: inputKey => {
      const input = INPUT[inputKey]
      let password = '________'

      for (let i = 0; true; i++) {
        const hash = md5(`${input}${i}`)
        if (hash.startsWith('00000') && parseInt(hash.charAt(5)) < 8) {
          const index = parseInt(hash.charAt(5))
          if (password.charAt(index) === '_') {
            password = `${password.slice(0, index)}${hash.charAt(6)}${password.slice(index + 1)}`
            console.log(`Hash found at index ${i}: ${hash}. Password: ${password}.`)
            if (password.indexOf('_') === -1) break
          }
        } else if (i % 10000 === 0) console.log('Searching...')
      }

      return {
        answer2: password
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
      The password is{' '}
      <code>{answer}</code>.
    </span>
  ),
  buttons: BUTTONS,
  day: 5,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'How About a Nice Game of Chess?'
}

export default config