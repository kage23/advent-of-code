import inputs from '../../inputs/2017/day11'
import { DayConfig } from '../../routes/Day'
import manhattanDistance from '../../utils/manhattanDistance'

const stepFn = (step: string, currentPosition: number[]) => {
  switch (step) {
    case 'nw':
      currentPosition[0]++
      currentPosition[2]--
      break

    case 'n':
      currentPosition[0]++
      currentPosition[1]--
      break

    case 'ne':
      currentPosition[1]--
      currentPosition[2]++
      break

    case 'sw':
      currentPosition[1]++
      currentPosition[2]--
      break

    case 's':
      currentPosition[0]--
      currentPosition[1]++
      break

    case 'se':
      currentPosition[0]--
      currentPosition[2]++
      break

    default:
      break
  }

  return currentPosition
}

export const findDistance = (input: string) => {
  const steps = input.split(',')
  let currentPosition = [0, 0, 0]

  steps.forEach((step) => {
    currentPosition = stepFn(step, currentPosition)
  })

  return {
    answer1: manhattanDistance(currentPosition, [0, 0, 0]) / 2,
  }
}

export const findFurthestDistance = (input: string) => {
  const steps = input.split(',')
  let currentPosition = [0, 0, 0]
  let furthestPosition = 0

  steps.forEach((step) => {
    currentPosition = stepFn(step, currentPosition)
    furthestPosition = Math.max(
      furthestPosition,
      manhattanDistance(currentPosition, [0, 0, 0]) / 2
    )
  })

  return {
    answer2: furthestPosition,
  }
}

const day11: Omit<DayConfig, 'year'> = {
  answer1Text: 'The final position is answer steps away.',
  answer2Text: 'The furthest position was answer steps away.',
  buttons: [
    {
      label: 'Find Distance',
      onClick: findDistance,
    },
    {
      label: 'Find Furthest Distance',
      onClick: findFurthestDistance,
    },
  ],
  id: 11,
  inputs,
  title: 'Hex Ed',
}

export default day11
