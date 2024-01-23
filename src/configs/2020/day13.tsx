import inputs from '../../inputs/2020/day13'
import { DayConfig } from '../../routes/Day'
import { lcmTwoNumbers } from '../../utils/Math'

export const checkBusSchedule = (input: string) => {
  const arrivalTime = parseInt(input.split('\n')[0])
  const busIDs = input
    .split('\n')[1]
    .split(',')
    .filter((x) => x !== 'x')
    .map((x) => parseInt(x))

  let earliestDepartureTime = Number.MAX_SAFE_INTEGER
  let earliestDepartureBusID = -1

  busIDs.forEach((busID) => {
    let i = 1
    while (busID * i < arrivalTime) i++
    earliestDepartureTime = Math.min(earliestDepartureTime, busID * i)
    if (earliestDepartureTime === busID * i) earliestDepartureBusID = busID
  })

  return {
    answer1: (earliestDepartureTime - arrivalTime) * earliestDepartureBusID,
  }
}

const determineIsWinningForBus = (
  bus: { id: number; busIndex: number },
  currentTime: number
): boolean => (currentTime + bus.busIndex) % bus.id === 0

const getLcmToBusListIndex = (
  indexToLcmTo: number,
  busses: { id: number; busIndex: number }[]
): number => {
  let lcm = 1
  busses.slice(0, indexToLcmTo + 1).forEach(({ id }) => {
    lcm = lcmTwoNumbers(lcm, id)
  })
  return lcm
}

export const winBusTimeContest = (
  input: string,
  startTime = 100000000000000
) => {
  const busses = input
    .split('\n')[1]
    .split(',')
    .map((x, idx) => ({
      id: x,
      busIndex: idx,
    }))
    .filter(({ id }) => id !== 'x')
    .map(({ id, busIndex }) => ({
      id: parseInt(id),
      busIndex,
    }))

  let increment = 1

  let i = startTime
  let busListIndexToCheck = 0

  while (busListIndexToCheck < busses.length) {
    while (!determineIsWinningForBus(busses[busListIndexToCheck], i)) {
      i += increment
    }
    increment = getLcmToBusListIndex(busListIndexToCheck, busses)
    busListIndexToCheck++
  }

  return {
    answer2: i,
  }
}

const day13: Omit<DayConfig, 'year'> = {
  answer1Text: 'The bus ID and wait time check number is answer.',
  answer2Text: 'The timestamp that wins the contest is answer.',
  buttons: [
    {
      label: 'Check Bus Schedule',
      onClick: checkBusSchedule,
    },
    {
      label: 'Win Bus Time Contest',
      onClick: winBusTimeContest,
    },
  ],
  id: 13,
  inputs,
  title: 'Shuttle Search',
}

export default day13
