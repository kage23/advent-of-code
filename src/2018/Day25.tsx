import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'

import INPUT from '../Inputs/2018/Day25'

import { manhattanDistance } from '../utils/Various'

const parseInput = (INPUT: string): number[][] => {
  return INPUT.split('\n')
    .map(line => {
      const [x, y, z, t] = line.split(',')
      return [parseInt(x), parseInt(y), parseInt(z), parseInt(t)]
    })
}

const visitNeighbors = (star: number[], stars: number[][], visitedMap: Map<any, any>) => {
  for (const sStar of stars) {
    if (!visitedMap.get(sStar) && manhattanDistance(star, sStar) <= 3) {
      visitedMap.set(sStar, true)
      visitNeighbors(sStar, stars, visitedMap)
    }
  }
}

const countConstellations = (inputKey: string): number => {
  let count = 0
  let visitedMap = new Map()
  const stars = parseInput(INPUT[inputKey])

  stars.forEach((star, index) => {
    if (!visitedMap.get(star)) {
      count++
      console.log(`Current constellation count: ${count}. Visiting neighbors of star #${index}...`)
      visitedMap.set(star, true)
      visitNeighbors(star, stars, visitedMap)
    }
  })

  return count
}

const BUTTONS: IButton[] = [
  {
    label: 'Count Constellations',
    onClick: (inputKey) => ({
      answer1: countConstellations(inputKey).toString()
    })
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      There are <code>{answer}</code> constellations.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      The solution is{' '}
      <code>{answer}</code>.
    </span>
  ),
  buttons: BUTTONS,
  day: 25,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Four-Dimensional Adventure'
}

export default config