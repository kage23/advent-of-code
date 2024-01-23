import inputs from '../../inputs/2021/day22'
import { DayConfig } from '../../routes/Day'

type Pair = [number, number]

interface Cuboid {
  x: Pair
  y: Pair
  z: Pair
}

interface Instruction extends Cuboid {
  on: boolean
}

export const initializeReboot = (input: string) => {
  const core: Map<string, 0 | 1> = new Map()

  input.split('\n').forEach((instruction) => {
    const [state, area] = instruction.split(' ')
    const [xRange, yRange, zRange] = area.split(',').map((a) => a.split('=')[1])
    const [xMin, xMax] = xRange.split('..').map((n) => Number(n))
    const [yMin, yMax] = yRange.split('..').map((n) => Number(n))
    const [zMin, zMax] = zRange.split('..').map((n) => Number(n))

    for (let x = Math.max(xMin, -50); x <= Math.min(xMax, 50); x++) {
      for (let y = Math.max(yMin, -50); y <= Math.min(yMax, 50); y++) {
        for (let z = Math.max(zMin, -50); z <= Math.min(zMax, 50); z++) {
          const key = `${x},${y},${z}`
          core.set(key, state === 'on' ? 1 : 0)
        }
      }
    }
  })

  return {
    answer1: Array.from(core.values()).filter((x) => x === 1).length,
  }
}

// The next few functions are based on someone else's version:
// https://github.com/AugustsK/advent-of-code-solutions/blob/master/2021/day22/partTwo.js
// because I got sick of fighting this for hours and days on end :P

const common = (
  minA: number,
  maxA: number,
  minB: number,
  maxB: number
): false | Pair => {
  const min = Math.max(minA, minB)
  const max = Math.min(maxA, maxB)

  if (min <= max) return [min, max]
  return false
}

const exclude = (cuboid: Cuboid, exclude: Cuboid): Cuboid[] => {
  const cuboids: Cuboid[] = []

  const {
    x: [xMinOuter, xMaxOuter],
    y: [yMinOuter, yMaxOuter],
    z: [zMinOuter, zMaxOuter],
  } = cuboid

  const {
    x: [xMinInner, xMaxInner],
    y: [yMinInner, yMaxInner],
    z: [zMinInner, zMaxInner],
  } = exclude

  // Top portion (x and y limited to inner)
  if (zMaxOuter > zMaxInner)
    cuboids.push({
      x: [xMinInner, xMaxInner],
      y: [yMinInner, yMaxInner],
      z: [zMaxInner + 1, zMaxOuter],
    })

  // Bottom portion (x and y limited to inner)
  if (zMinOuter < zMinInner)
    cuboids.push({
      x: [xMinInner, xMaxInner],
      y: [yMinInner, yMaxInner],
      z: [zMinOuter, zMinInner - 1],
    })

  // Front portion (x limited to inner)
  if (yMaxOuter > yMaxInner)
    cuboids.push({
      x: [xMinInner, xMaxInner],
      y: [yMaxInner + 1, yMaxOuter],
      z: [zMinOuter, zMaxOuter],
    })

  // Back portion (x limited to inner)
  if (yMinOuter < yMinInner)
    cuboids.push({
      x: [xMinInner, xMaxInner],
      y: [yMinOuter, yMinInner - 1],
      z: [zMinOuter, zMaxOuter],
    })

  // Left portion (no limits)
  if (xMaxOuter > xMaxInner)
    cuboids.push({
      x: [xMaxInner + 1, xMaxOuter],
      y: [yMinOuter, yMaxOuter],
      z: [zMinOuter, zMaxOuter],
    })

  // Right portion (no limits)
  if (xMinOuter < xMinInner)
    cuboids.push({
      x: [xMinOuter, xMinInner - 1],
      y: [yMinOuter, yMaxOuter],
      z: [zMinOuter, zMaxOuter],
    })

  return cuboids
}

// Returns [ common cuboid, [...parts of A not in B]] or false
const intersect = (
  cuboidA: Cuboid,
  cuboidB: Cuboid
): false | [Cuboid, Cuboid[]] => {
  const {
    x: [xMinA, xMaxA],
    y: [yMinA, yMaxA],
    z: [zMinA, zMaxA],
  } = cuboidA
  const {
    x: [xMinB, xMaxB],
    y: [yMinB, yMaxB],
    z: [zMinB, zMaxB],
  } = cuboidB

  const commonX = common(xMinA, xMaxA, xMinB, xMaxB)
  const commonY = common(yMinA, yMaxA, yMinB, yMaxB)
  const commonZ = common(zMinA, zMaxA, zMinB, zMaxB)

  if (!commonX || !commonY || !commonZ) return false

  const commonCuboid: Cuboid = {
    x: commonX,
    y: commonY,
    z: commonZ,
  }
  const uniques = exclude(cuboidA, commonCuboid)

  return [commonCuboid, uniques]
}

// Returns parts of Cuboid A that aren't in Cuboid B
const subtractCuboidBFromCuboidA = (
  cuboidA: Cuboid,
  cuboidB: Cuboid
): Cuboid[] => {
  const intersectionResult = intersect(cuboidA, cuboidB)

  if (intersectionResult) return intersectionResult[1]

  return [cuboidA]
}

const countCuboids = (cuboids: Cuboid[]): number =>
  cuboids.reduce((sum, cuboid) => {
    const xValue = cuboid.x[1] - cuboid.x[0] + 1
    const yValue = cuboid.y[1] - cuboid.y[0] + 1
    const zValue = cuboid.z[1] - cuboid.z[0] + 1

    return sum + xValue * yValue * zValue
  }, 0)

export const doTheReboot = (input: string) => {
  const rawInstructions = input.split('\n')

  const startTime = new Date().getTime()

  let cuboids: Cuboid[] = []

  const instructions: Instruction[] = rawInstructions.map((i) => {
    const [state, area] = i.split(' ')
    const [xRange, yRange, zRange] = area.split(',').map((a) => a.split('=')[1])
    const [xMin, xMax] = xRange.split('..').map((n) => Number(n))
    const [yMin, yMax] = yRange.split('..').map((n) => Number(n))
    const [zMin, zMax] = zRange.split('..').map((n) => Number(n))
    return {
      on: state === 'on',
      x: [xMin, xMax],
      y: [yMin, yMax],
      z: [zMin, zMax],
    }
  })

  instructions.forEach(({ on, x, y, z }) => {
    if (on) {
      let newCuboids: Cuboid[] = [{ x, y, z }]
      cuboids.forEach((oldCuboid) => {
        newCuboids = newCuboids
          .map((newCuboid) => subtractCuboidBFromCuboidA(newCuboid, oldCuboid))
          .flat()
      })
      cuboids.push(...newCuboids)
    } else {
      cuboids = cuboids
        .map((cuboid) => subtractCuboidBFromCuboidA(cuboid, { x, y, z }))
        .flat()
    }
  })

  console.log(
    `Total runtime: ${(new Date().getTime() - startTime) / 1000} seconds.`
  )

  return {
    answer2: countCuboids(cuboids),
  }
}

const day22: Omit<DayConfig, 'year'> = {
  answer1Text: 'After the initialization, answer cubes are ON.',
  answer2Text: 'After the reboot, answer cubes are ON.',
  buttons: [
    {
      label: 'Initialize the Reboot',
      onClick: initializeReboot,
    },
    {
      label: 'Actually Do the Reboot',
      onClick: doTheReboot,
    },
  ],
  id: 22,
  inputs,
  title: 'Reactor Reboot',
}

export default day22
