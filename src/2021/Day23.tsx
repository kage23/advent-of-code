import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'
import AStar from '../utils/AStar'
import BinaryHeap from '../utils/BinaryHeap'

import INPUT from './Input/Day23'

const goal = `#############
#...........#
###A#B#C#D###
  #A#B#C#D#
  #########`

const goalPartTwo = `#############
#...........#
###A#B#C#D###
  #A#B#C#D#
  #A#B#C#D#
  #A#B#C#D#
  #########`

/**
 * Coords: row,col
 *
 * Hallways: 1,1 through 1,11
 * Rooms: A: 2,3-3,3 OR 2,3-5,3
 *        B: 2,5-3,5 OR 2,5-5,5
 *        C: 2,7-3,7 OR 2,7-5,7
 *        D: 2,9-3,9 OR 2,9-5,9
 */

const parseMapForPartTwo = (inputKey: string): string => {
  const rows = INPUT[inputKey].split('\n')
  rows.splice(3, 0, '  #D#C#B#A#', '  #D#B#A#C#')
  return rows.join('\n')
}

interface AmphipodPositions {
  A: [number, number][],
  B: [number, number][],
  C: [number, number][],
  D: [number, number][]
}
const getAmphipodPositions = (state: string): AmphipodPositions => {
  const rows = state.split('\n')
  const A: [number, number][] = []
  const B: [number, number][] = []
  const C: [number, number][] = []
  const D: [number, number][] = []
  rows.forEach((row, rowIndex) => {
    for (let i = 0; i < row.length; i++) {
      const char = row.charAt(i)
      if (char === 'A') A.push([rowIndex, i])
      if (char === 'B') B.push([rowIndex, i])
      if (char === 'C') C.push([rowIndex, i])
      if (char === 'D') D.push([rowIndex, i])
    }
  })
  return { A, B, C, D }
}

const getStateFromPositions = ({ A, B, C, D }: AmphipodPositions, part: 1 | 2): string => {
  const rows = [
    '#############',
    '#...........#',
    '###.#.#.#.###',
    '  #.#.#.#.#',
    '  #########'
  ]
  if (part === 2) {
    rows.splice(3, 0, '  #.#.#.#.#', '  #.#.#.#.#')
  }
  A.forEach(([rowIdx, colIdx]) => {
    const row = rows[rowIdx].split('')
    row.splice(colIdx, 1, 'A')
    rows[rowIdx] = row.join('')
  })
  B.forEach(([rowIdx, colIdx]) => {
    const row = rows[rowIdx].split('')
    row.splice(colIdx, 1, 'B')
    rows[rowIdx] = row.join('')
  })
  C.forEach(([rowIdx, colIdx]) => {
    const row = rows[rowIdx].split('')
    row.splice(colIdx, 1, 'C')
    rows[rowIdx] = row.join('')
  })
  D.forEach(([rowIdx, colIdx]) => {
    const row = rows[rowIdx].split('')
    row.splice(colIdx, 1, 'D')
    rows[rowIdx] = row.join('')
  })
  return rows.join(`
`)
}

// h estimates the minimum cost from the given state to the end state
const h = (state: string): number => {
  let cost = 0
  const { A, B, C, D } = getAmphipodPositions(state)
  cost = A.reduce((sum, [row, col]) => sum + getMinimumDistance(row, col, 'A'), cost)
  cost = B.reduce((sum, [row, col]) => sum + (getMinimumDistance(row, col, 'B') * 10), cost)
  cost = C.reduce((sum, [row, col]) => sum + (getMinimumDistance(row, col, 'C') * 100), cost)
  cost = D.reduce((sum, [row, col]) => sum + (getMinimumDistance(row, col, 'D') * 1000), cost)
  return cost
}

const getMinimumDistance = (row: number, col: number, type: 'A' | 'B' | 'C' | 'D'): number => {
  const roomColIndex = type === 'A' ? 3 : type === 'B' ? 5 : type === 'C' ? 7 : 9
  // If it's already in its room, we'll just assume that it's good and doesn't need to move any more
  if (col === roomColIndex) return 0
  const colDistance = Math.abs(col - roomColIndex)
  // Row distance is just the row they're on. If they're in the hallway (row 1), we
  // assume they're moving to row 2 (1 space). If they're in a room, we know it's not
  // their own, so they need to move to the hallway (1 or 2 or 3 or 4 spaces), then we assume row 2
  // (1 more space).
  return colDistance + row
}

// d gives the energy cost to get from one state to an (assumed) adjacent state
const d = (to: string, from: string): number => {
  const fromRows = from.split('\n')
  const toRows = to.split('\n')

  const moveFrom: [number, number] = [0, 0]
  const moveTo: [number, number] = [0, 0]

  // Find the spot in the from that's a letter but a dot in the to
  rowLoop:
  for (let row = 0; row < fromRows.length; row++) {
    for (let col = 0; col < fromRows[row].length; col++) {
      const fromChar = fromRows[row].charAt(col)
      const toChar = toRows[row].charAt(col)
      if (toChar === '.' && fromChar !== '.') {
        moveFrom[0] = row
        moveFrom[1] = col
        break rowLoop
      }
    }
  }

  // Find the spot in the to that's a letter but a dot in the from
  rowLoop:
  for (let row = 0; row < toRows.length; row++) {
    for (let col = 0; col < toRows[row].length; col++) {
      const fromChar = fromRows[row].charAt(col)
      const toChar = toRows[row].charAt(col)
      if (fromChar === '.' && toChar !== '.') {
        moveTo[0] = row
        moveTo[1] = col
        break rowLoop
      }
    }
  }

  const type = getCharFromState(...moveFrom, from) as 'A' | 'B' | 'C' | 'D'
  const multiplier = type === 'A' ? 1 : type === 'B' ? 10 : type === 'C' ? 100 : 1000
  const colDistance = Math.abs(moveFrom[1] - moveTo[1])
  let rowDistance = 0
  // Moving from a hallway to a room OR a hallway to room
  if (moveFrom[0] === 1 || moveTo[0] === 1) {
    rowDistance = Math.abs(moveTo[0] - moveFrom[0])
  }
  // Moving from a room to a room
  else {
    // This should work
    rowDistance = moveFrom[0] + moveTo[0] - 2
  }
  return (rowDistance + colDistance) * multiplier
}

const getCharFromState = (row: number, col: number, state: string): string => {
  const rows = state.split('\n')
  return rows[row].charAt(col)
}

const shouldGoToHallway = (row: number, col: number, state: string, part: 1 | 2): boolean => {
  /**
   * It can go to the hallway if:
   *  it's in a room that's not its room, and every space between it and the hallway is clear
   *  it's in its room, and some space behind it has something of not its type
   */
  // If we're already in the hallway, we shouldn't move elsewhere in the hallway
  if (row === 1) return false
  const type = getCharFromState(row, col, state) as 'A' | 'B' | 'C' | 'D'
  const roomColIndex = type === 'A' ? 3 : type === 'B' ? 5 : type === 'C' ? 7 : 9
  const backRow = part === 1 ? 3 : 5
  // If it's in its room, and some space behind it has something of not its type
  if (col === roomColIndex) {
    const rowsToCheck = [...Array(backRow + 1).keys()].slice(row + 1)
    for (let i = 0; i < rowsToCheck.length; i++) {
      const rowSpotToCheck = getCharFromState(rowsToCheck[i], roomColIndex, state)
      if (rowSpotToCheck !== type) return true
    }
  }
  // If it's in a room that's not its room, and every space between it and the hallway is clear
  else {
    const rowsToCheck = part === 1 ? [2, 3] : [2, 3, 4, 5]
    if (rowsToCheck.every(rowIndex => (
      rowIndex >= row || getCharFromState(rowIndex, col, state) === '.'
    ))) return true
  }
  return false
}

const getNeighborsForPosition = ([row, col]: [number, number], state: string, part: 1 | 2): string[] => {
  const rows = state.split('\n')
  const type = getCharFromState(row, col, state) as 'A' | 'B' | 'C' | 'D'
  const roomColIndex = type === 'A' ? 3 : type === 'B' ? 5 : type === 'C' ? 7 : 9
  const nextStates: string[] = []
  // Go to its room
  if (row === 1) {
    // If it's in the hallway, see if its room is empty or has its type in it and move there
    // If its room is empty
    const rowsOfRoomSpacesToCheck = rows.length === 5 ? [3] : [5, 4, 3]
    if (
      (
        rowsOfRoomSpacesToCheck.every(rowIndex => (
          getCharFromState(rowIndex, roomColIndex, state) === '.' ||
          getCharFromState(rowIndex, roomColIndex, state) === type
        ))
      ) &&
      getCharFromState(2, roomColIndex, state) === '.'
    ) {
      // We can move into the room!
      // If the back row is empty, we should move there (if there's a free path)
      // If there's a free hallway path, we shoud move to the farthest back room we can reach
      const hallwaySpacesToMoveThrough = col < roomColIndex ?
        [...Array(roomColIndex + 1).keys()].slice(col + 1) :
        [...Array(col).keys()].slice(roomColIndex)
      if (hallwaySpacesToMoveThrough.every(hCol => getCharFromState(1, hCol, state) === '.')) {
        rowsOfRoomSpacesToCheck.push(2)
        const nextRow = rowsOfRoomSpacesToCheck.find(rowIndex => (
          getCharFromState(rowIndex, roomColIndex, state) === '.'
        ))
        const nextStatePositions = getAmphipodPositions(state)
        nextStatePositions[type] = nextStatePositions[type].map(([nRow, nCol]) => {
          if (row === nRow && col === nCol) {
            return [nextRow, roomColIndex]
          }
          return [nRow, nCol]
        }) as [[number, number], [number, number]]
        nextStates.push(getStateFromPositions(nextStatePositions, part))
      }
    }
  }
  // Go to the hallway
  if (shouldGoToHallway(row, col, state, part)) {
    // Check spaces to the left until we find an occupied one
    for (let hCol = col - 1; hCol >= 1; hCol--) {
      const space = getCharFromState(1, hCol, state)
      if (space !== '.') break
      if (hCol !== 3 && hCol !== 5 && hCol !== 7 && hCol !== 9) {
        const nextStatePositions = getAmphipodPositions(state)
        nextStatePositions[type] = nextStatePositions[type].map(([nRow, nCol]) => {
          if (row === nRow && col === nCol) {
            return [1, hCol]
          }
          return [nRow, nCol]
        }) as [[number, number], [number, number]]
        nextStates.push(getStateFromPositions(nextStatePositions, part))
      }
      if (hCol === roomColIndex) {
        // Might as well see if we can go in
        if (getCharFromState(2, hCol, state) === '.') {
          const nextStatePositions = getAmphipodPositions(state)
          nextStatePositions[type] = nextStatePositions[type].map(([nRow, nCol]) => {
            if (row === nRow && col === nCol) {
              return [2, hCol]
            }
            return [nRow, nCol]
          }) as [[number, number], [number, number]]
          if (getCharFromState(3, hCol, state) === '.') {
            const nextStatePositions_ = getAmphipodPositions(state)
            nextStatePositions_[type] = nextStatePositions_[type].map(([nRow, nCol]) => {
              if (row === nRow && col === nCol) {
                return [3, hCol]
              }
              return [nRow, nCol]
            }) as [[number, number], [number, number]]
          }
        }
      }
    }
    // Check spaces to the right until we find an occupied one
    for (let hCol = col + 1; hCol <= 11; hCol++) {
      const space = getCharFromState(1, hCol, state)
      if (space !== '.') break
      if (hCol !== 3 && hCol !== 5 && hCol !== 7 && hCol !== 9) {
        const nextStatePositions = getAmphipodPositions(state)
        nextStatePositions[type] = nextStatePositions[type].map(([nRow, nCol]) => {
          if (row === nRow && col === nCol) {
            return [1, hCol]
          }
          return [nRow, nCol]
        }) as [[number, number], [number, number]]
        nextStates.push(getStateFromPositions(nextStatePositions, part))
      }
      if (hCol === roomColIndex) {
        // Might as well see if we can go in
        if (getCharFromState(2, hCol, state) === '.') {
          const nextStatePositions = getAmphipodPositions(state)
          nextStatePositions[type] = nextStatePositions[type].map(([nRow, nCol]) => {
            if (row === nRow && col === nCol) {
              return [2, hCol]
            }
            return [nRow, nCol]
          }) as [[number, number], [number, number]]
          nextStates.push(getStateFromPositions(nextStatePositions, part))
          if (getCharFromState(3, hCol, state) === '.') {
            const nextStatePositions_ = getAmphipodPositions(state)
            nextStatePositions_[type] = nextStatePositions_[type].map(([nRow, nCol]) => {
              if (row === nRow && col === nCol) {
                return [3, hCol]
              }
              return [nRow, nCol]
            }) as [[number, number], [number, number]]
            nextStates.push(getStateFromPositions(nextStatePositions_, part))
          }
        }
      }
    }
  }

  return nextStates
}

// getNeighbors gives all possible adjacent states to this one
const getNeighbors = (state: string, part: 1 | 2): string[] => {
  const nextStates: string[] = []
  const { A, B, C, D } = getAmphipodPositions(state)
  A.forEach(([row, col]) => {
    nextStates.push(...getNeighborsForPosition([row, col], state, part))
  })
  B.forEach(([row, col]) => {
    nextStates.push(...getNeighborsForPosition([row, col], state, part))
  })
  C.forEach(([row, col]) => {
    nextStates.push(...getNeighborsForPosition([row, col], state, part))
  })
  D.forEach(([row, col]) => {
    nextStates.push(...getNeighborsForPosition([row, col], state, part))
  })
  return nextStates
}

const BUTTONS: IButton[] = [
  {
    label: 'Organize the Amphipods',
    onClick: (inputKey: string) => {
      const start = INPUT[inputKey]

      console.log('h', h(start))

      const startTime = new Date().getTime()

      const getNeighborsFn = (state: string) => getNeighbors(state, 1)

      const pathLength = AStar(
        start,
        goal,
        d,
        h,
        getNeighborsFn
      )

      console.log(`Total runtime: ${(new Date().getTime() - startTime) / 1000} seconds.`)

      return {
        answer1: pathLength.toString()
      }
    }
  },
  {
    label: 'Organize More Amphipods',
    onClick: (inputKey: string) => {
      const start = parseMapForPartTwo(inputKey)

      console.log('h', h(start))

      const startTime = new Date().getTime()

      const getNeighborsFn = (state: string) => getNeighbors(state, 2)

      const pathLength = AStar(
        start,
        goalPartTwo,
        d,
        h,
        getNeighborsFn
      )

      console.log(`Total runtime: ${(new Date().getTime() - startTime) / 1000} seconds.`)

      return {
        answer2: pathLength.toString()
      }
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      It will take <code>{answer}</code> energy to organize the amphipods.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      It will take <code>{answer}</code> energy to organize all of the amphipods.
    </span>
  ),
  buttons: BUTTONS,
  day: 23,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Amphipod'
}

export default config
