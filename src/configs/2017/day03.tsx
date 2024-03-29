import inputs from '../../inputs/2017/day03'
import { DayConfig } from '../../routes/Day'
import manhattanDistance from '../../utils/manhattanDistance'

const Directions = ['R', 'U', 'L', 'D']

const getAdjacentSquares = (position: number[]): number[][] => [
  [position[0] - 1, position[1] - 1],
  [position[0], position[1] - 1],
  [position[0] + 1, position[1] - 1],
  [position[0] - 1, position[1]],
  // [position[0]    , position[1]    ],
  [position[0] + 1, position[1]],
  [position[0] - 1, position[1] + 1],
  [position[0], position[1] + 1],
  [position[0] + 1, position[1] + 1],
]

const figureSolution = (input: number, whichPart: 1 | 2) => {
  let currentId = 1
  const currentPosition = [0, 0]
  let currentValue = 1
  const max = [0, 0]
  const min = [0, 0]
  let directionIndex = 0
  const posValueMap: { [key: string]: number } = {
    [`${JSON.stringify(currentPosition)}`]: 1,
  }

  while (
    (whichPart === 1 && currentId < input) ||
    (whichPart === 2 && currentValue <= input)
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
    currentValue = getAdjacentSquares(currentPosition).reduce(
      (value, position) =>
        value + (posValueMap[`${JSON.stringify(position)}`] || 0),
      0
    )
    posValueMap[JSON.stringify(currentPosition)] = currentValue
    currentId++
  }

  return whichPart === 1
    ? {
        answer1: manhattanDistance(currentPosition, [0, 0]),
      }
    : {
        answer2: currentValue,
      }
}

export const calculateDistance = (input: string) =>
  figureSolution(Number(input), 1)
export const findLargeValue = (input: string) =>
  figureSolution(Number(input), 2)

const day03: Omit<DayConfig, 'year'> = {
  answer1Text: 'The data is carried answer steps.',
  answer2Text: 'The first value written larger than the input is answer.',
  buttons: [
    {
      label: 'Calculate Distance to Access Port',
      onClick: calculateDistance,
    },
    {
      label: 'Find Value Larger than Input',
      onClick: findLargeValue,
    },
  ],
  id: 3,
  inputs,
  title: 'Spiral Memory',
}

export default day03
