import inputs from '../../inputs/2022/day12'
import { DayConfig } from '../../routes/Day'
import AStar from '../../utils/AStar'
import manhattanDistance from '../../utils/manhattanDistance'

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
  } catch (e) {
    throw new Error(`fuck: ${e}`)
  }
}

export const findAPath = (input: string) => {
  // These are [row, col]
  const start = [0, 0] as [number, number]
  const end = [0, 0] as [number, number]

  const field = input.split('\n')

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
    answer1: getAPath(field, start, end).cost
  }
}

export const findShortestPath = (input: string) => {
  const starts: [number, number][] = []
  const end: [number, number] = [0, 0]

  const field = input.split('\n')

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

  const distances = starts.map(start => getAPath(field, start, end).cost).sort((a, b) => a - b)

  return {
    answer2: distances[0]
  }
}

const day12: Omit<DayConfig, 'year'> = {
  answer1Text: 'The shortest path takes answer steps.',
  answer2Text: 'The shortest path from any start takes answer steps.',
  buttons: [
    {
      label: 'Find a Path',
      onClick: findAPath
    },
    {
      label: 'Find the Shortest Path',
      onClick: findShortestPath
    },
  ],
  id: 12,
  inputs,
  title: 'Hill Climbing Algorithm',
}

export default day12
