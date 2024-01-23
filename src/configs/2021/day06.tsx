import inputs from '../../inputs/2021/day06'
import { DayConfig } from '../../routes/Day'

interface FishCohort {
  active: number
  id: number
  pending: number
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const simulateADay /* original version */ = (fish: number[]) => {
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

export const simulateXDays = (input: string, days: number) => {
  const fish = input.split(',').map(n => Number(n))

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

  return days < 100 ? { answer1: fishCount } : { answer2: fishCount }
}

const day06: Omit<DayConfig, 'year'> = {
  answer1Text: 'After 80 days, there are answer fish.',
  answer2Text: 'After 256 days, there are answer fish.',
  buttons: [
    {
      label: 'Simulate Fish Population Growth for 80 Days',
      onClick: (input) => simulateXDays(input, 80)
    },
    {
      label: 'Simulate Fish Population Growth for 256 Days',
      onClick: (input) => simulateXDays(input, 256)
    }
  ],
  id: 6,
  inputs,
  title: 'Lanternfish',
}

export default day06
