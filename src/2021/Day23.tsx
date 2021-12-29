import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'
import AStar from '../utils/AStar'

import INPUT from './Input/Day23'

const goal = `#############
#...........#
###A#B#C#D###
  #A#B#C#D#
  #########`

/**
 * Coords: row,col
 *
 * Hallways: 1,1 through 1,11
 * Rooms: A: 2,3-3,3
 *        B: 2,5-3,5
 *        C: 2,7-3,7
 *        D: 2,9-3,9
 */

// const hallwaySpaces: [number, number][] = [
//   [1, 1], [1, 2], [1, 4], [1, 6], [1, 8], [1, 10], [1, 11]
// ]
// const roomA: [number, number][] = [[2, 3], [3, 3]]
// const roomB: [number, number][] = [[2, 5], [3, 5]]
// const roomC: [number, number][] = [[2, 7], [3, 7]]
// const roomD: [number, number][] = [[2, 9], [3, 9]]

interface AmphipodPositions {
  A: [[number, number], [number, number]],
  B: [[number, number], [number, number]],
  C: [[number, number], [number, number]],
  D: [[number, number], [number, number]]
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
  return {
    A: A as [[number, number], [number, number]],
    B: B as [[number, number], [number, number]],
    C: C as [[number, number], [number, number]],
    D: D as [[number, number], [number, number]],
  }
}

const getStateFromPositions = ({ A, B, C, D }: AmphipodPositions): string => {
  const rows = [
    '#############',
    '#...........#',
    '###.#.#.#.###',
    '  #.#.#.#.#',
    '  #########'
  ]
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
  // their own, so they need to move to the hallway (1 or 2 spaces), then we assume row 2
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
    if ((moveFrom[0] === 2 && moveTo[0] === 3) || (moveFrom[0] === 3 && moveTo[0] === 2)) {
      rowDistance = 3
    }
    if (moveFrom[0] === 2 && moveTo[0] === 2) {
      rowDistance = 2
    }
    if (moveFrom[0] === 3 && moveTo[0] === 3) {
      rowDistance = 4
    }
  }
  return (rowDistance + colDistance) * multiplier
}

const getCharFromState = (row: number, col: number, state: string): string => {
  const rows = state.split('\n')
  return rows[row].charAt(col)
}

const getNeighborsForPosition = ([row, col]: [number, number], state: string): string[] => {
  const type = getCharFromState(row, col, state) as 'A' | 'B' | 'C' | 'D'
  const roomColIndex = type === 'A' ? 3 : type === 'B' ? 5 : type === 'C' ? 7 : 9
  const nextStates: string[] = []
  // Go to its room
  if (row === 1) {
    // If it's in the hallway, see if its room is empty or has its type in it and move there
    // If its room is empty
    if (
      (
        getCharFromState(3, roomColIndex, state) === '.' ||
        getCharFromState(3, roomColIndex, state) === type
      ) &&
      getCharFromState(2, roomColIndex, state) === '.'
    ) {
      // We can move into the room!
      // If the back row is empty, we should move there (if there's a free path)
      const hallwaySpacesToMoveThrough = col < roomColIndex ?
        [...Array(roomColIndex + 1).keys()].slice(col + 1) :
        [...Array(col).keys()].slice(roomColIndex)
      if (hallwaySpacesToMoveThrough.every(hCol => getCharFromState(1, hCol, state) === '.')) {
        const nextRow = getCharFromState(3, roomColIndex, state) === '.' ? 3 : 2
        const nextStatePositions = getAmphipodPositions(state)
        nextStatePositions[type] = nextStatePositions[type].map(([nRow, nCol]) => {
          if (row === nRow && col === nCol) {
            return [nextRow, roomColIndex]
          }
          return [nRow, nCol]
        }) as [[number, number], [number, number]]
        nextStates.push(getStateFromPositions(nextStatePositions))
      }
    }
  }
  // Go to the hallway
  if (
    // If it's in the exit row of a room that's not its room, it can go to the hallway
    (row === 2 && col !== roomColIndex) ||
    // If it's in the exit row of its room, it should only exit if the back row doesn't have its type
    (row === 2 && col === roomColIndex && getCharFromState(3, col, state) !== type) ||
    // If it's in the back row of a room that's not its room, it can go to the hallway if the exit row is empty
    (row === 3 && col !== roomColIndex && getCharFromState(2, col, state) === '.')
  ) {
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
        nextStates.push(getStateFromPositions(nextStatePositions))
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
        nextStates.push(getStateFromPositions(nextStatePositions))
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
          nextStates.push(getStateFromPositions(nextStatePositions))
          if (getCharFromState(3, hCol, state) === '.') {
            const nextStatePositions_ = getAmphipodPositions(state)
            nextStatePositions_[type] = nextStatePositions_[type].map(([nRow, nCol]) => {
              if (row === nRow && col === nCol) {
                return [3, hCol]
              }
              return [nRow, nCol]
            }) as [[number, number], [number, number]]
            nextStates.push(getStateFromPositions(nextStatePositions_))
          }
        }
      }
    }
  }
  // If it's in the back row of its room, it shouldn't move
  if (row === 3 && col === roomColIndex) {
    // Do nothing here. This is here just so I know I'm doing something (nothing) about it.
  }

  return nextStates
}

// getNeighbors gives all possible adjacent states to this one
const getNeighbors = (state: string): string[] => {
  const nextStates: string[] = []
  const { A, B, C, D } = getAmphipodPositions(state)
  A.forEach(([row, col]) => {
    nextStates.push(...getNeighborsForPosition([row, col], state))
  })
  B.forEach(([row, col]) => {
    nextStates.push(...getNeighborsForPosition([row, col], state))
  })
  C.forEach(([row, col]) => {
    nextStates.push(...getNeighborsForPosition([row, col], state))
  })
  D.forEach(([row, col]) => {
    nextStates.push(...getNeighborsForPosition([row, col], state))
  })
  return nextStates
}

const BUTTONS: IButton[] = [
  {
    label: 'Get Next States for State',
    onClick: (inputKey: string) => {
      const start = INPUT[inputKey]

      const neighbors = getNeighbors(start)

      neighbors.forEach(neighbor => console.log(neighbor))

      return {}
    }
  },
  {
    label: 'Organize the Amphipods',
    onClick: (inputKey: string) => {
      const start = INPUT[inputKey]

      console.log('h', h(start))

      const startTime = new Date().getTime()

      const pathLength = AStar(
        start,
        goal,
        d,
        h,
        getNeighbors
      )

      console.log(`Total runtime: ${(new Date().getTime() - startTime) / 1000} seconds.`)

      // path.forEach(state => {
      //   state.split('\n').forEach(row => console.log(row))
      //   console.log('\n\n')
      // })

      return {
        answer1: pathLength.toString()
      }
    }
  },
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      It will take <code>{answer}</code> energy to organize the amphipods.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      After the reboot, <code>{answer}</code> cubes are ON.
    </span>
  ),
  buttons: BUTTONS,
  day: 23,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Amphipod'
}

export default config
