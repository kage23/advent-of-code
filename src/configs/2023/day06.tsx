import inputs from '../../inputs/2023/day06'
import { DayConfig } from '../../routes/Day'
import quadraticFormula from '../../utils/quadraticFormula'

interface Race {
  time: number
  distance: number
}

const parseInput = (input: string): Race[] => {
  const [times, distances] = input
    .split('\n')
    .map((x) => x.match(/\d+/g)!.map(Number))
  return times.map((time, i) => ({ time, distance: distances[i] }))
}

const smooshAndParseInput = (input: string): Race => {
  const [time, distance] = input
    .split('\n')
    .map((x) => x.replace(/\s/g, ''))
    .map((x) => x.match(/\d+/g)!.map(Number)[0])
  return { time, distance }
}

const countWaysToWin = (race: Race): number => {
  const bounds = quadraticFormula(-1, race.time, race.distance * -1)
  const roundedBounds: [number, number] = [
    Math.ceil(bounds[0]),
    Math.floor(bounds[1]),
  ]
  if (roundedBounds[0] === bounds[0]) roundedBounds[0] = roundedBounds[0] + 1
  if (roundedBounds[1] === bounds[1]) roundedBounds[1] = roundedBounds[1] - 1
  return roundedBounds[1] - roundedBounds[0] + 1
}

export const winTheRaces = (input: string) => {
  const races = parseInput(input)
  return {
    answer1: races.reduce((product, race) => {
      const waysToWin = countWaysToWin(race)

      return product * waysToWin
    }, 1),
  }
}

export const winTheBigRace = (input: string) => {
  const race = smooshAndParseInput(input)
  return { answer2: countWaysToWin(race) }
}

const day06: Omit<DayConfig, 'year'> = {
  answer1Text: 'The product of the number of ways to win is answer.',
  answer2Text: 'There are answer ways to win the big race.',
  buttons: [
    {
      label: 'Win the Race',
      onClick: winTheRaces,
    },
    {
      label: 'Win the Big Race',
      onClick: winTheBigRace,
    },
  ],
  id: 6,
  inputs,
  title: 'Wait For It',
}

export default day06
