import inputs from '../../inputs/2021/day07'
import { DayConfig } from '../../routes/Day'

export const alignCrabs = (input: string) => {
  const crabs = input.split(',').map(n => Number(n))
  const minCrab = Math.min(...crabs)
  const maxCrab = Math.max(...crabs)

  const costToMoveToPositionI: number[] = []

  for (let i = minCrab; i <= maxCrab; i++) {
    const cost = crabs.reduce((sum, crab) => sum + Math.abs(crab - i), 0)
    costToMoveToPositionI[i] = cost
  }

  return {
    answer1: Math.min(...costToMoveToPositionI)
  }
}

const calculateMovingCosts = (upToDistance: number): Map<number, number> => {
  const movingCostsMap: Map<number, number> = new Map()

  for (let i = 0; i <= upToDistance; i++) {
    const cost = (movingCostsMap.get(i - 1) || 0) + i
    movingCostsMap.set(i, cost)
  }

  return movingCostsMap
}

export const alignCrabsProperly = (input: string) => {
  const crabs = input.split(',').map(n => Number(n))
  const minCrab = Math.min(...crabs)
  const maxCrab = Math.max(...crabs)
  const costOfMovingDistances = calculateMovingCosts(maxCrab)

  const costToMoveToPositionI: number[] = []

  for (let i = minCrab; i <= maxCrab; i++) {
    const cost = crabs.reduce((sum, crab) => {
      const movingDistance = Math.abs(crab - i)
      const crabCost = costOfMovingDistances.get(movingDistance) || 0
      return sum + crabCost
    }, 0)
    costToMoveToPositionI[i] = cost
  }

  return {
    answer2: Math.min(...costToMoveToPositionI)
  }
}

const day07: Omit<DayConfig, 'year'> = {
  answer1Text: 'It will cost answer fuel to align the crabs.',
  answer2Text: 'It will actually cost answer fuel to align the crabs.',
  buttons: [
    {
      label: 'Align the Crabs',
      onClick: alignCrabs
    },
    {
      label: 'Align the Crabs Properly',
      onClick: alignCrabsProperly
    }
  ],
  id: 7,
  inputs,
  title: 'The Treachery of Whales',
}

export default day07
