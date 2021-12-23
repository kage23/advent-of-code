import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'

import INPUT from './Input/Day22'

type Pair = [number, number]
interface Interval extends Pair {
  id?: number[]
}

interface Cuboid {
  x: Pair,
  y: Pair,
  // z: Pair,
  xIds: number[]
  yIds: number[]
}

interface Checkpoint {
  value: number
  start: boolean
  id: number[]
}

const getCheckpoints = (intervals: Cuboid[], whichDimension: 'x' | 'y'): Checkpoint[] => intervals
  .reduce((list, interval) => {
    const dimension = whichDimension === 'x' ? interval.x : interval.y
    const id = whichDimension === 'x' ? interval.xIds : interval.yIds

    const [min, max] = dimension

    const existingStartPoint = list.find(({ start, value }) => start && value === min)
    if (existingStartPoint) {
      id.forEach(x => {
        if (!existingStartPoint.id.includes(x)) {
          existingStartPoint.id.push(x)
        }
      })
    } else {
      list.push({
        value: min,
        start: true,
        id: [...id]
      })
    }

    const existingEndPoint = list.find(({ start, value }) => !start && value === max)
    if (existingEndPoint) {
      id.forEach(x => {
        if (!existingEndPoint.id.includes(x)) {
          existingEndPoint.id.push(x)
        }
      })
    } else {
      list.push({
        value: max,
        start: false,
        id: [...id]
      })
    }

    return list
  }, [] as Checkpoint[])
  .sort(({ value: a, start }, { value: b }) => {
    if (a !== b) return a - b
    return start ? -1 : 1
  })

const getIntervals = (checkpoints: Checkpoint[]): Interval[] => {
  const intervals: Interval[] = []
  let workingInterval: Interval = [0, 0]
  let openIntervalIds: number[] = []
  checkpoints.forEach(({ value, start, id }) => {
    if (start) {
      if (openIntervalIds.length) {
        workingInterval[1] = Math.max(value - 1, workingInterval[0])
        const newInterval: Interval = [workingInterval[0], workingInterval[1]]
        newInterval.id = [...openIntervalIds]
        intervals.push(newInterval)
      }
      openIntervalIds.push(...id)
      workingInterval[0] = value
      workingInterval[1] = value
      workingInterval.id = [...openIntervalIds]
    } else {
      workingInterval[1] = value
      const newInterval: Interval = [workingInterval[0], workingInterval[1]]
      newInterval.id = [...openIntervalIds]
      intervals.push(newInterval)
      openIntervalIds = openIntervalIds.filter(x => !id.includes(x))
      workingInterval[0] = value + 1
      workingInterval.id = [...openIntervalIds]
    }
  })
  return intervals
}

const combineThese = (cuboids: Cuboid[], instructionId: number): Cuboid[] => {
  const newCuboids: Cuboid[] = []

  const xIntervals = getIntervals(getCheckpoints(cuboids, 'x'))
  const yIntervals = getIntervals(getCheckpoints(cuboids, 'y'))

  xIntervals.forEach(xInterval => {
    yIntervals.forEach(yInterval => {
      const [xMin, xMax] = xInterval
      const { id: xId } = xInterval

      const [yMin, yMax] = yInterval
      const { id: yId } = yInterval

      if (xId?.some(xId => yId?.includes(xId))) {
        newCuboids.push({
          x: [xMin, xMax],
          xIds: [...(xId as number[])],
          y: [yMin, yMax],
          yIds: [...(yId as number[])]
        })
      }
    })
  })

  return newCuboids
}

const subtractACuboid = (cuboid: Cuboid, cuboids: Cuboid[], instructionId: number): Cuboid[] => {
  debugger
  const intersections = combineThese([cuboid, ...cuboids], instructionId)
  debugger
  return intersections
}
// cuboids.reduce((list, cuboid) => {
//   debugger

//   // If it's not entirely within the subtraction zone
//   if (
//     (cuboid.x[0] < xMin || cuboid.x[1] > xMax) &&
//     (cuboid.y[0] < yMin || cuboid.y[1] > yMax)
//   ) {
//     const intersections = combineThese





//     // const newCuboid = JSON.parse(JSON.stringify(cuboid))
//     // if (newCuboid.x[0] < xMin) newCuboid.x[1] = Math.min(xMin - 1, newCuboid.x[1])
//     // if (newCuboid.x[1] > xMax) newCuboid.x[0] = Math.max(xMax + 1, newCuboid.x[0])
//     // list.push(newCuboid)
//   }

//   return list
// }, [] as Cuboid[])

const countCuboids = (cuboids: Cuboid[]): number =>
  cuboids.reduce((sum, cuboid) => {
    const xValue = cuboid.x[1] - cuboid.x[0] + 1
    const yValue = cuboid.y[1] - cuboid.y[0] + 1

    return (
      sum + (xValue * yValue)
    )
  }, 0)

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
    label: 'Actually Do the Reboot',
    onClick: (inputKey: string) => {
      let onSegments: Cuboid[] = []

      INPUT[inputKey].split('\n').forEach((instruction, i) => {
        const [state, area] = instruction.split(' ')
        const [xRange, yRange, zRange] = area.split(',').map(a => a.split('=')[1])
        const [xMin, xMax] = xRange.split('..').map(n => Number(n))
        const [yMin, yMax] = yRange.split('..').map(n => Number(n))
        // const [zMin, zMax] = zRange.split('..').map(n => Number(n))

        const cuboid: Cuboid = {
          x: [xMin, xMax],
          xIds: [i],
          y: [yMin, yMax],
          yIds: [i],
          // z: [zMin, zMax]
        }

        debugger

        switch (state) {
          case 'on': {
            onSegments = combineThese([cuboid, ...onSegments], i)
            break
          }

          case 'off':
            onSegments = subtractACuboid(cuboid, onSegments, i)
            break

          default:
            throw new Error('fuck')
        }
      })

      return {
        answer2: countCuboids(onSegments).toString()
      }
    }
  }
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
