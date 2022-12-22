import inputs from '../../inputs/2015/day14'
import { DayConfig } from '../../routes/Day'

interface Reindeer {
  flyTime: number
  name: string
  restTime: number
  velocity: number
}

const parseInput = (inputKey: string): Reindeer[] =>
  inputs
    .get(inputKey)!
    .split('\n')
    .map((reindeerLine) => {
      const [name, , , velocity, , , flyTime, , , , , , , restTime] =
        reindeerLine.split(' ')
      return {
        flyTime: parseInt(flyTime),
        name,
        restTime: parseInt(restTime),
        velocity: parseInt(velocity),
      }
    })

const getDistance = (reindeer: Reindeer, raceTime: number): number => {
  const fullFlyRestCycles = Math.floor(
    raceTime / (reindeer.flyTime + reindeer.restTime)
  )
  const leftoverTime =
    raceTime - fullFlyRestCycles * (reindeer.flyTime + reindeer.restTime)
  const flyTime =
    fullFlyRestCycles * reindeer.flyTime +
    Math.min(leftoverTime, reindeer.flyTime)
  return flyTime * reindeer.velocity
}

const getLeadersAtTime = (reindeers: Reindeer[], time: number): string[] => {
  const positionsAtTime = reindeers
    .map((reindeer) => ({
      name: reindeer.name,
      position: getDistance(reindeer, time),
    }))
    .sort((a, b) => b.position - a.position)
  return positionsAtTime
    .filter((reindeer) => reindeer.position >= positionsAtTime[0].position)
    .map((reindeer) => reindeer.name)
}

export const raceReindeer = (inputKey: string) => {
  const reindeers = parseInput(inputKey)
  const raceTime = inputKey.startsWith('DEMO') ? 1000 : 2503
  const winningDistance = Math.max(
    ...reindeers.map((reindeer) => getDistance(reindeer, raceTime))
  )
  return {
    answer1: winningDistance,
  }
}

export const raceReindeerV2 = (inputKey: string) => {
  const reindeers = parseInput(inputKey)
  const raceTime = inputKey.startsWith('DEMO') ? 1000 : 2503
  const scores: Map<string, number> = new Map(
    reindeers.map((reindeer) => [reindeer.name, 0])
  )
  for (let i = 1; i <= raceTime; i++) {
    getLeadersAtTime(reindeers, i).forEach((leader) => {
      const currentScore = scores.get(leader) || 0
      scores.set(leader, currentScore + 1)
    })
  }
  const winningScore = Math.max(...Array.from(scores.values()))
  return {
    answer2: winningScore,
  }
}

const day14: Omit<DayConfig, 'year'> = {
  answer1Text: 'The winning reindeer has traveled answer km.',
  answer2Text: 'The winning reindeer scored answer points.',
  buttons: [
    {
      label: 'Race Reindeer!',
      onClick: raceReindeer,
    },
    {
      label: 'Race Reindeer! (v2)',
      onClick: raceReindeerV2,
    },
  ],
  id: 14,
  inputs,
  title: 'Reindeer Olympics',
}

export default day14
