import inputs from '../../inputs/2023/day23'
import { DayConfig } from '../../routes/Day'

const getAdjacents = (
  row: number,
  col: number,
  grid: Map<string, string>,
  currentPath: string[],
  part2?: boolean
) => {
  const gridSpot = grid.get([row, col].join(','))!
  const nexts: number[][] = []
  if (!part2 && ['^', '>', 'v', '<'].includes(gridSpot)) {
    switch (gridSpot) {
      case '^':
        nexts.push([row - 1, col])
        break
      case '>':
        nexts.push([row, col + 1])
        break
      case 'v':
        nexts.push([row + 1, col])
        break
      case '<':
        nexts.push([row, col - 1])
        break
    }
  } else {
    nexts.push([row - 1, col], [row, col + 1], [row + 1, col], [row, col - 1])
  }
  return nexts.filter(
    ([r, c]) =>
      grid.get([r, c].join(',')) !== undefined &&
      ['.', '^', '>', 'v', '<'].includes(grid.get([r, c].join(','))!) &&
      !currentPath.includes([r, c].join(','))
  )
}

const getNextPaths = (
  row: number,
  col: number,
  grid: Map<string, string>,
  currentPath: string[],
  end: string
): string[][] => {
  const position = [row, col]
  const newPath = [...currentPath]
  let adjacents = getAdjacents(position[0], position[1], grid, newPath, true)
  while (adjacents.length === 1) {
    newPath.push(adjacents[0].join(','))
    position[0] = adjacents[0][0]
    position[1] = adjacents[0][1]
    adjacents = getAdjacents(position[0], position[1], grid, newPath, true)
  }
  if (position.join(',') === end) return [newPath]
  return adjacents.map((adj) => [...newPath, adj.join(',')])
}

export const findLongHike = (input: string) => {
  const grid: Map<string, string> = new Map()
  const start = [0, 0]
  const end = [0, 0]
  input.split('\n').forEach((row, ri, map) => {
    for (let col = 0; col < row.length; col++) {
      grid.set([ri, col].join(','), row.charAt(col))
      if (ri === 0 && row.charAt(col) === '.') {
        start[0] = ri
        start[1] = col
      }
      if (ri === map.length - 1 && row.charAt(col) === '.') {
        end[0] = ri
        end[1] = col
      }
    }
  })

  const goodPaths: string[][] = []

  const searchQueue = [[start.join(',')]]
  while (searchQueue.length) {
    const currentPath = searchQueue.shift()!
    const [row, col] = currentPath[currentPath.length - 1]
      .split(',')
      .map(Number)
    getAdjacents(row, col, grid, currentPath).forEach(([nr, nc]) => {
      const coordKey = [nr, nc].join(',')
      const newPath = [...currentPath, coordKey]
      if (coordKey === end.join(',')) {
        goodPaths.push(newPath)
      } else {
        searchQueue.push(newPath)
      }
    })
  }

  return {
    answer1: Math.max(...goodPaths.map((path) => path.length - 1)),
  }
}

export const findDryLongHike = (input: string) => {
  const grid: Map<string, string> = new Map()
  const start = [0, 0]
  const end = [0, 0]
  input.split('\n').forEach((row, ri, map) => {
    for (let col = 0; col < row.length; col++) {
      grid.set([ri, col].join(','), row.charAt(col))
      if (ri === 0 && row.charAt(col) === '.') {
        start[0] = ri
        start[1] = col
      }
      if (ri === map.length - 1 && row.charAt(col) === '.') {
        end[0] = ri
        end[1] = col
      }
    }
  })

  const goodPathLengths: number[] = []

  const searchQueue = [[start.join(',')]]
  while (searchQueue.length) {
    const currentPath = searchQueue.pop()!
    const [row, col] = currentPath[currentPath.length - 1]
      .split(',')
      .map(Number)
    getNextPaths(row, col, grid, currentPath, end.join(',')).forEach(
      (nextPath) => {
        const coordKey = nextPath[nextPath.length - 1]
        if (coordKey === end.join(',')) {
          goodPathLengths.push(nextPath.length - 1)
        } else {
          searchQueue.push(nextPath)
        }
      }
    )
  }

  return {
    answer2: Math.max(...goodPathLengths),
  }
}

/**
 * ok for part 2 we first have to grid out the map like we're doing
 * then we need to look through it and find all _intersections_
 *    intersection is defined as anywhere with at least three valid neighbors
 *    three because you will have come from one of them, so you need at least two more
 * after identifying and listing all intersections, for each intersection,
 *    we need to identify which intersections it can reach, and the distance to each
 * store all that in memory
 * then do the pathfinding from there
 * instead of re-pathfinding all the time
 */

const day23: Omit<DayConfig, 'year'> = {
  answer1Text: 'The longest hike is answer steps long.',
  answer2Text: 'The longest dry hike is answer steps long.',
  buttons: [
    {
      label: 'Find Long Hike',
      onClick: findLongHike,
    },
    {
      label: 'Find Dry Long Hike',
      onClick: findDryLongHike,
    },
  ],
  id: 23,
  inputs,
  title: 'A Long Walk',
}

export default day23
