import inputs from '../../inputs/2019/day18'
import { DayConfig } from '../../routes/Day'
import manhattanDistance from '../../utils/manhattanDistance'
import SLL from '../../utils/SLL'
import Tree, { TreeNode } from '../../utils/Tree'

interface Robot {
  keyToKeyPaths: Map<string, {
    blockers: string
    path: string[]
  }>
  position: string
  reachableKeysFromCollected: Map<string, string>
  vaultKeys: string
}

const robots: Robot[] = []
const map: Map<string, string> = new Map()
const listOfKeysAndDoors: Map<string, { door: string, key: string }> = new Map()

const parseGridString = (str: string): number[] => str.split(',').map(i => parseInt(i))
const renderGridString = (pos: number[]): string => pos.join(',')

const getAdjacentPositions = (current: string): { [key: string]: string } => {
  const [x, y] = parseGridString(current)
  return {
    n: renderGridString([x, y - 1]),
    s: renderGridString([x, y + 1]),
    w: renderGridString([x - 1, y]),
    e: renderGridString([x + 1, y])
  }
}

const getAdjacentPositionsArray = (current: string): string[] => {
  const { n, e, s, w } = getAdjacentPositions(current)
  return [n, e, s, w]
}

const findShortestPath = (start: string, end: string, map: Map<string, string>): {
  blockers: string
  path: string[]
} | undefined => {
  const searchTree = new Tree(start)
  const visited: Map<string, boolean> = new Map()

  let current: TreeNode<string> = searchTree.head
  const pushAdjacentToCurrent = (adjacent: string) => { current.push(adjacent) }
  while (current.value !== end) {
    if (typeof current.value === 'string') {
      if (map.get(current.value) === undefined) {
        break
      }
      visited.set(current.value, true)
      // First step
      const adjacents = getAdjacentPositionsArray(current.value)
        // No walls
        .filter(pos => map.get(pos) !== '#')
        // Nowhere we've already been on this search
        .filter(pos => !visited.get(pos))
        // Sort by distance from the target
        .sort((a, b) => (
          manhattanDistance(parseGridString(end), parseGridString(a))
          - manhattanDistance(parseGridString(end), parseGridString(b))
        ))
      adjacents.forEach(pushAdjacentToCurrent)
    }
    const indexOfNextBranch = current.branches.findIndex(
      branch => typeof branch.value === 'string' && !visited.get(branch.value)
    )
    if (indexOfNextBranch !== -1) current = current.branches[indexOfNextBranch]
    else {
      // Gotta go back up the tree, I guess
      if (current.parent) current = current.parent
      else {
        // This else means that there is no path to the thing.
        return undefined
      }
    }
  }

  const path = current.getPathToHead() as string[]
  path.pop()
  path.reverse()
  let blockers = ''
  for (let i = 0; i < path.length; i++) {
    const position = map.get(path[i])

    if (path[i] !== end && position && 'A' <= position && position <= 'Z') {
      blockers += position.toLowerCase()
    }
  }

  return { blockers, path }
}

const parseInput = (input: string) => {
  const { length } = input
  let x = 0
  let y = 0

  robots.length = 0
  map.clear()
  listOfKeysAndDoors.clear()

  for (let i = 0; i < length; i++) {
    const char = input[i]
    if (char === '\n') {
      x = 0
      y++
    } else {
      map.set(renderGridString([x, y]), char)
      if (char === '@') {
        robots.push({
          vaultKeys: '',
          keyToKeyPaths: new Map(),
          reachableKeysFromCollected: new Map(),
          position: renderGridString([x, y])
        })
      } else if (char !== '.' && char !== '#') {
        const keyName = char.toLowerCase()
        const isKey = char === keyName
        const keyDoorThing = listOfKeysAndDoors.get(keyName) || { door: '', key: '' }
        if (isKey) keyDoorThing.key = renderGridString([x, y])
        else keyDoorThing.door = renderGridString([x, y])
        listOfKeysAndDoors.set(keyName, keyDoorThing)
      }
      x++
    }
  }

  robots.forEach((robot) => {
    for (const [mainKey, mainValue] of listOfKeysAndDoors.entries()) {
      const pathFromStart = findShortestPath(robot.position, mainValue.key, map)
      if (pathFromStart) {
        robot.vaultKeys += mainKey
        robot.keyToKeyPaths.set(`@${mainKey}`, pathFromStart)
      }
    }
    robot.vaultKeys.split('').forEach(startKey => {
      const startKeyObj = listOfKeysAndDoors.get(startKey)
      if (startKeyObj) {
        robot.vaultKeys.split('').forEach(endKey => {
          const endKeyObj = listOfKeysAndDoors.get(endKey)
          if (endKeyObj && startKey !== endKey) {
            const reversePath = robot.keyToKeyPaths.get(`${endKey}${startKey}`)
            if (reversePath) {
              const path = []
              for (let i = reversePath.path.length - 1; i >= 0; i--) path.push(reversePath.path[i])
              robot.keyToKeyPaths.set(`${startKey}${endKey}`, { blockers: reversePath.blockers, path })
            } else {
              const path = findShortestPath(startKeyObj.key, endKeyObj.key, map)
              if (path) {
                robot.keyToKeyPaths.set(`${startKey}${endKey}`, path)
              }
            }
          }
        })
      }
    })
  })
}

const reset = (input: string) => {
  console.time('Initialization')
  parseInput(input)
  console.timeEnd('Initialization')
}

const getPart2Input = (input: string) => {
  const grid = input.split('\n')
  const startRowIndex = grid.findIndex(row => row.includes('.@.'))
  if (startRowIndex === -1) {
    return input
  } else {
    const charIndex = grid[startRowIndex].indexOf('.@.')
    grid[startRowIndex - 1] = grid[startRowIndex - 1].slice(0, charIndex) + '@#@' + grid[startRowIndex - 1].slice(charIndex + 3)
    grid[startRowIndex] = grid[startRowIndex].slice(0, charIndex) + '###' + grid[startRowIndex].slice(charIndex + 3)
    grid[startRowIndex + 1] = grid[startRowIndex + 1].slice(0, charIndex) + '@#@' + grid[startRowIndex + 1].slice(charIndex + 3)
    return grid.join('\n')
  }
}

interface StateSearchObject {
  collected: string
  distance: number
  positions: string
}

const getBestPathToAllKeys = (): {
  distance: number
  path: string
} => {
  const totalNumberOfKeys = listOfKeysAndDoors.size
  const startNode: StateSearchObject = {
    collected: '',
    distance: 0,
    positions: robots.map(() => '@').join('')
  }
  const searchQueue = new SLL(startNode)
  const statesSearched: Map<string, true> = new Map()
  const distancesToSortedStates: Map<string, number> = new Map()
  let currentNode: StateSearchObject | undefined = searchQueue.shift()

  let shortestPath = ''
  let shortestPathLength = Number.MAX_SAFE_INTEGER

  const alphaSort = (a: string, b: string) => {
    if (a === '@') return -1
    if (b === '@') return 1
    return a < b ? -1 : 1
  }

  const sortStringAlpha = (x: string): string => x.split('').sort(alphaSort).join('')

  const getReachableFromCollected = (robotIndex: number, collected: string): string => {
    const robot: Robot = robots[robotIndex]
    // Check the robot's cache first
    const cachedReachables = robot.reachableKeysFromCollected.get(sortStringAlpha(collected))
    if (cachedReachables) return cachedReachables

    let reachables = ''
    // To generate it: Check the robot's list of vault keys. For each vault key:
    robot.vaultKeys.split('').filter(key => !collected.includes(key)).forEach(key => {
      // Check the pre-calculated path from the robot's _starting_ position to the key ...
      const startingKeyPathObject = robot.keyToKeyPaths.get(`@${key}`)
      if (startingKeyPathObject) {
        // ... and check the list of blockers along that path.
        const { blockers } = startingKeyPathObject
        // For each blocker, check to see if it's in our collected list or not
        // If all blockers are in the collected list, it's reachable!
        if (!blockers.split('').some(blocker => !collected.includes(blocker))) {
          reachables += key
        }
      }
    })

    // If it's not in the cache and you have to generate it, make sure to cache it
    robot.reachableKeysFromCollected.set(sortStringAlpha(collected), reachables)

    return reachables
  }

  const robotsForEach = (robot: Robot, idx: number, nextStates: StateSearchObject[]) => {
    if (currentNode === undefined) throw new Error('fuck')
    // ... get a list of reachable keys from the potential next state collected list
    const reachableKeysFromCollected = getReachableFromCollected(idx, currentNode.collected)
    reachableKeysFromCollected.split('').forEach(key => {
      if (currentNode === undefined) throw new Error('fuck')
      // For each reachable key, examine the path from the robot's current position to the key
      // That path will provide the distance
      const path = robot.keyToKeyPaths.get(`${currentNode.positions.charAt(idx)}${key}`)
      if (path === undefined) throw new Error('fuck')
      const nextDistance = currentNode.distance + path.path.length
      if (nextDistance < shortestPathLength) {
        nextStates.push({
          collected: `${currentNode.collected}${key}`,
          distance: nextDistance,
          positions: `${currentNode.positions.slice(0, idx)}${key}${currentNode.positions.slice(idx + 1)}`
        })
      }
    })
  }
  while (currentNode) {
    const searchStateKey = `${currentNode.positions}:${currentNode.collected}`
    if (!statesSearched.get(searchStateKey)) {
      statesSearched.set(searchStateKey, true)
      if (currentNode.collected.length === totalNumberOfKeys) {
        if (currentNode.distance < shortestPathLength) {
          shortestPathLength = currentNode.distance
          shortestPath = currentNode.collected
        }
      } else {
        const distanceToSortedStateKey = `${currentNode.positions}:${sortStringAlpha(currentNode.collected)}`
        const distanceToSortedState = distancesToSortedStates.get(distanceToSortedStateKey)
        if (currentNode.distance < shortestPathLength) {
          if (!distanceToSortedState || distanceToSortedState > currentNode.distance) {
            distancesToSortedStates.set(distanceToSortedStateKey, currentNode.distance)
            // Get potential next states
            const nextStates: StateSearchObject[] = []
            // For each robot ...
            robots.forEach((robot, idx) => { robotsForEach(robot, idx, nextStates) })
            // Add each next state to the search queue, in priority order
            nextStates.forEach(nextState => {
              if (!searchQueue.length) {
                searchQueue.push(nextState)
              } else {
                // Priority is collecting more keys FIRST, then shorter overall distance SECOND
                let insertAfter = searchQueue.head
                while (
                  insertAfter
                  && insertAfter.value.collected.length > nextState.collected.length
                ) {
                  insertAfter = insertAfter.next
                }
                if (insertAfter && insertAfter.value.collected.length === nextState.collected.length) {
                  while (
                    insertAfter
                    && insertAfter.value.distance < nextState.distance
                  ) {
                    insertAfter = insertAfter.next
                  }
                }
                if (insertAfter) searchQueue.insertAfter(nextState, insertAfter)
                else searchQueue.push(nextState)
              }
            })
          }
        }
      }
    }
    currentNode = searchQueue.shift()
  }

  console.log(`The shortest path was ${shortestPath} with a distance of ${shortestPathLength}.`)

  return {
    distance: shortestPathLength,
    path: shortestPath
  }
}

export const collectAllKeys = (input: string) => {
  reset(input)

  const path = getBestPathToAllKeys()

  return {
    answer1: path.distance
  }
}

export const collectAllKeysWithMultipleBots = (input: string) => ({
  answer2: collectAllKeys(getPart2Input(input)).answer1
})

const day18: Omit<DayConfig, 'year'> = {
  answer1Text: 'The shortest path to collect all keys is answer steps.',
  answer2Text: 'The fewest steps to collect all the keys is answer.',
  buttons: [
    {
      label: 'Collect All Keys',
      onClick: collectAllKeys,
    },
    {
      label: 'Collect All Keys with Multiple Bots',
      onClick: collectAllKeysWithMultipleBots
    },
  ],
  id: 18,
  inputs,
  title: 'Many-Worlds Interpretation',
}

export default day18
