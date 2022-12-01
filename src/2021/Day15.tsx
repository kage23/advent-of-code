import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'
import AStar from '../utils/AStar'
import { manhattanDistance } from '../utils/Various'

import INPUT from '../Inputs/2021/Day15'

const parseInput = (input: string): Map<string, number> => {
  const map: Map<string, number> = new Map()
  const rows = input.split('\n')
  for (let y = 0; y < rows.length; y++) {
    for (let x = 0; x < rows[y].length; x++) {
      map.set(`${x},${y}`, Number(rows[y].charAt(x)))
    }
  }
  map.set('size', rows.length)
  return map
}

const getTheBigMap = (input: string): Map<string, number> => {
  const smallMap = parseInput(input)
  const smallMapSize = smallMap.get('size') as number
  const bigMapSize = smallMapSize * 5
  const bigMap: Map<string, number> = new Map([['size', bigMapSize]])

  for (let y = 0; y < bigMapSize; y++) {
    for (let x = 0; x < bigMapSize; x++) {
      const highestRisk = 9
      const mapXOffset = Math.floor(x / smallMapSize)
      const mapYOffset = Math.floor(y / smallMapSize)
      const smallMapX = x % smallMapSize
      const smallMapY = y % smallMapSize
      let value = ((smallMap.get(`${smallMapX},${smallMapY}`) as number) + mapXOffset + mapYOffset) % highestRisk
      if (value === 0) value = highestRisk
      bigMap.set(`${x},${y}`, value)
    }
  }

  return bigMap
}

// h is the heuristic function. h(n) estimates the cost to reach goal from node n.
const h = (startKey: string, endKey: string): number =>
  manhattanDistance(
    startKey.split(',').map(n => Number(n)),
    endKey.split(',').map(n => Number(n))
  )

const getNeighbors = (current: string, map: Map<string, number>): string[] => {
  const [x, y] = current.split(',').map(n => Number(n))
  return [
    [x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]
  ]
    .filter(([nx, ny]) => {
      const key = `${nx},${ny}`
      return map.get(key) !== undefined
    })
    .map(([nx, ny]) => `${nx},${ny}`)
}

const BUTTONS: IButton[] = [
  {
    label: 'Find Lowest-Risk Path',
    onClick: (inputKey: string) => {
      const map = parseInput(INPUT[inputKey])
      const startKey = '0,0'
      const size = map.get('size')
      if (size === undefined) throw new Error('something fucked up')
      const endKey = `${size - 1},${size - 1}`
      const dFn = (n: string) => map.get(n) as number
      const getNeighborsFn = (n: string) => getNeighbors(n, map)
      const startTime = new Date().getTime()
      const pathRiskLevel = AStar(
        startKey,
        endKey,
        dFn,
        h,
        getNeighborsFn
      )
      console.log(`Total run time: ${(new Date().getTime() - startTime) / 1000} seconds.`)
      return {
        answer1: pathRiskLevel.toString()
      }
    }
  },
  {
    label: 'Find Lowest-Risk Path Through the Big Map',
    onClick: (inputKey: string) => {
      const map = getTheBigMap(INPUT[inputKey])
      const startKey = '0,0'
      const size = map.get('size')
      if (size === undefined) throw new Error('something fucked up')
      const endKey = `${size - 1},${size - 1}`

      const dFn = (n: string) => map.get(n) as number
      const getNeighborsFn = (n: string) => getNeighbors(n, map)

      const startTime = new Date().getTime()
      const pathRiskLevel = AStar(
        startKey,
        endKey,
        dFn,
        h,
        getNeighborsFn
      )
      console.log(`Total run time: ${(new Date().getTime() - startTime) / 1000} seconds.`)

      return {
        answer2: pathRiskLevel.toString()
      }
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The least-risky path has a risk level of <code>{answer}</code>.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      The least-risky path through the big map has a risk level of <code>{answer}</code>.
    </span>
  ),
  buttons: BUTTONS,
  day: 15,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Chiton'
}

export default config
