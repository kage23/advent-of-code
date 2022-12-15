import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'

import INPUT from '../Inputs/2018/Day23'
import { manhattanDistance } from '../utils/Various'

let answer2_a = ''

const countInRangeNanobots = (input: string): number => {
  const nanobots: number[][] = input.split('\n')
    .map(nanobotStr => {
      const [pos, rStr] = nanobotStr.split(', ')
      const [xStr, yStr, zStr] = pos.split(',')

      return [parseInt(xStr.slice(5)), parseInt(yStr), parseInt(zStr), parseInt(rStr.slice(2))]
    })
    .sort((a, b) => b[3] - a[3])

  const strongestNanobot = nanobots[0]
  let nanobotsInRange = 0

  nanobots.forEach(nanobot => {
    if (manhattanDistance(nanobot, strongestNanobot, 3) <= strongestNanobot[3]) nanobotsInRange++
  })

  return nanobotsInRange
}

const findBestLocation = (input: string): number[] => {
  let minX = 0, minY = 0, minZ = 0, maxX = 0, maxY = 0, maxZ = 0
  const nanobots: number[][] = input.split('\n')
    .map(nanobotStr => {
      const [pos, rStr] = nanobotStr.split(', ')
      const [xStr, yStr, zStr] = pos.split(',')
      const x = parseInt(xStr.slice(5))
      const y = parseInt(yStr)
      const z = parseInt(zStr)

      minX = Math.min(x, minX)
      minY = Math.min(y, minY)
      minZ = Math.min(z, minZ)
      maxX = Math.max(x, maxX)
      maxY = Math.max(y, maxY)
      maxZ = Math.max(z, maxZ)

      return [x, y, z, parseInt(rStr.slice(2))]
    })
    .sort((a, b) => b[3] - a[3])

  let scale = maxX - minX
  let bestOrigin = [Number.MAX_SAFE_INTEGER / 3, Number.MAX_SAFE_INTEGER / 3, Number.MAX_SAFE_INTEGER / 3]

  while (scale > 0) {
    let maxCount = 0

    for (let x = minX; x <= maxX; x += scale) {
      for (let y = minY; y <= maxY; y += scale) {
        for (let z = minZ; z <= maxZ; z += scale) {
          let localCount = 0
          for (const [nx, ny, nz, nr] of nanobots) {
            const dist = manhattanDistance([x, y, z], [nx, ny, nz])
            if (dist - nr < scale) localCount++
          }
          if (maxCount < localCount) {
            maxCount = localCount
            bestOrigin = [x, y, z]
          } else if (maxCount === localCount) {
            if (manhattanDistance([0, 0, 0], [x, y, z]) < manhattanDistance([0, 0, 0], bestOrigin)) {
              bestOrigin = [x, y, z]
            }
          }
        }
      }
    }
    minX = bestOrigin[0] - scale
    maxX = bestOrigin[0] + scale
    minY = bestOrigin[1] - scale
    maxY = bestOrigin[1] + scale
    minZ = bestOrigin[2] - scale
    maxZ = bestOrigin[2] + scale
    scale = Math.floor(scale / 2)
  }

  return bestOrigin
}

const BUTTONS: IButton[] = [
  {
    label: 'Count In-Range Nanobots',
    onClick: (inputKey) => {
      return {
        answer1: countInRangeNanobots(INPUT[inputKey]).toString()
      }
    }
  },
  {
    label: 'Find Best Location',
    onClick: (inputKey) => {
      const result = findBestLocation(INPUT[inputKey])
      answer2_a = JSON.stringify(result)

      return {
        answer2: manhattanDistance(result, [0, 0, 0]).toString()
      }
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      <code>{answer}</code> nanbots are in range of the strongest nanobot.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      The best place to be is{' '}
      <code>{answer2_a}</code>. It is {' '}
      <code>{answer}</code> from <code>[0,0,0]</code>.
    </span>
  ),
  buttons: BUTTONS,
  day: 23,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Experimental Emergency Teleportation'
}

export default config