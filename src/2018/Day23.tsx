import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'

import INPUT from './Input/Day23'
import { manhattanDistance } from '../utils/Various'

const countInRangeNanobots = (input: string): number => {
  const nanobots: number[][] = input.split('\n')
  .map(nanobotStr => {
    const [ pos, rStr ] = nanobotStr.split(', ')
    const [ xStr, yStr, zStr ] = pos.split(',')

    return [parseInt(xStr.slice(5)), parseInt(yStr), parseInt(zStr), parseInt(rStr.slice(2))]
  })
  .sort((a, b) => b[3] - a[3])

  const strongestNanobot = nanobots[0]
  let nanobotsInRange = 0

  nanobots.forEach(nanobot => {
    if (manhattanDistance(nanobot, strongestNanobot, 3) <= strongestNanobot[3]) nanobotsInRange++
  })

  return nanobotsInRange
}

const BUTTONS: IButton[] = [
  {
    label: 'Count In-Range Nanobots',
    onClick: (inputKey) => {
      return {
        answer1: countInRangeNanobots(INPUT[inputKey]).toString()
      }
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      <code>{answer}</code> nanbots are in range of the strongest nanobot.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      The solution is{' '}
      <code>{answer}</code>.
    </span>
  ),
  buttons: BUTTONS,
  day: 23,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Experimental Emergency Teleportation'
}

export default config