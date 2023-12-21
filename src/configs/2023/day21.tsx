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

export const countMoreSteps = (input: string, steps = 26501365) => {
  const grid = input.split('\n')
  const start = [0, 0]
  grid.forEach((line, li) => {
    if (line.includes('S')) {
      start[0] = li
      start[1] = line.indexOf('S')
    }
  })
  let prevStep = new Set([start.join(',')])
  const evenCounts: number[] = []
  const oddCounts: number[] = []
  for (let i = 0; i < steps; i++) {
    if (i % 2 === 0) evenCounts.push(prevStep.size)
    else oddCounts.push(prevStep.size)
    const newStep = new Set<string>()
    Array.from(prevStep.entries()).forEach(([v]) => {
      const [row, col] = v.split(',').map(Number)
      const neighbors = [
        [row - 1, col],
        [row, col - 1],
        [row, col + 1],
        [row + 1, col],
      ]
      neighbors.forEach(([r, c]) => {
        let rx = r % grid.length
        rx = rx >= 0 ? rx : grid.length + rx
        let cx = c % grid[rx].length
        cx = cx >= 0 ? cx : grid[rx].length + cx
        if (grid[rx].charAt(cx) !== '#') {
          newStep.add([r, c].join(','))
        }
      })
    })
    prevStep = newStep
  }
  if (steps % 2 === 0) evenCounts.push(prevStep.size)
  else oddCounts.push(prevStep.size)
  console.log('evenCounts', evenCounts)
  const evenDiffs: number[] = []
  for (let i = 1; i < evenCounts.length; i++)
    evenDiffs.push(evenCounts[i] - evenCounts[i - 1])
  console.log('evenDiffs', evenDiffs)
  console.log('oddCounts', oddCounts)
  const oddDiffs: number[] = []
  for (let i = 1; i < oddCounts.length; i++)
    oddDiffs.push(oddCounts[i] - oddCounts[i - 1])
  console.log('oddDiffs', oddDiffs)
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
      label: 'Count More Steps (Demo - 6)',
      onClick: (input) => countMoreSteps(input, 6),
    },
    {
      label: 'Count More Steps (Demo - 10)',
      onClick: (input) => countMoreSteps(input, 10),
    },
    {
      label: 'Count More Steps (Demo - 50)',
      onClick: (input) => countMoreSteps(input, 50),
    },
    {
      label: 'Count More Steps (Demo - 100)',
      onClick: (input) => countMoreSteps(input, 100),
    },
    {
      label: 'Count More Steps (Demo - 500)',
      onClick: (input) => countMoreSteps(input, 500),
    },
    {
      label: 'Count More Steps (Demo - 1000)',
      onClick: (input) => countMoreSteps(input, 1000),
    },
    {
      label: 'Count More Steps (Demo - 5000)',
      onClick: (input) => countMoreSteps(input, 5000),
    },
  ],
  id: 21,
  inputs,
  title: 'Step Counter',
}

export default day21
