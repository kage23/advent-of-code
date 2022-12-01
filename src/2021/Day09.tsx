import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'

import INPUT from '../Inputs/2021/Day09'

// Returns [rowIndex, colIndex][] list of low points
const identifyTheLowPoints = (rows: string[]): [number, number][] => {
  const result: [number, number][] = []

  rows.forEach((row, rowIndex) => {
    for (let i = 0; i < row.length; i++) {
      const currentValue = Number(row.charAt(i))
      // Check for low point
      if (
        (rowIndex === 0 || currentValue < Number(rows[rowIndex - 1].charAt(i))) && // top
        (i === 0 || currentValue < Number(row.charAt(i - 1))) && // left
        (i === row.length - 1 || currentValue < Number(row.charAt(i + 1))) && // right
        (rowIndex === rows.length - 1 || currentValue < Number(rows[rowIndex + 1].charAt(i))) // bottom
      ) {
        result.push([rowIndex, i])
      }
    }
  })

  return result
}

// Returns [rowIndex, colIndex, value][] of adjacents
const getAdjacents = (
  rows: string[],
  rowIndex: number,
  colIndex: number
): [number, number, number][] => {
  const result: [number, number, number][] = []

  // Up
  if (rowIndex !== 0) {
    result.push([rowIndex - 1, colIndex, Number(rows[rowIndex - 1].charAt(colIndex))])
  }
  // Left
  if (colIndex !== 0) {
    result.push([rowIndex, colIndex - 1, Number(rows[rowIndex].charAt(colIndex - 1))])
  }
  // Right
  if (colIndex !== rows[0].length - 1) {
    result.push([rowIndex, colIndex + 1, Number(rows[rowIndex].charAt(colIndex + 1))])
  }
  // Down
  if (rowIndex !== rows.length - 1) {
    result.push([rowIndex + 1, colIndex, Number(rows[rowIndex + 1].charAt(colIndex))])
  }

  return result
}

const getBasinSize = (
  rows: string[],
  lowPointRowIndex: number,
  lowPointColIndex: number
): number => {
  const checkList: string[] = [`${lowPointRowIndex},${lowPointColIndex}`]
  // We need to make a list of points to check the adjacent points of, starting with the given low point.
  // For each point in the list, check the adjacents. If they're not '9', add them to the bottom of the list.
  // Then the size of the list is the count.

  for (let i = 0; i < checkList.length; i++) {
    const [rowIndex, colIndex] = checkList[i].split(',').map(n => Number(n))
    const adjacents = getAdjacents(rows, rowIndex, colIndex)
    adjacents.forEach(([rowI, colI, value]) => {
      const key = `${rowI},${colI}`
      if (value !== 9 && !checkList.includes(key)) {
        checkList.push(key)
      }
    })
  }

  return checkList.length
}

const BUTTONS: IButton[] = [
  {
    label: 'Identify the Low Points',
    onClick: (inputKey: string) => {
      const rows = INPUT[inputKey].split('\n')
      const lowPoints = identifyTheLowPoints(rows)

      const sum = lowPoints.reduce(
        (accSum, lowPoint) => accSum + Number(
          rows[lowPoint[0]].charAt(lowPoint[1])
        ) + 1,
        0)

      return {
        answer1: sum.toString()
      }
    }
  },
  {
    label: 'Identify the Basins',
    onClick: (inputKey: string) => {
      const rows = INPUT[inputKey].split('\n')
      debugger
      const topThreeBasins = identifyTheLowPoints(rows)
        .map(([rowIndex, colIndex]) => {
          const id = `${rowIndex},${colIndex}`
          const size = getBasinSize(rows, rowIndex, colIndex)
          return { id, size }
        })
        .sort((a, b) => b.size - a.size)
        .slice(0, 3)

      return {
        answer2: topThreeBasins.reduce((product, { size }) => product * size, 1).toString()
      }
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The total risk level for all low points is <code>{answer}</code>.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      The size index of the three largest basins is <code>{answer}</code>.
    </span>
  ),
  buttons: BUTTONS,
  day: 9,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Smoke Basin'
}

export default config
