import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
 } from '../Config'

import INPUT from './Input/Day2'

const findChecksum = (inputKey: string) => {
  const boxIDs = INPUT[inputKey].split('\n')
  let twoCount = 0
  let threeCount = 0
  boxIDs.forEach(boxID => {
    const letterCounts: { [key:string]: number } = {}
    let twos = false
    let threes = false
    boxID.split('').forEach(letter => {
      if (!letterCounts[letter]) letterCounts[letter] = 1
      else letterCounts[letter]++
    })
    for (const letter in letterCounts) {
      if (letterCounts[letter] === 2) twos = true
      if (letterCounts[letter] === 3) threes = true
      if (twos && threes) break
    }
    if (twos) twoCount++
    if (threes) threeCount++
  })
  return {
    answer1: (twoCount * threeCount).toString()
  }
}

const findCommonLetters = (inputKey: string): { answer2: string | undefined } => {
  const boxIDs = INPUT[inputKey].split('\n')
  const n = boxIDs.length
  const l = boxIDs[0].length
  for (const boxID of boxIDs) {
    for (let i = 0; i < n; i++) {
      const searchBoxID = boxIDs[i]
      if (searchBoxID !== boxID) {
        let diffs = 0
        for (let j = 0; j < l; j++) {
          if (boxID[j] !== searchBoxID[j]) diffs++
          if (diffs > 1) break
        }
        if (diffs === 1) {
          return {
            answer2: [boxID, searchBoxID].reduce((a, b) => {
              let result = ''
              const n = a.length

              for (let i = 0; i < n; i++) if (a[i] === b[i]) result += a[i]

              return result
            })
          }
        }
      }
    }
  }
  return {
    answer2: undefined
  }
}

const BUTTONS: IButton[] = [
  {
    label: 'Find Checksum',
    onClick: findChecksum
  },
  {
    label: 'Find Common Letters',
    onClick: findCommonLetters
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The checksum is{' '}
      <code>{answer}</code>.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      The common letters are{' '}
      <code>{answer}</code>.
    </span>
  ),
  buttons: BUTTONS,
  day: 2,
  INPUT,
  renderDay: (inputKey) => defaultRenderDay(inputKey),
  title: 'Inventory Management System'
}

export default config