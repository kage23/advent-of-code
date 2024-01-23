import inputs from '../../inputs/2023/day16'
import { DayConfig } from '../../routes/Day'

const getNextSteps = (step: string, map: string[][]) => {
  const nextSteps: string[] = []

  const [r, c, dir] = step.split(',')
  const row = Number(r)
  const col = Number(c)
  const tile = map[row][col]

  switch (tile) {
    case '.': {
      switch (dir) {
        case '>': {
          nextSteps.push([row, col + 1, dir].join(','))
          break
        }
        case '<': {
          nextSteps.push([row, col - 1, dir].join(','))
          break
        }
        case '^': {
          nextSteps.push([row - 1, col, dir].join(','))
          break
        }
        case 'v': {
          nextSteps.push([row + 1, col, dir].join(','))
          break
        }
      }
      break
    }
    case '\\': {
      switch (dir) {
        case '>': {
          nextSteps.push([row + 1, col, 'v'].join(','))
          break
        }
        case '<': {
          nextSteps.push([row - 1, col, '^'].join(','))
          break
        }
        case '^': {
          nextSteps.push([row, col - 1, '<'].join(','))
          break
        }
        case 'v': {
          nextSteps.push([row, col + 1, '>'].join(','))
          break
        }
      }
      break
    }
    case '/': {
      switch (dir) {
        case '>': {
          nextSteps.push([row - 1, col, '^'].join(','))
          break
        }
        case '<': {
          nextSteps.push([row + 1, col, 'v'].join(','))
          break
        }
        case '^': {
          nextSteps.push([row, col + 1, '>'].join(','))
          break
        }
        case 'v': {
          nextSteps.push([row, col - 1, '<'].join(','))
          break
        }
      }
      break
    }
    case '-': {
      switch (dir) {
        case '>': {
          nextSteps.push([row, col + 1, dir].join(','))
          break
        }
        case '<': {
          nextSteps.push([row, col - 1, dir].join(','))
          break
        }
        case '^':
        case 'v': {
          nextSteps.push([row, col + 1, '>'].join(','))
          nextSteps.push([row, col - 1, '<'].join(','))
          break
        }
      }
      break
    }
    case '|': {
      switch (dir) {
        case '>':
        case '<': {
          nextSteps.push([row - 1, col, '^'].join(','))
          nextSteps.push([row + 1, col, 'v'].join(','))
          break
        }
        case '^': {
          nextSteps.push([row - 1, col, dir].join(','))
          break
        }
        case 'v': {
          nextSteps.push([row + 1, col, dir].join(','))
          break
        }
      }
      break
    }
  }

  return nextSteps.filter((step) => {
    const [r, c] = step.split(',')
    const row = Number(r)
    const col = Number(c)
    return row >= 0 && row < map.length && col >= 0 && col < map[0].length
  })
}

const fireBeamAndGetEnergizedCount = (map: string[][], start: string) => {
  const visitedSteps = new Set<string>()
  const steps = [start]
  while (steps.length > 0) {
    const step = steps.shift()!
    if (!visitedSteps.has(step)) {
      visitedSteps.add(step)
      steps.push(...getNextSteps(step, map))
    }
  }
  const energizedTiles = new Set<string>()
  visitedSteps.forEach((step) => {
    const [row, col] = step.split(',')
    energizedTiles.add([row, col].join(','))
  })
  return energizedTiles.size
}

export const fireBeam = (input: string) => {
  const map = input.split('\n').map((line) => line.split(''))
  return { answer1: fireBeamAndGetEnergizedCount(map, '0,0,>') }
}

export const fireBeamFromBestStart = (input: string) => {
  const map = input.split('\n').map((line) => line.split(''))
  const counts: number[] = []
  for (let row = 0; row < map.length; row++) {
    counts.push(fireBeamAndGetEnergizedCount(map, [row, 0, '>'].join(',')))
    counts.push(
      fireBeamAndGetEnergizedCount(map, [row, map[0].length - 1, '<'].join(','))
    )
  }
  for (let col = 0; col < map[0].length; col++) {
    counts.push(fireBeamAndGetEnergizedCount(map, [0, col, 'v'].join(',')))
    counts.push(
      fireBeamAndGetEnergizedCount(map, [map.length - 1, col, '^'].join(','))
    )
  }
  return { answer2: Math.max(...counts) }
}

const day16: Omit<DayConfig, 'year'> = {
  answer1Text: 'There are answer energized tiles.',
  answer2Text: 'There are answer energized tiles from the best start.',
  buttons: [
    {
      label: 'Fire Beam',
      onClick: fireBeam,
    },
    {
      label: 'Fire Beam from the Best Start',
      onClick: fireBeamFromBestStart,
    },
  ],
  id: 16,
  inputs,
  title: 'The Floor Will Be Lava',
}

export default day16
