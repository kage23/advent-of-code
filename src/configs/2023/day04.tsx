import inputs from '../../inputs/2023/day04'
import { DayConfig } from '../../routes/Day'

export const scoreScratchcards = (input: string) => ({
  answer1: input.split('\n').reduce((sum, card) => {
    const numbers = card.split(': ')[1]
    const [winners, myNumbers] = numbers
      .split(' | ')
      .map((list) => list.split(/\s+/).map(Number))
    const myWinners = myNumbers.filter((n) => winners.includes(n))
    if (myWinners.length) return sum + Math.pow(2, myWinners.length - 1)
    return sum
  }, 0),
})

export const winMoreScratchcards = (input: string) => {
  const cards = input.split('\n')
  const cardCounts = new Map<number, number>()
  for (let i = 1; i <= cards.length; i++) cardCounts.set(i, 1)
  cards.forEach((card, i) => {
    const cardId = i + 1
    const cardCount = cardCounts.get(cardId)!
    const numbers = card.split(': ')[1]
    const [winners, myNumbers] = numbers
      .split(' | ')
      .map((list) => list.split(/\s+/).map(Number))
    const myWinners = myNumbers.filter((n) => winners.includes(n))
    for (
      let j = cardId + 1;
      j <= Math.min(cardId + myWinners.length, cards.length);
      j++
    ) {
      const jCardCount = cardCounts.get(j)!
      cardCounts.set(j, jCardCount + cardCount)
    }
  })
  let totalCount = 0
  for (let k = 1; k <= cards.length; k++) totalCount += cardCounts.get(k)!
  return {
    answer2: totalCount,
  }
}

const day04: Omit<DayConfig, 'year'> = {
  answer1Text: 'The scratchcards are worth answer points.',
  answer2Text: 'You end with answer scratchcards.',
  buttons: [
    {
      label: 'Score the Scratchcards',
      onClick: scoreScratchcards,
    },
    {
      label: 'Win More Scratchcards',
      onClick: winMoreScratchcards,
    },
  ],
  id: 4,
  inputs,
  title: 'Scratchcards',
}

export default day04
