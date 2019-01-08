import React from 'react'
import {
  IButton,
  IDayConfig
} from '../Config'

import INPUT from './Input/Day13'

interface IState {
  baseTrack: string[],
  carts: ICart[]
}

interface ICart {
  direction: string
  position: number[]
  turnsExecuted: number
}

let state: IState = {
  baseTrack: [],
  carts: []
}

let prevInputKey = ''

const parseInput = (input: string): IState => {
  const carts: ICart[] = []
  const baseTrack = input.split('\n').map((line, y) => {
    let contents = ''
    line.split('').forEach((char, x) => {
      switch (char) {
        case '>':
        case '<':
        carts.push({
          direction: char,
          position: [x, y],
          turnsExecuted: 0
        })
        contents += '-'
        break

        case '^':
        case 'v':
        carts.push({
          direction: char,
          position: [x, y],
          turnsExecuted: 0
        })
        contents += '|'
        break

        default:
        contents += char
        break
      }
    })
    return contents
  })

  carts.sort(sortCartsByPosition)

  return {
    baseTrack,
    carts
  }
}

const sortCartsByPosition = (a: ICart, b: ICart): number => {
  const [ xa, ya ] = a.position
  const [ xb, yb ] = b.position

  return ya === yb
    ? xa - xb
    : ya - yb
}

const renderDay = (dayConfig: IDayConfig, inputKey: string): JSX.Element => {
  if (prevInputKey !== inputKey) {
    state = parseInput(dayConfig.INPUT[inputKey])
  }

  const {
    baseTrack,
    carts
   } = state

  const display = baseTrack.map((line, y) => {
    const contents = line.split('').map((char, x) => {
      const cart = carts.find(fCart => fCart.position[0] === x && fCart.position[1] === y)
      return (
        char === ' '
        ? <span key={`${x},${y}`}>&nbsp;</span>
        : cart
          ? <span key={`${x},${y}`}>{cart.direction}</span>
          : <span key={`${x},${y}`}>{char}</span>
      )
    })
    return <div key={y}>{contents}</div>
  })

  return (
    <div className="render-box">
      <fieldset>
        {display}
      </fieldset>
    </div>
  )
}

const BUTTONS: IButton[] = []

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The resulting frequency is{' '}
      <code>{answer}</code>.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      The first frequency reached twice is{' '}
      <code>{answer}</code>.
    </span>
  ),
  buttons: BUTTONS,
  day: 13,
  INPUT,
  renderDay,
  title: 'Mine Cart Madness'
}

export default config