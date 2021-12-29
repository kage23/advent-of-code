import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'

import INPUT from './Input/Day6'

const simulateADay = (fish: number[]) => {
  const fishCount = fish.length
  for (let i = 0; i < fishCount; i++) {
    if (fish[i] === 0) {
      fish.push(8)
      fish[i] = 6
    } else {
      fish[i] -= 1
    }
  }
}

interface FishCohort {
  active: number
  id: number
  pending: number
}
const simulateXDaysEfficiently = (fish: number[], days: number) => {
  // Set up the initial cohorts
  const fishCohorts: FishCohort[] = Array(7).fill(null).map((_, i) => ({
    active: 0,
    id: i,
    pending: 0
  }))
  fish.forEach(f => {
    fishCohorts[f].active += 1
  })

  // Run the simulation
  let fishCount = fish.length
  for (let day = 0; day < days; day++) {
    const dayCohort = fishCohorts[day % fishCohorts.length]
    // New fish are spawned
    fishCount += dayCohort.active
    // They get added to the pending group of the cohort for two days later
    fishCohorts[(day + 2) % fishCohorts.length].pending += dayCohort.active
    // The current cohort's pending group gets moved to active
    dayCohort.active += dayCohort.pending
    dayCohort.pending = 0
  }

  return fishCount
}

const BUTTONS: IButton[] = [
  {
    label: 'Simulate Fish Population Growth for 80 Days',
    onClick: (inputKey: string) => {
      const fish = INPUT[inputKey].split(',').map(n => Number(n))
      // simulateXDays(fish, 80)

      return {
        // answer1: fish.length.toString()
        answer1: simulateXDaysEfficiently(fish, 80).toString()
      }
    }
  },
  {
    label: 'Simulate Fish Population Growth for 256 Days',
    onClick: (inputKey: string) => {
      const fish = INPUT[inputKey].split(',').map(n => Number(n))

      return {
        answer2: simulateXDaysEfficiently(fish, 256).toString()
      }
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      After 80 days, there are <code>{answer}</code> fish.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      After 256 days, there are <code>{answer}</code> fish.
    </span>
  ),
  buttons: BUTTONS,
  day: 6,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Lanternfish'
}

export default config
