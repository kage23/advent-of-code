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
}

const doTheyIntersect = (a: Cuboid, b: Cuboid): boolean => {
  const { x: [axMin, axMax] } = a
  const { x: [bxMin, bxMax] } = b

  return (
    bxMin <= axMax && bxMax >= axMin
  )
}

const subtractTheIntersections = (cuboid: Cuboid, intersections: Cuboid[]): Cuboid[] => {
  const cuboids: Cuboid[] = []

  intersections.forEach(intersection => {
    const identical = JSON.stringify(cuboid) === JSON.stringify(intersection)
    const toTheLeftOfTheIntersection = (
      cuboid.x[0] < intersection.x[0]
    )
    const toTheRightOfTheIntersection = (
      cuboid.x[1] > intersection.x[1]
    )

    if (!identical) {
      if (toTheLeftOfTheIntersection) {
        // We should just add the unadded bit to the left
        cuboids.push({
          x: [cuboid.x[0], intersection.x[0] - 1]
        })
      }
      if (toTheRightOfTheIntersection) {
        // We should just add the unadded bit to the right
        cuboids.push({
          x: [intersection.x[1] + 1, cuboid.x[1]]
        })
      }
    }
  })

  return cuboids
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

        debugger

        switch(state) {
          case 'on': {
            const intersections = onSegments.filter((c) => doTheyIntersect(c, cuboid))
            if (!intersections.length) {
              onSegments.push(cuboid)
            } else {
              onSegments.push(...subtractTheIntersections(cuboid, intersections))
            }
            break
          }

          case 'off':
            debugger
            break

          default:
            throw new Error('fuck')
        }
      })

      return {
        // answer2: onCount.toString()
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
