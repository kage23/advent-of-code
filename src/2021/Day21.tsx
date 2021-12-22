import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'

import INPUT from './Input/Day21'

const BUTTONS: IButton[] = [
  {
    label: 'Play the Practice Game',
    onClick: (inputKey: string) => {
      const players = INPUT[inputKey]
        .split('\n')
        .map(p => {
          const position = Number(p.split(': ')[1])
          return {
            position,
            score: 0
          }
        })
      let currentPlayer = 0
      let nextDiceRoll = 1
      let totalDiceRolls = 0

      while (!players.some(({ score }) => score >= 1000)) {
        for (let d = 0; d < 3; d++) {
          players[currentPlayer].position += nextDiceRoll
          totalDiceRolls++
          nextDiceRoll = (nextDiceRoll + 1) % 100 || 100
        }
        players[currentPlayer].position = players[currentPlayer].position % 10 || 10
        players[currentPlayer].score += players[currentPlayer].position
        currentPlayer = (currentPlayer + 1) % 2
      }

      const loser = players.find(({ score }) => score < 1000)
      if (loser === undefined) throw new Error('what the fuck')

      return {
        answer1: (loser.score * totalDiceRolls).toString()
      }
    }
  },
  {
    label: 'Play the Real Game',
    onClick: (inputKey: string) => {
      const players = INPUT[inputKey]
        .split('\n')
        .map(p => {
          const position = Number(p.split(': ')[1])
          return {
            position,
            score: 0
          }
        })

      return {}
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The final game hash is <code>{answer}</code>.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      The winner wins in <code>{answer}</code> universes.
    </span>
  ),
  buttons: BUTTONS,
  day: 21,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Dirac Dice'
}

export default config
