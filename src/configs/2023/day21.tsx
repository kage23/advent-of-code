import inputs from '../../inputs/2023/day21'
import { DayConfig } from '../../routes/Day'

export const countSteps = (input: string, steps = 64) => {
  const grid = input.split('\n')
  const start = [0, 0]
  grid.forEach((line, li) => {
    if (line.includes('S')) {
      start[0] = li
      start[1] = line.indexOf('S')
    }
  })
  let prevStep = new Set([start.join(',')])
  for (let i = 0; i < steps; i++) {
    const newStep = new Set<string>()
    Array.from(prevStep.entries()).forEach(([v]) => {
      const [row, col] = v.split(',').map(Number)
      const neighbors = [
        [row - 1, col],
        [row, col - 1],
        [row, col + 1],
        [row + 1, col],
      ].filter(
        ([r, c]) =>
          r >= 0 &&
          r < grid.length &&
          c >= 0 &&
          c < grid[0].length &&
          grid[r].charAt(c) !== '#'
      )
      neighbors.forEach(([row, col]) => newStep.add([row, col].join(',')))
    })
    prevStep = newStep
  }
  return { answer1: prevStep.size }
}

// This solution is based on the following:
// https://github.com/villuna/aoc23/wiki/A-Geometric-solution-to-advent-of-code-2023,-day-21
export const calculateSteps = (input: string, steps: number) => {
  const validSquares = new Set<string>()
  const distanceToEdgeOfFirstMap = (input.split('\n')[0].length - 1) / 2
  input.split('\n').forEach((row, ri) => {
    row.split('').forEach((char, ci) => {
      if (char !== '#') validSquares.add([ri, ci].join(','))
    })
  })
  const start = [distanceToEdgeOfFirstMap, distanceToEdgeOfFirstMap]
  const stepsToSquare = new Map<string, number>([[start.join(','), 0]])
  const evenOddParity = new Map<string, 'e' | 'o'>([[start.join(','), 'e']])
  const searchQueue = [[...start]]

  while (searchQueue.length) {
    const [row, col] = searchQueue.shift()!
    const stepsTaken = stepsToSquare.get([row, col].join(','))! + 1
    const neighbors = [[row - 1, col], [row + 1, col], [row, col - 1], [row, col + 1]].filter(([r, c]) => validSquares.has([r, c].join(',')))
    neighbors.forEach(([r, c]) => {
      const key = [r, c].join(',')
      if (!stepsToSquare.has(key)) {
        stepsToSquare.set(key, stepsTaken)
        evenOddParity.set(key, stepsTaken % 2 === 0 ? 'e' : 'o')
        searchQueue.push([r, c])
      }
    })
  }

  if (steps <= distanceToEdgeOfFirstMap) {
    return {
      answer1: Array.from(stepsToSquare.entries()).filter(([key, distance]) => distance <= steps && evenOddParity.get(key) === (steps % 2 === 0 ? 'e' : 'o')).length
    }
  }

  const totalAccessibleOnOddParityMap = Array.from(evenOddParity.values()).filter(p => p === 'o').length
  const totalAccessibleOnEvenParityMap = Array.from(evenOddParity.values()).filter(p => p === 'e').length
  const numberOfRepeatedMaps = (steps - distanceToEdgeOfFirstMap) / input.split('\n')[0].length
  if (numberOfRepeatedMaps !== Math.floor(numberOfRepeatedMaps)) {
    throw new Error(`We don't walk exactly to the edge of the map and I don't really want to deal with that yet`)
  }
  // We make a lot of assumptions here - this doesn't even work for the demos
  // It'll only work properly if the number of repeated maps is whole and even
  // And if the map itself has certain features that are missing from the test map
  const totalEvenMaps = numberOfRepeatedMaps * numberOfRepeatedMaps
  const totalOddMaps = (numberOfRepeatedMaps + 1) * (numberOfRepeatedMaps + 1)
  const oddMapCornerSquareCount = Array.from(stepsToSquare.entries()).filter(([key, distance]) => (
    distance > distanceToEdgeOfFirstMap && evenOddParity.get(key) === 'o'
  )).length
  const evenMapCornerSquareCount = Array.from(stepsToSquare.entries()).filter(([key, distance]) => (
    distance > distanceToEdgeOfFirstMap && evenOddParity.get(key) === 'e'
  )).length
  const missingCornerGroups = numberOfRepeatedMaps + 1
  const addedCornerGroups = numberOfRepeatedMaps

  return {
    answer2: (totalOddMaps * totalAccessibleOnOddParityMap)
      + (totalEvenMaps * totalAccessibleOnEvenParityMap)
      - (missingCornerGroups * oddMapCornerSquareCount)
      + (addedCornerGroups * evenMapCornerSquareCount)
    }
}

const day21: Omit<DayConfig, 'year'> = {
  answer1Text: 'The elf can reach answer garden plots.',
  answer2Text: 'The elf can reach answer garden plots.',
  buttons: [
    {
      label: 'Count Steps (Demo)',
      onClick: (input) => countSteps(input, 6),
    },
    {
      label: 'Count Steps',
      onClick: countSteps,
    },
    {
      label: 'Calculate Steps (6 Steps)',
      onClick: (input) => calculateSteps(input, 6),
    },
    {
      label: 'Calculate Steps (64 Steps)',
      onClick: (input) => calculateSteps(input, 64)
    },
    {
      label: 'Calculate Steps (10 Steps)',
      onClick: (input) => calculateSteps(input, 10),
    },
    {
      label: 'Calculate Steps (50 Steps)',
      onClick: (input) => calculateSteps(input, 50),
    },
    {
      label: 'Calculate Steps (100 Steps)',
      onClick: (input) => calculateSteps(input, 100),
    },
    {
      label: 'Calculate Steps (500 Steps)',
      onClick: (input) => calculateSteps(input, 500),
    },
    {
      label: 'Calculate Steps (1000 Steps)',
      onClick: (input) => calculateSteps(input, 1000),
    },
    {
      label: 'Calculate Steps (5000 Steps)',
      onClick: (input) => calculateSteps(input, 5000),
    },
    {
      label: 'Calculate Steps (26501365 Steps)',
      onClick: (input) => calculateSteps(input, 26501365),
    },
  ],
  id: 21,
  inputs,
  title: 'Step Counter',
}

export default day21
