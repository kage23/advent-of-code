import inputs from '../../inputs/2019/day12'
import { DayConfig } from '../../routes/Day'
import { lcmMoreThanTwoNumbers } from '../../utils/Math'

interface MoonData {
  xPos: number
  yPos: number
  zPos: number

  xVel: number
  yVel: number
  zVel: number
}

const parseInput = (input: string): MoonData[] => input.split('\n').map(moonDataStr => {
  const moonData: MoonData = {
    xPos: 0, yPos: 0, zPos: 0,
    xVel: 0, yVel: 0, zVel: 0
  }

  moonDataStr.split(',').forEach((posData, i) => {
    const posDataSplit = posData.split('=')
    if (i === 0) moonData.xPos = parseInt(posDataSplit[1])
    if (i === 1) moonData.yPos = parseInt(posDataSplit[1])
    if (i === 2) moonData.zPos = parseInt(posDataSplit[1])
  })

  return moonData
})

const timeStep = (moonsData: MoonData[]): MoonData[] => {
  // Apply gravity
  const { length } = moonsData
  for (let i = 0; i < length; i++) {
    const moonI = moonsData[i]
    for (let j = i + 1; j < length; j++) {
      const moonJ = moonsData[j]
      // x velocity
      if (moonI.xPos < moonJ.xPos) {
        moonI.xVel++
        moonJ.xVel--
      } else if (moonI.xPos > moonJ.xPos) {
        moonI.xVel--
        moonJ.xVel++
      }

      // y velocity
      if (moonI.yPos < moonJ.yPos) {
        moonI.yVel++
        moonJ.yVel--
      } else if (moonI.yPos > moonJ.yPos) {
        moonI.yVel--
        moonJ.yVel++
      }

      // z velocity
      if (moonI.zPos < moonJ.zPos) {
        moonI.zVel++
        moonJ.zVel--
      } else if (moonI.zPos > moonJ.zPos) {
        moonI.zVel--
        moonJ.zVel++
      }
    }
  }

  // Apply velocity
  moonsData.forEach(moon => {
    moon.xPos += moon.xVel
    moon.yPos += moon.yVel
    moon.zPos += moon.zVel
  })

  return moonsData
}

const takeSteps = (moonsData: MoonData[], numOfSteps: number): MoonData[] => {
  let newMoonsData = JSON.parse(JSON.stringify(moonsData))

  for (let i = 0; i < numOfSteps; i++) newMoonsData = timeStep(newMoonsData)

  return newMoonsData
}

const calculateTotalEnergy = (moonsData: MoonData[]): number => moonsData.reduce((totalEnergy, currentMoon) => {
  const pot = Math.abs(currentMoon.xPos) + Math.abs(currentMoon.yPos) + Math.abs(currentMoon.zPos)
  const kin = Math.abs(currentMoon.xVel) + Math.abs(currentMoon.yVel) + Math.abs(currentMoon.zVel)

  return totalEnergy + (pot * kin)
}, 0)

const findLoop = (moonsData: MoonData[]): number => {
  const history = new Map()

  let i = 0
  while (!history.has(JSON.stringify(moonsData))) {
    history.set(JSON.stringify(moonsData), i)
    i++
    moonsData = timeStep(moonsData)
  }

  return i
}

const findLoopInOneDirection = (moonsData: MoonData[], direction: number): number => {
  if (direction > 2 || direction < 0) throw new Error('Direction 0 is x, 1 is y, 2 is z')
  if (direction === 0) {
    const newMoonsData = moonsData.map(moon => ({
      ...moon,
      yPos: 0,
      zPos: 0
    }))
    return findLoop(newMoonsData)
  } else if (direction === 1) {
    const newMoonsData = moonsData.map(moon => ({
      ...moon,
      xPos: 0,
      zPos: 0
    }))
    return findLoop(newMoonsData)
  } else if (direction === 2) {
    const newMoonsData = moonsData.map(moon => ({
      ...moon,
      xPos: 0,
      yPos: 0
    }))
    return findLoop(newMoonsData)
  }
  return NaN
}

export const takeTimeSteps = (input: string, stepCount: number) => {
  let moonsData = parseInput(input)

  moonsData = takeSteps(moonsData, stepCount)

  return {
    answer1: calculateTotalEnergy(moonsData)
  }
}

export const runUntilRepeat = (input: string) => {
  const moonsData = parseInput(input)

  const xRepeat = findLoopInOneDirection(moonsData, 0)
  const yRepeat = findLoopInOneDirection(moonsData, 1)
  const zRepeat = findLoopInOneDirection(moonsData, 2)

  return {
    answer2: lcmMoreThanTwoNumbers([xRepeat, yRepeat, zRepeat])
  }
}

const day12: Omit<DayConfig, 'year'> = {
  answer1Text: 'The total energy in the system after the designated number of steps is answer.',
  answer2Text: 'The universe runs for answer time steps before repeating.',
  buttons: [
    {
      label: 'One Hundred Time Steps',
      onClick: (input) => takeTimeSteps(input, 100),
    },
    {
      label: 'One Thousand Time Steps',
      onClick: (input) => takeTimeSteps(input, 1000),
    },
    {
      label: 'Run Until Repeat',
      onClick: runUntilRepeat
    }
  ],
  id: 12,
  inputs,
  title: 'The N-Body Problem',
}

export default day12
