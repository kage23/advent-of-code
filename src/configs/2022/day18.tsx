import inputs from '../../inputs/2022/day18'
import { DayConfig } from '../../routes/Day'

export const findSurfaceArea = (input: string) => {
  const droplets: Map<string, number> = new Map(input.split('\n').map(
    droplet => ([droplet, 6])
  ))
  Array.from(droplets.keys()).forEach(droplet => {
    const [x, y, z] = droplet.split(',').map(n => Number(n))
    let sides = 6
    const left = [x - 1, y, z]
    const right = [x + 1, y, z]
    const front = [x, y + 1, z]
    const back = [x, y - 1, z]
    const up = [x, y, z + 1]
    const down = [x, y, z - 1]
      ;[left, right, front, back, up, down].forEach(neighbor => {
        if (droplets.has(neighbor.join(','))) sides -= 1
      })
    droplets.set(droplet, sides)
  })
  return {
    answer1: Array.from(droplets.values()).reduce((a, b) => a + b)
  }
}

export const findOuterSurfaceArea = (input: string) => {
  let xMin = Number.MAX_SAFE_INTEGER
  let xMax = Number.MIN_SAFE_INTEGER
  let yMin = Number.MAX_SAFE_INTEGER
  let yMax = Number.MIN_SAFE_INTEGER
  let zMin = Number.MAX_SAFE_INTEGER
  let zMax = Number.MIN_SAFE_INTEGER

  const droplets: Map<string, number> = new Map(input.split('\n').map(
    droplet => {
      const [x, y, z] = droplet.split(',').map(n => Number(n))
      xMin = Math.min(xMin, x)
      xMax = Math.max(xMax, x)
      yMin = Math.min(yMin, y)
      yMax = Math.max(yMax, y)
      zMin = Math.min(zMin, z)
      zMax = Math.max(zMax, z)
      return [droplet, 6]
    }
  ))

  const outsideAir = [[xMin - 1, yMin - 1, zMin - 1].join(',')]
  for (let i = 0; i < outsideAir.length; i++) {
    const [airX, airY, airZ] = outsideAir[i].split(',').map(n => Number(n))
    const neighbors = [
      // Left
      [airX - 1, airY, airZ],
      // Right
      [airX + 1, airY, airZ],
      // Back
      [airX, airY - 1, airZ],
      // Front
      [airX, airY + 1, airZ],
      // Up
      [airX, airY, airZ - 1],
      // Down
      [airX, airY, airZ + 1]
    ]
    for (let n = 0; n < neighbors.length; n++) {
      const neighbor = neighbors[n]
      if (
        !outsideAir.includes(neighbor.join(',')) &&
        !droplets.has(neighbor.join(',')) &&
        neighbor[0] >= xMin - 1 &&
        neighbor[0] <= xMax + 1 &&
        neighbor[1] >= yMin - 1 &&
        neighbor[1] <= yMax + 1 &&
        neighbor[2] >= zMin - 1 &&
        neighbor[2] <= zMax + 1
      ) {
        outsideAir.push(neighbor.join(','))
      }
    }
  }

  Array.from(droplets.keys()).forEach(droplet => {
    const [x, y, z] = droplet.split(',').map(n => Number(n))
    let sides = 0
    const left = [x - 1, y, z]
    const right = [x + 1, y, z]
    const front = [x, y + 1, z]
    const back = [x, y - 1, z]
    const up = [x, y, z + 1]
    const down = [x, y, z - 1]
      ;[left, right, front, back, up, down].forEach(neighbor => {
        if (outsideAir.includes(neighbor.join(','))) sides += 1
      })
    droplets.set(droplet, sides)
  })

  return {
    answer2: Array.from(droplets.values()).reduce((a, b) => a + b)
  }
}

const day18: Omit<DayConfig, 'year'> = {
  answer1Text: 'The surface area of the exposed droplets is answer.',
  answer2Text: 'The outer surface area of the exposed droplets is answer.',
  buttons: [
    {
      label: 'Find Surface Area',
      onClick: findSurfaceArea
    },
    {
      label: 'Find Outer Surface Area',
      onClick: findOuterSurfaceArea
    },
  ],
  id: 18,
  inputs,
  title: 'Boiling Boulders',
}

export default day18
