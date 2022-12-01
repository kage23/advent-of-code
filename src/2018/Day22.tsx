import React from 'react'
import {
  IButton,
  IDayConfig
} from '../Config'

import INPUT from '../Inputs/2018/Day22'

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
    [key: string]: IMapSquare
  }
  target: ICoord
}

interface IMapSquare extends ICoord {
  erosion: number
  geologic: number
  type: '.' | '=' | '|'
}

interface IAction {
  equipment: 'T' | 'G' | ''
  position: ICoord
  time: number
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
const searchPathKey = (action: IAction): string => `${action.position.x},${action.position.y},${action.equipment}`

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
  const type = TYPE_ARRAY[erosion % 3]

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

const getNextActions = (map: IMap, action: IAction)
  : IAction[] => {
  /**
   * The potentially possible moves for each position are: move N, W, S, or E, or change equipment and then move NWSE
   * The limitations are that you can't go x < or y < 0, and you have to have the right equipment for the current room and the next room
   * Here's a rooms and equipment table:
   *
   * Room Type  | Allowed Equipment
   * ------------------------------
   * Rocky (.)  | 'G', 'T'
   * Wet (=)    | 'G', ''
   * Narrow (|) | 'T', ''
   *
   *  */
  const {
    equipment,
    position,
    time
  } = action
  type rooms = '.' | '=' | '|'
  const ALLOWED_EQUIPMENT_PER_ROOM_TYPE: {
    [key in rooms]: ('G' | 'T' | '')[]
  } = {
    '.': ['G', 'T'],
    '=': ['G', ''],
    '|': ['T', '']
  }

  // First we get the coords of all possible next rooms
  return [
    { x: position.x, y: position.y },
    { x: position.x - 1, y: position.y },
    { x: position.x + 1, y: position.y },
    { x: position.x, y: position.y - 1 },
    { x: position.x, y: position.y + 1 }
  ]
    // Filtered by ones actually within the allowed cave area
    .filter(position => position.x >= 0 && position.y >= 0)
    // Mapped and reduced to possible actions, including switching equipment and total time
    .reduce((accumulator: IAction[], nextPosition: ICoord): IAction[] => {
      const currentRoomType = map.squares[pathKey(position)].type
      const nextRoomType = map.squares[pathKey(nextPosition)]
        ? map.squares[pathKey(nextPosition)].type
        : updateMap(getMapSquare(map, nextPosition), map).squares[pathKey(nextPosition)].type
      const currentNotEquipped = ALLOWED_EQUIPMENT_PER_ROOM_TYPE[currentRoomType].find(e => e !== equipment)

      // If this is the current room, the action we're examining is switching your equipment with a time of 7
      if (currentNotEquipped !== undefined && nextPosition.x === position.x && nextPosition.y === position.y) {
        accumulator.push({
          equipment: currentNotEquipped,
          position: nextPosition,
          time: time + 7
        })
      } else {

        // If the currently-equipped item is allowed in the next room, push it with a time of 1 plus current
        if (ALLOWED_EQUIPMENT_PER_ROOM_TYPE[nextRoomType].indexOf(equipment) !== -1) {
          accumulator.push({
            equipment,
            position: nextPosition,
            time: time + 1
          })
        }
      }

      return accumulator
    }, [])
    // Sorted by time
    .sort((a, b) => a.time - b.time)
}

const calculateRescueTime = (caveMap: IMap)
  : {
    answer: number
    map: IMap
  } => {
  let actionsList: IAction[] = [{
    position: {
      x: 0,
      y: 0
    },
    equipment: 'T',
    time: 0
  }]
  const visitedMap = new Map()
  const timeMap = new Map()
  let shortestTime = Number.MAX_SAFE_INTEGER

  visitedMap.set(searchPathKey(actionsList[0]), false)
  timeMap.set(pathKey({ x: 0, y: 0 }), 0)

  let currentNode = actionsList.shift()

  const forEachAction = (action: IAction) => {
    if (typeof visitedMap.get(searchPathKey(action)) === 'undefined') {
      visitedMap.set(searchPathKey(action), false)
    }
    if (typeof timeMap.get(pathKey(action.position)) === 'undefined') {
      timeMap.set(pathKey(action.position), Number.MAX_SAFE_INTEGER)
    }
    timeMap.set(pathKey(action.position), Math.min(timeMap.get(pathKey(action.position)), action.time))
    if (
      action.position.x === caveMap.target.x
      && action.position.y === caveMap.target.y
      && action.equipment === 'T'
    ) {
      shortestTime = Math.min(shortestTime, action.time)
    }
    actionsList.push(action)
  }
  while (currentNode) {
    if (!visitedMap.get(searchPathKey(currentNode))) {
      if (currentNode.time > shortestTime) {
        break
      }
      getNextActions(caveMap, currentNode)
        .filter(action => !visitedMap.get(searchPathKey(action)))
        .forEach(forEachAction)
      visitedMap.set(searchPathKey(currentNode), true)

      actionsList.sort((a, b) => a.time - b.time)
    }

    if (actionsList[0] && actionsList[0].time > currentNode.time)
      console.log(`About to check nodes at time ${actionsList[0].time}. Actions list length: ${actionsList.length}. Current shortest time found: ${shortestTime}.`)

    currentNode = actionsList.shift()
  }

  return {
    answer: shortestTime,
    map: caveMap
  }
}

const BUTTONS: IButton[] = [
  {
    label: 'Assess Risk',
    onClick: assessRisk
  },
  {
    label: 'Calculate Rescue Time',
    onClick: () => {
      const result = calculateRescueTime(map)
      map = result.map
      return {
        answer2: result.answer.toString()
      }
    }
  }
]

export const renderDay = (dayConfig: IDayConfig, inputKey: string): JSX.Element => {
  if (inputKey !== prevInputKey) {
    map = generateMap(parseInput(dayConfig.INPUT[inputKey]))
    prevInputKey = inputKey
  }

  const mapRows: JSX.Element[] = []

  if (map.max.x <= 50) {
    for (let y = 0; y <= map.max.y; y++) {
      const row: JSX.Element[] = []
      for (let x = 0; x <= map.max.x; x++) {
        if (typeof map.squares[pathKey({ x, y })] === 'undefined') {
          map.squares[pathKey({ x, y })] = getMapSquare(map, { x, y })
        }
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
  } else mapRows.push(<div key="sorry"><p>Sorry, the map is too big to display efficiently!</p></div>)

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
      <div
        style={{
          flexGrow: 1,
          flexBasis: 0
        }}
        className="render-box--left-margin"
      >
        <p>Warning: Calculating the rescue time takes a while! Check your console for proof it's actually running!</p>
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
      The rescue will take{' '}
      <code>{answer}</code> minutes.
    </span>
  ),
  buttons: BUTTONS,
  day: 22,
  INPUT,
  renderDay,
  title: 'Mode Maze'
}

export default config