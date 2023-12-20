import inputs from '../../inputs/2019/day01'
import { DayConfig } from '../../routes/Day'

const parseInput = (input: string): number[] =>
  input.split('\n').map((inputStr) => parseInt(inputStr))

const findFuelForGivenMass = (mass: number): number =>
  Math.max(Math.floor(mass / 3) - 2, 0)

export const findFuelForAllModules = (rawInput: string) => {
  const input = parseInput(rawInput)

  const answer1 = input.reduce(
    (sum, current) => sum + findFuelForGivenMass(current),
    0
  )

  return { answer1 }
}

export const findFuelForAllModulesWithFuelCost = (rawInput: string) => {
  const input = parseInput(rawInput)

  const answer2 = input.reduce((sum, current) => {
    let totalFuel = 0
    let fuelForCurrent = findFuelForGivenMass(current)

    while (fuelForCurrent > 0) {
      totalFuel += fuelForCurrent
      fuelForCurrent = findFuelForGivenMass(fuelForCurrent)
    }

    return sum + totalFuel
  }, 0)

  return { answer2 }
}

const day01: Omit<DayConfig, 'year'> = {
  answer1Text: 'The amount of fuel needed for all the modules is answer.',
  answer2Text:
    'The amount of fuel needed for all the modules (including fuel cost) is answer.',
  buttons: [
    {
      label: 'Find Fuel',
      onClick: findFuelForAllModules,
    },
    {
      label: 'Find Fuel (w/ fuel cost)',
      onClick: findFuelForAllModulesWithFuelCost,
    },
  ],
  id: 1,
  inputs,
  title: 'The Tyranny of the Rocket Equation',
}

export default day01
