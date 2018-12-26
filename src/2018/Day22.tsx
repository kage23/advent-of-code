import React from 'react'
import {
  IButton,
  IDayConfig
} from '../Config'

import INPUT from './Input/Day22'

const TYPE_ARRAY: Array<'.' | '=' | '|'> = ['.', '=', '|']

export interface ICoord {
  x: number
  y: number
}

export interface IInput {
  depth: number
  target: ICoord
}

interface IMap {
  [key:string]: IMapSquare
}

interface IMapSquare extends ICoord {
  erosion: number
  geologic: number
  type: '.' | '=' | '|'
}

const parseInput = (input: string): IInput => {
  const [
    depthRaw,
    targetRaw
  ] = input.split('\n')

  return {
    depth: parseInt(depthRaw.split(': ')[1]),
    target: {
      x: parseInt(targetRaw.split(': ')[1]),
      y: parseInt(targetRaw.split(': ')[1].split(',')[1])
    }
  }
}

const pathKey = ({ x, y }: ICoord): string => `${x},${y}`

const getMapSquare = (map: IMap, coord: ICoord, depth: number, target: ICoord): IMapSquare => {
  const { x, y } = coord
  let geologic = 0
  let erosion = 0

  // The region at 0,0 (the mouth of the cave) has a geologic index of 0.
  if (x === 0 && y === 0) geologic = 0
  // The region at the coordinates of the target has a geologic index of 0.
  else if (x === target.x && y === target.y) geologic = 0
  // If the region's Y coordinate is 0, the geologic index is its X coordinate times 16807.
  else if (y === 0) geologic = x * 16807
  // If the region's X coordinate is 0, the geologic index is its Y coordinate times 48271.
  else if (x === 0) geologic = y * 48271
  // Otherwise, the region's geologic index is the result of multiplying the erosion levels of the regions at X-1,Y and X,Y-1.
  else geologic = map[pathKey({ x: x - 1, y })].erosion * map[pathKey({ x, y: y - 1 })].erosion

  // A region's erosion level is its geologic index plus the cave system's depth, all modulo 20183.
  erosion = (geologic + depth) % 20183

  // If the erosion level modulo 3 is 0, the region's type is rocky.
  // If the erosion level modulo 3 is 1, the region's type is wet.
  // If the erosion level modulo 3 is 2, the region's type is narrow.
  const type= TYPE_ARRAY[erosion % 3]

  return {
    x,
    y,
    geologic,
    erosion,
    type
  }
}

const updateMap = (square: IMapSquare, map: IMap): IMap => {
  map[pathKey({ x: square.x, y: square.y })] = square

  return map
}

const assessRisk = (inputKey: string): { answer1: string } => {
  const input: IInput = parseInput(INPUT[inputKey])
  const { depth, target } = input
  const map: IMap = {}
  let riskLevel = 0

  for (let yi = 0; yi <= target.y; yi++) {
    for (let xi = 0; xi <= target.x; xi++) {
      const mapSquare = getMapSquare(map, { x: xi, y: yi }, depth, target)
      updateMap(mapSquare, map)
      riskLevel += TYPE_ARRAY.indexOf(mapSquare.type)
    }
  }

  return {
    answer1: riskLevel.toString()
  }
}

const BUTTONS: IButton[] = [
  {
    label: 'Assess Risk',
    onClick: assessRisk
  }
]

export const renderDay = (dayConfig: IDayConfig, inputKey: string): JSX.Element => (
  <div className="render-box">
    <h3>Input:</h3>
    <pre>{dayConfig.INPUT[inputKey]}</pre>
  </div>
)

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The risk level for the search area is{' '}
      <code>{answer}</code>.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      The solution is{' '}
      <code>{answer}</code>.
    </span>
  ),
  buttons: BUTTONS,
  day: 22,
  INPUT,
  renderDay,
  title: 'Mode Maze'
}

export default config