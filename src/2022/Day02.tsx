import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'

import INPUT from '../Inputs/2022/Day02'

const scoreRound = (round: string): number => {
  const [opponent, you] = round.split(' ')
  if (opponent === 'A') {
    // Rock
    if (you === 'X') {
      // Rock, draw
      return 1 + 3
    }
    if (you === 'Y') {
      // Paper, win
      return 2 + 6
    }
    if (you === 'Z') {
      // Scissors, loss
      return 3 + 0
    }
  }
  if (opponent === 'B') {
    // Paper
    if (you === 'X') {
      // Rock, loss
      return 1 + 0
    }
    if (you === 'Y') {
      // Paper, draw
      return 2 + 3
    }
    if (you === 'Z') {
      // Scissors, win
      return 3 + 6
    }
  }
  if (opponent === 'C') {
    // Scissors
    if (you === 'X') {
      // Rock, win
      return 1 + 6
    }
    if (you === 'Y') {
      // Paper, loss
      return 2 + 0
    }
    if (you === 'Z') {
      // Scissors, draw
      return 3 + 3
    }
  }
  throw new Error('something fucked up')
}

const BUTTONS: IButton[] = [
  {
    label: 'Check Strategy Guide',
    onClick: (inputKey: string) => {
      const stratGuide = INPUT[inputKey].split('\n')
      const score = stratGuide.reduce((scoreAccumulator, currentRound) => (
        scoreAccumulator + scoreRound(currentRound)
      ), 0)

      return {
        answer1: score.toString()
      }
    }
  },
  {
    label: 'Correctly Decrypt Strategy Guide',
    onClick: (inputKey: string) => {
      const stratGuide = INPUT[inputKey].split('\n')
      const score = stratGuide.reduce((scoreAccumulator, currentRound) => {
        const [opponent, you] = currentRound.split(' ')
        let newRound = `${opponent} `
        if (opponent === 'A') {
          // A Rock
          if (you === 'X') {
            // X Lose - Scissors (Z)
            newRound += 'Z'
          }
          if (you === 'Y') {
            // Y Draw - Rock (X)
            newRound += 'X'
          }
          if (you === 'Z') {
            // Z Win - Paper (Y)
            newRound += 'Y'
          }
        }
        if (opponent === 'B') {
          // B Paper
          if (you === 'X') {
            // X Lose - Rock (X)
            newRound += 'X'
          }
          if (you === 'Y') {
            // Y Draw - Paper (Y)
            newRound += 'Y'
          }
          if (you === 'Z') {
            // Z Win - Scissors (Z)
            newRound += 'Z'
          }
        }
        if (opponent === 'C') {
          // C Scissors
          if (you === 'X') {
            // X Lose - Paper (Y)
            newRound += 'Y'
          }
          if (you === 'Y') {
            // Y Draw - Scissors (Z)
            newRound += 'Z'
          }
          if (you === 'Z') {
            // Z Win - Rock (X)
            newRound += 'X'
          }
        }
        return scoreAccumulator + scoreRound(newRound)
      }, 0)

      return {
        answer2: score.toString()
      }
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      You would score{' '}
      <code>{answer}</code> points.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      You would actually score{' '}
      <code>{answer}</code> points.
    </span>
  ),
  buttons: BUTTONS,
  day: 2,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Rock Paper Scissors'
}

export default config
