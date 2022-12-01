import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'

import INPUT from '../Inputs/2015//Day14'

interface IReindeer {
  flyTime: number
  name: string
  restTime: number
  velocity: number
}

const getDistance = (reindeer: IReindeer, raceTime: number): number => {
  const fullFlyRestCycles = Math.floor(raceTime / (reindeer.flyTime + reindeer.restTime))
  const leftoverTime = raceTime - (fullFlyRestCycles * (reindeer.flyTime + reindeer.restTime))
  const flyTime = (fullFlyRestCycles * reindeer.flyTime) + Math.min(leftoverTime, reindeer.flyTime)
  return flyTime * reindeer.velocity
}

const getLeadersAtTime = (reindeers: IReindeer[], time: number): string[] => {
  const positionsAtTime = reindeers.map(reindeer => ({
    name: reindeer.name,
    position: getDistance(reindeer, time)
  })).sort((a, b) => b.position - a.position)
  return positionsAtTime
    .filter(reindeer => reindeer.position >= positionsAtTime[0].position)
    .map(reindeer => reindeer.name)
}

const parseInput = (inputKey: string): IReindeer[] => INPUT[inputKey].split('\n').map(
  reindeerLine => {
    const [name, , , velocity, , , flyTime, , , , , , , restTime] = reindeerLine.split(' ')
    return {
      flyTime: parseInt(flyTime),
      name,
      restTime: parseInt(restTime),
      velocity: parseInt(velocity)
    }
  }
)

const BUTTONS: IButton[] = [
  {
    label: 'Race Reindeer!',
    onClick: (inputKey) => {
      const reindeers = parseInput(inputKey)
      const raceTime = inputKey.startsWith('DEMO') ? 1000 : 2503
      const winningDistance = Math.max(...reindeers.map(reindeer => getDistance(reindeer, raceTime)))
      return {
        answer1: winningDistance.toString()
      }
    }
  },
  {
    label: 'Race Reindeer! (v2)',
    onClick: (inputKey) => {
      const reindeers = parseInput(inputKey)
      const raceTime = inputKey.startsWith('DEMO') ? 1000 : 2503
      const scores: Map<string, number> = new Map(reindeers.map(reindeer => ([reindeer.name, 0])))
      for (let i = 1; i <= raceTime; i++) {
        getLeadersAtTime(reindeers, i).forEach(leader => {
          const currentScore = scores.get(leader) || 0
          scores.set(leader, currentScore + 1)
        })
      }
      const winningScore = Math.max(...Array.from(scores.values()))
      return {
        answer2: winningScore.toString()
      }
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The winning reindeer has traveled <code>{answer}</code> km.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      The winning reindeer scored <code>{answer}</code> points.
    </span>
  ),
  buttons: BUTTONS,
  day: 14,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Reindeer Olympics'
}

export default config