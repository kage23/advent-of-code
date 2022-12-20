import inputs from '../../inputs/2015/day06'
import { DayConfig } from '../../routes/Day'

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

export const followLightingInstructions = (inputKey: string) => {
  const lights: Map<string, boolean> = inputs.get(inputKey)!.split('\n').reduce(
    (lights, instruction) => parseLightingInstruction(lights, instruction),
    new Map()
  )

  return {
    answer1: Array.from(lights.values()).filter(x => x === true).length
  }
}

export const findTotalBrightness = (inputKey: string) => {
  const lights: Map<string, number> = inputs.get(inputKey)!.split('\n').reduce(
    (lights, instruction) => parseLightingInstruction__v2(lights, instruction),
    new Map()
  )

  return {
    answer2: Array.from(lights.values()).reduce((total, current) => total + current, 0)
  }
}

const day06: Omit<DayConfig, 'year'> = {
  answer1Text: 'There are answer lit lights.',
  answer2Text: 'The total brightness is answer.',
  buttons: [
    {
      label: 'Follow Lighting Instructions',
      onClick: followLightingInstructions
    },
    {
      label: 'Find Total Brightness',
      onClick: findTotalBrightness
    }
  ],
  id: 6,
  inputs,
  title: `Probably a Fire Hazard`,
}

export default day06
