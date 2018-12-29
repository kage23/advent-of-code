import React from 'react'
import {
  IButton,
  IDayConfig
 } from '../Config'

import INPUT from './Input/Day6'

interface ICoordMap {
  coords: number[][]
  display: string[]
  max: number[]
  min: number[]
}

let map: ICoordMap = {
  coords: [],
  display: [],
  max: [0, 0],
  min: [0, 0]
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
  const map = { coords, max, min, display }
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

export const renderDay = (dayConfig: IDayConfig, inputKey: string): JSX.Element => {
  map = parseInput(inputKey)

  return (
    <div>
      <div className="render-box">
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
    </div>
  )
}

const BUTTONS: IButton[] = []

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The solution is <code>{answer}</code>.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      The solution is <code>{answer}</code>.
    </span>
  ),
  buttons: BUTTONS,
  day: 6,
  INPUT,
  renderDay,
  title: 'Chronal Coordinates'
}

export default config