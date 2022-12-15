import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'

import INPUT from '../Inputs/2020/Day05'

interface IDecodedBoardingPass {
  row: number
  col: number
  seatId: number
}

const decodeBoardingPass = (boardingPass: string): IDecodedBoardingPass => {
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
    seatId: (row * 8) + col
  }
}

const getNewRange = (
  [min, max]: [number, number],
  whichHalf: 'lower' | 'upper'
): [number, number] | number => {
  const totalCount = (max + 1) - min
  const newRanges = totalCount === 2
    ? [min, max]
    : [
      [min, min + (totalCount / 2) - 1],
      [min + (totalCount / 2), max]
    ] as [number, number][]

  return newRanges[whichHalf === 'lower' ? 0 : 1]
}

const BUTTONS: IButton[] = [
  {
    label: 'Perform Sanity Check',
    onClick: (inputKey: string) => {
      const boardingPasses = INPUT[inputKey].split('\n')
      let highestSeatId = Number.MIN_SAFE_INTEGER
      boardingPasses.forEach(boardingPass => {
        highestSeatId = Math.max(highestSeatId, decodeBoardingPass(boardingPass).seatId)
      })

      return {
        answer1: highestSeatId.toString()
      }
    }
  },
  {
    label: 'Find Your Seat',
    onClick: (inputKey: string) => {
      const seatIds = INPUT[inputKey]
        .split('\n')
        .map(boardingPass => decodeBoardingPass(boardingPass))
        .sort((a, b) => {
          if (a.row === b.row) {
            return a.col - b.col
          }
          return a.row - b.row
        })
        .map(x => x.seatId)

      for (let i = seatIds[0]; i <= seatIds[seatIds.length - 1]; i++) {
        if (!seatIds.includes(i)) {
          return {
            answer2: i.toString()
          }
        }
      }

      return {}
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The highest seat ID is <code>{answer}</code>.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      Your seat ID is <code>{answer}</code>.
    </span>
  ),
  buttons: BUTTONS,
  day: 5,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Binary Boarding'
}

export default config