import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'

import INPUT from '../Inputs/2020/Day6'

const countGroupYesses = (groupInput: string): number => {
  let uniqueYesses = ''
  groupInput.split('').forEach(char => {
    if (char !== '\n' && !uniqueYesses.includes(char)) {
      uniqueYesses += char
    }
  })

  return uniqueYesses.length
}

const properlyCountGroupYesses = (groupInput: string): number => {
  let everyoneYesCount = 0
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'
  alphabet.split('').forEach(letter => {
    if (
      groupInput.split('\n').every(personInput => personInput.includes(letter))
    ) {
      everyoneYesCount++
    }
  })
  return everyoneYesCount
}

const BUTTONS: IButton[] = [
  {
    label: 'Check All Group Inputs',
    onClick: (inputKey: string) => {
      const groupInputs = INPUT[inputKey].split('\n\n')

      return {
        answer1: groupInputs.reduce((sum, groupInput): number => (
          sum + countGroupYesses(groupInput)
        ), 0).toString()
      }
    }
  },
  {
    label: 'Properly Check All Group Inputs',
    onClick: (inputKey: string) => {
      const groupInputs = INPUT[inputKey].split('\n\n')

      return {
        answer2: groupInputs.reduce((sum, groupInput): number => (
          sum + properlyCountGroupYesses(groupInput)
        ), 0).toString()
      }
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The checksum for all the groups' inputs is <code>{answer}</code>.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      The real checksum for all the groups' inputs is <code>{answer}</code>.
    </span>
  ),
  buttons: BUTTONS,
  day: 6,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Custom Customs'
}

export default config