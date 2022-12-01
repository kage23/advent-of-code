import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'

import INPUT from '../Inputs/2021/Day07'

const calculateMovingCosts = (upToDistance: number): Map<number, number> => {
  const movingCostsMap: Map<number, number> = new Map()

  for (let i = 0; i <= upToDistance; i++) {
    let cost = (movingCostsMap.get(i - 1) || 0) + i
    movingCostsMap.set(i, cost)
  }

  return movingCostsMap
}

const BUTTONS: IButton[] = [
  {
    label: 'Align the Crabs',
    onClick: (inputKey: string) => {
      const crabs = INPUT[inputKey].split(',').map(n => Number(n))
      const minCrab = Math.min(...crabs)
      const maxCrab = Math.max(...crabs)

      const costToMoveToPositionI: number[] = []

      for (let i = minCrab; i <= maxCrab; i++) {
        let cost = 0
        crabs.forEach(crab => {
          cost += Math.abs(crab - i)
        })
        costToMoveToPositionI[i] = cost
      }

      return {
        answer1: Math.min(...costToMoveToPositionI).toString()
      }
    }
  },
  {
    label: 'Align the Crabs Properly',
    onClick: (inputKey: string) => {
      const crabs = INPUT[inputKey].split(',').map(n => Number(n))
      const minCrab = Math.min(...crabs)
      const maxCrab = Math.max(...crabs)
      const costOfMovingDistances = calculateMovingCosts(maxCrab)

      const costToMoveToPositionI: number[] = []

      for (let i = minCrab; i <= maxCrab; i++) {
        let cost = 0
        crabs.forEach(crab => {
          const movingDistance = Math.abs(crab - i)
          const crabCost = costOfMovingDistances.get(movingDistance) || 0
          cost += crabCost
        })
        costToMoveToPositionI[i] = cost
      }

      return {
        answer2: Math.min(...costToMoveToPositionI).toString()
      }
    }
  },
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      It will cost <code>{answer}</code> fuel to align the crabs.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      It will actually cost <code>{answer}</code> fuel to align the crabs.
    </span>
  ),
  buttons: BUTTONS,
  day: 7,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'The Treachery of Whales'
}

export default config
