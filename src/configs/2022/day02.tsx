import inputs from '../../inputs/2022/day02'
import { DayConfig } from '../../routes/Day'

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

export const checkStrategyGuide = (input: string) => ({
  answer1: input.split('\n').reduce((scoreAccumulator, currentRound) => (
    scoreAccumulator + scoreRound(currentRound)
  ), 0)
})

export const correctlyDecryptStrategyGuide = (input: string) => ({
  answer2: input.split('\n').reduce((scoreAccumulator, currentRound) => {
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
})

const day02: Omit<DayConfig, 'year'> = {
  answer1Text: 'You would score answer points.',
  answer2Text: 'You would actually score answer points.',
  buttons: [
    {
      label: 'Check Strategy Guide',
      onClick: checkStrategyGuide
    },
    {
      label: 'Correctly Decrypt Strategy Guide',
      onClick: correctlyDecryptStrategyGuide
    },
  ],
  id: 2,
  inputs,
  title: 'Rock Paper Scissors',
}

export default day02
