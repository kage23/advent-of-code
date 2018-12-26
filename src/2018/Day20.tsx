import React from 'react'
import {
  IButton,
  IDayConfig
} from '../Config'

import INPUT from './Input/Day20'

interface ICoord {
  x: number
  y: number
}

interface IMapSquare extends ICoord {
  path?: string
}

interface IMap {
  min: ICoord
  max: ICoord
  [key:string]: IMapSquare
}

const pathKey = (coord: ICoord): string => `${coord.x},${coord.y}`

const createMap = (input: string, inMap?: IMap)
: {
  map: IMap
  remaining: string
} => {
  let map: IMap = inMap || {
    min: { x: 0, y: 0 },
    max: { x: 0, y: 0 }
  }

  let position: ICoord = { x: 0, y: 0 }
  let char = input.charAt(0)
  let remaining = input.slice(1)
  let currentPath = ''

  charLoop:
  while (char) {
    switch (char) {
      case '^':
        break

      case 'N':
        currentPath += char
        position = { x: position.x, y: position.y - 1 }
        break

      case 'E':
        currentPath += char
        position = { x: position.x + 1, y: position.y }
        break

      case 'W':
        currentPath += char
        position = { x: position.x - 1, y: position.y }
        break

        case 'S':
        currentPath += char
        position = { x: position.x, y: position.y + 1 }
        break

      case '(':
        const split = calulateSplit(remaining, map, position, currentPath)
        map = split.map
        remaining = split.remaining
        break

      case '$':
      default:
        break charLoop
    }

    updateMap(position, currentPath, map)

    char = remaining.charAt(0)
    remaining = remaining.slice(1)
  }

  return {
    map,
    remaining
  }
}

const calulateSplit = (input: string, map: IMap, inPosition: ICoord, inPath: string)
: {
  map: IMap
  remaining: string
} => {
  let paths: string[] = [inPath]
  let pathIndex = 0
  let position = inPosition
  let char = input.charAt(0)
  let remaining = input.slice(1)

  charLoop:
  while (char) {
    if (char !== ')') {
      if (!paths[pathIndex]) paths[pathIndex] = inPath
    }
    switch (char) {
      case 'N':
        position = { x: position.x, y: position.y - 1 }
        paths[pathIndex] += char
        updateMap(position, paths[pathIndex], map)
        break

      case 'E':
        position = { x: position.x + 1, y: position.y }
        paths[pathIndex] += char
        updateMap(position, paths[pathIndex], map)
        break

      case 'W':
        position = { x: position.x - 1, y: position.y }
        paths[pathIndex] += char
        updateMap(position, paths[pathIndex], map)
        break

      case 'S':
        position = { x: position.x, y: position.y + 1 }
        paths[pathIndex] += char
        updateMap(position, paths[pathIndex], map)
        break

      case '|':
        pathIndex++
        position = inPosition
        break

      case '(':
        const split = calulateSplit(remaining, map, position, paths[pathIndex])
        map = split.map
        remaining = split.remaining
        break

      default:
        break charLoop
    }
    char = remaining.charAt(0)
    remaining = remaining.slice(1)
  }

  return {
    map,
    remaining
  }
}

const updateMap = (position: ICoord, path: string, map: IMap): IMap => {
  if (!map[pathKey(position)]) {
    map[pathKey(position)] = {
      ...position,
      path
    }
    if (position.x < map.min.x) map.min.x = position.x
    if (position.y < map.min.y) map.min.y = position.y
    if (position.x > map.max.x) map.max.x = position.x
    if (position.y > map.max.y) map.max.y = position.y
  }

  return map
}

const BUTTONS: IButton[] = [
  {
    label: 'Find Farthest Room',
    onClick: (inputKey: string) => {
      const input = INPUT[inputKey]

      let farthestDistance = 0
      const { map } = createMap(input)
      const { min, max } = map

      for (let xi = min.x; xi <= max.x; xi++)
        for (let yi = min.y; yi <= max.y; yi++) {
          const room = map[pathKey({ x: xi, y: yi })]
          if (room && room.path && room.path.length > farthestDistance) farthestDistance = room.path.length
        }

      return {
        answer1: farthestDistance.toString()
      }
    }
  }
]

const renderDay = (dayConfig: IDayConfig, inputKey: string): JSX.Element => (
  <div className="render-box">
    <div
      style={{
        maxWidth: '25%'
      }}
    >
      <h3>Input:</h3>
      <pre className="render-box--pre-wrap">{dayConfig.INPUT[inputKey]}</pre>
    </div>
  </div>
)

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The farthest room is{' '}
      <code>{answer}</code> doors away.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      The solution is{' '}
      <code>{answer}</code>.
    </span>
  ),
  buttons: BUTTONS,
  day: 20,
  INPUT,
  renderDay,
  title: 'A Regular Map'
}

export default config