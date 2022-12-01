import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'

import INPUT from '../Inputs/2017/Day03'
import { manhattanDistance } from '../utils/Various'

const Directions: Array<'R' | 'U' | 'L' | 'D'> = [
  'R', 'U', 'L', 'D'
]

const getAdjacentSquares = (position: number[]): number[][] => [
  [position[0] - 1, position[1] - 1],
  [position[0], position[1] - 1],
  [position[0] + 1, position[1] - 1],
  [position[0] - 1, position[1]],
  // [position[0]    , position[1]    ],
  [position[0] + 1, position[1]],
  [position[0] - 1, position[1] + 1],
  [position[0], position[1] + 1],
  [position[0] + 1, position[1] + 1]
]

const figureSolution = (input: number, whichPart: 1 | 2): {
  answer1?: string
  answer2?: string
} => {
  let currentId = 1
  let currentPosition = [0, 0]
  let currentValue = 1
  let max = [0, 0]
  let min = [0, 0]
  let directionIndex = 0
  const posValueMap: { [key: string]: number } = {
    [`${JSON.stringify(currentPosition)}`]: 1
  }

  while (
    (whichPart === 1 && currentId < input)
    || (whichPart === 2 && currentValue <= input)
  ) {
    switch (Directions[directionIndex]) {
      case 'R':
        currentPosition[0]++
        if (currentPosition[0] > max[0]) {
          max[0] = currentPosition[0]
          directionIndex = (directionIndex + 1) % Directions.length
        }
        break

      case 'U':
        currentPosition[1]--
        if (currentPosition[1] < min[1]) {
          min[1] = currentPosition[1]
          directionIndex = (directionIndex + 1) % Directions.length
        }
        break

      case 'L':
        currentPosition[0]--
        if (currentPosition[0] < min[0]) {
          min[0] = currentPosition[0]
          directionIndex = (directionIndex + 1) % Directions.length
        }
        break

      case 'D':
        currentPosition[1]++
        if (currentPosition[1] > max[1]) {
          max[1] = currentPosition[1]
          directionIndex = (directionIndex + 1) % Directions.length
        }
        break
    }
    currentValue = getAdjacentSquares(currentPosition).reduce((value, position) => (
      value + (posValueMap[`${JSON.stringify(position)}`] || 0)
    ), 0)
    posValueMap[JSON.stringify(currentPosition)] = currentValue
    currentId++
  }

  return whichPart === 1
    ? {
      answer1: manhattanDistance(currentPosition, [0, 0]).toString()
    }
    : {
      answer2: currentValue.toString()
    }
}

const BUTTONS: IButton[] = [
  {
    label: 'Calculate Distance to Access Port',
    onClick: (inputKey) => ({
      ...figureSolution(parseInt(INPUT[inputKey]), 1)
    })
  },
  {
    label: 'Find Value Larger than Input',
    onClick: (inputKey) => ({
      ...figureSolution(parseInt(INPUT[inputKey]), 2)
    })
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The data is carried <code>{answer}</code> steps.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      The first value written larger than the input is{' '}
      <code>{answer}</code>.
    </span>
  ),
  buttons: BUTTONS,
  day: 3,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Spiral Memory'
}

export default config