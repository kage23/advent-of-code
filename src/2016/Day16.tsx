import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'

import INPUT from './Input/Day16'

const generateDragonData = (a: string): string => {
  const b = a.split('').reverse().map(x => x === '0' ? '1' : '0').join('')
  return `${a}0${b}`
}

const getChecksum = (data: string): string => {
  let checksum = getChecksumOnce(data)
  while (checksum.length % 2 === 0) checksum = getChecksumOnce(checksum)
  return checksum
}

const getChecksumOnce = (data: string): string => {
  let checksum = ''
  for (let i = 0; i < data.length; i += 2) {
    const pair = [data.charAt(i), data.charAt(i + 1)]
    if (pair[0] === pair[1]) checksum += '1'
    else checksum += '0'
  }
  return checksum
}

const BUTTONS: IButton[] = [
  {
    label: 'Fill Disc',
    onClick: (inputKey: string) => {
      const input = INPUT[inputKey]
      const discSize = inputKey.startsWith('DEMO') ? 20 : 272

      let disc = input

      while (disc.length < discSize) {
        disc = generateDragonData(disc)
      }

      disc = disc.slice(0, discSize)

      return {
        answer1: getChecksum(disc)
      }
    }
  },
  {
    label: 'Fill the Other Disc',
    onClick: (inputKey: string) => {
      const input = INPUT[inputKey]
      const discSize = 35651584

      let disc = input

      while (disc.length < discSize) {
        disc = generateDragonData(disc)
      }

      disc = disc.slice(0, discSize)

      return {
        answer2: getChecksum(disc)
      }
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The checksum of the filled disc is <code>{answer}</code>.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      The checksum of the filled disc is <code>{answer}</code>.
    </span>
  ),
  buttons: BUTTONS,
  day: 16,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Dragon Checksum'
}

export default config