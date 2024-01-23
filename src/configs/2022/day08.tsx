import inputs from '../../inputs/2022/day08'
import { DayConfig } from '../../routes/Day'

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

export const countTrees = (input: string) => {
  const treeGrid = input.split('\n').map(row => row.split('').map(x => Number(x)))
  let visibleTrees = 0
  for (let row = 0; row < treeGrid.length; row++) {
    for (let col = 0; col < treeGrid[row].length; col++) {
      if (isTreeVisible(row, col, treeGrid)) visibleTrees += 1
    }
  }

  return {
    answer1: visibleTrees
  }
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

export const findTheBestTree = (input: string) => {
  const treeGrid = input.split('\n').map(row => row.split('').map(x => Number(x)))
  let bestScenicScore = 0
  for (let row = 0; row < treeGrid.length; row++) {
    for (let col = 0; col < treeGrid[row].length; col++) {
      bestScenicScore = Math.max(bestScenicScore, getScenicScore(row, col, treeGrid))
    }
  }

  return {
    answer2: bestScenicScore
  }
}

const day08: Omit<DayConfig, 'year'> = {
  answer1Text: 'There are answer visible trees.',
  answer2Text: 'The best tree has a scenic score of answer.',
  buttons: [
    {
      label: 'Count Trees',
      onClick: countTrees
    },
    {
      label: 'Find the Best Tree',
      onClick: findTheBestTree
    },
  ],
  id: 8,
  inputs,
  title: 'Treetop Tree House',
}

export default day08
