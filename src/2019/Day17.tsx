import React from 'react'
import {
  IButton,
  IDayConfig
} from '../Config'
import { intcodeComputer2019, IIntcodeComputerResults } from '../utils/Various'

import INPUT from './Input/Day17'

let program: number[] = []
let instructionPointer = 0
let relativeBase = 0
let outputs: number[] = []
let intcodeComputerResults: IIntcodeComputerResults = {
  finished: false,
  instructionPointer: 0,
  outputs: [],
  relativeBase: 0,
  program
}

const map: Map<string, '.' | '#'> = new Map()
let droidPosition = ''
let droidDirection: '^' | '>' | 'v' | '<' | 'X' = 'X'
let mapRender = ''

const mapToInput = (string: string): number[] => string.split('').map(x => x.charCodeAt(0))

const parseGridString = (str: string): number[] => str.split(',').map(i => parseInt(i))
const renderGridString = (pos: number[]): string => pos.join(',')

const parseInput = (inputKey: string): number[] =>
  INPUT[inputKey].split(',').map(inputStr => parseInt(inputStr))

const getAdjacentPositions = (current: string): { [key:string]: string } => {
  const [ x, y ] = parseGridString(current)
  return {
    n: renderGridString([x , y - 1]),
    s: renderGridString([x , y + 1]),
    w: renderGridString([x - 1 , y]),
    e: renderGridString([x + 1 , y])
  }
}

const getAdjacentPositionsArray = (current: string): string[] => {
  const { n, e, s, w } = getAdjacentPositions(current)
  return [ n, e, s, w ]
}

const getPath = (): ('L' | 'R' | number)[] => {
  const DIRECTIONS = ['^', '>', 'v', '<']
  DIRECTIONS[-1] = '<'
  const DIRECTION_TO_COMPASS: { [key:string]: string } = {
    '^': 'n',
    '>': 'e',
    'v': 's',
    '<': 'w'
  }
  let path: ('L' | 'R' | number)[] = []
  let [x, y] = parseGridString(droidPosition)
  let adjacents = getAdjacentPositions(renderGridString([x, y]))
  let currentDirectionIndex = DIRECTIONS.findIndex(dir => dir === droidDirection)
  let currentCompassDirection = DIRECTION_TO_COMPASS[DIRECTIONS[currentDirectionIndex]]
  let currentNext = adjacents[currentCompassDirection]

  while (true) {
    // How far can you go in the current direction before turning?
    let stepsInCurrentDirection = 0
    while (map.get(currentNext) !== '.' && map.get(currentNext) !== undefined) {
      stepsInCurrentDirection++

      const nextCoord = parseGridString(currentNext)
      x = nextCoord[0]
      y = nextCoord[1]

      adjacents = getAdjacentPositions(renderGridString(nextCoord))
      currentNext = adjacents[currentCompassDirection]
    }

    path.push(stepsInCurrentDirection)
    stepsInCurrentDirection = 0

    // Which direction do you need to turn?
    const leftIndex = currentDirectionIndex - 1 < 0
      ? DIRECTIONS.length - 1
      : (currentDirectionIndex - 1) % DIRECTIONS.length
    const rightIndex = (currentDirectionIndex + 1) % DIRECTIONS.length
    const leftDirection = DIRECTION_TO_COMPASS[DIRECTIONS[leftIndex]]
    const rightDirection = DIRECTION_TO_COMPASS[DIRECTIONS[rightIndex]]
    let leftSpace = map.get(adjacents[leftDirection])
    let rightSpace = map.get(adjacents[rightDirection])
    if (leftSpace === '#') {
      currentDirectionIndex--
      currentCompassDirection = DIRECTION_TO_COMPASS[DIRECTIONS[currentDirectionIndex]]
      currentNext = adjacents[currentCompassDirection]
      path.push('L')
    }
    else if (rightSpace === '#') {
      currentDirectionIndex++
      currentCompassDirection = DIRECTION_TO_COMPASS[DIRECTIONS[currentDirectionIndex % DIRECTIONS.length]]
      currentNext = adjacents[currentCompassDirection]
      path.push('R')
    }
    else break // end of the path
  }

  // Clean up the path
  // Remove leading zeroes
  while (path[0] === 0) path.shift()
  // Detect and remove the "L,0,L,0,R,x" pattern which is equivalent to "L,x"
  for (let i = 0; i < path.length; i++) {
    const current = path[i]
    if (current === 'L' || current === 'R') {
      const other: 'L' | 'R' = current === 'L' ? 'R' : 'L'
      if (
        path[i + 1] === 0
        && path[i + 2] === current
        && path[i + 3] === 0
        && path[i + 4] === other
      ) {
        path.splice(i + 1, 4)
      }
    }
  }

  return path
}

const renderMap = () => {
  mapRender = outputs.map(x => String.fromCharCode(x)).join('')
}

const renderDay = (dayConfig: IDayConfig, inputKey: string) => {
  return (
    <div>
      <h3>Input: {dayConfig.INPUT[inputKey]}</h3>
      <h3>Program: {program.join(',')}</h3>
      <h3>Droid Position: {droidPosition}</h3>
      <h3>Render:</h3>
      <pre>{mapRender}</pre>
    </div>
  )
}

const runUntilComplete = (input?: number[]) => {
  // Run the program and set the outputs
  instructionPointer = 0
  relativeBase = 0
  intcodeComputerResults = intcodeComputer2019(program, input, false, instructionPointer, relativeBase)
  instructionPointer = intcodeComputerResults.instructionPointer
  relativeBase = intcodeComputerResults.relativeBase
  outputs = intcodeComputerResults.outputs
  program = intcodeComputerResults.program

  if (outputs.length) {
    // Parse the outputs into the map
    let x = 0
    let y = 0

    outputs.forEach(charX => {
      const char = String.fromCharCode(charX)
      switch (char) {
        case '.':
        case '#':
          map.set(renderGridString([x, y]), char)
          x++
          break

        case '<':
        case '>':
        case '^':
        case 'v':
        case 'X':
          droidPosition = renderGridString([x, y])
          droidDirection = char
          map.set(renderGridString([x, y]), char === 'X' ? '.' : '#')
          x++
          break

        case '\n':
          x = 0
          y++

        default:
          break
      }
    })
    renderMap()
  }
}

const BUTTONS: IButton[] = [
  {
    label: 'Initialize/Reset Program (Click Me First)',
    onClick: (inputKey: string) => {
      program = parseInput(inputKey)
      instructionPointer = 0
      relativeBase = 0
      outputs = []
      intcodeComputerResults = {
        finished: false,
        instructionPointer: 0,
        outputs: [],
        relativeBase: 0,
        program
      }

      return {}
    }
  },
  {
    label: 'Calibrate the Cameras',
    onClick: () => {
      runUntilComplete()

      let sum = 0
      for (let [key, value] of map.entries()) {
        // Get intersections
        if (
          value === '#'
          && getAdjacentPositionsArray(key).every(adjacent => map.get(adjacent) === '#')
        ) {
          const [x, y] = parseGridString(key)
          sum += (x * y)
        }
      }

      return {
        answer1: sum.toString()
      }
    }
  },
  {
    label: 'Get Path',
    onClick: () => {
      console.log(`Path: ${getPath().join(',')}`)

      return {}
    }
  },
  {
    label: 'Alert the Robots (and vacuum!)',
    onClick: (inputKey: string) => {
      program = parseInput(inputKey)
      program[0] = 2

      // After generating a path, I figured this out manually, LOL. It wasn't difficult!
      const A = 'R,8,L,10,L,12,R,4\n'
      const B = 'R,8,L,12,R,4,R,4\n'
      const C = 'R,8,L,10,R,8\n'

      const mainMovementRoutine = 'A,B,A,C,A,B,C,B,C,B\n'

      runUntilComplete(
        [
          // First, provide main movement routine
          ...mapToInput(mainMovementRoutine),
          // Then, provide each movement function
          ...mapToInput(A),
          ...mapToInput(B),
          ...mapToInput(C),
          // Then provide continuous video feed y/n
          ...mapToInput('n\n')
        ]
      )

      return {
        answer2: outputs[outputs.length - 1].toString()
      }
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The sum of the alignment parameters for the scaffold intersections is{' '}
      <code>{answer}</code>.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      The robot vacuumed up <code>{answer}</code> dust.
    </span>
  ),
  buttons: BUTTONS,
  day: 17,
  INPUT,
  renderDay: (dayConfig, inputKey) => renderDay(dayConfig, inputKey),
  title: 'Set and Forget'
}

export default config
