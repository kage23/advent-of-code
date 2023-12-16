import inputs from '../../inputs/2016/day01'
import { DayConfig } from '../../routes/Day'
import manhattanDistance from '../../utils/manhattanDistance'

// increase directions index to turn right; decrease to turn left
const DIRECTIONS = [
  [-1, 0], // moving north
  [0, 1], // moving east
  [1, 0], // moving south
  [0, -1], // moving west
]

export const findEndOfPath = (input: string) => {
  const directions = input.split(', ')
  const currentPosition = [0, 0]
  let currentDirectionIndex = 0

  for (const directionRaw of directions) {
    // Turn
    currentDirectionIndex += directionRaw.charAt(0) === 'R' ? 1 : -1
    currentDirectionIndex = currentDirectionIndex % DIRECTIONS.length
    if (currentDirectionIndex < 0) currentDirectionIndex = DIRECTIONS.length - 1

    // Then move
    const numberOfBlocks = parseInt(directionRaw.slice(1))
    currentPosition[0] += DIRECTIONS[currentDirectionIndex][0] * numberOfBlocks
    currentPosition[1] += DIRECTIONS[currentDirectionIndex][1] * numberOfBlocks
  }

  return {
    answer1: manhattanDistance(currentPosition, [0, 0]),
  }
}

export const findFirstRepeatLocation = (input: string) => {
  const directions = input.split(', ')
  const currentPosition = [0, 0]
  let currentDirectionIndex = 0
  const visitedBefore: Map<string, boolean> = new Map()
  visitedBefore.set(JSON.stringify(currentPosition), true)

  mainLoop: for (const directionRaw of directions) {
    // Turn
    currentDirectionIndex += directionRaw.charAt(0) === 'R' ? 1 : -1
    currentDirectionIndex = currentDirectionIndex % DIRECTIONS.length
    if (currentDirectionIndex < 0) currentDirectionIndex = DIRECTIONS.length - 1

    // Then move
    const numberOfBlocks = parseInt(directionRaw.slice(1))
    for (let i = 0; i < numberOfBlocks; i++) {
      currentPosition[0] += DIRECTIONS[currentDirectionIndex][0]
      currentPosition[1] += DIRECTIONS[currentDirectionIndex][1]

      // Then check if we've been here before and either stop, or mark it
      if (visitedBefore.get(JSON.stringify(currentPosition))) {
        break mainLoop
      } else {
        visitedBefore.set(JSON.stringify(currentPosition), true)
      }
    }
  }

  return {
    answer2: manhattanDistance(currentPosition, [0, 0]),
  }
}

const day01: Omit<DayConfig, 'year'> = {
  answer1Text: 'The Easter Bunny HQ is answer blocks away.',
  answer2Text: 'The first location that you visit twice is answer blocks away.',
  buttons: [
    {
      label: 'Find End of Path',
      onClick: findEndOfPath,
    },
    {
      label: 'Find First Repeat Location',
      onClick: findFirstRepeatLocation,
    },
  ],
  id: 1,
  inputs,
  title: 'No Time for a Taxicab',
}

export default day01
