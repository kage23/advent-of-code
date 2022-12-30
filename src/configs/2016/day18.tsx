import inputs from '../../inputs/2016/day18'
import { DayConfig } from '../../routes/Day'

const getNextRow = (row: string): string => {
  let newRow = ''
  for (let i = 0; i < row.length; i++) {
    const lcr = [
      i === 0 ? '.' : row.charAt(i - 1),
      row.charAt(i),
      i === row.length - 1 ? '.' : row.charAt(i + 1),
    ]
    if (
      (lcr[0] === '^' && lcr[1] === '^' && lcr[2] === '.') ||
      (lcr[0] === '.' && lcr[1] === '^' && lcr[2] === '^') ||
      (lcr[0] === '^' && lcr[1] === '.' && lcr[2] === '.') ||
      (lcr[0] === '.' && lcr[1] === '.' && lcr[2] === '^')
    ) {
      newRow += '^'
    } else {
      newRow += '.'
    }
  }
  return newRow
}

export const countSafeTiles = (inputKey: string) => {
  const field: string[] = [inputs.get(inputKey)!]
  const fieldLength = inputKey.startsWith('DEMO')
    ? field[0].length === 5
      ? 3
      : 10
    : 40

  while (field.length < fieldLength) {
    const lastRow = field[field.length - 1]
    field.push(getNextRow(lastRow))
  }

  const safeCount = field.reduce(
    (count, row) => count + row.split('').filter((x) => x === '.').length,
    0
  )

  return {
    answer1: safeCount,
  }
}

export const countSafeTilesInHugeField = (inputKey: string) => {
  const field: string[] = [inputs.get(inputKey)!]
  const fieldLength = 400000

  while (field.length < fieldLength) {
    const lastRow = field[field.length - 1]
    field.push(getNextRow(lastRow))
  }

  const safeCount = field.reduce(
    (count, row) => count + row.split('').filter((x) => x === '.').length,
    0
  )

  return {
    answer2: safeCount,
  }
}

const day18: Omit<DayConfig, 'year'> = {
  answer1Text: 'There are answer safe tiles in the field.',
  answer2Text: 'There are answer safe tiles in the huge field.',
  buttons: [
    {
      label: 'Count Safe Tiles in Field',
      onClick: countSafeTiles,
    },
    {
      label: 'Count Safe Tiles in Huge Field',
      onClick: countSafeTilesInHugeField,
    },
  ],
  id: 18,
  inputs,
  title: 'Like a Rogue',
}

export default day18
