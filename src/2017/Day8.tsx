import React from 'react'
import {
  IButton,
  IDayConfig
} from '../Config'

import INPUT from './Input/Day8'

const registers: Map<string, number> = new Map()
let prevInputKey = ''
let answer1_a = ''

const processCode = (input: string) => {
  input.split('\n').forEach(line => {
    const [
      registerToActOn,
      action,
      amount,
      , // the word 'if'
      registerForCondition,
      condition,
      testAmount
    ] = line.split(' ')
    let doAction = false
    if (typeof registers.get(registerToActOn) === 'undefined') registers.set(registerToActOn, 0)
    if (typeof registers.get(registerForCondition) === 'undefined') registers.set(registerForCondition, 0)
    switch (condition) {
      case '>':
      if ((registers.get(registerForCondition) || 0) > parseInt(testAmount)) doAction = true
      break

      case '<':
      if ((registers.get(registerForCondition) || 0) < parseInt(testAmount)) doAction = true
      break

      case '>=':
      if ((registers.get(registerForCondition) || 0) >= parseInt(testAmount)) doAction = true
      break

      case '<=':
      if ((registers.get(registerForCondition) || 0) <= parseInt(testAmount)) doAction = true
      break

      case '==':
      if ((registers.get(registerForCondition) || 0) === parseInt(testAmount)) doAction = true
      break

      case '!=':
      if ((registers.get(registerForCondition) || 0) !== parseInt(testAmount)) doAction = true
      break

      default:
      break
    }
    if (doAction) {
      if (action === 'inc') {
        registers.set(registerToActOn, (registers.get(registerToActOn) || 0) + parseInt(amount))
      }
      if (action === 'dec') {
        registers.set(registerToActOn, (registers.get(registerToActOn) || 0) - parseInt(amount))
      }
    }
  })
}

const BUTTONS: IButton[] = [
  {
    label: 'Process Code',
    onClick: (inputKey) => {
      registers.clear()
      processCode(INPUT[inputKey])

      let max = Number.MIN_SAFE_INTEGER

      for (const [key, value] of registers.entries()) {
        if (value > max) {
          max = value
          answer1_a = key
        }
      }

      return { answer1: max.toString() }
    }
  }
]

export const renderDay = (dayConfig: IDayConfig, inputKey: string): JSX.Element => {
  if (prevInputKey !== inputKey) {
    registers.clear()
    answer1_a = ''
    prevInputKey = inputKey
  }

  const registersDisplay: JSX.Element[] = []
  for (const [key, value] of registers.entries()) {
    registersDisplay.push(<div key={key}>{key}: {value}</div>)
  }

  return (
    <div className="render-box">
      <div>
        <h3>Input:</h3>
        <pre>{dayConfig.INPUT[inputKey]}</pre>
      </div>
      <div className="render-box--left-margin">
        <h3>Registers:</h3>
        {registersDisplay}
      </div>
    </div>
  )
}

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The largest register is <code>{answer1_a}</code>,{' '}
      with a value of <code>{answer}</code>.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      <code>{answer}</code>
    </span>
  ),
  buttons: BUTTONS,
  day: 8,
  INPUT,
  renderDay,
  title: 'I Heard You Like Registers'
}

export default config