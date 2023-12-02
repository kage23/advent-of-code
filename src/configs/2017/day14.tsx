import inputs from '../../inputs/2017/day14'
import { DayConfig } from '../../routes/Day'
import generateKnotHash from '../../utils/generateKnotHash'

export const countUsedSquares = (inputKey: string) => {
  let grid = ''
  for (let i = 0; i < 128; i++) {
    const hash = generateKnotHash(`${inputs.get(inputKey)!}-${i}`, 256)
    for (let j = 0; j < hash.length; j++) {
      grid += parseInt(hash[j], 16).toString(2).padStart(4, '0')
    }
  }

  return {
    answer1: grid.split('').filter((x) => x === '1').length,
  }
}

export const findRegions = (inputKey: string) => {
  const gridSize = 128
  let regionCount = 0
  const gridMap: Map<string, number> = new Map()
  for (let i = 0; i < gridSize; i++) {
    const hash = generateKnotHash(`${inputs.get(inputKey)!}-${i}`, 256)
    for (let j = 0; j < hash.length; j++) {
      const hex = parseInt(hash[j], 16).toString(2).padStart(4, '0')
      gridMap.set(`${i},${j * 4 + 0}`, parseInt(hex.charAt(0)))
      gridMap.set(`${i},${j * 4 + 1}`, parseInt(hex.charAt(1)))
      gridMap.set(`${i},${j * 4 + 2}`, parseInt(hex.charAt(2)))
      gridMap.set(`${i},${j * 4 + 3}`, parseInt(hex.charAt(3)))
    }
  }

  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      const gridName = `${i},${j}`
      const gridValue = gridMap.get(gridName)
      if (gridValue === 1) {
        regionCount++
        removeGroup(i, j, gridMap)
      }
    }
  }

  return {
    answer2: regionCount,
  }
}

const removeGroup = (
  x: number,
  y: number,
  gridMap: Map<string, number>
): void => {
  const gridValue = gridMap.get(`${x},${y}`)
  if (!gridValue) return
  gridMap.set(`${x},${y}`, 0)
  removeGroup(x - 1, y, gridMap)
  removeGroup(x + 1, y, gridMap)
  removeGroup(x, y - 1, gridMap)
  removeGroup(x, y + 1, gridMap)
}

const day14: Omit<DayConfig, 'year'> = {
  answer1Text: 'answer squares are used.',
  answer2Text: 'There are answer regions.',
  buttons: [
    {
      label: 'Count Used Squares',
      onClick: countUsedSquares,
    },
    {
      label: 'Find Regions',
      onClick: findRegions,
    },
  ],
  id: 14,
  inputs,
  title: 'Disk Defragmentation',
}

export default day14
