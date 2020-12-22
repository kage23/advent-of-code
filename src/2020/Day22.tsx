import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'
import INPUT from './Input/Day22'

const calculateScore = (deck: number[]): number => deck
  .reverse()
  .reduce((score, card, index) => score + (card * (index + 1)), 0)

const getStateString = (player1: number[], player2: number[]): string =>
  `${player1.join(',')}::${player2.join(',')}`

const parseInput = (input: string): [number[], number[]] => {
  const players = input.split('\n\n')

  return players
    .map(player => (
      player
        .split('\n')
        .slice(1)
        .map(x => parseInt(x))
    )) as [number[], number[]]
}

const playARecursiveGame = (player1: number[], player2: number[]): {
  player1: number[]
  player2: number[]
  winner: 1 | 2
} => {
  const gameStatesSeen: Map<string, true> = new Map()

  while ([player1, player2].every(deck => deck.length > 0)) {
    if (gameStatesSeen.get(getStateString(player1, player2))) {
      return {
        player1,
        player2,
        winner: 1
      }
    }
    gameStatesSeen.set(getStateString(player1, player2), true)

    const player1Card = player1.shift()
    const player2Card = player2.shift()
    if (player1Card === undefined || player2Card === undefined) throw new Error('fuck')

    if (player1.length >= player1Card && player2.length >= player2Card) {
      const { winner: roundWinner } = playARecursiveGame(player1.slice(0, player1Card), player2.slice(0, player2Card))
      if (roundWinner === 1) {
        player1.push(player1Card, player2Card)
      } else {
        player2.push(player2Card, player1Card)
      }
    } else {
      if (player1Card > player2Card) {
        player1.push(player1Card, player2Card)
      } else {
        player2.push(player2Card, player1Card)
      }
    }
  }

  return {
    player1,
    player2,
    winner: [player1, player2].findIndex(deck => deck.length > 0) + 1 as 1 | 2
  }
}

const playARound = (
  player1: number[],
  player2: number[]
): [number[], number[]] => {
  const player1card = player1.shift()
  const player2card = player2.shift()
  if (player1card === undefined || player2card === undefined) throw new Error('fuck')
  if (player1card > player2card) {
    player1.push(player1card, player2card)
  } else if (player2card > player1card) {
    player2.push(player2card, player1card)
  }
  return [player1, player2]
}

const BUTTONS: IButton[] = [
  {
    label: 'Play a Game',
    onClick: (inputKey: string) => {
      let [player1, player2]: [number[], number[]] = parseInput(INPUT[inputKey])

      while (![player1, player2].some(deck => deck.length === 0)) {
        [player1, player2] = playARound(player1, player2)
      }

      const winningDeck = [player1, player2].find(deck => deck.length !== 0)
      if (!winningDeck) throw new Error('fuck')

      return {
        answer1: calculateScore(winningDeck).toString()
      }
    }
  },
  {
    label: 'Play a Recursive Game',
    onClick: (inputKey: string) => {
      const [player1, player2]: [number[], number[]] = parseInput(INPUT[inputKey])

      const result = playARecursiveGame(player1, player2)

      return {
        answer2: calculateScore(result.winner === 1 ? result.player1 : result.player2).toString()
      }
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The winning deck's score is <code>{answer}</code>.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      The winning deck's score is <code>{answer}</code>.
    </span>
  ),
  buttons: BUTTONS,
  day: 22,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: ''
}

export default config