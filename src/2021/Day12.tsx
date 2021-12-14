import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'

import INPUT from './Input/Day12'

interface Cave {
  id: string
  size: 'sm' | 'lg'
  neighbors: string[]
}

const makeNewCave = (id: string): Cave => {
  const size = (
    id.toLocaleLowerCase() === id ||
    id === 'start' ||
    id === 'end'
  ) ? 'sm' : 'lg'
  return { id, size, neighbors: [] }
}

const mapTheCaves = (connections: string[]): Map<string, Cave> => {
  const map: Map<string, Cave> = new Map()

  connections.forEach(connection => {
    const [caveAId, caveBId] = connection.split('-')
    const caveA = map.get(caveAId) || makeNewCave(caveAId)
    const caveB = map.get(caveBId) || makeNewCave(caveBId)
    if (!caveA.neighbors.includes(caveBId)) {
      caveA.neighbors.push(caveBId)
    }
    if (!caveB.neighbors.includes(caveAId)) {
      caveB.neighbors.push(caveAId)
    }
    map.set(caveAId, caveA)
    map.set(caveBId, caveB)
  })

  return map
}

const findThePaths = (caves: Map<string, Cave>, part: 1 | 2): {
  path: string[]
  revisitSmallsAllowed: boolean
}[] => {
  const paths: {
    path: string[]
    revisitSmallsAllowed: boolean
  }[] = []

  const startCave = caves.get('start')
  if (startCave === undefined) throw new Error('something fucked up')

  let possiblePaths: {
    path: string[]
    revisitSmallsAllowed: boolean
  }[] = startCave.neighbors.map(neighborId => ({
    path: ['start', neighborId],
    revisitSmallsAllowed: part === 2
  }))

  let pathCheckCount = 0

  while (possiblePaths.length) {
    pathCheckCount++
    const currentPossiblePath = possiblePaths.shift()
    if (currentPossiblePath === undefined) throw new Error('something fucked up')
    const cave = caves.get(currentPossiblePath.path[currentPossiblePath.path.length - 1])
    if (cave === undefined) throw new Error('something fucked up')
    if (cave.id === 'end') {
      paths.push(currentPossiblePath)
    } else {
      switch (part) {
        case 1:
          possiblePaths.push(
            ...cave.neighbors.filter(neighborId => {
              const neighborCave = caves.get(neighborId)
              if (neighborCave === undefined) return false
              return neighborCave.size === 'lg' || !currentPossiblePath.path.includes(neighborId)
            }).map(neighborId => ({
              path: [...currentPossiblePath.path, neighborId],
              revisitSmallsAllowed: false
            }))
          )
          break

        case 2:
          possiblePaths.push(
            ...cave.neighbors.reduce((pathList, neighborId) => {
              let { revisitSmallsAllowed } = currentPossiblePath
              const neighborCave = caves.get(neighborId)
              if (neighborCave === undefined) throw new Error('something fucked up')
              if (neighborId !== 'start') {
                const isVisitedSmall = neighborCave.size === 'sm' && currentPossiblePath.path.includes(neighborId)
                if (!isVisitedSmall) {
                  pathList.push({
                    path: [...currentPossiblePath.path, neighborId],
                    revisitSmallsAllowed
                  })
                } else {
                  if (revisitSmallsAllowed) {
                    revisitSmallsAllowed = false
                    pathList.push({
                      path: [...currentPossiblePath.path, neighborId],
                      revisitSmallsAllowed
                    })
                  }
                }
              }

              return pathList
            }, [] as { path: string[], revisitSmallsAllowed: boolean }[])
          )
          break
      }
    }
  }

  console.log(`We checked ${pathCheckCount} possible paths.`)

  return paths
}

const BUTTONS: IButton[] = [
  {
    label: 'Count the Possible Paths',
    onClick: (inputKey: string) => {
      const caves = mapTheCaves(INPUT[inputKey].split('\n'))
      const paths = findThePaths(caves, 1)

      return {
        answer1: paths.length.toString()
      }
    }
  },
  {
    label: 'Count the Possible Paths, Part 2',
    onClick: (inputKey: string) => {
      const caves = mapTheCaves(INPUT[inputKey].split('\n'))
      const startTime = new Date()
      const paths = findThePaths(caves, 2)
      const endTime = new Date()
      console.log(`Total time: ${(endTime.getTime() - startTime.getTime()) / 1000} seconds.`)

      return {
        answer2: paths.length.toString()
      }
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      There are <code>{answer}</code> valid paths through the cave system.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      There are <code>{answer}</code> valid paths through the cave system under the new rules.
    </span>
  ),
  buttons: BUTTONS,
  day: 12,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Passage Pathing'
}

export default config
