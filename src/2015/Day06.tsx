import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'

import INPUT from '../Inputs/2015/Day06'

const parseLightingInstruction__v2 = (lights: Map<string, number>, instruction: string): Map<string, number> => {
  const instructionWords = instruction.split(' ')

  const [maxX, maxY] = instructionWords[instructionWords.length - 1].split(',').map(x => parseInt(x))
  const [minX, minY] = instructionWords[
    instructionWords[0] === 'turn'
      ? 2
      : 1
  ].split(',').map(x => parseInt(x))

  for (let x = minX; x <= maxX; x++) {
    for (let y = minY; y <= maxY; y++) {
      const brightnessDiff = instruction.startsWith('turn on')
        ? 1
        : instruction.startsWith('turn off')
          ? -1
          : 2
      lights.set(`${x},${y}`, Math.max((lights.get(`${x},${y}`) || 0) + brightnessDiff, 0))
    }
  }

  return lights
}

const parseLightingInstruction = (lights: Map<string, boolean>, instruction: string): Map<string, boolean> => {
  const instructionWords = instruction.split(' ')

  const [maxX, maxY] = instructionWords[instructionWords.length - 1].split(',').map(x => parseInt(x))
  const [minX, minY] = instructionWords[
    instructionWords[0] === 'turn'
      ? 2
      : 1
  ].split(',').map(x => parseInt(x))

  for (let x = minX; x <= maxX; x++) {
    for (let y = minY; y <= maxY; y++) {
      const newLightStatus = instruction.startsWith('turn on')
        ? true
        : instruction.startsWith('turn off')
          ? false
          : !lights.get(`${x},${y}`)
      lights.set(`${x},${y}`, newLightStatus)
    }
  }

  return lights
}

const BUTTONS: IButton[] = [
  {
    label: 'Follow Lighting Instructions',
    onClick: (inputKey) => {
      const lights: Map<string, boolean> = INPUT[inputKey].split('\n').reduce(
        (lights, instruction) => parseLightingInstruction(lights, instruction),
        new Map()
      )

      return {
        answer1: Array.from(lights.values()).filter(x => x === true).length.toString()
      }
    }
  },
  {
    label: 'Find Total Brightness',
    onClick: (inputKey) => {
      const lights: Map<string, number> = INPUT[inputKey].split('\n').reduce(
        (lights, instruction) => parseLightingInstruction__v2(lights, instruction),
        new Map()
      )

      return {
        answer2: Array.from(lights.values()).reduce((total, current) => total + current, 0).toString()
      }
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      There are <code>{answer}</code> lit lights.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      The total brightness is <code>{answer}</code>.
    </span>
  ),
  buttons: BUTTONS,
  day: 6,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Probably a Fire Hazard'
}

export default config