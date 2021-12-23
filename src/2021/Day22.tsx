import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'

import INPUT from './Input/Day22'

interface Cuboid {
  x: [number, number],
  // y: [number, number],
  // z: [number, number],
  id?: string
}

interface Checkpoint {
  value: number
  start: boolean
  id: string[]
}
const combineThese = (cuboids: Cuboid[]): Cuboid[] => {
  const newCuboids: Cuboid[] = []

  const checkpoints: Checkpoint[] = cuboids
    .reduce((list, cuboid, id) => {
      const { x: [xMin, xMax] } = cuboid

      const existingStartPoint = list.find(({ start, value }) => start && value === xMin)
      if (existingStartPoint) {
        existingStartPoint.id.push(id.toString())
      } else {
        list.push({
          value: xMin,
          start: true,
          id: [id.toString()]
        })
      }

      const existingEndPoint = list.find(({ start, value }) => !start && value === xMax)
      if (existingEndPoint) {
        existingEndPoint.id.push(id.toString())
      } else {
        list.push({
          value: xMax,
          start: false,
          id: [id.toString()]
        })
      }

      return list
    }, [] as Checkpoint[])
    .sort(({ value: a }, { value: b }) => a - b)

  let workingCuboid: Cuboid

  let openIntervals: string[] = []
  checkpoints.forEach(({ value, start, id }, i) => {
    if (start) {
      if (openIntervals.length) {
        workingCuboid.x[1] = value - 1
        newCuboids.push(JSON.parse(JSON.stringify(workingCuboid)))
      }
      openIntervals.push(...id)
      workingCuboid = {
        x: [value, value],
        id: openIntervals.join(',')
      }
    } else {
      openIntervals = openIntervals.filter(x => !id.includes(x))
      workingCuboid.x[1] = value
      newCuboids.push(JSON.parse(JSON.stringify(workingCuboid)))
      workingCuboid.x[0] = value + 1
    }
  })

  return newCuboids
}

const subtractACuboid = ({ x: [xMin, xMax] }: Cuboid, cuboids: Cuboid[]): Cuboid[] =>
  cuboids.reduce((list, cuboid) => {
    // debugger

    // If it's not entirely within the subtraction zone
    if (cuboid.x[0] < xMin || cuboid.x[1] > xMax) {
      const newCuboid = JSON.parse(JSON.stringify(cuboid))
      if (newCuboid.x[0] < xMin) newCuboid.x[1] = Math.min(xMin - 1, newCuboid.x[1])
      if (newCuboid.x[1] > xMax) newCuboid.x[0] = Math.max(xMax + 1, newCuboid.x[0])
      list.push(newCuboid)
    }

    return list
  }, [] as Cuboid[])

const countCuboids = (cuboids: Cuboid[]): number =>
  cuboids.reduce((sum, cuboid) => (
    sum + (cuboid.x[1] - cuboid.x[0] + 1)
  ), 0)

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

      INPUT[inputKey].split('\n').forEach(instruction => {
        const [state, area] = instruction.split(' ')
        const [xRange, yRange, zRange] = area.split(',').map(a => a.split('=')[1])
        const [xMin, xMax] = xRange.split('..').map(n => Number(n))
        // const [yMin, yMax] = yRange.split('..').map(n => Number(n))
        // const [zMin, zMax] = zRange.split('..').map(n => Number(n))

        const cuboid: Cuboid = {
          x: [xMin, xMax],
          // y: [yMin, yMax],
          // z: [zMin, zMax]
        }

        // debugger

        switch (state) {
          case 'on': {
            onSegments = combineThese([cuboid, ...onSegments])
            break
          }

          case 'off':
            onSegments = subtractACuboid(cuboid, onSegments)
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
