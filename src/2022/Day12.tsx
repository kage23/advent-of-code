import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'
import AStar from '../utils/AStar'
import { manhattanDistance } from '../utils/Various'

import INPUT from '../Inputs/2022/Day12'

const getAPath = (field: string[], start: [number, number], end: [number, number]) => {
  const getNeighbors = (current: string) => {
    const [row, col] = JSON.parse(current) as [number, number]
    const currentLetterAscii = field[row].charCodeAt(col)
    const possibleNeighbors = [
      [row - 1, col],
      [row + 1, col],
      [row, col - 1],
      [row, col + 1]
    ]
    return possibleNeighbors.filter(n => (
      n[0] >= 0 && n[0] <= field.length - 1 &&
      n[1] >= 0 && n[1] <= field[0].length - 1 &&
      field[n[0]].charCodeAt(n[1]) <= currentLetterAscii + 1
    )).map(x => JSON.stringify(x))
  }

  const h = (startKey: string, endKey: string) => {
    const start = JSON.parse(startKey) as [number, number]
    const end = JSON.parse(endKey) as [number, number]
    return manhattanDistance(start, end)
  }

  const dFn = () => 1

  try {
    const goal = AStar(
      JSON.stringify(start),
      JSON.stringify(end),
      dFn,
      h,
      getNeighbors
    )

    return goal
  } catch {
    return Infinity
  }
}

const BUTTONS: IButton[] = [
  {
    label: 'Find a Path',
    onClick: (inputKey: string) => {
      // These are [row, col]
      const start = [0, 0] as [number, number]
      const end = [0, 0] as [number, number]

      const field = INPUT[inputKey].split('\n')

      for (let i = 0; i < field.length; i++) {
        if (field[i].includes('S')) {
          start[0] = i
          start[1] = field[i].indexOf('S')
          field[i] = field[i].replace('S', 'a')
        }
        if (field[i].includes('E')) {
          end[0] = i
          end[1] = field[i].indexOf('E')
          field[i] = field[i].replace('E', 'z')
        }
      }

      return {
        answer1: getAPath(field, start, end).toString()
      }
    }
  },
  {
    label: 'Find the Shortest Path',
    onClick: (inputKey: string) => {
      const starts: [number, number][] = []
      const end: [number, number] = [0, 0]

      const field = INPUT[inputKey].split('\n')

      for (let i = 0; i < field.length; i++) {
        for (let j = 0; j < field[i].length; j++) {
          const char = field[i].charAt(j)
          if (char === 'a') {
            starts.push([i, j])
          }
          if (char === 'S') {
            starts.push([i, j])
            field[i] = field[i].replace('S', 'a')
          }
          if (char === 'E') {
            end[0] = i
            end[1] = field[i].indexOf('E')
            field[i] = field[i].replace('E', 'z')
          }
        }
      }

      const distances = starts.map(start => getAPath(field, start, end)).sort((a, b) => a - b)

      return {
        answer2: distances[0].toString()
      }
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The shortest path takes{' '}
      <code>{answer}</code> steps.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      The shortest path from any start takes{' '}
      <code>{answer}</code> steps.
    </span>
  ),
  buttons: BUTTONS,
  day: 12,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Hill Climbing Algorithm'
}

export default config
