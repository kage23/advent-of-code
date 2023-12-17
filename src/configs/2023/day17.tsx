import inputs from '../../inputs/2023/day17'
import { DayConfig } from '../../routes/Day'
import AStar from '../../utils/AStar'
import manhattanDistance from '../../utils/manhattanDistance'

export const findPath = (input: string) => {
  const grid = input.split('\n')

  const endKey = [grid.length - 1, grid[grid.length - 1].length - 1].join(',')

  // Distance from current to next, ie just heat loss of next
  const dFn = (to: string) => {
    const [row, col] = to.split(',').map(Number)
    return Number(grid[row].charAt(col))
  }

  // Heuristic for guessing minimum cost from a to b
  const h = (from: string, to: string) => {
    const [fr, fc] = from.split(',').map(Number)
    const [tr, tc] = to.split(',').map(Number)
    return manhattanDistance([fr, fc], [tr, tc])
  }

  // Get neighbors of the current step
  const getNeighbors = (current: string) => {
    const nexts: string[] = []
    const [r, c, dir, td] = current.split(',')
    const row = Number(r)
    const col = Number(c)
    const tDir = Number(td)

    // Go right
    if (dir !== '<')
      nexts.push([row, col + 1, '>', dir === '>' ? tDir + 1 : 1].join(','))

    // Go left
    if (dir !== '>')
      nexts.push([row, col - 1, '<', dir === '<' ? tDir + 1 : 1].join(','))

    // Go up
    if (dir !== 'v')
      nexts.push([row - 1, col, '^', dir === '^' ? tDir + 1 : 1].join(','))

    // Go down
    if (dir !== '^')
      nexts.push([row + 1, col, 'v', dir === 'v' ? tDir + 1 : 1].join(','))

    return nexts
      .filter((next) => {
        const [row, col, , tDir] = next.split(',').map(Number)
        return (
          row >= 0 &&
          row < grid.length &&
          col >= 0 &&
          col < grid[row].length &&
          tDir <= 3
        )
      })
      .map((next) => {
        const [row, col] = next.split(',').map(Number)
        if (row === grid.length - 1 && col === grid[0].length - 1)
          return [row, col].join(',')
        return next
      })
  }

  return {
    answer1: AStar('0,0,v,0', endKey, dFn, h, getNeighbors).cost,
  }
}

export const findUltraCruciblePath = (input: string) => {
  const grid = input.split('\n')

  const startKey = '0,0,v,0'
  const endKey = [grid.length - 1, grid[grid.length - 1].length - 1].join(',')

  // Distance from current to next, ie just heat loss of next
  const dFn = (to: string) => {
    const [row, col] = to.split(',').map(Number)
    return Number(grid[row].charAt(col))
  }

  // Heuristic for guessing minimum cost from a to b
  const h = (from: string, to: string) => {
    const [fr, fc] = from.split(',').map(Number)
    const [tr, tc] = to.split(',').map(Number)
    return manhattanDistance([fr, fc], [tr, tc])
  }

  // Get possible next steps
  const getNexts = (current: string) => {
    const nexts: string[] = []
    const [r, c, dir, td] = current.split(',')
    const row = Number(r)
    const col = Number(c)
    const tDir = Number(td)

    // Go right
    if (current === startKey || (dir !== '<' && (tDir >= 4 || dir === '>')))
      nexts.push([row, col + 1, '>', dir === '>' ? tDir + 1 : 1].join(','))

    // Go left
    if (current === startKey || (dir !== '>' && (tDir >= 4 || dir === '<')))
      nexts.push([row, col - 1, '<', dir === '<' ? tDir + 1 : 1].join(','))

    // Go up
    if (current === startKey || (dir !== 'v' && (tDir >= 4 || dir === '^')))
      nexts.push([row - 1, col, '^', dir === '^' ? tDir + 1 : 1].join(','))

    // Go down
    if (current === startKey || (dir !== '^' && (tDir >= 4 || dir === 'v')))
      nexts.push([row + 1, col, 'v', dir === 'v' ? tDir + 1 : 1].join(','))

    return nexts.filter((next) => {
      const [row, col, , tDir] = next.split(',').map(Number)
      return (
        row >= 0 &&
        row < grid.length &&
        col >= 0 &&
        col < grid[row].length &&
        tDir <= 10
      )
    })
  }

  const isEnd = (current: string) => {
    const [row, col, , tDir] = current.split(',').map(Number)
    return (
      row === grid.length - 1 &&
      col === grid[grid.length - 1].length - 1 &&
      tDir >= 4 &&
      tDir <= 10
    )
  }

  return {
    answer2: AStar(startKey, endKey, dFn, h, getNexts, isEnd).cost,
  }
}

const day17: Omit<DayConfig, 'year'> = {
  answer1Text: 'The least amount of heat loss is answer.',
  answer2Text: 'The least amount of heat loss for ultra crucibles is answer.',
  buttons: [
    {
      label: 'Find Path',
      onClick: findPath,
    },
    {
      label: 'Find Path for Ultra Crucibles',
      onClick: findUltraCruciblePath,
    },
  ],
  id: 17,
  inputs,
  title: 'Clumsy Crucible',
}

export default day17
