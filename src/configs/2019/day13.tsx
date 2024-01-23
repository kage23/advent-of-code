import inputs from '../../inputs/2019/day13'
import { DayConfig } from '../../routes/Day'
import intcodeComputer, { IntcodeComputerResults } from './Intcode'

// 0 is an empty tile. No game object appears in this tile.
// 1 is a wall tile. Walls are indestructible barriers.
// 2 is a block tile. Blocks can be broken by the ball.
// 3 is a horizontal paddle tile. The paddle is indestructible.
// 4 is a ball tile. The ball moves diagonally and bounces off objects.

let ballPosition = ''
let paddlePosition = ''
const screen: Map<string, number> = new Map()
let program: number[] = []
let outputs: number[] = []
let score = 0
let result: IntcodeComputerResults = {
  finished: false,
  instructionPointer: 0,
  outputs: [],
  relativeBase: 0,
  program
}

const parseInput = (input: string): number[] =>
  input.split(',').map(inputStr => parseInt(inputStr))

const specialRender = () => {
  const screenArray: string[][] = []
  Array.from(screen.entries()).forEach(([position, value]) => {
    const [xPos, yPos] = position.split(',').map(i => parseInt(i))
    let char = ''
    switch (value) {
      case 0:
        char = ' '
        break

      case 1:
        char = '#'
        break

      case 2:
        char = '*'
        break

      case 3:
        char = '_'
        break

      case 4:
        char = '.'
        break

      default:
        break
    }
    if (!screenArray[yPos]) screenArray[yPos] = []
    screenArray[yPos][xPos] = char
  })
  return screenArray.map(row => `${row.join('')}\n`)
}

const getInput = (): number => {
  const [bx] = ballPosition.split(',').map(i => parseInt(i))
  const [px] = paddlePosition.split(',').map(i => parseInt(i))

  if (bx < px) return -1
  else if (bx > px) return 1
  else if (bx === px) return 0

  return NaN
}

export const initializeProgram = (input: string) => {
  ballPosition = ''
  paddlePosition = ''
  screen.clear()
  outputs = []
  score = 0
  program = parseInput(input)
  result = {
    finished: false,
    instructionPointer: 0,
    outputs: [],
    relativeBase: 0,
    program
  }

  mainLoop:
  for (let i = 0; i < 1036; i++) {
    while (outputs.length < 3) {
      result = intcodeComputer(result.program, undefined, true, result.instructionPointer, result.relativeBase)
      if (result.outputs !== undefined) {
        if (!result.outputs.length) break mainLoop
        outputs.push(...result.outputs)
      }
    }
    if (outputs[0] === -1 && outputs[1] === 0) {
      score = outputs[2]
    } else {
      screen.set(`${outputs[0]},${outputs[1]}`, outputs[2])
      if (outputs[2] === 3) paddlePosition = `${outputs[0]},${outputs[1]}`
      if (outputs[2] === 4) ballPosition = `${outputs[0]},${outputs[1]}`
    }
    outputs = []
  }

  return {
    answer1: Array.from(screen.values()).filter(value => value === 2).length,
    answer2: score,
    specialRender: <pre>{specialRender()}</pre>
  }
}

export const runStep = () => {
  const input: number[] = [getInput()]

  while (outputs.length < 3) {
    result = intcodeComputer(result.program, input, true, result.instructionPointer, result.relativeBase)
    if (result.outputs !== undefined) {
      if (!result.outputs.length) break
      outputs.push(...result.outputs)
    }
  }
  if (outputs[0] === -1 && outputs[1] === 0) {
    score = outputs[2]
  } else {
    screen.set(`${outputs[0]},${outputs[1]}`, outputs[2])
    if (outputs[2] === 3) paddlePosition = `${outputs[0]},${outputs[1]}`
    if (outputs[2] === 4) ballPosition = `${outputs[0]},${outputs[1]}`
  }
  outputs = []

  return {
    answer1: Array.from(screen.values()).filter(value => value === 2).length,
    answer2: score,
    specialRender: <pre>{specialRender()}</pre>
  }
}

export const runFullGame = (input: string) => {
  initializeProgram(input)
  let prevState = ''
  let newState = `${specialRender()},0`
  while (newState !== prevState) {
    // Uncomment the next line to watch the game in your console
    // console.log(newState)
    prevState = newState
    const { answer2: score } = runStep()
    newState = `${specialRender()},${score}`
  }
  return {
    answer1: Array.from(screen.values()).filter(value => value === 2).length,
    answer2: score,
    specialRender: <pre>{specialRender()}</pre>
  }
}

const day13: Omit<DayConfig, 'year'> = {
  answer1Text: 'There are currently answer block tiles.',
  answer2Text: 'Your current score is answer.',
  buttons: [
    {
      label: 'Initialize Program (Click Me First)',
      onClick: initializeProgram,
    },
    {
      label: 'Run Step',
      onClick: runStep
    },
    {
      label: 'Run Full Game',
      onClick: runFullGame
    },
  ],
  extra: () => `For Part 2, don't forget to enter more quarters!`,
  id: 13,
  inputs,
  title: 'Care Package',
}

export default day13
