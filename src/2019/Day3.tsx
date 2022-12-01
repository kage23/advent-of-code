import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'
import { manhattanDistance } from '../utils/Various'

import INPUT from '../Inputs/2019/Day3'

const findPositionsForWire = (row: string) => {
  let x = 0
  let y = 0
  let steps = 0

  const positions: Map<string, number> = new Map()

  row.split(',').forEach(instruction => {
    const direction = instruction.charAt(0)
    const count = parseInt(instruction.slice(1))
    switch (direction) {
      case 'U':
        for (let i = 1; i <= count; i++) {
          y += 1
          const key = `${x},${y}`
          steps++
          if (!positions.has(key)) {
            positions.set(key, steps)
          }
        }
        break

      case 'D':
        for (let i = 1; i <= count; i++) {
          y -= 1
          const key = `${x},${y}`
          steps++
          if (!positions.has(key)) {
            positions.set(key, steps)
          }
        }
        break

      case 'R':
        for (let i = 1; i <= count; i++) {
          x += 1
          const key = `${x},${y}`
          steps++
          if (!positions.has(key)) {
            positions.set(key, steps)
          }
        }
        break

      case 'L':
        for (let i = 1; i <= count; i++) {
          x -= 1
          const key = `${x},${y}`
          steps++
          if (!positions.has(key)) {
            positions.set(key, steps)
          }
        }
        break

      default:
        break
    }
  })

  return positions
}

const BUTTONS: IButton[] = [
  {
    label: 'Find Closest Intersection',
    onClick: (inputKey: string) => {
      const rows = INPUT[inputKey].split('\n')
      const positions = rows.map(row => findPositionsForWire(row))

      let minDistance = Number.MAX_SAFE_INTEGER

      positions[0].forEach((value, key) => {
        if (positions[1].has(key)) {
          const xy = key.split(',').map(i => parseInt(i))
          const currentDistance = manhattanDistance(xy, [0, 0])
          minDistance = Math.min(minDistance, currentDistance)
        }
      })

      return {
        answer1: minDistance.toString()
      }
    }
  },
  {
    label: 'Find Fewest Total Steps to Intersection',
    onClick: (inputKey: string) => {
      const rows = INPUT[inputKey].split('\n')
      const positions = rows.map(row => findPositionsForWire(row))

      let minStepsToIntersection = Number.MAX_SAFE_INTEGER

      positions[0].forEach((stepsOnWire1, key) => {
        if (positions[1].has(key)) {
          const currentStepsToIntersection = stepsOnWire1 + (positions[1].get(key) || 0)
          minStepsToIntersection = Math.min(currentStepsToIntersection, minStepsToIntersection)
        }
      })

      return {
        answer2: minStepsToIntersection.toString()
      }
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The distance to the closest intersection is{' '}
      <code>{answer}</code>.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      The fewest total steps to reach an intersection is{' '}
      <code>{answer}</code>.
    </span>
  ),
  buttons: BUTTONS,
  day: 3,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Crossed Wires'
}

export default config
