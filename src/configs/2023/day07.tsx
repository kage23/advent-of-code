import inputs from '../../inputs/2023/day07'
import { DayConfig } from '../../routes/Day'

const cardOrder = [
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  'T',
  'J',
  'Q',
  'K',
  'A',
]

const cardOrderWithJokers = [
  'J',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  'T',
  'Q',
  'K',
  'A',
]

/**
 * High Card: 1
 * One Pair: 2
 * Two Pair: 3
 * Three of a Kind: 4
 * Full House: 5
 * Four of a Kind: 6
 * Five of a Kind: 7
 */
const getHandType = (input: string) => {
  const hand = input.slice(0, 5).split('')

  const cardCounts = new Map<string, number>()
  hand.forEach((card) => {
    cardCounts.set(card, (cardCounts.get(card) || 0) + 1)
  })
  const cardCountValues = Array.from(cardCounts.values())

  // Five of a kind
  if (cardCounts.size === 1) return 7
  if (cardCounts.size === 2) {
    // Four of a kind
    if (cardCountValues.includes(4)) return 6
    // Full House
    if (cardCountValues.includes(3)) return 5
  }
  if (cardCounts.size === 3) {
    // Three of a Kind
    if (cardCountValues.includes(3)) return 4
    // Two Pair
    if (cardCountValues.includes(2)) return 3
  }
  // One Pair
  if (cardCounts.size === 4) return 2
  // High Card
  return 1
}

const sortByCards = (a: string, b: string) => {
  const aCards = a.split('')
  const bCards = b.split('')
  if (aCards[0] !== bCards[0])
    return cardOrder.indexOf(aCards[0]) - cardOrder.indexOf(bCards[0])
  if (aCards[1] !== bCards[1])
    return cardOrder.indexOf(aCards[1]) - cardOrder.indexOf(bCards[1])
  if (aCards[2] !== bCards[2])
    return cardOrder.indexOf(aCards[2]) - cardOrder.indexOf(bCards[2])
  if (aCards[3] !== bCards[3])
    return cardOrder.indexOf(aCards[3]) - cardOrder.indexOf(bCards[3])
  return cardOrder.indexOf(aCards[4]) - cardOrder.indexOf(bCards[4])
}

const sortByCardsWithJokers = (a: string, b: string) => {
  const aCards = a.split('')
  const bCards = b.split('')
  if (aCards[0] !== bCards[0])
    return (
      cardOrderWithJokers.indexOf(aCards[0]) -
      cardOrderWithJokers.indexOf(bCards[0])
    )
  if (aCards[1] !== bCards[1])
    return (
      cardOrderWithJokers.indexOf(aCards[1]) -
      cardOrderWithJokers.indexOf(bCards[1])
    )
  if (aCards[2] !== bCards[2])
    return (
      cardOrderWithJokers.indexOf(aCards[2]) -
      cardOrderWithJokers.indexOf(bCards[2])
    )
  if (aCards[3] !== bCards[3])
    return (
      cardOrderWithJokers.indexOf(aCards[3]) -
      cardOrderWithJokers.indexOf(bCards[3])
    )
  return (
    cardOrderWithJokers.indexOf(aCards[4]) -
    cardOrderWithJokers.indexOf(bCards[4])
  )
}

const sortHands = (a: string, b: string) => {
  const aType = getHandType(a)
  const bType = getHandType(b)

  if (aType !== bType) return aType - bType
  return sortByCards(a, b)
}

const sortHandsWithJokers = (a: string, b: string) => {
  let aType = 0
  cardOrder.forEach((card) => {
    if (card !== 'J') {
      const newHandA = a.replaceAll('J', card)
      aType = Math.max(aType, getHandType(newHandA))
    }
  })
  let bType = 0
  cardOrder.forEach((card) => {
    if (card !== 'J') {
      const newHandB = b.replaceAll('J', card)
      bType = Math.max(bType, getHandType(newHandB))
    }
  })

  if (aType !== bType) return aType - bType
  return sortByCardsWithJokers(a, b)
}

export const scoreTheHands = (input: string) => {
  const hands = input.split('\n')
  return {
    answer1: hands.sort(sortHands).reduce((sum, hand, i) => {
      const [, bid] = hand.split(' ').map(Number)
      return sum + bid * (i + 1)
    }, 0),
  }
}

export const playWithJokers = (input: string) => {
  const hands = input.split('\n')
  return {
    answer2: hands.sort(sortHandsWithJokers).reduce((sum, hand, i) => {
      const [, bid] = hand.split(' ').map(Number)
      return sum + bid * (i + 1)
    }, 0),
  }
}

const day07: Omit<DayConfig, 'year'> = {
  answer1Text: 'The total score for these hands is answer.',
  answer2Text: 'The total score for these hands is answer.',
  buttons: [
    {
      label: 'Score the Hands',
      onClick: scoreTheHands,
    },
    {
      label: 'Play with Jokers',
      onClick: playWithJokers,
    },
  ],
  id: 7,
  inputs,
  title: 'Camel Cards',
}

export default day07
