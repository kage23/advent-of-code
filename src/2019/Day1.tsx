import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'

import INPUT from './Input/Day1'

const findFuelForAllModules = (inputKey: string) => {
  const input = parseInput(inputKey)

  const answer1 = input.reduce((sum, current) => {
    return sum + findFuelForGivenMass(current)
  }, 0).toString()

  return { answer1 }
}

const findFuelForAllModulesWithFuelCost = (inputKey: string) => {
  const input = parseInput(inputKey)

  const answer2 = input.reduce((sum, current) => {
    let totalFuel = 0
    let fuelForCurrent = findFuelForGivenMass(current)

    while (fuelForCurrent > 0) {
      totalFuel += fuelForCurrent
      fuelForCurrent = findFuelForGivenMass(fuelForCurrent)
    }

    return sum + totalFuel
  }, 0).toString()

  return { answer2 }
}

const findFuelForGivenMass = (mass: number): number => {
  return Math.max(Math.floor(mass / 3) - 2, 0)
}

const parseInput = (inputKey: string): number[] =>
  INPUT[inputKey].split('\n').map(inputStr => parseInt(inputStr))

const BUTTONS: IButton[] = [
  {
    label: 'Find Fuel',
    onClick: findFuelForAllModules
  },
  {
    label: 'Find Fuel (w/ fuel cost)',
    onClick: findFuelForAllModulesWithFuelCost
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The amount of fuel needed for all the modules is{' '}
      <code>{answer}</code>.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      The amount of fuel needed for all the modules (including fuel cost) is{' '}
      <code>{answer}</code>.
    </span>
  ),
  buttons: BUTTONS,
  day: 1,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'The Tyranny of the Rocket Equation'
}

export default config