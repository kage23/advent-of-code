import inputs from '../../inputs/2019/day11'
import { DayConfig } from '../../routes/Day'
import intcodeComputer from './Intcode'

const DIRECTIONS = ['^', '>', 'v', '<']

const parseInput = (input: string): number[] =>
  input.split(',').map((inputStr) => parseInt(inputStr))

const getGridString = (x: number, y: number): string => `${x},${y}`
const getGridNumbers = (xy: string): number[] =>
  xy.split(',').map((i) => parseInt(i))

const robotLoop = (
  robotPosition: number[],
  grid: Map<string, number>,
  program: number[],
  instructionPointer: number,
  relativeBase: number
) => {
  const input = grid.get(getGridString(robotPosition[0], robotPosition[1])) || 0
  const programToRun = program

  // Do the painting
  let intcodeResults = intcodeComputer(
    programToRun,
    [input],
    true,
    instructionPointer,
    relativeBase
  )
  grid.set(
    getGridString(robotPosition[0], robotPosition[1]),
    intcodeResults.outputs[0]
  )

  // Get the number to turn the bot --- 0: turn left, 1: turn right
  intcodeResults = intcodeComputer(
    intcodeResults.program,
    [],
    true,
    intcodeResults.instructionPointer,
    intcodeResults.relativeBase
  )

  return {
    finished: intcodeResults.finished,
    grid,
    instructionPointer: intcodeResults.instructionPointer,
    program: intcodeResults.program,
    relativeBase: intcodeResults.relativeBase,
    robotDirection: intcodeResults.outputs[0],
  }
}

const paintGrid = (grid: Map<string, number>): (' ' | '█')[][] => {
  const painting: (' ' | '█')[][] = []

  // Get offsets to zero-base the grid
  let minX = Number.MAX_SAFE_INTEGER
  let minY = Number.MAX_SAFE_INTEGER
  Array.from(grid.keys()).forEach((key) => {
    const [x, y] = getGridNumbers(key)
    minX = Math.min(x, minX)
    minY = Math.min(y, minY)
  })
  const xOffset = minX * -1
  const yOffset = minY * -1

  // Render
  Array.from(grid.entries()).forEach(([key, value]) => {
    const [x, y] = getGridNumbers(key)
    if (!painting[y + yOffset]) painting[y + yOffset] = []
    painting[y + yOffset][x + xOffset] = value ? ' ' : '█'
  })

  return painting
}

const renderPainting = (painting: (' ' | '█')[][]) => (
  <pre>{painting.map((row) => `${row.join('')}\n`)}</pre>
)

export const paintBlackStart = (input: string) => {
  let painting: (' ' | '█')[][] = []
  let program = parseInput(input)
  const robotPosition = [0, 0]
  let robotDirection = '^'
  const grid: Map<string, number> = new Map()

  let robotLoopResults = robotLoop(robotPosition, grid, program, 0, 0)

  while (!robotLoopResults.finished) {
    // Set program
    program = robotLoopResults.program

    // Set robot
    let directionIndex = DIRECTIONS.indexOf(robotDirection)
    // Turn Left
    if (robotLoopResults.robotDirection === 0) {
      directionIndex--
      if (directionIndex < 0)
        directionIndex = DIRECTIONS.length + directionIndex
    }
    // Or Turn Right
    else if (robotLoopResults.robotDirection === 1) {
      directionIndex = (directionIndex + 1) % DIRECTIONS.length
    }
    robotDirection = DIRECTIONS[directionIndex]
    // Advance
    switch (robotDirection) {
      case '^':
        robotPosition[1]--
        break
      case '>':
        robotPosition[0]++
        break
      case 'v':
        robotPosition[1]++
        break
      case '<':
        robotPosition[0]--
        break
      default:
        break
    }

    // Go again
    robotLoopResults = robotLoop(
      robotPosition,
      grid,
      program,
      robotLoopResults.instructionPointer,
      robotLoopResults.relativeBase
    )
  }

  painting = paintGrid(grid)

  return {
    answer1: robotLoopResults.grid.size,
    specialRender: renderPainting(painting),
  }
}

export const paintWhiteStart = (inputKey: string) => {
  let painting: (' ' | '█')[][] = []
  let program = parseInput(inputKey)
  const robotPosition = [0, 0]
  let robotDirection = '^'
  const grid: Map<string, number> = new Map()
  // Start on a white grid square
  grid.set(getGridString(robotPosition[0], robotPosition[1]), 1)

  let robotLoopResults = robotLoop(robotPosition, grid, program, 0, 0)

  while (!robotLoopResults.finished) {
    // Set program
    program = robotLoopResults.program

    // Set robot
    let directionIndex = DIRECTIONS.indexOf(robotDirection)
    // Turn Left
    if (robotLoopResults.robotDirection === 0) {
      directionIndex--
      if (directionIndex < 0)
        directionIndex = DIRECTIONS.length + directionIndex
    }
    // Or Turn Right
    else if (robotLoopResults.robotDirection === 1) {
      directionIndex = (directionIndex + 1) % DIRECTIONS.length
    }
    robotDirection = DIRECTIONS[directionIndex]
    // Advance
    switch (robotDirection) {
      case '^':
        robotPosition[1]--
        break
      case '>':
        robotPosition[0]++
        break
      case 'v':
        robotPosition[1]++
        break
      case '<':
        robotPosition[0]--
        break
      default:
        break
    }

    // Go again
    robotLoopResults = robotLoop(
      robotPosition,
      grid,
      program,
      robotLoopResults.instructionPointer,
      robotLoopResults.relativeBase
    )
  }

  painting = paintGrid(grid)

  return {
    answer2: '',
    specialRender: renderPainting(painting),
  }
}

const day11: Omit<DayConfig, 'year'> = {
  answer1Text: 'The size of the grid covered by the robot is answer panels.',
  answer2Text: `The ship's registration code is hopefully readable in the output!`,
  buttons: [
    {
      label: 'Paint (Start on Black)',
      onClick: paintBlackStart,
    },
    {
      label: 'Paint (Start on White)',
      onClick: paintWhiteStart,
    },
  ],
  id: 11,
  inputs,
  title: 'Space Police',
}

export default day11
