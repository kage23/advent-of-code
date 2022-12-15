import {
  IButton,
  IDayConfig
} from '../Config'

import SLL from '../utils/SLL'
import { manhattanDistance } from '../utils/Various'

import INPUT from '../Inputs/2019/Day20'

const parseGridString = (str: string): number[] => str.split(',').map(i => parseInt(i))
const renderGridString = (pos: number[]): string => pos.join(',')

interface IMap {
  edgeColumns: number[]
  edgeRows: number[]
  grid: IGridSpot[][]
  portalConnections: Map<string, Map<string, number>>
  portals: Map<string, string[]>
}

interface IGridSpot {
  distanceFromStart: number
  portal: false | string
  spot: string
}

let map: IMap = {
  edgeColumns: [],
  edgeRows: [],
  grid: [],
  portalConnections: new Map(),
  portals: new Map()
}

const parseInput = (inputKey: string): IMap => {
  map = {
    edgeColumns: [],
    edgeRows: [],
    grid: [],
    portalConnections: new Map(),
    portals: new Map()
  }

  const getSpotFromInput = ([x, y]: [number, number], inputKey: string): string => {
    const input = INPUT[inputKey]
    const width = input.split('').indexOf('\n')
    const charAt = x + (width * y) + y
    return input.charAt(charAt)
  }

  const getPortalName = ([x, y]: [number, number], inputKey: string): string => {
    const firstLetter = getSpotFromInput([x, y], inputKey)
    const secondLetterPositions = [
      [x + 1, y],
      [x, y + 1]
    ]
    const secondLetters = secondLetterPositions.map(([x, y]: number[]) => getSpotFromInput([x, y], inputKey))

    let secondLetterPosition = -1
    if ('A' <= secondLetters[0] && secondLetters[0] <= 'Z') {
      secondLetterPosition = 0
    } else {
      secondLetterPosition = 1
    }
    seenPortals.push(renderGridString(secondLetterPositions[secondLetterPosition]))

    const portalName = `${firstLetter}${secondLetters[secondLetterPosition]}`

    if (!map.grid[y]) map.grid[y] = []
    map.grid[y][x] = {
      distanceFromStart: Number.MAX_SAFE_INTEGER,
      portal: portalName,
      spot: firstLetter
    }
    if (!map.grid[secondLetterPositions[secondLetterPosition][1]]) map.grid[secondLetterPositions[secondLetterPosition][1]] = []
    map.grid[secondLetterPositions[secondLetterPosition][1]][secondLetterPositions[secondLetterPosition][0]] = {
      distanceFromStart: Number.MAX_SAFE_INTEGER,
      portal: portalName,
      spot: secondLetters[secondLetterPosition]
    }

    return portalName
  }

  const getPortalSpot = ([x, y]: [number, number], inputKey: string): string => {
    const potentialSpots: [number, number][] = [
      [x, y - 1,],
      [x, y + 2],
      [x + 2, y],
      [x - 1, y]
    ]
    for (let i = 0; i < potentialSpots.length; i++) {
      if (getSpotFromInput(potentialSpots[i], inputKey) === '.') {
        return renderGridString(potentialSpots[i])
      }
    }
    throw new Error('fuck')
  }

  const seenPortals: string[] = []

  let x = 0
  let y = 0

  let width = 0
  let height = 0

  INPUT[inputKey].split('').forEach(char => {
    if (!map.grid[y]) map.grid[y] = []

    if (!seenPortals.includes(renderGridString([x, y]))) {
      if (char === '\n') {
        y++
        if (!width) width = x
        x = -1
      }
      else if (char === '.' || char === '#' || char === ' ') {
        const gridSpot: IGridSpot = map.grid[y][x] || {
          distanceFromStart: Number.MAX_SAFE_INTEGER,
          portal: false,
          spot: char
        }
        map.grid[y][x] = gridSpot
      }
      else if ('A' <= char && char <= 'Z') {
        const portalName = getPortalName([x, y], inputKey)
        const portalSpot = getPortalSpot([x, y], inputKey)
        const [px, py] = parseGridString(portalSpot)
        const portalEnds: string[] = map.portals.get(portalName) || []
        portalEnds.push(renderGridString([px, py]))
        map.portals.set(portalName, portalEnds)
      }
    }
    x++
  })

  height = map.grid.length

  map.edgeColumns = [2, width - 3]
  map.edgeRows = [2, height - 3]

  const portalEndsForEach = (portalEnd: string, portalName: string) => {
    const [pex, pey] = parseGridString(portalEnd)
    const name = `${portalName}${isOuterLayer(pex, pey) ? '-' : '+'}`
    for (let [otherPortalName, otherPortalEnds] of map.portals) {
      if (portalName !== otherPortalName) {
        otherPortalEnds.forEach(otherPortalEnd => { otherPortalEndsForEach(otherPortalEnd, name, otherPortalName, portalEnd) }
        )
      }
    }
    if (portalName !== 'AA' && portalName !== 'ZZ') {
      const prevConnections = map.portalConnections.get(name) || new Map()
      const otherEnd = `${portalName}${name.slice(-1) === '-' ? '+' : '-'}`
      prevConnections.set(otherEnd, 1)
      map.portalConnections.set(name, prevConnections)
    }
  }
  const otherPortalEndsForEach = (otherPortalEnd: string, name: string, otherPortalName: string, portalEnd: string) => {
    const prevConnections = map.portalConnections.get(name) || new Map()
    const [opex, opey] = parseGridString(otherPortalEnd)
    const otherPortalEndName = `${otherPortalName}${isOuterLayer(opex, opey) ? '-' : '+'}`
    const pathLength = findShortestPathLength(`${portalEnd},0`, `${otherPortalEnd},0`, false, false)
    if (pathLength && pathLength < Number.MAX_SAFE_INTEGER) {
      prevConnections.set(otherPortalEndName, pathLength)
      map.portalConnections.set(name, prevConnections)
    }
  }

  for (let [portalName, portalEnds] of map.portals) {
    portalEnds.forEach(portalEnd => { portalEndsForEach(portalEnd, portalName) })
  }

  return map
}

const isOuterLayer = (x: number, y: number): boolean =>
  map.edgeColumns.includes(x) || map.edgeRows.includes(y)

const findShortestPathLength = (start: string, end: string, portals = true, recursive?: boolean): number | undefined => {
  // Each search node has current position and steps to reach that position.
  interface ISearchNode {
    distance: number
    position: string
  }

  const getValidAdjacents = (current: string): string[] => {
    const [cx, cy, cz] = parseGridString(current)
    const potentialAdjacents = [
      [cx - 1, cy, cz],
      [cx + 1, cy, cz],
      [cx, cy - 1, cz],
      [cx, cy + 1, cz]
    ]
    // First, just filter out negatives, walls, spaces, and unknowns
    return potentialAdjacents.filter(adjacent => {
      const [ax, ay] = adjacent
      if (map.grid[ay] === undefined || map.grid[ay][ax] === undefined) return false
      const { spot } = map.grid[ay][ax]

      return !['#', ' ', undefined].includes(spot)
    })
      // Then map portals to their other ends
      .map(adjacent => {
        const [ax, ay] = adjacent
        const { portal: portalName } = map.grid[ay][ax]

        if (portals && portalName) {
          // If they're a portal, the other side of that portal is the actual adjacent.
          // Unless the portal is AA, which is the entrance and it has no other side. So that's just an invalid adjacent.
          // Or ZZ, which is the exit, but only in the outermost layer, and a wall everywhere else.
          // Also, in recursive mode, all of the portals on the outermost layer are just walls, not portals.
          if (portalName === 'AA') return ''
          if (portalName === 'ZZ') return ''
          if (recursive && isOuterLayer(ax, ay) && cz === 0) return ''

          const portal = map.portals.get(portalName)
          if (!portal) throw new Error('fuck')

          const otherEnd = portal
            .map(p => parseGridString(p))
            .filter(p => renderGridString(p) !== renderGridString([cx, cy]))[0]

          const otherEndZ = recursive
            ? isOuterLayer(ax, ay)
              ? cz - 1
              : cz + 1
            : 0
          otherEnd.push(otherEndZ)

          return otherEnd.join(',')
        } else {
          return renderGridString(adjacent)
        }
      })
      // Filter out ones with no length
      .filter(x => x && x.length > 0)
      // Filter out places we've already been
      .filter(adjacent => !visitedDistances.get(adjacent))
      // Make TypeScript happy
      .map(x => x ? x : '')
  }

  // Make a search queue starting with the start node
  const searchQueue = new SLL({
    distance: 0,
    position: start
  } as ISearchNode)
  // Make a cache of shortest known distances to each position (Map<positionString, distanceNumber>). This functions as the VISITED SEARCH NODES list.
  const visitedDistances: Map<string, number> = new Map()
  // Make a shortestKnownPathLength set to Number.MAX
  let shortestKnownPathLength = Number.MAX_SAFE_INTEGER

  while (searchQueue.length) {
    // Shift the first node off the search queue
    const currentNode: ISearchNode = searchQueue.shift()
    // For each node...
    if (currentNode.position === end) {
      // If it's the end node, you have a valid path.
      // Check its length against the shortest known path length ...
      shortestKnownPathLength = Math.min(shortestKnownPathLength, currentNode.distance)
      // ... then continue with the next node.
      continue
    } else {
      // If it's not the end node ...
      if (currentNode.distance + 1 < shortestKnownPathLength) {
        // If the current distance plus one is longer than the shortest known path length don't bother. Otherwise...
        // Check the current node against the VISITED/distances list.
        const previouslyVisitedDistance = visitedDistances.get(currentNode.position)
        // If the current distance is longer than the previously saved distance, don't bother.
        if (previouslyVisitedDistance === undefined || currentNode.distance < previouslyVisitedDistance) {
          // If the current distance is shorter than the saved distance, or it's not visited yet, save the current distance, and then...
          visitedDistances.set(currentNode.position, currentNode.distance)
          // Find valid adjacents
          const adjacents = getValidAdjacents(currentNode.position)
          adjacents.forEach(adjacent => {
            // Sort each valid adjacent into the search queue, priority being shortest current distance, second priority being manhattan distance to the end.
            const adjacentSearchNode: ISearchNode = {
              distance: currentNode.distance + 1,
              position: adjacent
            }
            let insertAfter = searchQueue.head
            if (!insertAfter) {
              searchQueue.push(adjacentSearchNode)
            } else {
              while (
                insertAfter
                && insertAfter.next
                && (
                  insertAfter.next.value.distance < adjacentSearchNode.distance
                  || (
                    insertAfter.next.value.distance === adjacentSearchNode.distance
                    && (
                      manhattanDistance(parseGridString(adjacentSearchNode.position), parseGridString(end))
                      < manhattanDistance(parseGridString(insertAfter.next.value.position), parseGridString(end))
                    )
                  )
                )
              ) {
                insertAfter = insertAfter.next
              }
              if (insertAfter) searchQueue.insertAfter(adjacentSearchNode, insertAfter)
              else searchQueue.push(adjacentSearchNode)
            }
          })
        }
      }
    }
  }

  return shortestKnownPathLength
}

const findShortestRecursiveNodePath = (): number | undefined => {
  interface ISearchNode {
    distance: number
    position: string
  }

  const target = 'ZZ-0'

  const searchQueue = new SLL({
    distance: 0,
    position: 'AA-0'
  } as ISearchNode)
  const visitedNodes: Map<string, true> = new Map()

  while (searchQueue.length) {
    const currentNode: ISearchNode = searchQueue.shift()
    if (!visitedNodes.get(currentNode.position)) {
      visitedNodes.set(currentNode.position, true)
      const zIndex = parseInt(currentNode.position.slice(3))
      const nodeName = currentNode.position.slice(0, 3)
      if (currentNode.position === target) {
        return currentNode.distance
      } else {
        const connections = map.portalConnections.get(nodeName)
        if (connections) {
          Array.from(connections.entries()).filter(([connectionName]) => {
            if (zIndex === 0) {
              if (connectionName.startsWith('ZZ')) return true
              if (connectionName.charAt(2) === '-' && connectionName.slice(0, 2) !== currentNode.position.slice(0, 2)) return false
            }
            return true
          })
            .forEach(([connectionName, connectionDistance]) => {
              const newZIndex = connectionName.slice(0, 2) === currentNode.position.slice(0, 2)
                ? currentNode.position.charAt(2) === '+'
                  ? zIndex + 1
                  : zIndex - 1
                : zIndex
              const newSearchNode: ISearchNode = {
                distance: currentNode.distance + connectionDistance,
                position: `${connectionName}${newZIndex}`
              }
              if (!visitedNodes.get(newSearchNode.position)) {
                let insertAfter = searchQueue.head
                while (
                  insertAfter
                  && insertAfter.next
                  && insertAfter.next.value.distance < newSearchNode.distance
                ) {
                  insertAfter = insertAfter.next
                }
                if (insertAfter) searchQueue.insertAfter(newSearchNode, insertAfter)
                else searchQueue.push(newSearchNode)
              }
            })
        }
      }
    }
  }
}

const renderPortalList = (): string => {
  let portalList = ''
  Array.from(map.portals.entries()).forEach(([portalName, portalEnds]) => {
    portalList += `${portalName}: ${portalEnds.map(p => `[${p}]`).join(', ')}\n`
  })
  return portalList
}

const renderDay = (dayConfig: IDayConfig, inputKey: string) => {
  return (
    <div className="render-box">
      <div>
        <h3>INPUT:</h3>
        <pre>{dayConfig.INPUT[inputKey]}</pre>
      </div>
      <div className="render-box--left-margin">
        <h3>Portals:</h3>
        <pre>{renderPortalList()}</pre>
      </div>
    </div>
  )
}

const BUTTONS: IButton[] = [
  {
    label: 'Parse Input',
    onClick: (inputKey: string) => {
      map.grid.length = 0
      map.portals.clear()

      const startTime = new Date().getTime()
      map = parseInput(inputKey)
      console.log(`Total parsing time: ${new Date().getTime() - startTime}.`)

      return {}
    }
  },
  {
    label: 'Find Shortest Path',
    onClick: () => {
      const startNode = map.portals.get('AA')
      const endNode = map.portals.get('ZZ')
      if (!startNode || !endNode) throw new Error('fuck')

      const startTime = new Date().getTime()
      const path = findShortestPathLength(`${startNode[0]},0`, `${endNode[0]},0`)
      console.log(`Total pathing time: ${new Date().getTime() - startTime}.`)

      return {
        answer1: path ? path.toString() : ''
      }
    }
  },
  {
    label: 'Find Shortest Path in Recursive Maze',
    onClick: () => {
      const startTime = new Date().getTime()
      const path = findShortestRecursiveNodePath()
      console.log(`Total pathing time: ${new Date().getTime() - startTime}.`)

      return {
        answer2: path ? path.toString() : ''
      }
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The shortest path is <code>{answer}</code> steps long.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      The shortest path through the recursive version is <code>{answer}</code> steps long.
    </span>
  ),
  buttons: BUTTONS,
  day: 20,
  INPUT,
  renderDay: (dayConfig, inputKey) => renderDay(dayConfig, inputKey),
  title: 'Donut Maze'
}

export default config
