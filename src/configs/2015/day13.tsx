import inputs from '../../inputs/2015/day13'
import { DayConfig } from '../../routes/Day'

const parseInput = (inputKey: string, part: 1 | 2, attendees?: string[]): Map<string, number> => {
  const happinessUnits: Map<string, number> = new Map()

  inputs.get(inputKey)!.split('\n').forEach(line => {
    const [firstPerson, , gainOrLose, x, , , , , , , secondPerson] = line.slice(0, -1).split(' ')
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

export const findOptimalSeatingArrangement = (inputKey: string) => {
  const attendees = inputs.get(inputKey)!
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
    answer1: highestPossibleHappiness
  }
}

export const findOptimalSeatingArrangementWithYou = (inputKey: string) => {
  const attendees = inputs.get(inputKey)!
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
    answer2: highestPossibleHappiness
  }
}

const day13: Omit<DayConfig, 'year'> = {
  answer1Text: 'The optimal seating arrangement generates a answer change in total happiness.',
  answer2Text: 'The optimal seating arrangement including yourself generates a answer change in total happiness.',
  buttons: [
    {
      label: 'Find Optimal Seating Arrangement',
      onClick: findOptimalSeatingArrangement
    },
    {
      label: 'Find Optimal Seating Arrangement, Including Yourself',
      onClick: findOptimalSeatingArrangementWithYou
    }
  ],
  id: 13,
  inputs,
  title: 'Knights of the Dinner Table',
}

export default day13
