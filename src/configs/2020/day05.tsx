import inputs from '../../inputs/2020/day05'
import { DayConfig } from '../../routes/Day'

interface BoardingPass {
  row: number
  col: number
  seatId: number
}

const getNewRange = (
  [min, max]: [number, number],
  whichHalf: 'lower' | 'upper'
): [number, number] | number => {
  const totalCount = max + 1 - min
  const newRanges =
    totalCount === 2
      ? [min, max]
      : ([
          [min, min + totalCount / 2 - 1],
          [min + totalCount / 2, max],
        ] as [number, number][])

  return newRanges[whichHalf === 'lower' ? 0 : 1]
}

const decodeBoardingPass = (boardingPass: string): BoardingPass => {
  const rowCode = boardingPass.slice(0, 7).split('')
  const colCode = boardingPass.slice(7).split('')

  let row: [number, number] | number = [0, 127]
  while (typeof row !== 'number') {
    const whichHalf = rowCode.shift() === 'F' ? 'lower' : 'upper'
    row = getNewRange(row, whichHalf)
  }

  let col: [number, number] | number = [0, 7]
  while (typeof col !== 'number') {
    const whichHalf = colCode.shift() === 'L' ? 'lower' : 'upper'
    col = getNewRange(col, whichHalf)
  }

  return {
    row,
    col,
    seatId: row * 8 + col,
  }
}

export const performSanityCheck = (input: string) => {
  const boardingPasses = input.split('\n')
  let highestSeatId = Number.MIN_SAFE_INTEGER
  boardingPasses.forEach((boardingPass) => {
    highestSeatId = Math.max(
      highestSeatId,
      decodeBoardingPass(boardingPass).seatId
    )
  })

  return {
    answer1: highestSeatId,
  }
}

export const findYourSeat = (input: string) => {
  const seatIds = input
    .split('\n')
    .map((boardingPass) => decodeBoardingPass(boardingPass))
    .sort((a, b) => {
      if (a.row === b.row) {
        return a.col - b.col
      }
      return a.row - b.row
    })
    .map((x) => x.seatId)

  for (let i = seatIds[0]; i <= seatIds[seatIds.length - 1]; i++) {
    if (!seatIds.includes(i)) {
      return {
        answer2: i,
      }
    }
  }
}

const day05: Omit<DayConfig, 'year'> = {
  answer1Text: 'The highest seat ID is answer.',
  answer2Text: 'Your seat ID is answer.',
  buttons: [
    {
      label: 'Perform Sanity Check',
      onClick: performSanityCheck,
    },
    {
      label: 'Find Your Seat',
      onClick: findYourSeat,
    },
  ],
  id: 5,
  inputs,
  title: 'Binary Boarding',
}

export default day05
