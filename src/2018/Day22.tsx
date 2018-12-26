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
  depth: number
  max: ICoord
  squares: {
    [key:string]: IMapSquare
  }
  target: ICoord
}

interface IMapSquare extends ICoord {
  erosion: number
  geologic: number
  type: '.' | '=' | '|'
}

let map: IMap = {
  depth: 0,
  max: { x: 0, y: 0 },
  squares: {},
  target: { x: 0, y: 0 }
}
let prevInputKey = ''

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

const getMapSquare = (map: IMap, coord: ICoord): IMapSquare => {
  const {
    depth,
    target
  } = map
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
  else {
    let leftSquare: IMapSquare = map.squares[pathKey({ x: x - 1, y })]
    let upSquare: IMapSquare = map.squares[pathKey({ x, y: y - 1 })]

    if (leftSquare === undefined)
      leftSquare = updateMap(getMapSquare(map, { x: x - 1, y }), map).squares[pathKey({ x: x - 1, y })]

    if (upSquare === undefined)
      upSquare = updateMap(getMapSquare(map, { x: x, y: y - 1 }), map).squares[pathKey({ x: x, y: y - 1 })]

      geologic = leftSquare.erosion * upSquare.erosion
  }

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

const generateMap = (input: IInput): IMap => {
  const { depth, target } = input
  const map: IMap = {
    depth,
    max: {
      x: target.x,
      y: target.y
    },
    squares: {},
    target
  }

  for (let yi = 0; yi <= target.y; yi++)
    for (let xi = 0; xi <= target.x; xi++)
      updateMap(getMapSquare(map, { x: xi, y: yi }), map)

  return map
}

const updateMap = (square: IMapSquare, map: IMap): IMap => {
  map.squares[pathKey({ x: square.x, y: square.y })] = square
  if (square.x > map.max.x) map.max.x = square.x
  if (square.y > map.max.y) map.max.y = square.y

  return map
}

const assessRisk = (inputKey: string): { answer1: string } => {
  const input: IInput = parseInput(INPUT[inputKey])
  const { target } = input
  let riskLevel = 0

  for (let yi = 0; yi <= target.y; yi++) {
    for (let xi = 0; xi <= target.x; xi++) {
      const mapSquare = map.squares[pathKey({ x: xi, y: yi })]
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

export const renderDay = (dayConfig: IDayConfig, inputKey: string): JSX.Element => {
  if (inputKey !== prevInputKey) {
    map = generateMap(parseInput(dayConfig.INPUT[inputKey]))
    prevInputKey = inputKey
  }

  const mapRows: JSX.Element[] = []

  for (let y = 0; y <= map.max.y; y++) {
    const row: JSX.Element[] = []
    for (let x = 0; x <= map.max.x; x++) {
      if (typeof map.squares[pathKey({ x, y })] === 'undefined') debugger
      const rowContents = map.squares[pathKey({ x, y })].type
      row.push(
        x === 0 && y === 0
          ? <span key={`${x}${y}`}>S</span>
          : x === map.target.x && y === map.target.y
            ? <span key={`${x}${y}`}>T</span>
            : rowContents
              ? <span key={`${x}${y}`}>{rowContents}</span>
              : <span key={`${x}${y}`}>&nbsp;</span>
      )
    }
    mapRows.push(<div key={y}>{row}</div>)
  }

  return (
    <div className="render-box">
      <div>
        <h3>Input:</h3>
        <pre>{dayConfig.INPUT[inputKey]}</pre>
      </div>
      <div className="render-box--left-margin">
        <h3>Map:</h3>
        <fieldset>
          {mapRows}
        </fieldset>
      </div>
    </div>
  )
}

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