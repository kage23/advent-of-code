import inputs from '../../inputs/2018/day23'
import { DayConfig } from '../../routes/Day'
import manhattanDistance from '../../utils/manhattanDistance'

export const countInRangeNanobots = (inputKey: string) => {
  const nanobots: number[][] = inputs.get(inputKey)!.split('\n')
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

  return { answer1: nanobotsInRange }
}

export const findBestLocation = (inputKey: string) => {
  let minX = 0, minY = 0, minZ = 0, maxX = 0, maxY = 0, maxZ = 0
  const nanobots: number[][] = inputs.get(inputKey)!.split('\n')
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

  return {
    answer2: manhattanDistance(bestOrigin, [0, 0, 0])
  }
}

const day23: Omit<DayConfig, 'year'> = {
  answer1Text: 'answer nanbots are in range of the strongest nanobot.',
  answer2Text: 'The best place is answer distance from [0,0,0].',
  buttons: [
    {
      label: 'Count In-Range Nanobots',
      onClick: countInRangeNanobots
    },
    {
      label: 'Find Best Location',
      onClick: findBestLocation
    }
  ],
  id: 23,
  inputs,
  title: 'Experimental Emergency Teleportation',
}

export default day23
