import inputs from '../../inputs/2016/day13'
import { DayConfig } from '../../routes/Day'
import manhattanDistance from '../../utils/manhattanDistance'
import SLL from '../../utils/SLL'

const parseGridString = (coords: string): number[] =>
  coords.split(',').map((x) => parseInt(x))
const renderGridString = (coords: number[]): string => coords.join(',')

const isNotAWall = (coords: number[], favoriteNumber: number): boolean => {
  const [x, y] = coords
  const binaryNumber = Number(
    x * x + 3 * x + 2 * x * y + y + y * y + favoriteNumber
  ).toString(2)
  const oneCount = binaryNumber.split('').filter((x) => x === '1').length

  return oneCount % 2 === 0
}

const getAnswer = (
  start: string,
  end: string,
  favoriteNumber: number,
  part: 1 | 2
): number => {
  const queue = new SLL(start)
  const endCoords = parseGridString(end)
  const parents: Map<string, string> = new Map([[start, '']])
  const visited: Map<string, true> = new Map()

  const getPathLength = (current: string) => {
    let pathLength = 0
    let parent = parents.get(current)
    while (parent && parent !== '') {
      pathLength++
      parent = parents.get(parent)
    }
    return pathLength
  }

  while (queue.length) {
    const current = queue.shift()!
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
        [x, y + 1],
      ]
        .filter(
          ([nextX, nextY]) =>
            nextX >= 0 &&
            nextY >= 0 &&
            !visited.get(renderGridString([nextX, nextY])) &&
            isNotAWall([nextX, nextY], favoriteNumber)
        )
        .sort(
          (a, b) =>
            manhattanDistance(a, endCoords) - manhattanDistance(b, endCoords)
        )
        .map((x) => renderGridString(x))

      nextSteps.forEach((nextStep) => {
        parents.set(nextStep, current)
        let insertAfter = queue.head
        if (!insertAfter || part === 2) {
          queue.push(nextStep)
        } else {
          while (
            insertAfter &&
            insertAfter.next &&
            manhattanDistance(parseGridString(insertAfter.value), endCoords) <=
              manhattanDistance([x, y], endCoords) &&
            manhattanDistance(
              parseGridString(insertAfter.next.value),
              endCoords
            ) <= manhattanDistance([x, y], endCoords)
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

export const findShortestPath = (inputKey: string) => {
  const favoriteNumber = parseInt(inputs.get(inputKey)!)
  const start = '1,1'
  const end = inputKey.startsWith('DEMO') ? '7,4' : '31,39'

  const pathLength = getAnswer(start, end, favoriteNumber, 1)

  return {
    answer1: pathLength,
  }
}

export const countLocations = (inputKey: string) => {
  const favoriteNumber = parseInt(inputs.get(inputKey)!)
  const start = '1,1'
  const end = inputKey.startsWith('DEMO') ? '7,4' : '31,39'

  return {
    answer2: getAnswer(start, end, favoriteNumber, 2),
  }
}

const day13: Omit<DayConfig, 'year'> = {
  answer1Text: 'It will take answer steps to reach your destination.',
  answer2Text:
    'There are answer accessible squares within 50 steps of the start.',
  buttons: [
    {
      label: 'Find Shortest Path',
      onClick: findShortestPath,
    },
    {
      label: 'Find All Squares within 50 Steps',
      onClick: countLocations,
    },
  ],
  id: 13,
  inputs,
  title: 'A Maze of Twisty Little Cubicles',
}

export default day13
