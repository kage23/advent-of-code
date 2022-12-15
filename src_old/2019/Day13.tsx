import {
  IButton,
  IDayConfig
} from '../Config'
import { intcodeComputer2019, IIntcodeComputerResults } from '../utils/Various'

import INPUT from '../Inputs/2019/Day13'

// 0 is an empty tile. No game object appears in this tile.
// 1 is a wall tile. Walls are indestructible barriers.
// 2 is a block tile. Blocks can be broken by the ball.
// 3 is a horizontal paddle tile. The paddle is indestructible.
// 4 is a ball tile. The ball moves diagonally and bounces off objects.

let ballPosition = ''
let paddlePosition = ''
const screen: Map<string, number> = new Map()

const parseInput = (inputKey: string): number[] =>
  INPUT[inputKey].split(',').map(inputStr => parseInt(inputStr))

const renderDay = (dayConfig: IDayConfig, inputKey: string) => {
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

  return (
    <div>
      <h3>Program:</h3>
      <p>{dayConfig.INPUT[inputKey]}</p>
      <h3>Render:</h3>
      <pre>
        {screenArray.map(row => (
          `${row.join('')}\n`
        ))}
      </pre>
    </div>
  )
}

const getInput = (): number => {
  const [bx] = ballPosition.split(',').map(i => parseInt(i))
  const [px] = paddlePosition.split(',').map(i => parseInt(i))

  if (bx < px) return -1
  else if (bx > px) return 1
  else if (bx === px) return 0

  return NaN
}

let program: number[] = []
let outputs: number[] = []
let result: IIntcodeComputerResults = {
  finished: false,
  instructionPointer: 0,
  outputs: [],
  relativeBase: 0,
  program
}

let score = 0
const BUTTONS: IButton[] = [
  {
    label: 'Initialize Program (Click Me First)',
    onClick: (inputKey: string) => {
      program = parseInput(inputKey)
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
          result = intcodeComputer2019(result.program, undefined, true, result.instructionPointer, result.relativeBase)
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
        answer1: Array.from(screen.values()).filter(value => value === 2).length.toString(),
        answer2: score.toString()
      }
    }
  },
  {
    label: 'Run Step',
    onClick: () => {
      let input: number[] = [getInput()]

      while (outputs.length < 3) {
        result = intcodeComputer2019(result.program, input, true, result.instructionPointer, result.relativeBase)
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
        answer1: Array.from(screen.values()).filter(value => value === 2).length.toString(),
        answer2: score.toString()
      }
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      There are currently <code>{answer}</code> block tiles.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      Your current score is <code>{answer}</code>.
    </span>
  ),
  buttons: BUTTONS,
  day: 13,
  INPUT,
  renderDay,
  title: 'Care Package'
}

export default config
