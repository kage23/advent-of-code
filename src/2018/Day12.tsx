import React from 'react'
import {
  IButton,
  IDayConfig
} from '../Config'

import INPUT from './Input/Day12'

let prevInputKey = ''

interface IState {
  bottomPot: number
  pots: string
  rules: IRule[]
}

interface IRule { before: string, after: string }

let state: IState = {
  bottomPot: 0,
  pots: '.',
  rules: []
}

const parseInput = (input: string): IState => {
  const inputArr = INPUT[input].split('\n')
  const initialState = (inputArr.shift() || '').slice(15)
  inputArr.shift()
  const rules = inputArr.map(ruleStr => ({
    before: ruleStr.slice(0, 5),
    after: ruleStr.slice(-1)
  }))
  return {
    bottomPot: -2,
    pots: `..${initialState}`,
    rules
  }
}

const renderDay = (dayConfig: IDayConfig, inputKey: string): JSX.Element => {
  if (inputKey !== prevInputKey) {
    state = parseInput(inputKey)
  }
  prevInputKey = inputKey

  const {
    bottomPot,
    pots
  } = state

  const spaces = []
    if (bottomPot < 0) {
      for (let i = 0; i > bottomPot; i--) {
        spaces.push(<span key={i}>&nbsp;</span>)
      }
    }

  return (
    <div className="render-box render-box--no-wrap">
      <div style={{ maxWidth: '33%' }}>
        <h3>Input:</h3>
        <pre className="render-box--pre-wrap">{dayConfig.INPUT[inputKey]}</pre>
      </div>
      <div className="render-box--left-margin">
        <h3>Pots:</h3>
        <fieldset style={{ wordBreak: 'break-word' }}>
          <div>{spaces}0</div>
          <div>{pots}</div>
        </fieldset>
      </div>
    </div>
  )
}

const BUTTONS: IButton[] = []

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The solution is{' '}
      <code>{answer}</code>.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      The solution is{' '}
      <code>{answer}</code>.
    </span>
  ),
  buttons: BUTTONS,
  day: 12,
  INPUT,
  renderDay,
  title: 'Subterranean Sustainability'
}

export default config