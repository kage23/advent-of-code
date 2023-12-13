import inputs from '../../inputs/2018/day20'
import { DayConfig } from '../../routes/Day'

interface Coord {
  x: number
  y: number
}

interface MapSquare extends Coord {
  path?: string
  doors?: string
}

interface Map {
  min: Coord
  max: Coord
  [key: string]: MapSquare
}

let map: Map = {
  min: { x: 0, y: 0 },
  max: { x: 0, y: 0 },
  '0,0': { x: 0, y: 0 }
}

const pathKey = (coord: Coord): string => `${coord.x},${coord.y}`

const addDoor = (position: Coord, door: string, map: Map): Map => {
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

const updateMap = (position: Coord, path: string, map: Map): Map => {
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

const calulateSplit = (input: string, map: Map, inPosition: Coord, inPath: string): { map: Map; remaining: string } => {
  const paths: string[] = [inPath]
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
      case 'N': {
        addDoor(position, char, map)
        position = { x: position.x, y: position.y - 1 }
        paths[pathIndex] += char
        updateMap(position, paths[pathIndex], map)
        break
      }

      case 'E': {
        addDoor(position, char, map)
        position = { x: position.x + 1, y: position.y }
        paths[pathIndex] += char
        updateMap(position, paths[pathIndex], map)
        break
      }

      case 'W': {
        addDoor(position, char, map)
        position = { x: position.x - 1, y: position.y }
        paths[pathIndex] += char
        updateMap(position, paths[pathIndex], map)
        break
      }

      case 'S': {
        addDoor(position, char, map)
        position = { x: position.x, y: position.y + 1 }
        paths[pathIndex] += char
        updateMap(position, paths[pathIndex], map)
        break
      }

      case '|': {
        pathIndex++
        position = inPosition
        break
      }

      case '(': {
        const split = calulateSplit(remaining, map, position, paths[pathIndex])
        map = split.map
        remaining = split.remaining
        break
      }

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

const createMap = (input: string, inMap?: Map): { map: Map; remaining: string } => {
  let map: Map = inMap || {
    min: { x: 0, y: 0 },
    max: { x: 0, y: 0 }
  }

  let position: Coord = { x: 0, y: 0 }
  let char = input.charAt(0)
  let remaining = input.slice(1)
  let currentPath = ''

  charLoop:
  while (char) {
    switch (char) {
      case '^':
        break

      case 'N': {
        currentPath += char
        addDoor(position, char, map)
        position = { x: position.x, y: position.y - 1 }
        break
      }

      case 'E': {
        currentPath += char
        addDoor(position, char, map)
        position = { x: position.x + 1, y: position.y }
        break
      }

      case 'W': {
        currentPath += char
        addDoor(position, char, map)
        position = { x: position.x - 1, y: position.y }
        break
      }

      case 'S': {
        currentPath += char
        addDoor(position, char, map)
        position = { x: position.x, y: position.y + 1 }
        break
      }

      case '(': {
        const split = calulateSplit(remaining, map, position, currentPath)
        map = split.map
        remaining = split.remaining
        break
      }

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

export const findFarthestRoom = (inputKey: string) => {
  map = createMap(inputs.get(inputKey)!).map

  let farthestDistance = 0
  const { min, max } = map

  for (let xi = min.x; xi <= max.x; xi++)
    for (let yi = min.y; yi <= max.y; yi++) {
      const room = map[pathKey({ x: xi, y: yi })]
      if (room && room.path && room.path.length > farthestDistance) farthestDistance = room.path.length
    }

  return {
    answer1: farthestDistance
  }
}

export const countFarRooms = (inputKey: string) => {
  map = createMap(inputs.get(inputKey)!).map

  let farRooms = 0
  const { min, max } = map

  for (let xi = min.x; xi <= max.x; xi++)
    for (let yi = min.y; yi <= max.y; yi++) {
      const room = map[pathKey({ x: xi, y: yi })]
      if (room && room.path && room.path.length >= 1000) farRooms++
    }

  return {
    answer2: farRooms
  }
}

const day20: Omit<DayConfig, 'year'> = {
  answer1Text: 'The farthest room is answer doors away.',
  answer2Text: 'answer rooms have a path that requires passing through at least 1000 doors.',
  buttons: [
    {
      label: 'Find Farthest Room',
      onClick: findFarthestRoom
    },
    {
      label: 'Count Far Rooms',
      onClick: countFarRooms
    }
  ],
  id: 20,
  inputs,
  title: 'Go With The Flow',
}

export default day20
