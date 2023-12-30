import inputs from '../../inputs/2021/day21'
import { DayConfig } from '../../routes/Day'

interface Player {
  position: number
  score: number
}

interface Game {
  players: [Player, Player]
  currentPlayer: 0 | 1
}

export const playPracticeGame = (input: string) => {
  const players: Player[] = input.split('\n').map((p) => {
    const position = Number(p.split(': ')[1])
    return {
      position,
      score: 0,
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
    answer1: loser.score * totalDiceRolls,
  }
}

const recurseGame = (
  { players, currentPlayer }: Game,
  memos: Map<string, [number, number]>,
  wins: [number, number]
): [number, number] => {
  const winner = players.findIndex(({ score }) => score >= 21)
  if (winner === 0) {
    return [wins[0] + 1, wins[1]]
  }
  if (winner === 1) {
    return [wins[0], wins[1] + 1]
  }
  const nextWins = [...wins] as [number, number]
  const possibleRolls = [
    3, 4, 5, 4, 5, 6, 5, 6, 7, 4, 5, 6, 5, 6, 7, 6, 7, 8, 5, 6, 7, 6, 7, 8, 7,
    8, 9,
  ]
  /**
   * That's:
   * 1 of `3`, 3 of `4`, 6 of `5`, 7 of `6`,
   * 6 of `7`, 3 of `8`, and 1 of `9`
   */
  possibleRolls.forEach((roll) => {
    const playersCopy = JSON.parse(JSON.stringify(players)) as [Player, Player]
    playersCopy[currentPlayer].position =
      (playersCopy[currentPlayer].position + roll) % 10 || 10
    playersCopy[currentPlayer].score += playersCopy[currentPlayer].position
    const nextGame = {
      players: playersCopy,
      currentPlayer: ((currentPlayer + 1) % 2) as 0 | 1,
    }
    const nextGameKey = JSON.stringify(nextGame)
    const nextGameResult =
      memos.get(nextGameKey) || recurseGame(nextGame, memos, wins)
    memos.set(nextGameKey, nextGameResult)
    nextWins[0] += nextGameResult[0]
    nextWins[1] += nextGameResult[1]
  })
  return nextWins
}

export const playRealGame = (input: string) => {
  const players = input.split('\n').map((p) => {
    const position = Number(p.split(': ')[1])
    return {
      position,
      score: 0,
    } as Player
  }) as [Player, Player]
  let currentPlayer: 0 | 1 = 0

  const [player0Wins, player1Wins] = recurseGame(
    { players, currentPlayer },
    new Map(),
    [0, 0]
  )

  return {
    answer2: Math.max(player0Wins, player1Wins),
  }
}

const day21: Omit<DayConfig, 'year'> = {
  answer1Text: 'The final game hash is answer.',
  answer2Text: 'The winner wins in answer universes.',
  buttons: [
    {
      label: 'Play the Practice Game',
      onClick: playPracticeGame,
    },
    {
      label: 'Play the Real Game',
      onClick: playRealGame,
    },
  ],
  id: 21,
  inputs,
  title: 'Dirac Dice',
}

export default day21
