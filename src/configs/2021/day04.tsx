import inputs from '../../inputs/2021/day04'
import { DayConfig } from '../../routes/Day'

type BingoBoard = (number | 'X')[]
// [
//   0, 1, 2, 3, 4,
//   5, 6, 7, 8, 9,
//  10,11,12,13,14,
//  15,16,17,18,19,
//  20,21,22,23,24
// ]

const parseInput = (input: string) => {
  const data = input.split('\n').filter(l => l.length)
  const numbersToCall = data.shift()
    ?.split(',')
    .map(n => Number(n)) ||
    []

  const boards = data.reduce((boardList, currentLine, i) => {
    const currentNumbers = currentLine
      .split(' ')
      .filter(n => n.length)
      .map(n => Number(n))
    if (i % 5 === 0) {
      boardList.push([])
    }
    boardList[boardList.length - 1].push(...currentNumbers)

    return boardList
  }, [] as BingoBoard[])

  return { boards, numbersToCall }
}

const markBoards = (boards: BingoBoard[], n: number) =>
  boards.forEach(board => {
    const nIndex = board.indexOf(n)
    if (nIndex > -1) {
      board[nIndex] = 'X'
    }
  })

const checkForWin = (board: BingoBoard) => {
  const winningCombos = [
    // Rows
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24],

    // Cols
    [0, 5, 10, 15, 20],
    [1, 6, 11, 16, 21],
    [2, 7, 12, 17, 22],
    [3, 8, 13, 18, 23],
    [4, 9, 14, 19, 24]
  ]

  return winningCombos.find(combo => combo.every(i => board[i] === 'X')) !== undefined
}

const checkForWinners = (boards: BingoBoard[]) =>
  boards.find(board => checkForWin(board))

const scoreTheWinner = (board: BingoBoard, calledNumber: number) =>
  board.reduce(
    (sum: number, current) => current === 'X' ? sum : sum + current,
    0
  ) * calledNumber

export const playBingo = (input: string) => {
  const { boards, numbersToCall } = parseInput(input)

  for (let i = 0; i < numbersToCall.length; i++) {
    const numberToCall = numbersToCall[i]
    markBoards(boards, numberToCall)
    const winningBoard = checkForWinners(boards)
    if (winningBoard) {
      return {
        answer1: scoreTheWinner(winningBoard, numberToCall)
      }
    }
  }
}

export const playAndLose = (input: string) => {
  const setup = parseInput(input)
  let { boards } = setup
  const { numbersToCall } = setup

  for (let i = 0; i < numbersToCall.length; i++) {
    const numberToCall = numbersToCall[i]
    markBoards(boards, numberToCall)
    if (boards.length > 1) {
      boards = boards.filter(board => !checkForWin(board))
    }
    if (boards.length === 1 && checkForWin(boards[0])) {
      return {
        answer2: scoreTheWinner(boards[0], numberToCall)
      }
    }
  }
}

const day04: Omit<DayConfig, 'year'> = {
  answer1Text: `The first winning board's score is answer.`,
  answer2Text: `The last winning board's score is answer.`,
  buttons: [
    {
      label: 'Play Bingo!',
      onClick: playBingo
    },
    {
      label: 'Play Bingo! (And Lose)',
      onClick: playAndLose
    }
  ],
  id: 4,
  inputs,
  title: 'Giant Squid',
}

export default day04
