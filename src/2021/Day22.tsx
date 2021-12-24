import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'

import INPUT from './Input/Day22'

// type Pair = [number, number]
// interface Interval extends Pair {
//   id?: number[]
// }

// interface Cuboid {
//   x: Pair,
//   xIds: number[]
//   y: Pair,
//   yIds: number[]
//   z: Pair,
//   zIds: number[]
// }

// interface Checkpoint {
//   value: number
//   start: number[]
//   end: number[]
// }

// const getCheckpoints = (intervals: Cuboid[], whichDimension: 'x' | 'y' | 'z'): Checkpoint[] => intervals
//   .reduce((list, interval, id) => {
//     const dimension = whichDimension === 'x' ?
//       interval.x : whichDimension === 'y' ?
//         interval.y : interval.z

//     const [min, max] = dimension

//     const existingStartPoint = list.find(({ value }) => value === min)
//     if (existingStartPoint) {
//       if (!existingStartPoint.start.includes(id)) {
//         existingStartPoint.start.push(id)
//       }
//     } else {
//       list.push({
//         value: min,
//         start: [id],
//         end: []
//       })
//     }

//     const existingEndPoint = list.find(({ value }) => value === max)
//     if (existingEndPoint) {
//       if (!existingEndPoint.end.includes(id)) {
//         existingEndPoint.end.push(id)
//       }
//     } else {
//       list.push({
//         value: max,
//         start: [],
//         end: [id]
//       })
//     }

//     return list
//   }, [] as Checkpoint[])
//   .sort(({ value: a }, { value: b }) => {
//     return a - b
//   })

// const getIntervals = (checkpoints: Checkpoint[]): Interval[] => {
//   const intervals: Interval[] = []
//   let workingInterval: Interval = [0, 0]
//   let openIntervalIds: number[] = []
//   checkpoints.forEach(({ value, start, end }) => {
//     if (start.length) {
//       if (openIntervalIds.length) {
//         workingInterval[1] = Math.max(value - 1, workingInterval[0])
//         const newInterval: Interval = [workingInterval[0], workingInterval[1]]
//         newInterval.id = [...openIntervalIds]
//         intervals.push(newInterval)
//       }
//       openIntervalIds.push(...start)
//       workingInterval[0] = value
//       workingInterval[1] = value
//       workingInterval.id = [...openIntervalIds]
//     }
//     if (end.length) {
//       workingInterval[1] = value
//       const newInterval: Interval = [workingInterval[0], workingInterval[1]]
//       newInterval.id = [...openIntervalIds]
//       intervals.push(newInterval)
//       openIntervalIds = openIntervalIds.filter(x => !end.includes(x))
//       workingInterval[0] = value + 1
//       workingInterval.id = [...openIntervalIds]
//     }
//   })
//   return intervals.reduce((list, interval) => {
//     if (!list.length) {
//       list.push(interval)
//     } else {
//       if (list[list.length - 1][0] === interval[0] && list[list.length - 1][1] === interval[1]) {
//         interval.id?.forEach(id => {
//           if (!list[list.length - 1].id?.includes(id)) {
//             list[list.length - 1].id?.push(id)
//           }
//         })
//       } else {
//         list.push(interval)
//       }
//     }

//     return list
//   }, [] as Interval[])
// }

// const combineThese = (cuboids: Cuboid[]): Cuboid[] => {
//   const newCuboids: Cuboid[] = []

//   const xIntervals = getIntervals(getCheckpoints(cuboids, 'x'))
//   const yIntervals = getIntervals(getCheckpoints(cuboids, 'y'))
//   const zIntervals = getIntervals(getCheckpoints(cuboids, 'z'))

//   xIntervals.forEach(xInterval => {
//     yIntervals.forEach(yInterval => {
//       zIntervals.forEach(zInterval => {
//           const [xMin, xMax] = xInterval
//           const { id: xId } = xInterval

//           const [yMin, yMax] = yInterval
//           const { id: yId } = yInterval

//           const [zMin, zMax] = zInterval
//           const { id: zId } = zInterval

//           if (xId?.some(xId => yId?.includes(xId) && zId?.includes(xId))) {
//             newCuboids.push({
//               x: [xMin, xMax],
//               xIds: [...(xId as number[])],
//               y: [yMin, yMax],
//               yIds: [...(yId as number[])],
//               z: [zMin, zMax],
//               zIds: [...(zId as number[])]
//             })
//           }
//       })
//     })
//   })

//   return newCuboids
// }

// const mergeCuboids = (cuboids: Cuboid[]): Cuboid[] => cuboids
//   .reduce((list, cuboid, i) => {
//     if (i === 0) {
//       list.push(cuboid)
//     } else {
//       // If these two cuboids match up, we should combine them
//       const prevCuboid = list[list.length - 1]
//       if (
//         (cuboid.x[0] === prevCuboid.x[0] && cuboid.x[1] === prevCuboid.x[1]) &&
//         (cuboid.y[0] === prevCuboid.y[0] && cuboid.y[1] === prevCuboid.y[1])
//       ) {
//         // The x's and y's match, do the z's touch?
//         if (cuboid.z[0] === prevCuboid.z[1] + 1) {
//           // The y's touch, merge them
//           prevCuboid.z[1] = cuboid.z[1]
//         } else {
//           list.push(cuboid)
//         }
//       } else {
//         list.push(cuboid)
//       }
//     }

//     return list
//   }, [] as Cuboid[])

// const subtractACuboid = (cuboid: Cuboid, cuboids: Cuboid[]): Cuboid[] =>
//   combineThese([cuboid, ...cuboids]).filter(({ xIds /* , yIds, zIds */ }) => (
//     !xIds.includes(0) // || !yIds.includes(0) || !zIds.includes(0)
//   ))

// const countCuboids = (
//   cuboids: Cuboid[],
//   xSorted: number[],
//   ySorted: number[],
//   zSorted: number[]
// ): number =>
//   cuboids.reduce((sum, cuboid) => {
//     const xValue = xSorted[cuboid.x[1]] - xSorted[cuboid.x[0]] + 1
//     const yValue = ySorted[cuboid.y[1]] - ySorted[cuboid.y[0]] + 1
//     const zValue = zSorted[cuboid.z[1]] - zSorted[cuboid.z[0]] + 1

//     return (
//       sum + (xValue * yValue * zValue)
//     )
//   }, 0)

const countCuboids = (cuboids: Cuboid[]): number =>
  cuboids.reduce((sum, cuboid) => {
    const xValue = cuboid.x[1] - cuboid.x[0] + 1
    const yValue = cuboid.y[1] - cuboid.y[0] + 1
    const zValue = cuboid.z[1] - cuboid.z[0] + 1

    return (
      sum + (xValue * yValue * zValue)
    )
  }, 0)

interface Cuboid {
  x: [number, number]
  y: [number, number]
  z: [number, number]
}
interface Instruction extends Cuboid {
  on: boolean
}

const common = (minA: number, maxA: number, minB: number, maxB: number)
  : false | [number, number] => {
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
  if (zMaxOuter > zMaxInner) cuboids.push({
    x: [xMinInner, xMaxInner],
    y: [yMinInner, yMaxInner],
    z: [zMaxInner + 1, zMaxOuter]
  })

  // Bottom portion (x and y limited to inner)
  if (zMinOuter < zMinInner) cuboids.push({
    x: [xMinInner, xMaxInner],
    y: [yMinInner, yMaxInner],
    z: [zMinOuter, zMinInner - 1]
  })

  // Front portion (x limited to inner)
  if (yMaxOuter > yMaxInner) cuboids.push({
    x: [xMinInner, xMaxInner],
    y: [yMaxInner + 1, yMaxOuter],
    z: [zMinOuter, zMaxOuter]
  })

  // Back portion (x limited to inner)
  if (yMinOuter < yMinInner) cuboids.push({
    x: [xMinInner, xMaxInner],
    y: [yMinOuter, yMinInner - 1],
    z: [zMinOuter, zMaxOuter]
  })

  // Left portion (no limits)
  if (xMaxOuter > xMaxInner) cuboids.push({
    x: [xMaxInner + 1, xMaxOuter],
    y: [yMinOuter, yMaxOuter],
    z: [zMinOuter, zMaxOuter]
  })

  // Right portion (no limits)
  if (xMinOuter < xMinInner) cuboids.push({
    x: [xMinOuter, xMinInner - 1],
    y: [yMinOuter, yMaxOuter],
    z: [zMinOuter, zMaxOuter]
  })

  return cuboids
}

// Returns [ common cuboid, [...parts of A not in B]] or false
const intersect = (cuboidA: Cuboid, cuboidB: Cuboid): false | [Cuboid, Cuboid[]] => {
  const { x: [xMinA, xMaxA], y: [yMinA, yMaxA], z: [zMinA, zMaxA] } = cuboidA
  const { x: [xMinB, xMaxB], y: [yMinB, yMaxB], z: [zMinB, zMaxB] } = cuboidB

  const commonX = common(xMinA, xMaxA, xMinB, xMaxB)
  const commonY = common(yMinA, yMaxA, yMinB, yMaxB)
  const commonZ = common(zMinA, zMaxA, zMinB, zMaxB)

  if (!commonX || !commonY || !commonZ) return false

  const commonCuboid: Cuboid = {
    x: commonX,
    y: commonY,
    z: commonZ
  }
  const uniques = exclude(cuboidA, commonCuboid)

  return [commonCuboid, uniques]
}

// Returns parts of Cuboid A that aren't in Cuboid B
const subtractCuboidBFromCuboidA = (cuboidA: Cuboid, cuboidB: Cuboid): Cuboid[] => {
  const intersectionResult = intersect(cuboidA, cuboidB)

  if (intersectionResult) return intersectionResult[1]

  return [cuboidA]
}

const BUTTONS: IButton[] = [
  {
    label: 'Initialize the Reboot',
    onClick: (inputKey: string) => {
      const core: Map<string, 0 | 1> = new Map()

      INPUT[inputKey].split('\n').forEach(instruction => {
        const [state, area] = instruction.split(' ')
        const [xRange, yRange, zRange] = area.split(',').map(a => a.split('=')[1])
        const [xMin, xMax] = xRange.split('..').map(n => Number(n))
        const [yMin, yMax] = yRange.split('..').map(n => Number(n))
        const [zMin, zMax] = zRange.split('..').map(n => Number(n))

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
        answer1: Array.from(core.values()).filter(x => x === 1).length.toString()
      }
    }
  },
  {
    // This is based on someone else's version:
    // https://github.com/AugustsK/advent-of-code-solutions/blob/master/2021/day22/partTwo.js
    // because I got sick of fighting this for hours and days on end :P
    label: 'Actually Do the Reboot',
    onClick: (inputKey: string) => {
      const rawInstructions = INPUT[inputKey].split('\n')

      const startTime = new Date().getTime()

      let cuboids: Cuboid[] = []

      const instructions: Instruction[] = rawInstructions
        .map(i => {
          const [state, area] = i.split(' ')
          const [xRange, yRange, zRange] = area.split(',').map(a => a.split('=')[1])
          const [xMin, xMax] = xRange.split('..').map(n => Number(n))
          const [yMin, yMax] = yRange.split('..').map(n => Number(n))
          const [zMin, zMax] = zRange.split('..').map(n => Number(n))
          return {
            on: state === 'on',
            x: [xMin, xMax],
            y: [yMin, yMax],
            z: [zMin, zMax]
          }
        })

      instructions.forEach(({ on, x, y, z }) => {
        if (on) {
          let newCuboids: Cuboid[] = [{ x, y, z }]
          cuboids.forEach(oldCuboid => {
            newCuboids = newCuboids.map(newCuboid => subtractCuboidBFromCuboidA(newCuboid, oldCuboid)).flat()
          })
          cuboids.push(...newCuboids)
        } else {
          cuboids = cuboids.map(cuboid => subtractCuboidBFromCuboidA(cuboid, { x, y, z })).flat()
        }
      })

      console.log(`Total runtime: ${(new Date().getTime() - startTime) / 1000} seconds.`)

      return {
        answer2: countCuboids(cuboids).toString()
      }
    }
  }
  // {
  //   label: 'Actually Do the Reboot',
  //   onClick: (inputKey: string) => {
  //     let onSegments: Cuboid[] = []

  //     const startTime = new Date().getTime()

  //     const instructions = INPUT[inputKey].split('\n')

  //     let prevTime = new Date().getTime()

  //     instructions.forEach((instruction, i) => {
  //       const currentTime = new Date().getTime()
  //       console.log(`Processing ${i + 1} of ${instructions.length}: ${instruction}. Total cuboids before processing: ${onSegments.length
  //         }. Total runtime so far: ${(currentTime - startTime) / 1000} seconds. Time since prev instruction: ${(currentTime - prevTime) / 1000
  //         } seconds.`)
  //       prevTime = currentTime
  //       const [state, area] = instruction.split(' ')
  //       const [xRange, yRange /* , zRange */] = area.split(',').map(a => a.split('=')[1])
  //       const [xMin, xMax] = xRange.split('..').map(n => Number(n))
  //       const [yMin, yMax] = yRange.split('..').map(n => Number(n))
  //       // const [zMin, zMax] = zRange.split('..').map(n => Number(n))

  //       const cuboid: Cuboid = {
  //         x: [xMin, xMax],
  //         xIds: [i],
  //         // y: [yMin, yMax],
  //         // yIds: [i],
  //         // z: [zMin, zMax],
  //         // zIds: [i],
  //       }

  //       switch (state) {
  //         case 'on': {
  //           // onSegments = mergeCuboids(combineThese([cuboid, ...onSegments]))
  //           onSegments = combineThese([cuboid, ...onSegments])
  //           break
  //         }

  //         case 'off':
  //           // onSegments = mergeCuboids(subtractACuboid(cuboid, onSegments))
  //           onSegments = subtractACuboid(cuboid, onSegments)
  //           break

  //         default:
  //           throw new Error('fuck')
  //       }
  //     })

  //     console.log(`Final cuboids: ${onSegments.length}. Final runtime: ${(new Date().getTime() - startTime) / 1000
  //       } seconds.`)

  //     return {
  //       answer2: countCuboids_(onSegments).toString()
  //     }
  //   }
  // },
  // {
  //   label: 'Try This Version',
  //   onClick: (inputKey: string) => {
  //     const rawInstructions = INPUT[inputKey].split('\n')

  //     let onSegments: Cuboid[] = []

  //     const xSet: Set<number> = new Set()
  //     const ySet: Set<number> = new Set()
  //     const zSet: Set<number> = new Set()

  //     const startTime = new Date().getTime()

  // const instructions: Instruction[] = rawInstructions
  //   .map(i => {
  //     const [state, area] = i.split(' ')
  //     const [xRange, yRange, zRange] = area.split(',').map(a => a.split('=')[1])
  //     const [xMin, xMax] = xRange.split('..').map(n => Number(n))
  //     const [yMin, yMax] = yRange.split('..').map(n => Number(n))
  //     const [zMin, zMax] = zRange.split('..').map(n => Number(n))
  //     xSet.add(xMin)
  //     xSet.add(xMax)
  //     ySet.add(yMin)
  //     ySet.add(yMax)
  //     zSet.add(zMin)
  //     zSet.add(zMax)
  //     return {
  //       on: state === 'on',
  //       x: [xMin, xMax],
  //       y: [yMin, yMax],
  //       z: [zMin, zMax]
  //     }
  //   })

  //     const xSorted = Array.from(xSet.values()).sort((a, b) => a - b)
  //     const ySorted = Array.from(ySet.values()).sort((a, b) => a - b)
  //     const zSorted = Array.from(zSet.values()).sort((a, b) => a - b)

  //     instructions.forEach((instruction, i) => {
  //       // const { on, x: [xMin, xMax], y: [yMin, yMax], z: [zMin, zMax] } = instruction

  //       // const xiMin = xSorted.findIndex(n => n === xMin)
  //       // const xiMax = xSorted.findIndex(n => n === xMax)
  //       // // const yiMin = ySorted.findIndex(n => n === yMin)
  //       // // const yiMax = ySorted.findIndex(n => n === yMax)
  //       // // const ziMin = zSorted.findIndex(n => n === zMin)
  //       // // const ziMax = zSorted.findIndex(n => n === zMax)

  //       // const currentTime = new Date().getTime()
  //       // console.log(`Processing ${i + 1} of ${instructions.length}: ${rawInstructions[i]}. Total cuboids before processing: ${onSegments.length
  //       //   }. Total runtime so far: ${(currentTime - startTime) / 1000} seconds.`)

  //       // const cuboid: Cuboid = {
  //       //   x: [xiMin, xiMax],
  //       //   xIds: [i],
  //       //   // y: [yiMin, yiMax],
  //       //   // yIds: [i],
  //       //   // z: [ziMin, ziMax],
  //       //   // zIds: [i],
  //       // }

  //       // if (on) {
  //       //   // onSegments = mergeCuboids(combineThese([cuboid, ...onSegments]))
  //       //   onSegments = combineThese([cuboid, ...onSegments])
  //       // } else {
  //       //   // onSegments = mergeCuboids(subtractACuboid(cuboid, onSegments))
  //       //   onSegments = subtractACuboid(cuboid, onSegments)
  //       // }
  //     })

  //     console.log(`Total run time: ${(new Date().getTime() - startTime) / 1000} seconds.`)

  //     // const size = countCuboids(onSegments, xSorted /* , ySorted, zSorted */)

  //     // console.log(`Final cuboids: ${onSegments.length}. Final runtime: ${(new Date().getTime() - startTime) / 1000
  //     //   } seconds.`)

  //     return {
  //       // answer2: size.toString()
  //     }
  //   }
  // }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      After the initialization, <code>{answer}</code> cubes are ON.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      After the reboot, <code>{answer}</code> cubes are ON.
    </span>
  ),
  buttons: BUTTONS,
  day: 22,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Reactor Reboot'
}

export default config
