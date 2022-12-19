import { defaultRenderDay, IButton, IDayConfig } from '../Config'
import BinaryHeap from '../utils/BinaryHeap'

import INPUT from '../Inputs/2022/Day19'

interface RobotCost {
  ore: number
  clay: number
  obsidian: number
  type: 'ore' | 'clay' | 'obsidian' | 'geode'
}

interface Blueprint {
  id: number
  oreRobotCost: RobotCost
  clayRobotCost: RobotCost
  obsidianRobotCost: RobotCost
  geodeRobotCost: RobotCost
}

const parseBlueprint = (raw: string): Blueprint => {
  const id = parseInt(raw.split('Blueprint ')[1])
  const oreRobotCost: RobotCost = {
    ore: parseInt(raw.split('ore robot costs ')[1]),
    clay: 0,
    obsidian: 0,
    type: 'ore'
  }
  const clayRobotCost: RobotCost = {
    ore: parseInt(raw.split('clay robot costs ')[1]),
    clay: 0,
    obsidian: 0,
    type: 'clay'
  }
  const obsidianRobotCost: RobotCost = {
    ore: parseInt(raw.split('obsidian robot costs ')[1]),
    clay: parseInt(raw.split(' ore and ')[1]),
    obsidian: 0,
    type: 'obsidian'
  }
  const geodeRobotCost: RobotCost = {
    ore: parseInt(raw.split('geode robot costs ')[1]),
    clay: 0,
    obsidian: parseInt(raw.split(' ore and ')[2]),
    type: 'geode'
  }
  return {
    id, oreRobotCost, clayRobotCost, obsidianRobotCost, geodeRobotCost
  }
}

const getMostGeodes = (blueprint: Blueprint): number => {
  const scoreFunction = (stateToScore: string): number => {
    const [
      oreRobots,
      clayRobots,
      obsidianRobots,
      geodeRobots,
      ore,
      clay,
      obsidian,
      geodes,
      time
    ] = stateToScore.split(',').map(n => Number(n))
    return (
      (geodes * 1000) +
      (geodeRobots * 900) +
      (obsidian * 800) +
      (obsidianRobots * 700) +
      (clay * 600) +
      (clayRobots * 500) +
      (ore * 400) +
      (oreRobots * 200) +
      ((24 - time) * 100)
    )
  }

  const searchQueue = new BinaryHeap<string>(scoreFunction, 'max', '1,0,0,0,0,0,0,0,0')

  let maxGeodes = 0

  while (searchQueue.size()) {
    const state = searchQueue.pop()!.split(',').map(n => Number(n))
    const [, , , , , , , geodes, time] = state
    if (time === 24) maxGeodes = Math.max(maxGeodes, geodes)
    getNextStates(state, blueprint).forEach(ns => searchQueue.push(ns))
  }

  return maxGeodes
}

const getNextStates = ([
  oreRobots,
  clayRobots,
  obsidianRobots,
  geodeRobots,
  ore,
  clay,
  obsidian,
  geodes,
  time
]: number[], {
  oreRobotCost, clayRobotCost, obsidianRobotCost, geodeRobotCost
}: Blueprint): string[] => {
  if (time >= 24) return []
  const nextStates: string[] = []
  const nextRobots = [oreRobotCost, clayRobotCost, obsidianRobotCost, geodeRobotCost]
  // For each next possible robot we could build, we add that to the next states list
  nextRobots.forEach(robotCost => {
    if (
      ore >= robotCost.ore &&
      clay >= robotCost.clay &&
      obsidian >= robotCost.obsidian
    ) {
      const nextState = [
        robotCost.type === 'ore' ? oreRobots + 1 : oreRobots,
        robotCost.type === 'clay' ? clayRobots + 1 : clayRobots,
        robotCost.type === 'obsidian' ? obsidianRobots + 1 : obsidianRobots,
        robotCost.type === 'geode' ? geodeRobots + 1 : geodeRobots,
        // Production is based on current robots
        ore + oreRobots - robotCost.ore,
        clay + clayRobots - robotCost.clay,
        obsidian + obsidianRobots - robotCost.obsidian,
        geodes + geodeRobots,
        time + 1
      ].join(',')
      if (!nextStates.includes(nextState)) nextStates.push(nextState)
    }
  })
  // Also push a state where we don't build anything
  const restingState = [
    oreRobots,
    clayRobots,
    obsidianRobots,
    geodeRobots,
    ore + oreRobots,
    clay + clayRobots,
    obsidian + obsidianRobots,
    geodes + geodeRobots,
    time + 1
  ].join(',')
  if (!nextStates.includes(restingState)) nextStates.push(restingState)

  return nextStates
}

const BUTTONS: IButton[] = [
  {
    label: 'Get Blueprint Quality Levels',
    onClick: (inputKey: string) => {
      const blueprints = INPUT[inputKey].split('\n').map(parseBlueprint)

      const geodeCounts: Map<number, number> = new Map(blueprints.map(blueprint => (
        [blueprint.id, getMostGeodes(blueprint)]
      )))

      debugger

      return {
        answer1: ''
      }
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The surface area of the exposed droplets is{' '}
      <code>{answer}</code>.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      The outer surface area of the exposed droplets is{' '}
      <code>{answer}</code>.
    </span>
  ),
  buttons: BUTTONS,
  day: 19,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Not Enough Minerals',
}

export default config
