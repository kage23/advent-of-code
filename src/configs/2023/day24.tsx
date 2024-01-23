import inputs from '../../inputs/2023/day24'
import { DayConfig } from '../../routes/Day'

interface Hailstone {
  position: [number, number, number]
  velocity: [number, number, number]
}

interface Equation {
  m: number
  b: number
  x: number
  y: number
}

// y = m * x + b
const getEquation = (
  position: [number, number],
  velocity: [number, number]
): Equation => {
  // position[1] = (velocity[1] / velocity[0]) * position[0] + b
  // y = m * x + b
  // y - (m * x) = b
  const x = position[0]
  const y = position[1]
  const m = velocity[1] / velocity[0]
  const b = y - m * x

  return { m, b, x, y }
}

const closeEnoughInteger = (n: number) => {
  if (n < Math.ceil(n) && n > Math.floor(n) + 0.999) return Math.ceil(n)
  if (n > Math.floor(n) && n < Math.floor(n) + 0.0001) return Math.floor(n)
  return n
}

const findIntersection = (eq1: Equation, eq2: Equation) => {
  const { m: m1, b: b1, x: x1, y: y1 } = eq1
  const { m: m2, b: b2, x: x2, y: y2 } = eq2
  // y = m1 * x + b1
  // y = m2 * x + b2
  // m1 * x + b1 = m2 * x + b2
  // (m1 * x) - (m2 * x) + b1 = b2
  // (m1 - m2)x + b1 = b2
  // (m1 - m2)x = b2 - b1
  // x = (b2 - b1) / (m1 - m2)

  // If one slope equals infinity, we just need to solve the other equation for y when x equals the one slope's x
  // Infinite slope means no velocity, in this context
  if (m1 === Infinity) {
    const x = x1
    const y = m2 * x + b2
    return [x, y].map(closeEnoughInteger)
  } else if (m2 === Infinity) {
    const x = x2
    const y = m1 * x + b1
    return [x, y].map(closeEnoughInteger)
  }

  // If a slope and intercept are both NaN, that means it had x and y velocity of 0.
  // So either the other line goes through that point, or there's no intercept.
  if (isNaN(m1) && isNaN(b1)) {
    const newY2 = m2 * x1 + b2
    if (newY2 === y1) return [x1, y1]
    else return [NaN, NaN]
  } else if (isNaN(m2) && isNaN(b2)) {
    const newY1 = m1 * x2 + b1
    if (newY1 === y2) return [x2, y2]
    else return [NaN, NaN]
  }

  const x = (b2 - b1) / (m1 - m2)
  const y = m1 * x + b1
  return [x, y].map(closeEnoughInteger)
}

const isFutureOneAxis = (
  currentPosition: number,
  velocity: number,
  testPosition: number
) =>
  (velocity > 0 && currentPosition < testPosition) ||
  (velocity < 0 && currentPosition > testPosition) ||
  (velocity === 0 && currentPosition === testPosition)

const isFuture = (hailstone: Hailstone, location: number[]) =>
  isFutureOneAxis(hailstone.position[0], hailstone.velocity[0], location[0]) &&
  isFutureOneAxis(hailstone.position[1], hailstone.velocity[1], location[1])

export const lookForCrossingPaths = (
  input: string,
  testArea = [200000000000000, 400000000000000]
) => {
  const hailstones: Hailstone[] = input.split('\n').map((line) => {
    const [position, velocity] = line.split(' @ ')
    const [px, py, pz] = position.split(', ').map(Number)
    const [vx, vy, vz] = velocity.split(', ').map(Number)
    return { position: [px, py, pz], velocity: [vx, vy, vz] }
  })
  let count = 0
  for (let i = 0; i < hailstones.length; i++) {
    for (let j = i + 1; j < hailstones.length; j++) {
      const equationI = getEquation(
        [hailstones[i].position[0], hailstones[i].position[1]],
        [hailstones[i].velocity[0], hailstones[i].velocity[1]]
      )
      const equationJ = getEquation(
        [hailstones[j].position[0], hailstones[j].position[1]],
        [hailstones[j].velocity[0], hailstones[j].velocity[1]]
      )
      const intersection = findIntersection(equationI, equationJ)
      if (
        intersection[0] >= testArea[0] &&
        intersection[0] <= testArea[1] &&
        intersection[1] >= testArea[0] &&
        intersection[1] <= testArea[1]
      ) {
        // Their paths cross in the test area, is it in the future for both of them?
        if (
          isFuture(hailstones[i], intersection) &&
          isFuture(hailstones[j], intersection)
        )
          count++
      }
    }
  }
  return { answer1: count }
}

export const throwTheRockDemo = (input: string) => {
  const velocityRange = [-5, 5]

  const hailstones: Hailstone[] = input
    .split('\n')
    .map((line) => {
      const [position, velocity] = line.split(' @ ')
      const [px, py, pz] = position.split(', ').map(Number)
      const [vx, vy, vz] = velocity.split(', ').map(Number)
      return { position: [px, py, pz], velocity: [vx, vy, vz] }
    })

  // Solve x and y first, ignoring z
  console.time('Solve for x and y')
  let rx: number | undefined
  let ry: number | undefined
  let rvx: number | undefined
  let rvy: number | undefined
  vxLoop: for (let vx = velocityRange[0]; vx <= velocityRange[1]; vx++) {
    vyLoop: for (let vy = velocityRange[0]; vy <= velocityRange[1]; vy++) {
      const adjustedHailstones: {
        position: [number, number]
        velocity: [number, number]
      }[] = hailstones.map(({ position, velocity }) => ({
        position: [position[0], position[1]],
        velocity: [velocity[0] - vx, velocity[1] - vy],
      }))
      // Do they all intersect?
      let intersectionPoint: string | undefined
      for (let i = 0; i < adjustedHailstones.length; i++) {
        for (let j = i + 1; j < adjustedHailstones.length; j++) {
          const equationI = getEquation(
            adjustedHailstones[i].position,
            adjustedHailstones[i].velocity
          )
          const equationJ = getEquation(
            adjustedHailstones[j].position,
            adjustedHailstones[j].velocity
          )
          // We only need to check the intersection if the m's and b's are actually different
          if (equationI.b !== equationJ.b || equationI.m !== equationJ.m) {
            const intersection = findIntersection(equationI, equationJ)
            if (
              // NaN means there wasn't an intersection
              (isNaN(intersection[0]) || isNaN(intersection[1])) ||
              // We only care about integers
              (intersection[0] !== Math.floor(intersection[0]) || intersection[1] !== Math.floor(intersection[1]))
            ) {
              continue vyLoop
            }
            if (!isNaN(intersection[0]) && !isNaN(intersection[1])) {
              if (intersectionPoint === undefined) {
                intersectionPoint = intersection.join(',')
              } else if (intersection.join(',') !== intersectionPoint) {
                continue vyLoop
              }
            }
          }
        }
      }
      if (intersectionPoint === undefined) throw new Error('fuck')
      const thePoint = intersectionPoint.split(',').map(Number)
      rx = thePoint[0]
      ry = thePoint[1]
      rvx = vx
      rvy = vy
      break vxLoop
    }
  }
  console.timeEnd('Solve for x and y')

  if (
    rx === undefined ||
    ry === undefined ||
    rvx === undefined ||
    rvy === undefined
  )
    throw new Error('fuck')

  console.log(rx, ry, rvx, rvy)

  // Now that we've got the x and y vectors, we need to get the z
  // This is going to be similar to getting the x and y, we just brute force it :P
  console.time('Solve for z')
  let rz: number | undefined
  let rvz: number | undefined
  vzLoop:
  for (let vz = velocityRange[0]; vz <= velocityRange[1]; vz++) {
    const adjustedHailstones: {
      position: [number, number]
      velocity: [number, number]
    }[] = hailstones.map(({ position, velocity }) => ({
      // I think we can do this with just two dimensions, especially since we already know one
      position: [position[0], position[2]],
      velocity: [velocity[0] - rvx!, velocity[2] - vz]
    }))
    // Do they all intersect?
    let intersectionPoint: string | undefined
    for (let i = 0; i < adjustedHailstones.length; i++) {
      for (let j = 0; j < adjustedHailstones.length; j++) {
        const equationI = getEquation(
          adjustedHailstones[i].position,
          adjustedHailstones[i].velocity
        )
        const equationJ = getEquation(
          adjustedHailstones[j].position,
          adjustedHailstones[j].velocity
        )
        // We only need to check the intersection if the m's and b's are actually different
        if (equationI.b !== equationJ.b || equationI.m !== equationJ.m) {
          const intersection = findIntersection(equationI, equationJ)
          if (
            // NaN means there wasn't an intersection
            (isNaN(intersection[0]) || isNaN(intersection[1])) ||
            // We only care about integers
            (intersection[0] !== Math.floor(intersection[0]) || intersection[1] !== Math.floor(intersection[1]))
          ) {
            continue vzLoop
          }
          if (!isNaN(intersection[0]) && !isNaN(intersection[1])) {
            if (intersectionPoint === undefined) {
              intersectionPoint = intersection.join(',')
            } else if (intersection.join(',') !== intersectionPoint) {
              continue vzLoop
            }
          }
        }
      }
    }
    if (intersectionPoint === undefined) throw new Error('fuck')
    const thePoint = intersectionPoint.split(',').map(Number)
    rz = thePoint[1]
    rvz = vz
    break vzLoop
  }
  console.timeEnd('Solve for z')

  if (rz === undefined || rvz === undefined) throw new Error('fuck')

  console.log(rz, rvz)

  return { answer2: rx + ry + rz }
}

// I'm not proud of this; the next few functions are just copied from https://pastebin.com/gzRpVNU1
// Which I found from redditor Goues after trying other stuff like messing with bigints and Z3
// It's the same principle as I tried, just brute forcing it basically, but being smarter about
// the way you go through the brute force, and using matrix math that I don't really understand
// to find the intersection points.
const findLineLambda = (a: number, b: number, c: number, d: number, p: number, q: number, r: number, s: number) => {
  const det = (c - a) * (s - q) - (r - p) * (d - b)
  if (det === 0) return null
  return Math.round(((s - q) * (r - a) + (p - r) * (s - b)) / det)
}

const findIntersectionPoint = (a: { position: number[], velocity: number[] }, b: { position: number[], velocity: number[] }) => {
  const lambda = findLineLambda(
    a.position[0], a.position[1], a.position[0] + a.velocity[0], a.position[1] + a.velocity[1],
    b.position[0], b.position[1], b.position[0] + b.velocity[0], b.position[1] + b.velocity[1],
  )
  if (lambda === null) return null

  const f = a.position[0] + lambda * a.velocity[0]
  const g = a.position[1] + lambda * a.velocity[1]
  return [f, g]
}

const findCommonIntersection = (v: [number, number], hailstones: Hailstone[], secondDimension: 'y' | 'z') => {
  let viable = true
  let current: number[] | undefined
  const adjustedHailstones = hailstones.map(({ position, velocity }) => {
    const xv = velocity[0] + v[0]
    const p2 = secondDimension === 'y' ? position[1] : position[2]
    const v2 = secondDimension === 'y' ? velocity[1] + v[1] : velocity[2] + v[1]
    return { position: [position[0], p2], velocity: [xv, v2] }
  })
  for (let i = 0; i < adjustedHailstones.length; i++) {
    for (let j = i + 1; j < adjustedHailstones.length; j++) {
      if (!viable) continue
      const point = findIntersectionPoint(adjustedHailstones[i], adjustedHailstones[j])
      if (point === null) continue
      if (!current) current = point

      viable = point[0] === current![0] && point[1] === current![1]
    }
  }
  if (!viable) return false
  return current
}

export const throwTheRock = (input: string) => {
  const hailstones: Hailstone[] = input
  .split('\n')
  .slice(0, 10)
  .map((line) => {
    const [position, velocity] = line.split(' @ ')
    const [px, py, pz] = position.split(', ').map(Number)
    const [vx, vy, vz] = velocity.split(', ').map(Number)
    return { position: [px, py, pz], velocity: [vx, vy, vz] }
  })

  for (let x = 0; x <= Infinity; x++) {
    for (let y = 0; y <= x; y++) {
      for (const [sx, sy] of [[1, 1], [1, -1], [-1, 1], [-1, -1]]) {
        // Check for an intersection
        const xy = findCommonIntersection([x * sx, y * sy], hailstones, 'y')
        if (!xy) continue

        for (let z = 0; z <= Infinity; z++) {
          for (const sz of [1, -1]) {
            // If there's an xz intersection, we've found the answer
            const xz = findCommonIntersection([x * sx, z * sz], hailstones, 'z')
            if (!xz) continue
            return { answer2: xy[0] + xy[1] + xz[1] }
          }
        }
      }
    }
  }
}

const day24: Omit<DayConfig, 'year'> = {
  answer1Text: `answer hailstones' paths will cross in the test area.`,
  answer2Text: `The sum of the rock's starting coords is answer.`,
  buttons: [
    {
      label: 'Look for Crossing Paths (Demo)',
      onClick: (input) => lookForCrossingPaths(input, [7, 27]),
    },
    {
      label: 'Look for Crossing Paths',
      onClick: lookForCrossingPaths,
    },
    {
      label: 'Throw the Rock (Demo)',
      onClick: throwTheRockDemo,
    },
    {
      label: 'Throw the Rock',
      onClick: throwTheRock,
    },
  ],
  id: 24,
  inputs,
  title: 'Never Tell Me The Odds',
}

export default day24
