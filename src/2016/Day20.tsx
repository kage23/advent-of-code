import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'

import INPUT from './Input/Day20'

const generateBannedList = (inputKey: string): number[][] => (
  INPUT[inputKey]
    .split('\n')
    .map(range => (
      range.split('-').map(x => parseInt(x))
    ))
    .sort((a, b) => a[0] - b[0])
    .reduce((list, currentRange) => {
      if (!list.length) {
        list.push(currentRange)
      } else {
        const highest = list[list.length - 1]
        if (currentRange[0] > highest[1] + 1) {
          list.push(currentRange)
        } else {
          highest[1] = Math.max(currentRange[1], highest[1])
        }
      }
      return list
    }, [] as number[][])
)

const BUTTONS: IButton[] = [
  {
    label: 'Find Lowest Unbanned IP',
    onClick: (inputKey: string) => {
      const bannedRanges = generateBannedList(inputKey)

      return {
        answer1: (bannedRanges[0][1] + 1).toString()
      }
    }
  },
  {
    label: 'Find All Unbanned IPs',
    onClick: (inputKey: string) => {
      const bannedRanges = generateBannedList(inputKey)
      const upperLimit = inputKey.startsWith('DEMO') ? 9 : 4294967295

      let allowedCount = bannedRanges[0][0]

      for (let i = 1; i < bannedRanges.length; i++) {
        const prevBannedRange = bannedRanges[i - 1]
        const bannedRange = bannedRanges[i]
        allowedCount += (bannedRange[0] - prevBannedRange[1] - 1)
      }

      allowedCount += upperLimit - bannedRanges[bannedRanges.length - 1][1]

      return {
        answer2: allowedCount.toString()
      }
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The lowest unblocked IP value is <code>{answer}</code>.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      There are <code>{answer}</code> allowed IPs.
    </span>
  ),
  buttons: BUTTONS,
  day: 20,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Firewall Rules'
}

export default config