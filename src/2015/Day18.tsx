import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'

import INPUT from './Input/Day18'

const countOnNeighbors = (grid: string, x: number, y: number): number => {
  const parsedGrid = grid.split('\n')

  const coordsToCheck = [
    [x - 1, y - 1],
    [x - 1, y],
    [x - 1, y + 1],
    [x, y - 1],
    [x, y + 1],
    [x + 1, y - 1],
    [x + 1, y],
    [x + 1, y + 1],
  ]
    .filter(([x, y]) => x >= 0 && y >= 0 && x <= parsedGrid[0].length - 1 && y <= parsedGrid.length - 1)

  return coordsToCheck
    .map(([x, y]) => parsedGrid[y].charAt(x))
    .filter(x => x === '#')
    .length
}

const getNextGrid = (grid: string, part: 1 | 2): string => {
  const gridSize = grid.split('\n').length
  let nextGrid = ''

  let x = 0
  let y = 0
  for (let i = 0; i < grid.length; i++) {
    const char = grid[i]
    let onNeighborsCount = 0
    if (
      part === 2 &&
      (
        (x === 0 && y === 0) ||
        (x === 0 && y === gridSize - 1) ||
        (x === gridSize - 1 && y === 0) ||
        (x === gridSize - 1 && y === gridSize - 1)
      )
    ) {
      nextGrid += '#'
      x++
    } else {
      switch (char) {
        case '.':
          onNeighborsCount = countOnNeighbors(grid, x, y)
          if (onNeighborsCount === 3) {
            nextGrid += '#'
          } else {
            nextGrid += '.'
          }
          x++
          break

        case '#':
          onNeighborsCount = countOnNeighbors(grid, x, y)
          if (onNeighborsCount === 2 || onNeighborsCount === 3) {
            nextGrid += '#'
          } else {
            nextGrid += '.'
          }
          x++
          break

        case '\n':
        default:
          y++
          x = 0
          nextGrid += char
          break
      }
    }
  }

  return nextGrid
}

const BUTTONS: IButton[] = [
  {
    label: 'Run Light Animation',
    onClick: (inputKey) => {
      let grid = INPUT[inputKey]
      const animationSteps = inputKey.startsWith('DEMO') ? 4 : 100
      for (let i = 0; i < animationSteps; i++) {
        grid = getNextGrid(grid, 1)
      }
      return {
        answer1: grid.split('').filter(x => x === '#').length.toString()
      }
    }
  },
  {
    label: 'Run Light Animation with Stuck On Lights',
    onClick: (inputKey) => {
      let grid = INPUT[inputKey]
      const animationSteps = inputKey.startsWith('DEMO') ? 5 : 100
      for (let i = 0; i < animationSteps; i++) {
        grid = getNextGrid(grid, 2)
      }
      return {
        answer2: grid.split('').filter(x => x === '#').length.toString()
      }
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      At the end of the animation, <code>{answer}</code> lights are turned on.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      At the end of the animation, <code>{answer}</code> lights are turned on{' '}
      (including the corner lights which are stuck on).
    </span>
  ),
  buttons: BUTTONS,
  day: 18,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Like a GIF For Your Yard'
}

export default config