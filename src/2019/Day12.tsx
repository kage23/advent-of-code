import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'
import { lcmTwoNumbers } from '../utils/Various'

import INPUT from '../Inputs/2019/Day12'

interface IMoonData {
  xPos: number
  yPos: number
  zPos: number

  xVel: number
  yVel: number
  zVel: number
}

const calculateTotalEnergy = (moonsData: IMoonData[]): number => moonsData.reduce((totalEnergy, currentMoon) => {
  const pot = Math.abs(currentMoon.xPos) + Math.abs(currentMoon.yPos) + Math.abs(currentMoon.zPos)
  const kin = Math.abs(currentMoon.xVel) + Math.abs(currentMoon.yVel) + Math.abs(currentMoon.zVel)

  return totalEnergy + (pot * kin)
}, 0)

const findLoop = (moonsData: IMoonData[]): number => {
  const history = new Map()

  let i = 0
  while (!history.has(JSON.stringify(moonsData))) {
    history.set(JSON.stringify(moonsData), i)
    i++
    moonsData = timeStep(moonsData)
  }

  return i
}

const findLoopInOneDirection = (moonsData: IMoonData[], direction: number): number => {
  if (direction > 2 || direction < 0) throw new Error('Direction 0 is x, 1 is y, 2 is z')
  if (direction === 0) {
    let newMoonsData = moonsData.map(moon => ({
      ...moon,
      yPos: 0,
      zPos: 0
    }))
    return findLoop(newMoonsData)
  } else if (direction === 1) {
    let newMoonsData = moonsData.map(moon => ({
      ...moon,
      xPos: 0,
      zPos: 0
    }))
    return findLoop(newMoonsData)
  } else if (direction === 2) {
    let newMoonsData = moonsData.map(moon => ({
      ...moon,
      xPos: 0,
      yPos: 0
    }))
    return findLoop(newMoonsData)
  }
  return NaN
}

const parseInput = (inputKey: string): IMoonData[] => INPUT[inputKey].split('\n').map(moonDataStr => {
  const moonData: IMoonData = {
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

const takeSteps = (moonsData: IMoonData[], numOfSteps: number): IMoonData[] => {
  let newMoonsData = JSON.parse(JSON.stringify(moonsData))

  for (let i = 0; i < numOfSteps; i++) newMoonsData = timeStep(newMoonsData)

  return newMoonsData
}

const timeStep = (moonsData: IMoonData[]): IMoonData[] => {
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

const BUTTONS: IButton[] = [
  {
    label: 'One Thousand Time Steps',
    onClick: (inputKey: string) => {
      let moonsData = parseInput(inputKey)

      moonsData = takeSteps(moonsData, 1000)

      return {
        answer1: calculateTotalEnergy(moonsData).toString()
      }
    }
  },
  {
    label: 'Run Until Repeat',
    onClick: (inputKey: string) => {
      let moonsData = parseInput(inputKey)

      const xRepeat = findLoopInOneDirection(moonsData, 0)
      const yRepeat = findLoopInOneDirection(moonsData, 1)
      const zRepeat = findLoopInOneDirection(moonsData, 2)

      return {
        answer2: lcmTwoNumbers(lcmTwoNumbers(xRepeat, yRepeat), zRepeat).toString()
      }
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The total energy in the system after the designated number of steps is{' '}
      <code>{answer}</code>.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      The universe runs for{' '}
      <code>{answer}</code> time steps before repeating.
    </span>
  ),
  buttons: BUTTONS,
  day: 12,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'The N-Body Problem'
}

export default config
