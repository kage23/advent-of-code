import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'

import INPUT from './Input/Day22'

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
      const core: Map<string, 0 | 1> = new Map()

      const overallXMin = Math.min(...INPUT[inputKey].split('\n').map(instruction => {
        const xMin = instruction.split('x=')[1]
        return parseInt(xMin)
      }))
      const overallYMin = Math.min(...INPUT[inputKey].split('\n').map(instruction => {
        const yMin = instruction.split('y=')[1]
        return parseInt(yMin)
      }))
      const overallZMin = Math.min(...INPUT[inputKey].split('\n').map(instruction => {
        const zMin = instruction.split('z=')[1]
        return parseInt(zMin)
      }))
      const overallXMax = Math.max(...INPUT[inputKey].split('\n').map(instruction => {
        const xMax = instruction.split(' ')[1].split(',')[0].split('..')[1]
        return parseInt(xMax)
      }))
      const overallYMax = Math.max(...INPUT[inputKey].split('\n').map(instruction => {
        const yMax = instruction.split(' ')[1].split(',')[1].split('..')[1]
        return parseInt(yMax)
      }))
      const overallZMax = Math.max(...INPUT[inputKey].split('\n').map(instruction => {
        const zMax = instruction.split(' ')[1].split(',')[2].split('..')[1]
        return parseInt(zMax)
      }))

      // INPUT[inputKey].split('\n').forEach(instruction => {
      //   const [state, area] = instruction.split(' ')
      //   const [xRange, yRange, zRange] = area.split(',').map(a => a.split('=')[1])
      //   const [xMin, xMax] = xRange.split('..').map(n => Number(n))
      //   const [yMin, yMax] = yRange.split('..').map(n => Number(n))
      //   const [zMin, zMax] = zRange.split('..').map(n => Number(n))

      //   for (let x = xMin; x <= xMax; x++) {
      //     for (let y = yMin; y <= yMax; y++) {
      //       for (let z = zMin; z <= zMax; z++) {
      //         const key = `${x},${y},${z}`
      //         core[key] = state === 'on' ? 1 : 0
      //       }
      //     }
      //   }
      // })

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
