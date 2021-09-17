import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'
import { lcmTwoNumbers } from '../utils/Various'

import INPUT from './Input/Day13'

const determineIsWinningForBus = (
  bus: { id: number, busIndex: number },
  currentTime: number
): boolean => (currentTime + bus.busIndex) % bus.id === 0

const getLcmToBusListIndex = (indexToLcmTo: number, busses: { id: number, busIndex: number }[]): number => {
  let lcm = 1
  busses.slice(0, indexToLcmTo + 1).forEach(({ id }) => {
    lcm = lcmTwoNumbers(lcm, id)
  })
  return lcm
}

const BUTTONS: IButton[] = [
  {
    label: 'Check Bus Schedule',
    onClick: (inputKey: string) => {
      const arrivalTime = parseInt(INPUT[inputKey].split('\n')[0])
      const busIDs = INPUT[inputKey]
        .split('\n')[1]
        .split(',')
        .filter(x => x !== 'x')
        .map(x => parseInt(x))

      let earliestDepartureTime = Number.MAX_SAFE_INTEGER
      let earliestDepartureBusID = -1

      busIDs.forEach(busID => {
        let i = 1
        while (busID * i < arrivalTime) i++
        earliestDepartureTime = Math.min(earliestDepartureTime, busID * i)
        if (earliestDepartureTime === busID * i) earliestDepartureBusID = busID
      })

      return {
        answer1: ((earliestDepartureTime - arrivalTime) * earliestDepartureBusID).toString()
      }
    }
  },
  {
    label: 'Win Bus Time Contest',
    onClick: (inputKey: string) => {
      const busses = INPUT[inputKey]
        .split('\n')[1]
        .split(',')
        .map((x, idx) => ({
          id: x,
          busIndex: idx
        }))
        .filter(({ id }) => id !== 'x')
        .map(({ id, busIndex }) => ({
          id: parseInt(id),
          busIndex
        }))

      let increment = 1

      let i = inputKey.startsWith('DEMO') ? 1 : 100000000000000
      let busListIndexToCheck = 0

      while (busListIndexToCheck < busses.length) {
        while (!determineIsWinningForBus(busses[busListIndexToCheck], i)) {
          i += increment
        }
        increment = getLcmToBusListIndex(busListIndexToCheck, busses)
        busListIndexToCheck++
      }

      return {
        answer2: i.toString()
      }
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The bus ID and wait time check number is <code>{answer}</code>.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      The timestamp that wins the contest is <code>{answer}</code>.
    </span>
  ),
  buttons: BUTTONS,
  day: 13,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Shuttle Search'
}

export default config