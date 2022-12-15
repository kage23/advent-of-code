import {
  IButton,
  IDayConfig
} from '../Config'

import INPUT from '../Inputs/2018/Day09'

import DLL from '../utils/DLL'

let marbles = new DLL(0)

let answer1_a = ''
let prevInputKey = ''

const parseInput = (input: string): {
  numPlayers: number
  numMarbles: number
} => JSON.parse(input)

const playGame = (inputKey: string, marbles: DLL)
  : { player: number, score: number, marbles: DLL } => {
  const { numPlayers, numMarbles } = parseInput(INPUT[inputKey])
  const scores: number[] = []
  let currentPlayer = 0
  let marbleToPlay = 1
  let currentMarble = marbles.head
  while (marbleToPlay <= numMarbles) {
    if ((marbleToPlay - 1) % 10000 === 0) console.log(`Player #${currentPlayer + 1} is playing marble #${currentMarble && currentMarble.value}!`)
    if (!scores[currentPlayer]) scores[currentPlayer] = 0
    if (currentMarble) {
      if (marbleToPlay % 23 !== 0) {
        currentMarble = currentMarble.next
        if (currentMarble) {
          marbles.insertAfter(marbleToPlay, currentMarble)
          currentMarble = currentMarble.next
        }
      } else {
        scores[currentPlayer] += marbleToPlay
        for (let i = 0; i < 7; i++) if (currentMarble) currentMarble = currentMarble.prev
        if (currentMarble) {
          scores[currentPlayer] += currentMarble.value
          currentMarble = marbles.removeNode(currentMarble)
        }
      }
    }
    marbleToPlay++
    currentPlayer = (currentPlayer + 1) % numPlayers
  }
  return scores.reduce((result, currentScore, currentPlayer) => {
    if (currentScore > result.score) {
      result.player = currentPlayer
      result.score = currentScore
    }
    return result
  }, { player: 0, score: 0, marbles })
}

const renderDay = (dayConfig: IDayConfig, inputKey: string): JSX.Element => {
  const currentGameConfig = parseInput(dayConfig.INPUT[inputKey])

  if (inputKey !== prevInputKey) marbles = new DLL(0)
  prevInputKey = inputKey

  let game = ''
  if (inputKey.indexOf('DEMO') !== -1) {
    const headMarble = marbles.head
    let currentMarble = marbles.head
    while (currentMarble) {
      game += `${currentMarble.value} `
      currentMarble = currentMarble.next
      if (currentMarble === headMarble) break
    }
  } else game = `Check your console log for proof the game's running!`

  return (
    <div>
      <p>
        There are <code>{currentGameConfig.numPlayers}</code> players.{' '}
        The highest marble is numbered #<code>{currentGameConfig.numMarbles}</code>.
      </p>
      <p>
        Marbles:{' '}{game}
      </p>
    </div>
  )
}

const BUTTONS: IButton[] = [
  {
    label: 'Play Game!',
    onClick: (inputKey: string) => {
      const game = playGame(inputKey, marbles)
      answer1_a = (game.player + 1).toString()
      return {
        answer1: game.score.toString()
      }
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The winner was player #<code>{answer1_a}</code>{' '}
      with a score of <code>{answer}</code>.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      The solution is <code>{answer}</code>.
    </span>
  ),
  buttons: BUTTONS,
  day: 9,
  INPUT,
  renderDay,
  title: 'Marble Mania'
}

export default config