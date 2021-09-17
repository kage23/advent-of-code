import React from 'react'
import {
  IButton,
  IDayConfig
} from '../Config'
import { intcodeComputer2019 } from '../utils/Various'

import INPUT from './Input/Day11'

// 0 Black
// 1 White

// 0 Turn Left
// 1 Turn Right

const DIRECTIONS = ['^', '>', 'v', '<']

const getGridNumbers = (xy: string): number[] => xy.split(',').map(i => parseInt(i))
const getGridString = (x: number, y: number): string => `${x},${y}`

const paintGrid = (grid: Map<string, number>): (' ' | '█')[][] => {
  const painting: (' ' | '█')[][] = []

  // Get offsets to zero-base the grid
  let minX = Number.MAX_SAFE_INTEGER
  let minY = Number.MAX_SAFE_INTEGER
  Array.from(grid.keys()).forEach(key => {
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

let PAINTING: (' ' | '█')[][] = []

const parseInput = (inputKey: string): number[] =>
  INPUT[inputKey].split(',').map(inputStr => parseInt(inputStr))

const robotLoop = (robotPosition: number[], grid: Map<string, number>, program: number[], instructionPointer: number, relativeBase: number) => {
  const input = grid.get(getGridString(robotPosition[0], robotPosition[1])) || 0
  let programToRun = program

  // Do the painting
  let intcodeResults = intcodeComputer2019(programToRun, [input], true, instructionPointer, relativeBase)
  grid.set(getGridString(robotPosition[0], robotPosition[1]), intcodeResults.outputs[0])

  // Get the number to turn the bot --- 0: turn left, 1: turn right
  intcodeResults = intcodeComputer2019(intcodeResults.program, [], true, intcodeResults.instructionPointer, intcodeResults.relativeBase)

  return {
    finished: intcodeResults.finished,
    grid,
    instructionPointer: intcodeResults.instructionPointer,
    program: intcodeResults.program,
    relativeBase: intcodeResults.relativeBase,
    robotDirection: intcodeResults.outputs[0]
  }
}

const renderDay = (dayConfig: IDayConfig, inputKey: string) => {
  const fullGrid: (" " | "█")[][] = []
  for (let i = 0; i < PAINTING.length; i++) {
    for (let j = 0; j < PAINTING[i].length; j++) {
      if (!fullGrid[i]) fullGrid[i] = []
      fullGrid[i][j] = PAINTING[i][j] === undefined ? ' ' : PAINTING[i][j]
    }
  }

  return (
    <div>
      <h3>Input: {dayConfig.INPUT[inputKey]}</h3>
      <pre>{fullGrid.map(row => (
        `${row.join('')}\n`
      ))}</pre>
    </div>
  )
}

const BUTTONS: IButton[] = [
  {
    label: 'Paint (Start on Black)',
    onClick: (inputKey: string) => {
      PAINTING = []
      let program = parseInput(inputKey)
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
          if (directionIndex < 0) directionIndex = DIRECTIONS.length + directionIndex
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
        robotLoopResults = robotLoop(robotPosition, grid, program, robotLoopResults.instructionPointer, robotLoopResults.relativeBase)
      }

      PAINTING = paintGrid(grid)

      return {
        answer1: robotLoopResults.grid.size.toString()
      }
    }
  },
  {
    label: 'Paint (Start on White)',
    onClick: (inputKey: string) => {
      PAINTING = []
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
          if (directionIndex < 0) directionIndex = DIRECTIONS.length + directionIndex
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
        robotLoopResults = robotLoop(robotPosition, grid, program, robotLoopResults.instructionPointer, robotLoopResults.relativeBase)
      }

      PAINTING = paintGrid(grid)

      return {
        answer2: ''
      }
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The size of the grid covered by the robot is{' '}
      <code>{answer}</code> panels.
    </span>
  ),
  answer2Text: () => (
    <span>
      The ship's registration code is hopefully readable in the output!
      {/* <code>{answer}</code>. */}
    </span>
  ),
  buttons: BUTTONS,
  day: 11,
  INPUT,
  renderDay: (dayConfig, inputKey) => renderDay(dayConfig, inputKey),
  title: 'Space Police'
}

export default config
