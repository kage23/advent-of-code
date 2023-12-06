import inputs from '../../inputs/2018/day09'
import { DayConfig } from '../../routes/Day'
import DLL from '../../utils/DLL'

interface GameSetup {
  numPlayers: number
  numMarbles: number
}

const parseInput = (input: string): GameSetup => {
  const numbers = input.match(/\d+/g)!.map(Number)
  return { numPlayers: numbers[0], numMarbles: numbers[1] }
}

export const playGame = (inputKey: string, part: 1 | 2) => {
  const marbles = new DLL<number>(0)
  const game = parseInput(inputs.get(inputKey)!)
  if (part === 2) game.numMarbles *= 100
  const { numPlayers, numMarbles } = game
  const scores: number[] = []
  let currentPlayer = 0
  let marbleToPlay = 1
  let currentMarble = marbles.head
  while (marbleToPlay <= numMarbles) {
    if (!scores[currentPlayer]) scores[currentPlayer] = 0
    if (currentMarble) {
      if (marbleToPlay % 23 !== 0) {
        currentMarble = currentMarble.next
        if (currentMarble) {
          marbles.insertAfter(marbleToPlay, currentMarble)
          currentMarble = currentMarble.next!
        }
      } else {
        scores[currentPlayer] += marbleToPlay
        for (let i = 0; i < 7; i++) if (currentMarble) currentMarble = currentMarble.prev
        if (currentMarble) {
          scores[currentPlayer] += currentMarble.value
          currentMarble = marbles.removeNode(currentMarble)!.next!
        }
      }
    }
    marbleToPlay++
    currentPlayer = (currentPlayer + 1) % numPlayers
  }
  const final = scores.reduce((result, currentScore, currentPlayer) => {
    if (currentScore > result.score) {
      result.player = currentPlayer
      result.score = currentScore
    }
    return result
  }, { player: 0, score: 0, marbles })

  return part === 1 ? {
    answer1: final.score
  } : {
    answer2: final.score
  }
}

const day09: Omit<DayConfig, 'year'> = {
  answer1Text: 'The winning score was answer.',
  answer2Text: 'The bigger winning score was answer.',
  buttons: [
    {
      label: 'Play Game!',
      onClick: (inputKey) => playGame(inputKey, 1),
    },
    {
      label: 'Play Big Game!',
      onClick: (inputKey) => playGame(inputKey, 2),
    },
  ],
  id: 9,
  inputs,
  title: 'Marble Mania',
}

export default day09
