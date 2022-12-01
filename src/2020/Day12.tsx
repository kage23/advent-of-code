import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'
import { manhattanDistance } from '../utils/Various'

import INPUT from '../Inputs/2020/Day12'

const directionsTurningRight = ['N', 'E', 'S', 'W'] as ('N' | 'S' | 'E' | 'W')[]

const BUTTONS: IButton[] = [
  {
    label: 'Follow Navigation Instructions',
    onClick: (inputKey: string) => {
      const input = INPUT[inputKey].split('\n')

      const position = [0, 0]
      let facing: 'N' | 'S' | 'E' | 'W' = 'E'

      input.forEach(instruction => {
        const direction = instruction.slice(0, 1) as 'N' | 'S' | 'E' | 'W' | 'L' | 'R' | 'F'
        const amount = parseInt(instruction.slice(1))
        switch (direction) {
          case 'N':
            position[1] -= amount
            break

          case 'S':
            position[1] += amount
            break

          case 'E':
            position[0] += amount
            break

          case 'W':
            position[0] -= amount
            break

          case 'L': {
            const currentFacingIndex = directionsTurningRight.findIndex(x => x === facing)
            let newFacingIndex = currentFacingIndex - (amount === 90 ? 1 : amount === 180 ? 2 : 3)
            if (newFacingIndex < 0) newFacingIndex = directionsTurningRight.length + newFacingIndex
            facing = directionsTurningRight[newFacingIndex]
            break
          }

          case 'R': {
            const currentFacingIndex = directionsTurningRight.findIndex(x => x === facing)
            let newFacingIndex = (currentFacingIndex + (amount === 90 ? 1 : amount === 180 ? 2 : 3)) % directionsTurningRight.length
            facing = directionsTurningRight[newFacingIndex]
            break
          }

          case 'F': {
            switch (facing) {
              case 'N':
                position[1] -= amount
                break

              case 'S':
                position[1] += amount
                break

              case 'E':
                position[0] += amount
                break

              case 'W':
                position[0] -= amount
                break
            }
            break
          }
        }
      })

      return {
        answer1: manhattanDistance(position, [0, 0]).toString()
      }
    }
  },
  {
    label: 'Actually Follow Navigation Instructions',
    onClick: (inputKey: string) => {
      const input = INPUT[inputKey].split('\n')

      const position = [0, 0]
      let waypointOffset = [10, -1]

      input.forEach(instruction => {
        const direction = instruction.slice(0, 1) as 'N' | 'S' | 'E' | 'W' | 'L' | 'R' | 'F'
        const amount = parseInt(instruction.slice(1))
        switch (direction) {
          case 'N':
            waypointOffset[1] -= amount
            break

          case 'S':
            waypointOffset[1] += amount
            break

          case 'E':
            waypointOffset[0] += amount
            break

          case 'W':
            waypointOffset[0] -= amount
            break

          case 'L': {
            switch (amount) {
              case 90:
                waypointOffset = [waypointOffset[1], waypointOffset[0] * -1]
                break

              case 180:
                waypointOffset = [waypointOffset[0] * -1, waypointOffset[1] * -1]
                break

              case 270:
                waypointOffset = [waypointOffset[1] * -1, waypointOffset[0]]
                break

              default:
                break
            }
            break
          }

          case 'R': {
            switch (amount) {
              case 90:
                waypointOffset = [waypointOffset[1] * -1, waypointOffset[0]]
                break

              case 180:
                waypointOffset = [waypointOffset[0] * -1, waypointOffset[1] * -1]
                break

              case 270:
                waypointOffset = [waypointOffset[1], waypointOffset[0] * -1]
                break

              default:
                break
            }
            break
          }

          case 'F': {
            position[0] += (waypointOffset[0] * amount)
            position[1] += (waypointOffset[1] * amount)
          }
        }
      })

      return {
        answer2: manhattanDistance(position, [0, 0]).toString()
      }
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The instructions lead to a spot a distance of <code>{answer}</code> from the start.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      The instructions actually lead to a spot a distance of <code>{answer}</code> from the start.
    </span>
  ),
  buttons: BUTTONS,
  day: 12,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Rain Risk'
}

export default config