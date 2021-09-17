import React from 'react'
import {
  IButton,
  IDayConfig
} from '../Config'
import { intcodeComputer2019, IIntcodeComputerResults, manhattanDistance } from '../utils/Various'
import Tree, { TreeNode } from '../utils/Tree'

import INPUT from './Input/Day15'

let program: number[] = []
let instructionPointer = 0
let relativeBase = 0
let outputs: number[] = []
let timeSinceRepair = 0
let intcodeComputerResults: IIntcodeComputerResults = {
  finished: false,
  instructionPointer: 0,
  outputs: [],
  relativeBase: 0,
  program
}

// D for the droid
// # for walls
// . for locations the droid can traverse
// ' ' (empty space) for unexplored locations
// X for oxygen system
// O for spaces containing oxygen
let grid: Map<string, ('D' | '#' | '.' | ' ' | 'X' | 'O')> = new Map()
let droidPosition = '0,0'
let oxyPosition = ''
let forbidden: string[] = []
let goodXMin = Number.MIN_SAFE_INTEGER
let goodYMin = Number.MIN_SAFE_INTEGER
let goodXMax = Number.MAX_SAFE_INTEGER
let goodYMax = Number.MAX_SAFE_INTEGER
let doneWithMapping = false
grid.set(droidPosition, 'D')

const parseGridString = (str: string): number[] => str.split(',').map(i => parseInt(i))
const renderGridString = (pos: number[]): string => pos.join(',')

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

const advanceOxygen = () => {
  timeSinceRepair++
  const squaresToUpdate: string[] = []

  const forEachAdjacent = (adjacent: string) => {
    if (
      (grid.get(adjacent) === '.' || grid.get(adjacent) === 'D')
      && !squaresToUpdate.includes(adjacent)
    ) {
      squaresToUpdate.push(adjacent)
    }
  }
  for (let [key, value] of grid.entries()) {
    if (value === 'O') {
      getAdjacentPositionsArray(key).forEach(forEachAdjacent)
    }
  }

  squaresToUpdate.forEach(square => grid.set(square, 'O'))
}

const fullOfOxygen = (): boolean => {
  for (let value of grid.values()) {
    if (value !== 'O' && value !== '#') return false
  }
  return true
}

const findNearestUnknownSquare = (): string => {
  let searchQueue = [droidPosition]
  const searched = new Map()
  const forEachAdjacent = (adjacent: string) => {
    const [ x, y ] = parseGridString(adjacent)
      if (
        !searched.get(adjacent)
        && !searchQueue.includes(adjacent)
        && !forbidden.includes(adjacent)
        && (x >= goodXMin && x <= goodXMax && y >= goodYMin && y <= goodYMax)
      ) {
        searchQueue.push(adjacent)
      }
  }
  while (searchQueue.length) {
    const current = searchQueue.shift()
    if (typeof current !== 'string') throw new Error('fuck')
    if (
      (grid.get(current) === ' ' || grid.get(current) === undefined)
      && !forbidden.includes(current)
    ) {
      return current
    }
    searched.set(current, true)
    getAdjacentPositionsArray(current).forEach(forEachAdjacent)
  }
  return ''
}

const findShortestPath = (start: string, end: string): string[] | undefined => {
  const searchTree = new Tree(start)
  const visited: Map<string, boolean> = new Map()

  let current: TreeNode = searchTree.head
  const filterOutWalls = (pos: string) => grid.get(pos) !== '#'
  const pushAdjacentToCurrent = (adjacent: string) => { current.push(adjacent) }
  while (current.value !== end) {
    if (typeof current.value === 'string') {
      if (grid.get(current.value) === ' ' || grid.get(current.value) === undefined) {
        break
      }
      visited.set(current.value, true)
      // First step
      const adjacents = getAdjacentPositionsArray(current.value)
        // No walls
        .filter(filterOutWalls)
        // Nowhere we've already been on this search
        .filter(pos => !visited.get(pos))
        // Sort by distance from the target
        .sort((a, b) => (
          manhattanDistance(parseGridString(end), parseGridString(a))
            - manhattanDistance(parseGridString(end), parseGridString(b))
        ))
      adjacents.forEach(pushAdjacentToCurrent)
    }
    const indexOfNextBranch = current.branches.findIndex(
      branch => typeof branch.value === 'string' && !visited.get(branch.value)
    )
    if (indexOfNextBranch !== -1) current = current.branches[indexOfNextBranch]
    else {
      // Gotta go back up the tree, I guess
      if (current.parent) current = current.parent
      else {
        // This else means that there is no path to the thing. So what we should do there is,
        // the first time it happens, we should then look at our map and figure out what we think
        // the edges are, and the findNearestUnknownSquare algorithm shouldn't check beyond there.
        // We should also create a "forbidden" list that the unknown square algorithm won't return,
        // for the few inaccessible squares that are actually within our grid.
        forbidden.push(end)
        let minX = Number.MAX_SAFE_INTEGER
        let minY = Number.MAX_SAFE_INTEGER
        let maxX = Number.MIN_SAFE_INTEGER
        let maxY = Number.MIN_SAFE_INTEGER
        for (let key of grid.keys()) {
          const [ x, y ] = parseGridString(key)
          minX = Math.min(minX, x)
          minY = Math.min(minY, y)
          maxX = Math.max(maxX, x)
          maxY = Math.max(maxY, y)
        }
        goodXMin = minX
        goodYMin = minY
        goodXMax = maxX
        goodYMax = maxY
        return undefined
      }
    }
  }

  return current.getPathToHead().slice(0, -1).reverse() as string[]
}

const getNextStep = (): -1 | 1 | 2 | 3 | 4 => {
  // I should find the nearest unknown square and take one step toward it
  const [ x, y ] = parseGridString(droidPosition)
  let path: undefined | string[] = undefined

  while (!path) {
    const target = findNearestUnknownSquare()
    if (!target.length) return -1
    path = findShortestPath(droidPosition, target)
  }

  const nextStep = parseGridString(path[0])

  // north (1), south (2), west (3), and east (4).
  if (nextStep[1] < y) return 1
  if (nextStep[1] > y) return 2
  if (nextStep[0] < x) return 3
  if (nextStep[0] > x) return 4

  throw new Error('fuck')
}

// Movement input commands: north (1), south (2), west (3), and east (4). Any other command is invalid.
// Response status codes
// 0: The repair droid hit a wall. Its position has not changed.
// 1: The repair droid has moved one step in the requested direction.
// 2: The repair droid has moved one step in the requested direction; its new position is the location of the oxygen system.
const repairDroidLoop = (input: number): { response: number } => {
  // Accept a movement command via an input instruction.
  if (input < 1 || input > 4) throw new Error('fuck')
  // Send the movement command to the repair droid.
  // Wait for the repair droid to finish the movement operation.
  intcodeComputerResults = intcodeComputer2019(program, [input], true, instructionPointer, relativeBase)
  instructionPointer = intcodeComputerResults.instructionPointer
  outputs = intcodeComputerResults.outputs
  relativeBase = intcodeComputerResults.relativeBase
  program = intcodeComputerResults.program

  // Report on the status of the repair droid via an output instruction.
  return {
    response: outputs[outputs.length - 1]
  }
}

const parseInput = (inputKey: string): number[] =>
  INPUT[inputKey].split(',').map(inputStr => parseInt(inputStr))

const renderGrid = () => {
  let minX = Number.MAX_SAFE_INTEGER
  let minY = Number.MAX_SAFE_INTEGER

  for (let key of grid.keys()) {
    const [ x, y ] = parseGridString(key)
    minX = Math.min(minX, x)
    minY = Math.min(minY, y)
  }

  const xOffset = minX * -1
  const yOffset = minY * -1

  const field: ('D' | '#' | '.' | ' ' | 'X' | 'O')[][] = []

  for (let [key, value] of grid.entries()) {
    const [ x, y ] = parseGridString(key)
    const fieldX = x + xOffset
    const fieldY = y + yOffset
    if (!field[fieldY]) field[fieldY] = []
    field[fieldY][fieldX] = value
  }

  const screen: string[] = []

  for (let i = 0; i < field.length; i++) {
    const row = field[i]
    let rowStr = ''
    for (let j = 0; j < row.length; j++) {
      rowStr += (field[i][j] === undefined ? ' ' : field[i][j])
    }
    screen.push(rowStr)
  }

  return (
    <pre>
      {screen.join('\n')}
    </pre>
  )
}

const renderDay = (dayConfig: IDayConfig, inputKey: string) => {
  return (
    <div>
      <h3>Input: {dayConfig.INPUT[inputKey]}</h3>
      <h3>Program: {program.join(',')}</h3>
      <h3>Droid Position: {droidPosition}</h3>
      {oxyPosition.length > 0 && <h3>Oxygen Position: {oxyPosition}</h3>}
      {renderGrid()}
    </div>
  )
}

const setUnknownAdjacentsToUnknown = () => {
  const adjacent = getAdjacentPositions(droidPosition)
  if (!grid.has(adjacent.n)) grid.set(adjacent.n, ' ')
  if (!grid.has(adjacent.e)) grid.set(adjacent.e, ' ')
  if (!grid.has(adjacent.s)) grid.set(adjacent.s, ' ')
  if (!grid.has(adjacent.w)) grid.set(adjacent.w, ' ')
}

// returns whether or not it is standing on the oxygen system after the one step it takes
const takeOneStep = (): boolean => {
  const input = getNextStep()
  if (input === -1) {
    doneWithMapping = true
    return false
  }
  const droidResult = repairDroidLoop(input)
  setUnknownAdjacentsToUnknown()
  const adjacentPositions = getAdjacentPositions(droidPosition)

  const newPosition = droidResult.response === 0
    ? droidPosition
    : input === 1
      ? adjacentPositions.n
      : input === 2
        ? adjacentPositions.s
        : input === 3
          ? adjacentPositions.w
          : input === 4
            ? adjacentPositions.e
            : droidPosition

  switch (droidResult.response) {
    case 0: // Hit a wall, position unchanged
      switch (input) {
        case 1:
          grid.set(adjacentPositions.n, '#')
          break

        case 2:
          grid.set(adjacentPositions.s, '#')
          break

        case 3:
          grid.set(adjacentPositions.w, '#')
          break

        case 4:
          grid.set(adjacentPositions.e, '#')
          break

        default:
          throw new Error('fuck')
      }
      break

    case 2: // ...new position is the location of the oxygen system.
      oxyPosition = newPosition
      // Moved one step in the requested direction...
      const oldPositionCase2 = droidPosition === oxyPosition ? 'X' : '.'
      grid.set(droidPosition, oldPositionCase2)
      grid.set(newPosition, 'D')
      droidPosition = newPosition
      break

    case 1: // Moved one step in the requested direction
      const oldPosition = droidPosition === oxyPosition ? 'X' : '.'
      grid.set(droidPosition, oldPosition)
      grid.set(newPosition, 'D')
      droidPosition = newPosition
      break

    default:
      throw new Error('fuck')
  }

  return droidResult.response === 2
}

const BUTTONS: IButton[] = [
  {
    label: 'Initialize/Reset Program (Click Me First)',
    onClick: (inputKey: string) => {
      program = parseInput(inputKey)
      outputs = []
      intcodeComputerResults = {
        finished: false,
        instructionPointer: 0,
        outputs: [],
        relativeBase: 0,
        program
      }

      grid = new Map()
      droidPosition = '0,0'
      oxyPosition = ''
      grid.set(droidPosition, 'D')
      forbidden = []
      doneWithMapping = false
      timeSinceRepair = 0

      goodXMin = Number.MIN_SAFE_INTEGER
      goodYMin = Number.MIN_SAFE_INTEGER
      goodXMax = Number.MAX_SAFE_INTEGER
      goodYMax = Number.MAX_SAFE_INTEGER

      setUnknownAdjacentsToUnknown()

      return {}
    }
  },
  {
    label: 'Take One Step',
    onClick: () => {
      takeOneStep()
      return {}
    }
  },
  {
    label: 'Map It Out',
    onClick: () => {
      while (!doneWithMapping) {
        takeOneStep()
      }
      return {}
    }
  },
  {
    label: 'Repair Oxygen System',
    onClick: () => {
      if (!doneWithMapping) throw new Error('You can\'t do this until you\'re finished mapping!')

      const path = findShortestPath('0,0', oxyPosition)

      if (!path) throw new Error('fuck')
      grid.set(oxyPosition, 'O')
      timeSinceRepair = 0

      return {
        answer1: path.length.toString()
      }
    }
  },
  {
    label: 'Wait One Minute',
    onClick: () => {
      advanceOxygen()

      return {}
    }
  },
  {
    label: 'Fill with Oxygen',
    onClick: () => {
      while (!fullOfOxygen()) advanceOxygen()

      return {
        answer2: timeSinceRepair.toString()
      }
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      It would require <code>{answer}</code> movement commands{' '}
      to move the droid from the starting position to the oxygen system.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      It takes <code>{answer}</code> minutes to fill the space with oxygen.
    </span>
  ),
  buttons: BUTTONS,
  day: 15,
  INPUT,
  renderDay: (dayConfig, inputKey) => renderDay(dayConfig, inputKey),
  title: 'Oxygen System'
}

export default config
