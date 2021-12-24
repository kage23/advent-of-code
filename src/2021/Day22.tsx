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
  xIds: number[]
  y: Pair,
  yIds: number[]
  // z: Pair,
  // zIds: number[]
}

interface Checkpoint {
  value: number
  start: number[]
  end: number[]
}

const getCheckpoints = (intervals: Cuboid[], whichDimension: 'x' | 'y' | 'z'): Checkpoint[] => intervals
  .reduce((list, interval, id) => {
    // const dimension = whichDimension === 'x' ?
    //   interval.x : whichDimension === 'y' ?
    //   interval.y : interval.z
    const dimension = whichDimension === 'x' ? interval.x : interval.y

    const [min, max] = dimension

    const existingStartPoint = list.find(({ value }) => value === min)
    if (existingStartPoint) {
      if (!existingStartPoint.start.includes(id)) {
        existingStartPoint.start.push(id)
      }
    } else {
      list.push({
        value: min,
        start: [id],
        end: []
      })
    }

    const existingEndPoint = list.find(({ value }) => value === max)
    if (existingEndPoint) {
      if (!existingEndPoint.end.includes(id)) {
        existingEndPoint.end.push(id)
      }
    } else {
      list.push({
        value: max,
        start: [],
        end: [id]
      })
    }

    return list
  }, [] as Checkpoint[])
  .sort(({ value: a }, { value: b }) => {
    return a - b
  })

const getIntervals = (checkpoints: Checkpoint[]): Interval[] => {
  const intervals: Interval[] = []
  let workingInterval: Interval = [0, 0]
  let openIntervalIds: number[] = []
  checkpoints.forEach(({ value, start, end }) => {
    if (start.length) {
      if (openIntervalIds.length) {
        workingInterval[1] = Math.max(value - 1, workingInterval[0])
        const newInterval: Interval = [workingInterval[0], workingInterval[1]]
        newInterval.id = [...openIntervalIds]
        intervals.push(newInterval)
      }
      openIntervalIds.push(...start)
      workingInterval[0] = value
      workingInterval[1] = value
      workingInterval.id = [...openIntervalIds]
    }
    if (end.length) {
      workingInterval[1] = value
      const newInterval: Interval = [workingInterval[0], workingInterval[1]]
      newInterval.id = [...openIntervalIds]
      intervals.push(newInterval)
      openIntervalIds = openIntervalIds.filter(x => !end.includes(x))
      workingInterval[0] = value + 1
      workingInterval.id = [...openIntervalIds]
    }
  })
  return intervals.reduce((list, interval) => {
    if (!list.length) {
      list.push(interval)
    } else {
      if (list[list.length - 1][0] === interval[0] && list[list.length - 1][1] === interval[1]) {
        interval.id?.forEach(id => {
          if (!list[list.length - 1].id?.includes(id)) {
            list[list.length - 1].id?.push(id)
          }
        })
      } else {
        list.push(interval)
      }
    }

    return list
  }, [] as Interval[])
}

const combineThese = (cuboids: Cuboid[]): Cuboid[] => {
  const newCuboids: Cuboid[] = []

  const xIntervals = getIntervals(getCheckpoints(cuboids, 'x'))
  const yIntervals = getIntervals(getCheckpoints(cuboids, 'y'))
  // const zIntervals = getIntervals(getCheckpoints(cuboids, 'z'))

  xIntervals.forEach(xInterval => {
    yIntervals.forEach(yInterval => {
    //   zIntervals.forEach(zInterval => {
        const [xMin, xMax] = xInterval
        const { id: xId } = xInterval

        const [yMin, yMax] = yInterval
        const { id: yId } = yInterval

        // const [zMin, zMax] = zInterval
        // const { id: zId } = zInterval

        if (xId?.some(xId => yId?.includes(xId) /* && zId?.includes(xId) */ )) {
          newCuboids.push({
            x: [xMin, xMax],
            xIds: [...(xId as number[])],
            y: [yMin, yMax],
            yIds: [...(yId as number[])],
            // z: [zMin, zMax],
            // zIds: [...(zId as number[])]
          })
        }
    //   })
    })
  })

  return newCuboids
}

const mergeCuboids = (cuboids: Cuboid[]): Cuboid[] => cuboids
  .reduce((list, cuboid, i) => {
    if (i === 0) {
      list.push(cuboid)
    } else {
      // If these two cuboids match up, we should combine them
      // For 1d, that's easy, but how do we deal with two and three?
      // I think for 2d, one dimension has to match, then the other has to touch
      const prevCuboid = list[list.length - 1]
      if (cuboid.x[0] === prevCuboid.x[0] && cuboid.x[1] === prevCuboid.x[1]) {
        // The x's match, do the y's touch?
        if (cuboid.y[0] === prevCuboid.y[1] + 1) {
          // The y's touch, merge them
          prevCuboid.y[1] = cuboid.y[1]
        } else {
          list.push(cuboid)
        }
      } else {
        list.push(cuboid)
      }
    }

    return list
  }, [] as Cuboid[])

const subtractACuboid = (cuboid: Cuboid, cuboids: Cuboid[]): Cuboid[] =>
  combineThese([cuboid, ...cuboids]).filter(({ xIds, yIds /* , zIds */ }) => (
    !xIds.includes(0) || !yIds.includes(0) // || !zIds.includes(0)
  ))

const countCuboids = (cuboids: Cuboid[]): number =>
  cuboids.reduce((sum, cuboid) => {
    const xValue = cuboid.x[1] - cuboid.x[0] + 1
    const yValue = cuboid.y[1] - cuboid.y[0] + 1
    // const zValue = cuboid.z[1] - cuboid.z[0] + 1

    return (
      sum + (xValue * yValue /* * zValue */ )
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

      const startTime = new Date().getTime()

      const instructions = INPUT[inputKey].split('\n')

      let prevTime = new Date().getTime()

      instructions.forEach((instruction, i) => {
        const currentTime = new Date().getTime()
        console.log(`Processing ${i + 1} of ${instructions.length}: ${instruction}. Total cuboids before processing: ${
          onSegments.length
        }. Total runtime so far: ${(currentTime - startTime) / 1000} seconds. Time since prev instruction: ${
          (currentTime - prevTime) / 1000
        } seconds.`)
        prevTime = currentTime
        const [state, area] = instruction.split(' ')
        const [xRange, yRange /* , zRange */ ] = area.split(',').map(a => a.split('=')[1])
        const [xMin, xMax] = xRange.split('..').map(n => Number(n))
        const [yMin, yMax] = yRange.split('..').map(n => Number(n))
        // const [zMin, zMax] = zRange.split('..').map(n => Number(n))

        const cuboid: Cuboid = {
          x: [xMin, xMax],
          xIds: [i],
          y: [yMin, yMax],
          yIds: [i],
          // z: [zMin, zMax],
          // zIds: [i],
        }

        switch (state) {
          case 'on': {
            onSegments = mergeCuboids(combineThese([cuboid, ...onSegments]))
            break
          }

          case 'off':
            onSegments = mergeCuboids(subtractACuboid(cuboid, onSegments))
            break

          default:
            throw new Error('fuck')
        }
      })

      console.log(`Final cuboids: ${onSegments.length}. Final runtime: ${
        (new Date().getTime() - startTime) / 1000
      } seconds.`)

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
