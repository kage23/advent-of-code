import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'

import INPUT from '../Inputs/2017/Day14'

import { generateKnotHash } from '../utils/Various'

const BUTTONS: IButton[] = [
  {
    label: 'Count Used Squares',
    onClick: (inputKey) => {
      let grid = ''
      for (let i = 0; i < 128; i++) {
        const hash = generateKnotHash(`${INPUT[inputKey]}-${i}`, 256)
        for (let j = 0; j < hash.length; j++) {
          grid += parseInt(hash[j], 16).toString(2).padStart(4, '0')
        }
      }

      return {
        answer1: grid.split('').filter(x => x === '1').length.toString()
      }
    }
  },
  {
    label: 'Find Regions',
    onClick: (inputKey) => {
      const gridSize = 128
      let regionCount = 0
      const gridMap: Map<string, number> = new Map()
      for (let i = 0; i < gridSize; i++) {
        const hash = generateKnotHash(`${INPUT[inputKey]}-${i}`, 256)
        for (let j = 0; j < hash.length; j++) {
          const hex = parseInt(hash[j], 16).toString(2).padStart(4, '0')
          gridMap.set(`${i},${(j * 4) + 0}`, parseInt(hex.charAt(0)))
          gridMap.set(`${i},${(j * 4) + 1}`, parseInt(hex.charAt(1)))
          gridMap.set(`${i},${(j * 4) + 2}`, parseInt(hex.charAt(2)))
          gridMap.set(`${i},${(j * 4) + 3}`, parseInt(hex.charAt(3)))
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
        answer2: regionCount.toString()
      }
    }
  }
]

const removeGroup = (x: number, y: number, gridMap: Map<string, number>): void => {
  const gridValue = gridMap.get(`${x},${y}`)
  if (!gridValue) return
  gridMap.set(`${x},${y}`, 0)
  removeGroup(x - 1, y, gridMap)
  removeGroup(x + 1, y, gridMap)
  removeGroup(x, y - 1, gridMap)
  removeGroup(x, y + 1, gridMap)
}

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      <code>{answer}</code> squares are used.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      There are <code>{answer}</code> regions.
    </span>
  ),
  buttons: BUTTONS,
  day: 14,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Disk Defragmentation'
}

export default config