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

export const throwTheRock = (
  input: string,
  // testArea = [200000000000000, 400000000000000],
  // We'll assume a possible velocity range of -1000 to 1000, based on the input
  velocityRange = [-1000, 1000]
) => {
  const hailstones: Hailstone[] = input
    .split('\n')
    // .slice(0, 4)
    .map((line) => {
      const [position, velocity] = line.split(' @ ')
      const [px, py, pz] = position.split(', ').map(Number)
      const [vx, vy, vz] = velocity.split(', ').map(Number)
      return { position: [px, py, pz], velocity: [vx, vy, vz] }
    })

  // Solve x and y first, ignoring z
  let rx: number | undefined
  let ry: number | undefined
  let rvx: number | undefined
  let rvy: number | undefined
  vxLoop: for (let vx = velocityRange[0]; vx <= velocityRange[1]; vx++) {
    vyLoop: for (let vy = velocityRange[0]; vy <= velocityRange[1]; vy++) {
      // console.log('vx, vy', vx, vy)
      // eslint-disable-next-line no-debugger
      // if (vx === -3 && vy === 1) debugger
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
          // eslint-disable-next-line no-debugger
          // if (j === 4 && i === 3 && vy === 1 && vx === -3) debugger
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
            // console.log(`hailstones ${i} ${j} intersection: ${intersection}`)
            // eslint-disable-next-line no-debugger
            // if (isNaN(intersection[0]) || isNaN(intersection[1])) debugger
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
                // break vyLoop
                continue vyLoop
              }
            }
          }
        }
        // if (intersectionPoint === undefined) {
        //   intersectionPoint = intersection.join(',')
        // } else if (intersection.join(',') !== intersectionPoint) {
        //   break vyLoop
        // }
      }
      if (intersectionPoint === undefined) throw new Error('fuck')
      // // if (intersectionPoints.size === 1) {
      const thePoint = intersectionPoint.split(',').map(Number)
      rx = thePoint[0]
      ry = thePoint[1]
      rvx = vx
      rvy = vy
      break vxLoop
      // }
    }
  }

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
              // break vyLoop
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

  if (rz === undefined || rvz === undefined) throw new Error('fuck')

  console.log(rz, rvz)

  return { answer2: rx + ry + rz }

  // X Axis
  // for (
  //   let velocityOffset = velocityRange[0];
  //   velocityOffset <= velocityRange[1];
  //   velocityOffset++
  // ) {
  //   const adjustedHailstoneXs = hailstones.map(({ position, velocity }) => ({
  //     position: position[0],
  //     velocity: velocity[0] - velocityOffset,
  //   }))
  //   // We have two axes, x and time. So we can do equations.
  //   // If all hailstones intersect at any point (and they're integers), that's our rock's x.
  //   let px: number | undefined
  //   let vx: number | undefined
  //   const hailstone1 = adjustedHailstoneXs[0]
  //   const hailstone2 = adjustedHailstoneXs[1]
  //   const hailstone3 = adjustedHailstoneXs[2]
  //   // We'll treat x-axis as x and time as y
  //   const equation1 = getEquation(
  //     [hailstone1.position, 0],
  //     [hailstone1.velocity, 1]
  //   )
  //   const equation2 = getEquation(
  //     [hailstone2.position, 0],
  //     [hailstone2.velocity, 1]
  //   )
  //   const equation3 = getEquation(
  //     [hailstone3.position, 0],
  //     [hailstone3.velocity, 1]
  //   )
  //   const intersection12 = findIntersection(equation1, equation2)
  //   const intersection13 = findIntersection(equation1, equation3)
  //   const intersection23 = findIntersection(equation2, equation3)
  //   // intersection = [x point of intersect, time of intersect]
  //   if (
  //     // so we need to make sure they're both integers,
  //     intersection12[0] === Math.floor(intersection12[0]) &&
  //     intersection12[1] === Math.floor(intersection12[1]) &&
  //     // and intersection[0] is in the test range,
  //     intersection12[0] >= testArea[0] &&
  //     intersection12[0] <= testArea[1] &&
  //     // and intersection[1] is greater than zero
  //     intersection12[1] > 0
  //   ) {
  //     // if we meet those conditions, the current velocityOffset and
  //     // the x point of intersect represent our rock
  //     px = intersection12[0]
  //     vx = velocityOffset
  //   }
  // }

  // There are rocks that are parallel in each dimension; we might use that
  // const xVelocities = new Set<number>()
  // const yVelocities = new Set<number>()
  // const zVelocities = new Set<number>()
  // hailstones.forEach(({ velocity: [x, y, z] }) => {
  //   xVelocities.add(x)
  //   yVelocities.add(y)
  //   zVelocities.add(z)
  // })
  // console.log('xVelocities', xVelocities)
  // console.log('yVelocities', yVelocities)
  // console.log('zVelocities', zVelocities)
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
      onClick: (input) => throwTheRock(input, /* [7, 27], */ [-4, 4]),
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
