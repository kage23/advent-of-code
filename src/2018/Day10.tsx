import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
 } from '../Config'

import INPUT from './Input/Day10'

interface IStar {
  position: number[]
  velocity: number[]
}

const parseInput = (inputKey: string): IStar[] => {
  return INPUT[inputKey].split('\n')
    .map(line => {
      const posX = parseInt(line.slice(line.indexOf('<') + 1))
      const posY = parseInt(line.slice(line.indexOf(', ') + 1))
      const velX = parseInt(line.slice(line.lastIndexOf('<') + 1))
      const velY = parseInt(line.slice(line.lastIndexOf(', ') + 1))
      return {
        position: [posX, posY],
        velocity: [velX, velY]
      }
    })
}

const BUTTONS: IButton[] = []

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The solution is <code>{answer}</code>.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      The solution is <code>{answer}</code>.
    </span>
  ),
  buttons: BUTTONS,
  day: 10,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'The Stars Align'
}

export default config