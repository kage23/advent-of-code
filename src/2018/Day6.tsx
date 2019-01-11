import React from 'react'
import {
  IButton,
  IDayConfig
 } from '../Config'

import INPUT, { DISTANCE } from './Input/Day6'

interface ICoordMap {
  coords: number[][]
  display: string[]
  inputKey: string
  max: number[]
  min: number[]
}

let map: undefined | ICoordMap = undefined

let answer1_a = ''

const manhattanDistance = (a: number[], b: number[]): number => {
  if (a.length !== b.length) throw new Error('The coords must be in the same dimensions!')
  return a.reduce((distance, currentCoord, currentIndex) => (
    distance + Math.abs(currentCoord - b[currentIndex])
  ), 0)
}

const parseInput = (inputKey: string): ICoordMap => {
  const coords = []
  const max = [0, 0]
  const min = [Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER]
  const coordStrs = INPUT[inputKey].split('\n')
  for (const coordStr of coordStrs) {
    const coord = [ parseInt(coordStr.split(', ')[0]), parseInt(coordStr.split(', ')[1]) ]
    coords.push(coord)
    max[0] = Math.max(max[0], coord[0])
    max[1] = Math.max(max[1], coord[1])
    min[0] = Math.min(min[0], coord[0])
    min[1] = Math.min(min[1], coord[1])
  }
  let display = new Array(max[1] + 1).fill((() => '')())
  display = display.map(() => {
    let row = ''
    for (let x = 0; x <= max[0] + 1; x++) row += '.'
    return row
  })
  const map = { coords, max, min, display, inputKey }
  markCoordsOnMapDisplay(map)
  return map
}

const markCoordsOnMapDisplay = (map: ICoordMap) => {
  const { coords, display } = map
  for (let i = 0; i < coords.length; i++) {
    const coord = coords[i]
    display[coord[1]] = `${display[coord[1]].slice(0, coord[0])}${
      coords.length <= 26
        ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.slice(i, i + 1)
        : 'X'
    }${display[coord[1]].slice(coord[0] + 1)}`
  }
}

const findArea1 = (inMap: ICoordMap): { answer1: string } => {
  const { coords, max, min } = inMap
  const coordSizeMap: Map<number[], number> = new Map()
  const nearestCoordsMap: Map<number[], number[][]> = new Map()
  for (let x = min[0]; x <= max[0]; x++) {
    for (let y = min[1]; y <= max[1]; y++) {
      const testPoint = [x, y]
      let nearestCoords: number[][] = []
      let nearestDistance = Number.MAX_SAFE_INTEGER
      for (const coord of coords) {
        const currentDistance = manhattanDistance(testPoint, coord)
        if (currentDistance < nearestDistance) {
          nearestCoords = [coord]
          nearestDistance = currentDistance
        } else if (currentDistance === nearestDistance) nearestCoords.push(coord)
      }
      if (nearestCoords.length === 1) {
        const nearestCoord = nearestCoords[0]
        if (x === min[0] || x === max[0] || y === min[1] || y === max[1]) {
          coordSizeMap.set(nearestCoord, Infinity)
        } else {
          let coordSize = (coordSizeMap.get(nearestCoord) || 0) + 1
          coordSizeMap.set(nearestCoord, coordSize)
        }
      }
      nearestCoordsMap.set(testPoint, nearestCoords)
    }
  }
  let largestArea = 0
  let bestCoord = [0, 0]
  for (const [coord, size] of coordSizeMap) {
    if (size !== Infinity && size > largestArea) {
      largestArea = size
      bestCoord = coord
    }
  }
  for (const [coord, nearestCoords] of nearestCoordsMap) {
    if (nearestCoords.length === 1 && nearestCoords[0] === bestCoord)
      inMap.display[coord[1]] = `${inMap.display[coord[1]].slice(0, coord[0])}x${inMap.display[coord[1]].slice(coord[0] + 1)}`
  }
  markCoordsOnMapDisplay(inMap)
  map = inMap
  answer1_a = JSON.stringify(bestCoord)
  return { answer1: largestArea.toString() }
}

const findArea2 = (inMap: ICoordMap, targetDistance: number)
: { answer2: string } => {
  const { coords, max, min } = inMap
  let size = 0
  for (let x = min[0]; x <= max[0]; x++) {
    for (let y = min[1]; y <= max[1]; y++) {
      let totalDistance = 0
      for (const coord of coords) {
        totalDistance += manhattanDistance(coord, [x,y])
        if (totalDistance >= targetDistance) break
      }
      if (totalDistance < targetDistance) {
        size++
        inMap.display[y] = `${inMap.display[y].slice(0, x)}x${inMap.display[y].slice(x + 1)}`
      }
    }
  }
  markCoordsOnMapDisplay(inMap)
  map = inMap

  return { answer2: size.toString() }
}

export const renderDay = (dayConfig: IDayConfig, inputKey: string): JSX.Element => {
  map = map === undefined || map.inputKey !== inputKey
    ? parseInput(inputKey)
    : map

  return (
    <div className="render-box render-box--no-wrap">
      <pre>
        <p>Input:</p>
        <p>{dayConfig.INPUT[inputKey]}</p>
      </pre>
      <div>
        <p>
          Min: {JSON.stringify(map.min)}
          {' '}
          Max: {JSON.stringify(map.max)}
        </p>
        <fieldset>
          {map.display.map((line, i) => <div key={i}>{line}</div>)}
        </fieldset>
      </div>
    </div>
  )
}

const BUTTONS: IButton[] = [
  {
    label: 'Find Largest Non-Infinite Area',
    onClick: (inputKey: string) => findArea1(parseInput(inputKey))
  },
  {
    label: 'Find Area Close to Most',
    onClick: (inputKey: string) => findArea2(parseInput(inputKey), DISTANCE[inputKey])
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The size of the largest non-infinite area{' '}
      (belonging to coord <code>{answer1_a}</code>) is <code>{answer}</code>.
    </span>
  ),
  answer2Text: (answer, inputKey) => (
    <span>
      <code>{answer}</code> locations are under{' '}
      <code>{DISTANCE[inputKey || '']}</code> total distance from all coordinates.
    </span>
  ),
  buttons: BUTTONS,
  day: 6,
  INPUT,
  renderDay,
  title: 'Chronal Coordinates'
}

export default config