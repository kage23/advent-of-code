import inputs from '../../inputs/2019/day17'
import { DayConfig } from '../../routes/Day'
import intcodeComputer, { IntcodeComputerResults } from './Intcode'

let program: number[] = []
let instructionPointer = 0
let relativeBase = 0
let outputs: number[] = []
let intcodeComputerResults: IntcodeComputerResults = {
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

const parseInput = (input: string): number[] =>
  input.split(',').map(inputStr => parseInt(inputStr))

const initializeProgram = (input: string) => {
  program = parseInput(input)
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
}

const parseGridString = (str: string): number[] => str.split(',').map(i => parseInt(i))
const renderGridString = (pos: number[]): string => pos.join(',')

const renderMap = () => {
  mapRender = outputs.map(x => String.fromCharCode(x)).join('')
}

const runUntilComplete = (input?: number[]) => {
  // Run the program and set the outputs
  instructionPointer = 0
  relativeBase = 0
  intcodeComputerResults = intcodeComputer(program, input, false, instructionPointer, relativeBase)
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
          break

        default:
          break
      }
    })
    renderMap()
    console.log(mapRender)
  }
}

const getAdjacentPositions = (current: string): { [key: string]: string } => {
  const [x, y] = parseGridString(current)
  return {
    n: renderGridString([x, y - 1]),
    s: renderGridString([x, y + 1]),
    w: renderGridString([x - 1, y]),
    e: renderGridString([x + 1, y])
  }
}

const getAdjacentPositionsArray = (current: string): string[] => {
  const { n, e, s, w } = getAdjacentPositions(current)
  return [n, e, s, w]
}

const calibrateCameras = () => {
  runUntilComplete()

  let sum = 0
  for (const [key, value] of map.entries()) {
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
    answer1: sum,
    specialRender: () => mapRender
  }
}

const getPath = (): ('L' | 'R' | number)[] => {
  const DIRECTIONS = ['^', '>', 'v', '<']
  DIRECTIONS[-1] = '<'
  const DIRECTION_TO_COMPASS: { [key: string]: string } = {
    '^': 'n',
    '>': 'e',
    'v': 's',
    '<': 'w'
  }
  const path: ('L' | 'R' | number)[] = []
  let [x, y] = parseGridString(droidPosition)
  let adjacents = getAdjacentPositions(renderGridString([x, y]))
  let currentDirectionIndex = DIRECTIONS.findIndex(dir => dir === droidDirection)
  let currentCompassDirection = DIRECTION_TO_COMPASS[DIRECTIONS[currentDirectionIndex]]
  let currentNext = adjacents[currentCompassDirection]

  // eslint-disable-next-line no-constant-condition
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
    const leftSpace = map.get(adjacents[leftDirection])
    const rightSpace = map.get(adjacents[rightDirection])
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

const getThePath = () => {
  console.log(`Path: ${getPath().join(',')}`)
}

const mapToInput = (string: string): number[] => string.split('').map(x => x.charCodeAt(0))

const alertAndVacuum = (input: string) => {
  program = parseInput(input)
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
    answer2: outputs[outputs.length - 1],
    specialRender: () => mapRender
  }
}

const day17: Omit<DayConfig, 'year'> = {
  answer1Text: 'The sum of the alignment parameters for the scaffold intersections is answer.',
  answer2Text: 'The robot vacuumed up answer dust.',
  buttons: [
    {
      label: 'Initialize Program (Click Me First)',
      onClick: initializeProgram,
    },
    {
      label: 'Calibrate the Cameras',
      onClick: calibrateCameras,
    },
    {
      label: 'Get Path',
      onClick: getThePath
    },
    {
      label: 'Alert the Robots (and vacuum!)',
      onClick: alertAndVacuum
    }
  ],
  id: 17,
  inputs,
  title: 'Set and Forget',
}

export default day17
