import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'

import INPUT from '../Inputs/2020/Day11'

const getOccupiedLineOfSightCount = (
  seats: string[],
  rowIdx: number,
  seatIdx: number
): number => {
  const directions: Array<Array<'+' | '0' | '-'>> = [
    ['-', '-'],
    ['-', '0'],
    ['-', '+'],
    ['0', '-'],
    ['0', '+'],
    ['+', '-'],
    ['+', '0'],
    ['+', '+'],
  ]
  let count = 0
  directions.forEach(([rowAdj, seatAdj]) => {
    let row = rowAdj === '-' ? rowIdx - 1 : rowAdj === '+' ? rowIdx + 1 : rowIdx
    let seat = seatAdj === '-' ? seatIdx - 1 : seatAdj === '+' ? seatIdx + 1 : seatIdx
    while (
      // Valid coords
      (row >= 0 && row < seats.length && seat >= 0 && seat < seats[0].length) &&
      // Not looking at a seat (occupied or empty)
      (seats[row].charAt(seat) === '.')
    ) {
      row = rowAdj === '-' ? row - 1 : rowAdj === '+' ? row + 1 : row
      seat = seatAdj === '-' ? seat - 1 : seatAdj === '+' ? seat + 1 : seat
    }
    if (
      // If valid coords ...
      (row >= 0 && row < seats.length && seat >= 0 && seat < seats[0].length) &&
      // check seat status
      seats[row].charAt(seat) === '#'
    ) {
      count++
    }
  })
  return count
}

const getOccupiedNeighborsCount = (
  seats: string[],
  rowIdx: number,
  seatIdx: number
): number => ([
  [rowIdx - 1, seatIdx - 1],
  [rowIdx - 1, seatIdx],
  [rowIdx - 1, seatIdx + 1],
  [rowIdx, seatIdx - 1],
  [rowIdx, seatIdx + 1],
  [rowIdx + 1, seatIdx - 1],
  [rowIdx + 1, seatIdx],
  [rowIdx + 1, seatIdx + 1]
].filter(([rowIdx, seatIdx]) => (
  // No invalid coords
  (rowIdx >= 0 && seatIdx >= 0 && rowIdx < seats.length && seatIdx < seats[0].length) &&
  // Check if occupied
  (seats[rowIdx].charAt(seatIdx) === '#')
)).length
)

const iterateSeats = (seats: string[]): string[] => {
  const newSeats = seats.join('\n').split('\n').map(row => row.split(''))
  seats.forEach((row, rowIdx, seats) => {
    row.split('').forEach((seat, seatIdx) => {
      if (seat === 'L') {
        if (getOccupiedNeighborsCount(seats, rowIdx, seatIdx) === 0) {
          newSeats[rowIdx][seatIdx] = '#'
        }
      } else if (seat === '#') {
        if (getOccupiedNeighborsCount(seats, rowIdx, seatIdx) >= 4) {
          newSeats[rowIdx][seatIdx] = 'L'
        }
      } else {
        newSeats[rowIdx][seatIdx] = seat
      }
    })
  })
  return newSeats.map(row => row.join(''))
}

const iterateSeats__v2 = (seats: string[]): string[] => {
  const newSeats = seats.join('\n').split('\n').map(row => row.split(''))
  seats.forEach((row, rowIdx, seats) => {
    row.split('').forEach((seat, seatIdx) => {
      if (seat === 'L') {
        if (getOccupiedLineOfSightCount(seats, rowIdx, seatIdx) === 0) {
          newSeats[rowIdx][seatIdx] = '#'
        }
      } else if (seat === '#') {
        if (getOccupiedLineOfSightCount(seats, rowIdx, seatIdx) >= 5) {
          newSeats[rowIdx][seatIdx] = 'L'
        }
      } else {
        newSeats[rowIdx][seatIdx] = seat
      }
    })
  })
  return newSeats.map(row => row.join(''))
}

const BUTTONS: IButton[] = [
  {
    label: 'Simulate Seating',
    onClick: (inputKey: string) => {
      let seats = INPUT[inputKey].split('\n')
      const seenSeats: Map<string, true> = new Map()

      while (!seenSeats.get(seats.join('\n'))) {
        seenSeats.set(seats.join('\n'), true)
        seats = iterateSeats(seats)
      }

      return {
        answer1: seats.join().split('').filter(x => x === '#').length.toString()
      }
    }
  },
  {
    label: 'Actually Simulate Seating',
    onClick: (inputKey: string) => {
      let seats = INPUT[inputKey].split('\n')
      const seenSeats: Map<string, true> = new Map()

      while (!seenSeats.get(seats.join('\n'))) {
        seenSeats.set(seats.join('\n'), true)
        seats = iterateSeats__v2(seats)
      }

      return {
        answer2: seats.join().split('').filter(x => x === '#').length.toString()
      }
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      At the end, <code>{answer}</code> seats are occupied.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      In the actual simulation, at the end, <code>{answer}</code> seats are occupied.
    </span>
  ),
  buttons: BUTTONS,
  day: 11,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Seating System'
}

export default config