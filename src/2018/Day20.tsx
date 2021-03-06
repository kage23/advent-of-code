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
  doors?: string
}

interface IMap {
  min: ICoord
  max: ICoord
  [key:string]: IMapSquare
}

let map: IMap = {
  min: { x: 0, y: 0 },
  max: { x: 0, y: 0 },
  '0,0': { x: 0, y: 0 }
}
let prevInputKey = ''

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
        addDoor(position, char, map)
        position = { x: position.x, y: position.y - 1 }
        break

      case 'E':
        currentPath += char
        addDoor(position, char, map)
        position = { x: position.x + 1, y: position.y }
        break

      case 'W':
        currentPath += char
        addDoor(position, char, map)
        position = { x: position.x - 1, y: position.y }
        break

        case 'S':
        currentPath += char
        addDoor(position, char, map)
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
        addDoor(position, char, map)
        position = { x: position.x, y: position.y - 1 }
        paths[pathIndex] += char
        updateMap(position, paths[pathIndex], map)
        break

      case 'E':
        addDoor(position, char, map)
        position = { x: position.x + 1, y: position.y }
        paths[pathIndex] += char
        updateMap(position, paths[pathIndex], map)
        break

      case 'W':
        addDoor(position, char, map)
        position = { x: position.x - 1, y: position.y }
        paths[pathIndex] += char
        updateMap(position, paths[pathIndex], map)
        break

      case 'S':
        addDoor(position, char, map)
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

const addDoor = (position: ICoord, door: string, map: IMap): IMap => {
  const mapSquare = map[pathKey(position)]
  if (mapSquare.doors !== undefined && mapSquare.doors.indexOf(door) === -1) mapSquare.doors += door
  const otherRoomPosition = door === 'N'
    ? { x: position.x, y: position.y - 1 }
    : door === 'W'
      ? { x: position.x - 1, y: position.y }
      : door === 'E'
        ? { x: position.x + 1, y: position.y }
        : { x: position.x, y: position.y + 1 }
  if (!map[pathKey(otherRoomPosition)]) {
    map[pathKey(otherRoomPosition)] = {
      x: otherRoomPosition.x,
      y: otherRoomPosition.y,
      doors: ''
    }
  }
  const otherMapSquare = map[pathKey(otherRoomPosition)]
  otherMapSquare.doors += door === 'W' ? 'E'
    : door === 'E' ? 'W'
    : door === 'N' ? 'S'
    : door === 'S' ? 'N'
    : ''
  return map
}

const updateMap = (position: ICoord, path: string, map: IMap): IMap => {
  let mapSquare = map[pathKey(position)]
  if (!mapSquare) {
    map[pathKey(position)] = {
      ...position,
      doors: '',
      path
    }
    mapSquare = map[pathKey(position)]
  }
  if (mapSquare.path === undefined) mapSquare.path = path
  if (position.x < map.min.x) map.min.x = position.x
  if (position.y < map.min.y) map.min.y = position.y
  if (position.x > map.max.x) map.max.x = position.x
  if (position.y > map.max.y) map.max.y = position.y

  return map
}

const BUTTONS: IButton[] = [
  {
    label: 'Find Farthest Room',
    onClick: () => {
      let farthestDistance = 0
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
  },
  {
    label: 'Count Far Rooms',
    onClick: () => {
      let farRooms = 0
      const { min, max } = map

      for (let xi = min.x; xi <= max.x; xi++)
        for (let yi = min.y; yi <= max.y; yi++) {
          const room = map[pathKey({ x: xi, y: yi })]
          if (room && room.path && room.path.length >= 1000) farRooms++
        }

      return {
        answer2: farRooms.toString()
      }
    }
  }
]

const renderDay = (dayConfig: IDayConfig, inputKey: string): JSX.Element => {
  if (prevInputKey !== inputKey) {
    map = createMap(dayConfig.INPUT[inputKey]).map
    prevInputKey = inputKey
  }

  const {
    min,
    max
  } = map
  const mapDisplay: JSX.Element[] = []
  for (let yi = min.y; yi <= max.y; yi++) {
    let aboveRow = ''
    let currentRow = ''
    for (let xi = min.x; xi <= max.x; xi++) {
      const mapSquare = map[pathKey({ x: xi, y: yi })]
      aboveRow += '#'
      aboveRow += mapSquare.doors && mapSquare.doors.indexOf('N') !== -1
        ? '-'
        : '#'
      currentRow += mapSquare.doors && mapSquare.doors.indexOf('W') !== -1
        ? '|'
        : '#'
      currentRow += (xi === 0 && yi === 0)
        ? 'X'
        : '.'
    }
    aboveRow += '#'
    currentRow += '#'
    mapDisplay.push((
      <div key={`${yi}a`}>{aboveRow}</div>
    ))
    mapDisplay.push((
      <div key={`${yi}b`}>{currentRow}</div>
    ))
  }
  let currentRow = ''
  for (let i = 0; i < ((max.x - min.x + 1) * 2) + 1; i++) currentRow += '#'
  mapDisplay.push((
    <div key={`final`}>{currentRow}</div>
  ))

  return (
    <div className="render-box render-box--no-wrap">
      <div style={{ maxWidth: '25%' }}>
        <h3>Input:</h3>
        <pre className="render-box--pre-wrap">{dayConfig.INPUT[inputKey]}</pre>
      </div>
      <div style={{ marginLeft: '24px' }}>
        <fieldset>
          {mapDisplay}
        </fieldset>
      </div>
    </div>
  )
}

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The farthest room is{' '}
      <code>{answer}</code> doors away.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      <code>{answer}</code> rooms have a path that requires passing through at least 1000 doors.
    </span>
  ),
  buttons: BUTTONS,
  day: 20,
  INPUT,
  renderDay,
  title: 'A Regular Map'
}

export default config