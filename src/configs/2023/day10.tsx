import inputs from '../../inputs/2023/day10'
import { DayConfig } from '../../routes/Day'

const getNext = (path: string[], grid: string[]) => {
  const current = path[path.length - 1]
  const [row, col] = current.split(',').map(Number)
  const spot = grid[row].charAt(col)
  switch (spot) {
    case '|': {
      const up = [row - 1, col]
      const upSpot = grid[up[0]].charAt(up[1])
      if (
        (upSpot === '|' || upSpot === 'F' || upSpot === '7') &&
        !path.includes(up.join(','))
      ) {
        return up.join(',')
      }

      const down = [row + 1, col]
      const downSpot = grid[down[0]].charAt(down[1])
      if (
        (downSpot === '|' || downSpot === 'L' || downSpot === 'J') &&
        !path.includes(down.join(','))
      ) {
        return down.join(',')
      }

      break
    }
    case '-': {
      const right = [row, col + 1]
      const rightSpot = grid[right[0]].charAt(right[1])
      if (
        (rightSpot === '-' || rightSpot === '7' || rightSpot === 'J') &&
        !path.includes(right.join(','))
      ) {
        return right.join(',')
      }

      const left = [row, col - 1]
      const leftSpot = grid[left[0]].charAt(left[1])
      if (
        (leftSpot === '-' || leftSpot === 'F' || leftSpot === 'L') &&
        !path.includes(left.join(','))
      ) {
        return left.join(',')
      }

      break
    }
    case 'L': {
      const up = [row - 1, col]
      const upSpot = grid[up[0]].charAt(up[1])
      if (
        (upSpot === '|' || upSpot === 'F' || upSpot === '7') &&
        !path.includes(up.join(','))
      ) {
        return up.join(',')
      }

      const right = [row, col + 1]
      const rightSpot = grid[right[0]].charAt(right[1])
      if (
        (rightSpot === '-' || rightSpot === '7' || rightSpot === 'J') &&
        !path.includes(right.join(','))
      ) {
        return right.join(',')
      }

      break
    }
    case 'J': {
      const up = [row - 1, col]
      const upSpot = grid[up[0]].charAt(up[1])
      if (
        (upSpot === '|' || upSpot === 'F' || upSpot === '7') &&
        !path.includes(up.join(','))
      ) {
        return up.join(',')
      }

      const left = [row, col - 1]
      const leftSpot = grid[left[0]].charAt(left[1])
      if (
        (leftSpot === '-' || leftSpot === 'F' || leftSpot === 'L') &&
        !path.includes(left.join(','))
      ) {
        return left.join(',')
      }

      break
    }
    case '7': {
      const left = [row, col - 1]
      const leftSpot = grid[left[0]].charAt(left[1])
      if (
        (leftSpot === '-' || leftSpot === 'F' || leftSpot === 'L') &&
        !path.includes(left.join(','))
      ) {
        return left.join(',')
      }

      const down = [row + 1, col]
      const downSpot = grid[down[0]].charAt(down[1])
      if (
        (downSpot === '|' || downSpot === 'L' || downSpot === 'J') &&
        !path.includes(down.join(','))
      ) {
        return down.join(',')
      }

      break
    }
    case 'F': {
      const right = [row, col + 1]
      const rightSpot = grid[right[0]].charAt(right[1])
      if (
        (rightSpot === '-' || rightSpot === '7' || rightSpot === 'J') &&
        !path.includes(right.join(','))
      ) {
        return right.join(',')
      }

      const down = [row + 1, col]
      const downSpot = grid[down[0]].charAt(down[1])
      if (
        (downSpot === '|' || downSpot === 'L' || downSpot === 'J') &&
        !path.includes(down.join(','))
      ) {
        return down.join(',')
      }

      break
    }
  }
}

export const findFarthestPoint = (input: string) => {
  const grid = input.split('\n')
  const start = [
    grid.findIndex((line) => line.includes('S')),
    grid.find((line) => line.includes('S'))!.indexOf('S'),
  ]
  const path1: string[] = [start.join(',')]
  const path2: string[] = [start.join(',')]

  // Up
  if (
    grid[start[0] - 1][start[1]] === '|' ||
    grid[start[0] - 1][start[1]] === 'F' ||
    grid[start[0] - 1][start[1]] === '7'
  ) {
    path1.push([start[0] - 1, start[1]].join(','))
  }

  // Right
  if (
    grid[start[0]][start[1] + 1] === '-' ||
    grid[start[0]][start[1] + 1] === '7' ||
    grid[start[0]][start[1] + 1] === 'J'
  ) {
    if (path1.length === 1) path1.push([start[0], start[1] + 1].join(','))
    else path2.push([start[0], start[1] + 1].join(','))
  }

  // Down
  if (
    grid[start[0] + 1][start[1]] === '|' ||
    grid[start[0] + 1][start[1]] === 'J' ||
    grid[start[0] + 1][start[1]] === 'L'
  ) {
    if (path1.length === 1) path1.push([start[0] + 1, start[1]].join(','))
    else path2.push([start[0] + 1, start[1]].join(','))
  }

  // Left
  if (
    grid[start[0]][start[1] - 1] === '-' ||
    grid[start[0]][start[1] - 1] === 'L' ||
    grid[start[0]][start[1] - 1] === 'F'
  ) {
    path2.push([start[0], start[1] - 1].join(','))
  }

  let steps = 1
  while (path1[path1.length - 1] !== path2[path2.length - 1]) {
    path1.push(getNext(path1, grid)!)
    path2.push(getNext(path2, grid)!)
    steps++
  }

  return { answer1: steps }
}

export const findInnerArea = (input: string) => {
  const grid = input.split('\n')
  const start = [
    grid.findIndex((line) => line.includes('S')),
    grid.find((line) => line.includes('S'))!.indexOf('S'),
  ]
  let currentStep = start.join(',')
  const path: string[] = [currentStep]

  // Get first step
  // Up
  if (
    start[0] - 1 >= 0 &&
    (grid[start[0] - 1][start[1]] === '|' ||
      grid[start[0] - 1][start[1]] === 'F' ||
      grid[start[0] - 1][start[1]] === '7')
  ) {
    currentStep = [start[0] - 1, start[1]].join(',')
  }

  // Right
  else if (
    start[1] + 1 < grid[0].length &&
    (grid[start[0]][start[1] + 1] === '-' ||
      grid[start[0]][start[1] + 1] === '7' ||
      grid[start[0]][start[1] + 1] === 'J')
  ) {
    currentStep = [start[0], start[1] + 1].join(',')
  }

  // Down
  else if (
    start[0] + 1 < grid.length &&
    (grid[start[0] + 1][start[1]] === '|' ||
      grid[start[0] + 1][start[1]] === 'J' ||
      grid[start[0] + 1][start[1]] === 'L')
  ) {
    currentStep = [start[0] + 1, start[1]].join(',')
  }

  // Left
  else if (
    start[1] - 1 >= 0 &&
    (grid[start[0]][start[1] - 1] === '-' ||
      grid[start[0]][start[1] - 1] === 'L' ||
      grid[start[0]][start[1] - 1] === 'F')
  ) {
    currentStep = [start[0], start[1] - 1].join(',')
  }

  path.push(currentStep)

  // Get the rest of the path
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const next = getNext(path, grid)
    if (next === undefined) break
    path.push(next)
  }

  // Store all the vertical crossings
  const vx: Set<string> = new Set()
  path.forEach((coord) => {
    const [row, col] = coord.split(',').map(Number)
    const piece = grid[row].charAt(col)
    if (piece === '-' || piece === 'F' || piece === 'L') {
      vx.add(coord)
    }
    if (piece === 'S') {
      // If it's -, it'll have -/F/L to the left and -/7/J to the right
      // If it's F, it'll have |/L/J below and -/7/J to the right
      // If it's L, it'll have |/F/7 above and -/7/J to the right

      // They all have -/7/J to the right so let's check that first
      const rightSpot = col + 1 < grid[row].length && grid[row].charAt(col + 1)
      const leftSpot = col - 1 >= 0 && grid[row].charAt(col - 1)
      const downSpot = row + 1 < grid.length && grid[row + 1].charAt(col)
      const upSpot = row - 1 >= 0 && grid[row - 1].charAt(col)
      if (rightSpot === '-' || rightSpot === '7' || rightSpot === 'J') {
        if (
          leftSpot === '-' ||
          leftSpot === 'F' ||
          leftSpot === 'L' ||
          downSpot === '|' ||
          downSpot === 'L' ||
          downSpot === 'J' ||
          upSpot === '|' ||
          upSpot === 'F' ||
          upSpot === '7'
        ) {
          vx.add(coord)
        }
      }
    }
  })

  // Loop through the whole grid and count the inside pieces
  let insideCount = 0
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      const coord = [row, col].join(',')
      if (!path.includes(coord)) {
        // Travel north and count the crossings along the way
        let crossings = 0
        for (let r = row - 1; r >= 0; r--) {
          if (vx.has([r, col].join(','))) crossings++
        }
        // Odd numbers of crossings means inside
        if (crossings % 2 === 1) insideCount++
      }
    }
  }
  return { answer2: insideCount }
}

const day10: Omit<DayConfig, 'year'> = {
  answer1Text:
    'The farthest point from the start of the pipe is answer steps away.',
  answer2Text: 'There are answer squares inside the pipe-pen.',
  buttons: [
    {
      label: 'Find the Farthest Point',
      onClick: findFarthestPoint,
    },
    {
      label: 'Find Inner Area',
      onClick: findInnerArea,
    },
  ],
  id: 10,
  inputs,
  title: 'Pipe Maze',
}

export default day10
