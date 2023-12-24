import inputs from '../../inputs/2023/day23'
import { DayConfig } from '../../routes/Day'
import BinaryHeap from '../../utils/BinaryHeap'

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

interface Intersection {
  id: number
  location: string
  neighbors: number[]
}

/**
 * This can and should be optimized... On the real input, it finds
 * the correct answer in about 3.5 seconds, but keeps running for
 * a total of 55 seconds, completely exhausting the search space.
 * I'm sure the search tree could be pruned somehow.
 */
export const findDryLongHike = (input: string) => {
  // First, we map out the grid and locate the start and end points
  console.time('Read the grid initially')
  const grid: Set<string> = new Set()
  const start = [0, 0]
  const end = [0, 0]
  input.split('\n').forEach((row, ri, map) => {
    for (let col = 0; col < row.length; col++) {
      const gridSpot = row.charAt(col)
      if (gridSpot !== '#') {
        grid.add([ri, col].join(','))
      }
      if (ri === 0 && gridSpot === '.') {
        start[0] = ri
        start[1] = col
      }
      if (ri === map.length - 1 && gridSpot === '.') {
        end[0] = ri
        end[1] = col
      }
    }
  })
  console.timeEnd('Read the grid initially')

  // Then, we identify all of the intersection points
  console.time('Find all intersections')
  let id = 0
  const intersectionsLocationMap: Map<string, Intersection> = new Map()
  const intersectionsIdMap: Map<number, Intersection> = new Map()
  Array.from(grid.entries()).forEach(([location], i, arr) => {
    const [row, col] = location.split(',').map(Number)
    const neighbors = [
      [row - 1, col],
      [row, col + 1],
      [row + 1, col],
      [row, col - 1],
    ].filter(([r, c]) => grid.has([r, c].join(',')))
    if (neighbors.length > 2 || i === 0 || i === arr.length - 1) {
      const node = {
        id,
        location: [row, col].join(','),
        neighbors: [],
      }
      intersectionsLocationMap.set([row, col].join(','), node)
      intersectionsIdMap.set(id, node)
      id++
    }
  })
  console.timeEnd('Find all intersections')

  // For each intersection, find its neighbors and distance to them
  console.time('Find intersection neighbors and distances')
  const intersectionDistances = new Map<string, number>() // Map<'id,id', distance>
  Array.from(intersectionsLocationMap.entries()).forEach(
    ([location, intersection]) => {
      const [row, col] = location.split(',').map(Number)
      const neighbors = [
        [row - 1, col],
        [row, col + 1],
        [row + 1, col],
        [row, col - 1],
      ].filter(([r, c]) => grid.has([r, c].join(',')))
      neighbors.forEach(([r, c]) => {
        const visited = new Set<string>([location])
        const current = [r, c]
        let steps = 1
        while (!intersectionsLocationMap.has(current.join(','))) {
          visited.add(current.join(','))
          const next = [
            [current[0] - 1, current[1]],
            [current[0], current[1] + 1],
            [current[0] + 1, current[1]],
            [current[0], current[1] - 1],
          ].filter(
            ([rx, cx]) =>
              grid.has([rx, cx].join(',')) && !visited.has([rx, cx].join(','))
          )
          current[0] = next[0][0]
          current[1] = next[0][1]
          steps++
        }
        const neighborIntersection = intersectionsLocationMap.get(
          current.join(',')
        )!
        intersectionDistances.set(
          [intersection.id, neighborIntersection.id]
            .sort((a, b) => a - b)
            .join(','),
          steps
        )
        intersection.neighbors.push(neighborIntersection.id)
      })
    }
  )
  console.timeEnd('Find intersection neighbors and distances')

  // Now let's try a BFS and exhausting the search space
  let longestPath = 0
  const searchQueue = new BinaryHeap<{
    distance: number
    path: string[]
  }>(({ distance }) => distance, 'max', {
    distance: 0,
    path: [start.join(',')],
  })
  while (searchQueue.size() > 0) {
    const { distance, path } = searchQueue.pop()
    const currentNode = path[path.length - 1]
    if (currentNode === end.join(',')) {
      if (distance > longestPath) console.log(`New longest path: ${distance}`)
      longestPath = Math.max(longestPath, distance)
    } else {
      const intersection = intersectionsLocationMap.get(currentNode)!
      intersection.neighbors.forEach((id) => {
        const neighbor = intersectionsIdMap.get(id)!
        if (!path.includes(neighbor.location)) {
          const distanceToNeighbor = intersectionDistances.get(
            [intersection.id, neighbor.id].sort((a, b) => a - b).join(',')
          )!
          searchQueue.push({
            distance: distance + distanceToNeighbor,
            path: [...path, neighbor.location],
          })
        }
      })
    }
  }

  return { answer2: longestPath }
}

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
