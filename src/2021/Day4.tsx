import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'

import INPUT from '../Inputs/2021/Day4'

type BingoBoard = (number | 'X')[]

// [
//   0, 1, 2, 3, 4,
//   5, 6, 7, 8, 9,
//  10,11,12,13,14,
//  15,16,17,18,19,
//  20,21,22,23,24
// ]

const parseInput = (inputKey: string) => {
  const data = INPUT[inputKey].split('\n').filter(l => l.length)
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

const BUTTONS: IButton[] = [
  {
    label: 'Play Bingo!',
    onClick: (inputKey: string) => {
      const { boards, numbersToCall } = parseInput(inputKey)

      for (let i = 0; i < numbersToCall.length; i++) {
        const numberToCall = numbersToCall[i]
        markBoards(boards, numberToCall)
        const winningBoard = checkForWinners(boards)
        if (winningBoard) {
          return {
            answer1: scoreTheWinner(winningBoard, numberToCall).toString()
          }
        }
      }

      return {}
    }
  },
  {
    label: 'Play Bingo! (And Lose)',
    onClick: (inputKey: string) => {
      let { boards, numbersToCall } = parseInput(inputKey)

      for (let i = 0; i < numbersToCall.length; i++) {
        const numberToCall = numbersToCall[i]
        markBoards(boards, numberToCall)
        if (boards.length > 1) {
          boards = boards.filter(board => !checkForWin(board))
        }
        if (boards.length === 1 && checkForWin(boards[0])) {
          return {
            answer2: scoreTheWinner(boards[0], numberToCall).toString()
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
      The first winning board's score is{' '}
      <code>{answer}</code>.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      The last winning board's score is{' '}
      <code>{answer}</code>.
    </span>
  ),
  buttons: BUTTONS,
  day: 4,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Giant Squid'
}

export default config
