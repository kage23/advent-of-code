import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'

import INPUT from '../Inputs/2015/Day3'

const BUTTONS: IButton[] = [
  {
    label: 'Deliver Presents',
    onClick: (inputKey) => {
      const instructions = INPUT[inputKey]
      const visited: Map<string, true> = new Map()
      let x = 0
      let y = 0
      visited.set(`${x},${y}`, true)
      for (let char of instructions) {
        switch (char) {
          case '^':
            y--
            break

          case 'v':
            y++
            break

          case '>':
            x++
            break

          case '<':
            x--
            break
        }
        visited.set(`${x},${y}`, true)
      }
      return {
        answer1: visited.size.toString()
      }
    }
  },
  {
    label: 'Deliver Presents with Robo-Santa',
    onClick: (inputKey) => {
      const instructions = INPUT[inputKey]
      const visited: Map<string, true> = new Map()
      const santas = [
        [0, 0],
        [0, 0]
      ]
      visited.set(`0,0`, true)
      for (let i = 0; i < instructions.length; i++) {
        const char = instructions.charAt(i)
        const whoseTurn = i % 2
        switch (char) {
          case '^':
            santas[whoseTurn][1]--
            break

          case 'v':
            santas[whoseTurn][1]++
            break

          case '>':
            santas[whoseTurn][0]++
            break

          case '<':
            santas[whoseTurn][0]--
            break
        }
        visited.set(`${santas[whoseTurn][0]},${santas[whoseTurn][1]}`, true)
      }
      return {
        answer2: visited.size.toString()
      }
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      Santa visits <code>{answer}</code> houses at least once.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      With Robo-Santa's help, at least <code>{answer}</code> houses get a present.
    </span>
  ),
  buttons: BUTTONS,
  day: 3,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Perfectly Spherical Houses in a Vacuum'
}

export default config