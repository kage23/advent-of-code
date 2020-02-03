import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'

import INPUT from './Input/Day13'

const calculateHappiness = (arrangement: string[], happinessLevels: Map<string, number>): number => {
  let totalHappinessDiff = 0

  for (let i = 0; i < arrangement.length; i++) {
    const firstPerson = arrangement[i]
    const secondPerson = arrangement[(i + 1) % arrangement.length]
    totalHappinessDiff += (happinessLevels.get(`${firstPerson}-${secondPerson}`) || 0)
    totalHappinessDiff += (happinessLevels.get(`${secondPerson}-${firstPerson}`) || 0)
  }

  return totalHappinessDiff
}

const generatePossibleSeatingArrangements = (names: string[]): string[][] => {
  const result: string[][] = []

  const permute = (arr: string[], m = [] as string[]) => {
    if (arr.length === 0) {
      result.push(m)
    } else {
      for (let i = 0; i < arr.length; i++) {
        let curr = arr.slice()
        let next = curr.splice(i, 1)
        permute(curr.slice(), m.concat(next))
      }
    }
  }

  permute(names)

  return result
}

const parseInput = (inputKey: string, part: 1 | 2, attendees?: string[]): Map<string, number> => {
  const happinessUnits: Map<string, number> = new Map()

  INPUT[inputKey].split('\n').forEach(line => {
    const [ firstPerson, , gainOrLose, x, , , , , , , secondPerson ] = line.slice(0, -1).split(' ')
    happinessUnits.set(`${firstPerson}-${secondPerson}`, parseInt(x) * (gainOrLose === 'lose' ? -1 : 1))
  })

  if (part === 2 && attendees) {
    attendees.forEach(attendee => {
      happinessUnits.set(`Kyle-${attendee}`, 0)
      happinessUnits.set(`${attendee}-Kyle`, 0)
    })
  }

  return happinessUnits
}

const BUTTONS: IButton[] = [
  {
    label: 'Find Optimal Seating Arrangement',
    onClick: (inputKey) => {
      const attendees = INPUT[inputKey]
        .split('\n')
        .map(line => line.split(' ')[0])
        .filter((name, index, array) => array.indexOf(name) === index)

      const happinessLevels = parseInput(inputKey, 1, attendees)

      const possibleSeatingArrangements = generatePossibleSeatingArrangements(attendees)

      let highestPossibleHappiness = Number.MIN_SAFE_INTEGER

      possibleSeatingArrangements.forEach(arrangement => {
        highestPossibleHappiness = Math.max(highestPossibleHappiness, calculateHappiness(arrangement, happinessLevels))
      })

      return {
        answer1: highestPossibleHappiness.toString()
      }
    }
  },
  {
    label: 'Find Optimal Seating Arrangement, Including Yourself',
    onClick: (inputKey) => {
      const attendees = INPUT[inputKey]
        .split('\n')
        .map(line => line.split(' ')[0])
        .filter((name, index, array) => array.indexOf(name) === index)

      attendees.push('Kyle')

      const happinessLevels = parseInput(inputKey, 2, attendees)

      const possibleSeatingArrangements = generatePossibleSeatingArrangements(attendees)

      let highestPossibleHappiness = Number.MIN_SAFE_INTEGER

      possibleSeatingArrangements.forEach(arrangement => {
        highestPossibleHappiness = Math.max(highestPossibleHappiness, calculateHappiness(arrangement, happinessLevels))
      })

      return {
        answer2: highestPossibleHappiness.toString()
      }
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The optimal seating arrangement generates a <code>{answer}</code> change in total happiness.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      The optimal seating arrangement including yourself generates a <code>{answer}</code> change in total happiness.
    </span>
  ),
  buttons: BUTTONS,
  day: 13,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Knights of the Dinner Table'
}

export default config