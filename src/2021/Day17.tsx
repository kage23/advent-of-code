import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'

import INPUT from '../Inputs/2021/Day17'

interface TargetArea {
  minX: number
  maxX: number
  minY: number
  maxY: number
}

const parseInput = (input: string): TargetArea => {
  const [, coordsStr] = input.split('target area: ')
  const [xStr, yStr] = coordsStr.split(', ').map(s => s.slice(2))
  const [minX, maxX] = xStr.split('..').map(n => Number(n))
  const [minY, maxY] = yStr.split('..').map(n => Number(n))
  return { minX, maxX, minY, maxY }
}

const fireShot = ({ minX, maxX, minY, maxY }: TargetArea, x: number, y: number): {
  hit: boolean
  overshot: boolean
  path: string[]
  velocity: [number, number]
} => {
  const location = [0, 0] as [number, number]
  let hit = false
  let overshot = false
  const velocity = [x, y] as [number, number]
  const path: string[] = [JSON.stringify(location)]

  const stillGoing = () => {
    const leftOfTargetMovingRight = location[0] < minX && velocity[0] > 0
    const aboveTheTarget = location[0] >= minX && location[0] <= maxX && location[1] >= maxY

    if (location[0] > maxX) {
      overshot = true
    }

    return leftOfTargetMovingRight || aboveTheTarget
  }

  while (!hit && stillGoing()) {
    location[0] += velocity[0]
    location[1] += velocity[1]
    path.push(JSON.stringify(location))

    if (velocity[0] < 0) velocity[0]++
    if (velocity[0] > 0) velocity[0]--
    velocity[1]--

    if (
      location[0] >= minX && location[0] <= maxX &&
      location[1] >= minY && location[1] <= maxY
    ) {
      hit = true
    }
  }

  return { hit, overshot, path, velocity }
}

const getMaxHeight = (y: number): number => {
  let sum = 0
  for (let i = y; i >= 0; i--) sum += i
  return sum
}

const findTrickShot = (targetArea: TargetArea): { yVelocity: number, yHeight: number } => {
  const goodShots: { yVelocity: number, yHeight: number }[] = []

  for (let y = 0; y <= targetArea.minY * -1; y++) {
    if (doesItFallThrough(targetArea, y)) {
      goodShots.push({ yVelocity: y, yHeight: getMaxHeight(y) })
    }
  }

  const maxYHeight = Math.max(...goodShots.map(({ yHeight }) => yHeight))

  return goodShots.find(
    ({ yHeight }) => yHeight === maxYHeight
  ) as { yVelocity: number, yHeight: number }
}

const findAllShots = (targetArea: TargetArea): number => {
  const goodShots: {
    velocity: [number, number]
    yHeight: number
  }[] = []

  const { yVelocity: maxY } = findTrickShot(targetArea)
  for (let x = 0; x <= targetArea.maxX; x++) {
    for (let y = targetArea.minY; y <= maxY; y++) {
      const shotResult = fireShot(targetArea, x, y)

      if (shotResult.hit) {
        goodShots.push({
          velocity: [x, y],
          yHeight: Math.max(...shotResult.path.map(s => JSON.parse(s)).map(([, y]) => y))
        })
      }
    }
  }

  return goodShots.length
}

const doesItFallThrough = ({ minY, maxY }: TargetArea, startingYVelocity: number) => {
  const velocityAtZero = (startingYVelocity + 1) * -1

  // Watch it fall
  let currentHeight = 0
  let i = velocityAtZero
  while (currentHeight >= minY) {
    currentHeight += i
    i--
    if (currentHeight >= minY && currentHeight <= maxY) {
      return true
    }
  }
  return false
}

const BUTTONS: IButton[] = [
  {
    label: 'Find the Best Trick Shot',
    onClick: (inputKey: string) => {
      const targetArea = parseInput(INPUT[inputKey])

      return {
        answer1: findTrickShot(targetArea).yHeight.toString()
      }
    }
  },
  {
    label: 'Find All the Shots',
    onClick: (inputKey: string) => {
      const targetArea = parseInput(INPUT[inputKey])

      return {
        answer2: findAllShots(targetArea).toString()
      }
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The best trick shot reaches a height of <code>{answer}</code>.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      There are <code>{answer}</code> good shots.
    </span>
  ),
  buttons: BUTTONS,
  day: 17,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Trick Shot'
}

export default config
