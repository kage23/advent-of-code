import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'

import INPUT from '../Inputs/2022/Day13'

type Item = number | Item[] | undefined

const isPairSorted = (a: Item, b: Item): boolean | undefined => {
  if (a === undefined) return b === undefined ? undefined : false
  // Right side ran out of items
  if (b === undefined) return false
  if (typeof a === typeof b) {
    if (typeof a === 'number') {
      return a === b ? undefined : a < b!
    }
    for (let i = 0; i < a.length; i++) {
      const subA = a[i]
      const subB = (b as Item[])[i]
      const subSort = isPairSorted(subA, subB)
      if (subSort !== undefined) return subSort
    }
    // Left side ran out of items
    if (a.length < (b as Item[]).length) return true
  } else {
    if (typeof a === 'number') return isPairSorted([a], b)
    return isPairSorted(a, [b])
  }
}

const BUTTONS: IButton[] = [
  {
    label: 'Examine Pairs',
    onClick: (inputKey: string) => {
      const pairs = INPUT[inputKey].split('\n\n')

      return {
        answer1: pairs.reduce((accumulator, pair, index) => {
          const [a, b] = pair.split('\n').map(x => JSON.parse(x) as Item)
          return isPairSorted(a, b) ? accumulator + (index + 1) : accumulator
        }, 0).toString()
      }
    }
  },
  {
    label: 'Sort All the Packets',
    onClick: (inputKey: string) => {
      const packets = INPUT[inputKey]
        .split('\n')
        .filter(x => x.length)

      // Add the divider packets
      packets.push('[[2]]')
      packets.push('[[6]]')

      // Sort them all
      packets.sort((a, b) => {
        const sorted = isPairSorted(JSON.parse(a), JSON.parse(b))
        if (sorted === undefined) return 0
        return sorted ? -1 : 1
      })

      // Find the divider packets
      const dividerTwoIndex = packets.indexOf('[[2]]') + 1
      const dividerSixIndex = packets.indexOf('[[6]]') + 1

      return {
        answer2: (dividerTwoIndex * dividerSixIndex).toString()
      }
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The sum of the sorted indices is{' '}
      <code>{answer}</code>.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      The decoder key is{' '}
      <code>{answer}</code>.
    </span>
  ),
  buttons: BUTTONS,
  day: 13,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Distress Signal'
}

export default config
