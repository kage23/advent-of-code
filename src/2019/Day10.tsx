import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'
import { manhattanDistance, reduce } from '../utils/Various'

import INPUT from '../Inputs/2019/Day10'

const getAngle = (asteroidStr1: string, asteroidStr2: string): number => {
  const [x1, y1] = parseAsteroidString(asteroidStr1)
  const [x2, y2] = parseAsteroidString(asteroidStr2)

  return Math.atan2((y2 * -1) - (y1 * -1), x2 - x1) * 180 / Math.PI
}

const getAsteroidList = (asteroidMap: string[]): string[] => {
  const { length } = asteroidMap
  const list: string[] = []

  for (let i = 0; i < length; i++) {
    const row = asteroidMap[i]
    const { length: rowLength } = row
    for (let j = 0; j < rowLength; j++) {
      const char = row.charAt(j)
      if (char === '#') list.push(`${j},${i}`)
    }
  }

  return list
}

const parseAsteroidString = (asteroid: string): number[] =>
  asteroid.split(',').map(x => parseInt(x))

const sortAsteroidsByAngleAndDistance = (asteroidList: string[], laserLocation: string): string[] =>
  asteroidList.sort((a, b) => {
    const angleA = getAngle(laserLocation, a)
    const angleB = getAngle(laserLocation, b)

    if (angleA === angleB) {
      const distA = manhattanDistance(laserLocation.split(',').map(x => parseInt(x)), a.split(',').map(x => parseInt(x)))
      const distB = manhattanDistance(laserLocation.split(',').map(x => parseInt(x)), b.split(',').map(x => parseInt(x)))
      return distA < distB ? -1 : 1
    } else if (angleA <= 90 && angleB > 90) {
      return -1
    } else if (angleA > 90 && angleB <= 90) {
      return 1
    } else return angleB - angleA
  })

const hasLineOfSight = (asteroidA: string, asteroidB: string, asteroidList: string[]): boolean => {
  // console.log('checking line of sight', asteroidA, asteroidB)
  const [x1, y1] = parseAsteroidString(asteroidA)
  const [x2, y2] = parseAsteroidString(asteroidB)
  const xDiff = x2 - x1
  const yDiff = y2 - y1
  let [rx, ry] = reduce(Math.abs(xDiff), Math.abs(yDiff))
  if (xDiff < 1) rx *= -1
  if (yDiff < 1) ry *= -1
  let target = asteroidA
  while (target !== asteroidB) {
    const [tx, ty] = parseAsteroidString(target)
    if (target !== asteroidA) {
      if (asteroidList.includes(target)) return false
    }
    target = `${tx + rx},${ty + ry}`
  }
  return true
}

const parseInput = (inputKey: string): string[] =>
  INPUT[inputKey].split('\n')

const BUTTONS: IButton[] = [
  {
    label: 'Find Asteroid for Monitoring Station',
    onClick: (inputKey: string) => {
      const asteroidMap = parseInput(inputKey)
      const asteroidList = getAsteroidList(asteroidMap)

      let bestAsteroid = ''
      let maxLineOfSight = Number.MIN_SAFE_INTEGER

      const { length } = asteroidList
      for (let i = 0; i < length; i++) {
        const asteroid1 = asteroidList[i]
        const lineOfSightCount = asteroidList
          .filter(asteroid => asteroid !== asteroid1)
          .filter(asteroid => hasLineOfSight(asteroid1, asteroid, asteroidList))
          .length

        if (lineOfSightCount > maxLineOfSight) {
          maxLineOfSight = lineOfSightCount
          bestAsteroid = asteroid1
        }
      }

      console.log('best asteroid', bestAsteroid)

      return {
        answer1: maxLineOfSight.toString()
      }
    }
  },
  {
    label: 'Vaporize Asteroids',
    onClick: (inputKey: string) => {
      const asteroidMap = parseInput(inputKey)
      const asteroidList = getAsteroidList(asteroidMap)
      const laserLocation = inputKey.includes('DEMO_1')
        ? '11,13'
        : inputKey.includes('DEMO_2')
          ? '8,3'
          : '37,25'

      const asteroidsSorted: string[] = []

      let i = 0
      let listToSort: string[] = []
      let asteroidListCopy: string[] = JSON.parse(JSON.stringify(asteroidList))
      asteroidListCopy = asteroidListCopy.filter(asteroid => asteroid !== laserLocation)
      while (asteroidListCopy.length) {
        const asteroid = asteroidListCopy[i]
        if (hasLineOfSight(laserLocation, asteroid, asteroidListCopy)) {
          listToSort.push(asteroid)
        }
        i++

        if (i >= asteroidListCopy.length) {
          sortAsteroidsByAngleAndDistance(listToSort, laserLocation)
          asteroidsSorted.push(...listToSort)
          listToSort = []
          asteroidListCopy = asteroidListCopy.filter(
            filterAsteroid => !asteroidsSorted.includes(filterAsteroid)
          )
          i = 0
        }
      }

      const asteroid200 = asteroidsSorted[199]
      const [x200, y200] = parseAsteroidString(asteroid200)

      return {
        answer2: ((x200 * 100) + y200).toString()
      }
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The best asteroid can see <code>{answer}</code> other asteroids.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      The 200th asteroid vaporized is{' '}
      <code>{answer}</code>.
    </span>
  ),
  buttons: BUTTONS,
  day: 10,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Monitoring Station'
}

export default config
