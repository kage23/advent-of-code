import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'

import INPUT from '../Inputs/2020/Day2'

const analyzePasswords = (inputKey: string): { answer1: string } => {
  let validPasswordCount = 0
  INPUT[inputKey].split('\n').forEach(inputString => {
    const [rule, password] = inputString.split(': ')
    const [numbers, letter] = rule.split(' ')
    const min = Number(numbers.split('-')[0])
    const max = Number(numbers.split('-')[1])
    const letterCountInPassword = password.split(letter).length - 1
    if (letterCountInPassword >= min && letterCountInPassword <= max) {
      validPasswordCount++
    }
  })
  return { answer1: validPasswordCount.toString() }
}

const properlyAnalyzePasswords = (inputKey: string): { answer2: string } => {
  let validPasswordCount = 0
  INPUT[inputKey].split('\n').forEach(inputString => {
    const [rule, password] = inputString.split(': ')
    const [numbers, letter] = rule.split(' ')
    const pos1 = Number(numbers.split('-')[0]) - 1
    const pos2 = Number(numbers.split('-')[1]) - 1
    if (
      (password.charAt(pos1) === letter && password.charAt(pos2) !== letter) ||
      (password.charAt(pos1) !== letter && password.charAt(pos2) === letter)
    ) {
      validPasswordCount++
    }
  })
  return { answer2: validPasswordCount.toString() }
}

const BUTTONS: IButton[] = [
  {
    label: 'Analyze Passwords',
    onClick: analyzePasswords
  },
  {
    label: 'Properly Analyze Passwords',
    onClick: properlyAnalyzePasswords
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      <code>{answer}</code> passwords are valid.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      <code>{answer}</code> passwords are ACTUALLY valid.
    </span>
  ),
  buttons: BUTTONS,
  day: 2,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Password Philosophy'
}

export default config