import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'

import INPUT from '../Inputs/2022/Day08'

const isTreeVisible = (row: number, col: number, treeGrid: number[][]): boolean => {
  // All edge trees are visible
  if (
    row === 0 ||
    col === 0 ||
    row === treeGrid.length - 1 ||
    col === treeGrid[0].length - 1
  ) {
    return true
  }
  const tree = treeGrid[row][col]
  const left = treeGrid[row].slice(0, col)
  const right = treeGrid[row].slice(col + 1)
  const up = treeGrid.map(row => row[col]).filter((c, i) => i < row)
  const down = treeGrid.map(row => row[col]).filter((c, i) => i > row)
  return (
    [left, right, up, down].some(trees => trees.every(t => t < tree))
  )
}

const getScenicScore = (row: number, col: number, treeGrid: number[][]): number => {
  // All edge trees score zero
  if (
    row === 0 ||
    col === 0 ||
    row === treeGrid.length - 1 ||
    col === treeGrid[0].length - 1
  ) {
    return 0
  }
  const tree = treeGrid[row][col]
  const left = treeGrid[row].slice(0, col)
  const right = treeGrid[row].slice(col + 1)
  const up = treeGrid.map(row => row[col]).filter((c, i) => i < row)
  const down = treeGrid.map(row => row[col]).filter((c, i) => i > row)

  const leftScore = (left.reverse().findIndex(t => t >= tree) + 1) || left.length
  const rightScore = (right.findIndex(t => t >= tree) + 1) || right.length
  const upScore = (up.reverse().findIndex(t => t >= tree) + 1) || up.length
  const downScore = (down.findIndex(t => t >= tree) + 1) || down.length

  return leftScore * rightScore * upScore * downScore
}

const BUTTONS: IButton[] = [
  {
    label: 'Count Trees',
    onClick: (inputKey: string) => {
      const treeGrid = INPUT[inputKey].split('\n').map(row => row.split('').map(x => Number(x)))
      let visibleTrees = 0
      for (let row = 0; row < treeGrid.length; row++) {
        for (let col = 0; col < treeGrid[row].length; col++) {
          if (isTreeVisible(row, col, treeGrid)) visibleTrees += 1
        }
      }

      return {
        answer1: visibleTrees.toString()
      }
    }
  },
  {
    label: 'Find the Best Tree',
    onClick: (inputKey: string) => {
      const treeGrid = INPUT[inputKey].split('\n').map(row => row.split('').map(x => Number(x)))
      let bestScenicScore = 0
      for (let row = 0; row < treeGrid.length; row++) {
        for (let col = 0; col < treeGrid[row].length; col++) {
          bestScenicScore = Math.max(bestScenicScore, getScenicScore(row, col, treeGrid))
        }
      }

      return {
        answer2: bestScenicScore.toString()
      }
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      There are{' '}
      <code>{answer}</code> visible trees.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      The best tree has a scenic score of{' '}
      <code>{answer}</code>.
    </span>
  ),
  buttons: BUTTONS,
  day: 8,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Treetop Tree House'
}

export default config
