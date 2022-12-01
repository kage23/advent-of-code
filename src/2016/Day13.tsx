import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'
import { manhattanDistance } from '../utils/Various'
import SLL from '../utils/SLL'

import INPUT from '../Inputs/2016/Day13'

const parseGridString = (coords: string): number[] => coords.split(',').map(x => parseInt(x))
const renderGridString = (coords: number[]): string => coords.join(',')

const isNotAWall = (coords: number[], favoriteNumber: number): boolean => {
  const [x, y] = coords
  const binaryNumber = Number((x * x) + (3 * x) + (2 * x * y) + y + (y * y) + favoriteNumber).toString(2)
  const oneCount = binaryNumber.split('').filter(x => x === '1').length

  return oneCount % 2 === 0
}

const getAnswer = (start: string, end: string, favoriteNumber: number, part: 1 | 2): number => {
  const queue = new SLL(start)
  const endCoords = parseGridString(end)
  const parents: Map<string, string> = new Map([[start, '']])
  const visited: Map<string, true> = new Map()

  const getPathLength = (current: any) => {
    let pathLength = 0
    let parent = parents.get(current)
    while (parent && parent !== '') {
      pathLength++
      parent = parents.get(parent)
    }
    return pathLength
  }

  while (queue.length) {
    const current = queue.shift()
    const currentPathLength = getPathLength(current)
    if (currentPathLength > 50 && part === 2) {
      return visited.size
    }
    visited.set(current, true)
    if (current === end && part === 1) {
      return currentPathLength
    } else {
      const [x, y] = parseGridString(current)
      const nextSteps = [
        [x - 1, y],
        [x + 1, y],
        [x, y - 1],
        [x, y + 1]
      ]
        .filter(([nextX, nextY]) => (
          nextX >= 0
          && nextY >= 0
          && !visited.get(renderGridString([nextX, nextY]))
          && isNotAWall([nextX, nextY], favoriteNumber)
        ))
        .sort((a, b) => manhattanDistance(a, endCoords) - manhattanDistance(b, endCoords))
        .map(x => renderGridString(x))

      nextSteps.forEach(nextStep => {
        parents.set(nextStep, current)
        let insertAfter = queue.head
        if (!insertAfter || part === 2) {
          queue.push(nextStep)
        } else {
          while (
            insertAfter
            && insertAfter.next
            && manhattanDistance(parseGridString(insertAfter.value), endCoords) <= manhattanDistance([x, y], endCoords)
            && manhattanDistance(parseGridString(insertAfter.next.value), endCoords) <= manhattanDistance([x, y], endCoords)
          ) {
            insertAfter = insertAfter.next
          }
          if (insertAfter) {
            queue.insertAfter(nextStep, insertAfter)
          } else {
            queue.unshift(nextStep)
          }
        }
      })
    }
  }

  return NaN
}

const BUTTONS: IButton[] = [
  {
    label: 'Find Shortest Path',
    onClick: (inputKey: string) => {
      const favoriteNumber = parseInt(INPUT[inputKey])
      const start = '1,1'
      const end = inputKey.startsWith('DEMO') ? '7,4' : '31,39'

      const pathLength = getAnswer(start, end, favoriteNumber, 1)

      return {
        answer1: pathLength.toString()
      }
    }
  },
  {
    label: 'Find All Squares within 50 Steps',
    onClick: (inputKey: string) => {
      const favoriteNumber = parseInt(INPUT[inputKey])
      const start = '1,1'
      const end = inputKey.startsWith('DEMO') ? '7,4' : '31,39'

      const fiftyCount = getAnswer(start, end, favoriteNumber, 2)

      return {
        answer2: fiftyCount.toString()
      }
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      It will take <code>{answer}</code> steps to reach your destination.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      There are <code>{answer}</code> accessible squares within <code>50</code>{' '}
      steps of the start.
    </span>
  ),
  buttons: BUTTONS,
  day: 13,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'A Maze of Twisty Little Cubicles'
}

export default config