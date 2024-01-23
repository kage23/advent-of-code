import inputs from '../../inputs/2023/day14'
import { DayConfig } from '../../routes/Day'

const rollNorth = (grid: string[][]) => {
  for (let col = 0; col < grid[0].length; col++) {
    for (let row = 1; row < grid.length; row++) {
      if (grid[row][col] === 'O') {
        let newRow: number | undefined
        for (let r = row - 1; r >= 0; r--) {
          if (grid[r][col] === '#' || grid[r][col] === 'O') {
            break
          }
          newRow = r
        }
        if (newRow !== undefined) {
          grid[row][col] = '.'
          grid[newRow][col] = 'O'
        }
      }
    }
  }
}

const rollSouth = (grid: string[][]) => {
  for (let col = 0; col < grid[0].length; col++) {
    for (let row = grid.length - 2; row >= 0; row--) {
      if (grid[row][col] === 'O') {
        let newRow: number | undefined
        for (let r = row + 1; r < grid.length; r++) {
          if (grid[r][col] === '#' || grid[r][col] === 'O') {
            break
          }
          newRow = r
        }
        if (newRow !== undefined) {
          grid[row][col] = '.'
          grid[newRow][col] = 'O'
        }
      }
    }
  }
}

const rollWest = (grid: string[][]) => {
  for (let row = 0; row < grid.length; row++) {
    for (let col = 1; col < grid[0].length; col++) {
      if (grid[row][col] === 'O') {
        let newCol: number | undefined
        for (let c = col - 1; c >= 0; c--) {
          if (grid[row][c] === '#' || grid[row][c] === 'O') {
            break
          }
          newCol = c
        }
        if (newCol !== undefined) {
          grid[row][col] = '.'
          grid[row][newCol] = 'O'
        }
      }
    }
  }
}

const rollEast = (grid: string[][]) => {
  for (let row = 0; row < grid.length; row++) {
    for (let col = grid[0].length - 2; col >= 0; col--) {
      if (grid[row][col] === 'O') {
        let newCol: number | undefined
        for (let c = col + 1; c < grid[0].length; c++) {
          if (grid[row][c] === '#' || grid[row][c] === 'O') {
            break
          }
          newCol = c
        }
        if (newCol !== undefined) {
          grid[row][col] = '.'
          grid[row][newCol] = 'O'
        }
      }
    }
  }
}

const doACycle = (grid: string[][]) => {
  rollNorth(grid)
  rollWest(grid)
  rollSouth(grid)
  rollEast(grid)
}

const getGridString = (grid: string[][]) =>
  grid.map((line) => line.join('')).join(',')

export const rollRocksNorth = (input: string) => {
  const grid = input.split('\n').map((line) => line.split(''))
  rollNorth(grid)
  return {
    answer1: grid.reduce(
      (sum, line, i, g) =>
        sum + line.filter((x) => x === 'O').length * (g.length - i),
      0
    ),
  }
}

export const doABunchOfCycles = (input: string) => {
  let grid = input.split('\n').map((line) => line.split(''))
  const seenAtCycle: Map<string, number> = new Map([[getGridString(grid), 0]])
  const gridAtCycle: string[] = [getGridString(grid)]

  // First, find the loop size and start
  let loopSize: number | undefined
  let loopStart = -1
  let i = 1

  findTheLoop: while (i < 1000000000) {
    doACycle(grid)
    const gridString = getGridString(grid)
    if (seenAtCycle.has(gridString)) {
      loopSize = i - seenAtCycle.get(gridString)!
      loopStart = seenAtCycle.get(gridString)!
      grid = gridAtCycle[((1000000000 - loopStart) % loopSize) + loopStart]
        .split(',')
        .map((line) => line.split(''))
      break findTheLoop
    }
    seenAtCycle.set(getGridString(grid), i)
    gridAtCycle.push(getGridString(grid))
    i++
  }

  return {
    answer2: grid.reduce(
      (sum, line, i, g) =>
        sum + line.filter((x) => x === 'O').length * (g.length - i),
      0
    ),
  }
}

const day14: Omit<DayConfig, 'year'> = {
  answer1Text: 'The total load on the north beams is answer.',
  answer2Text:
    'The total load on the north beams after a bunch of cycles is answer.',
  buttons: [
    {
      label: 'Roll Rocks North',
      onClick: rollRocksNorth,
    },
    {
      label: 'Do a Bunch of Cycles',
      onClick: doABunchOfCycles,
    },
  ],
  id: 14,
  inputs,
  title: 'Parabolic Reflector Dish',
}

export default day14
