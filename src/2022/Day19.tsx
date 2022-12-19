import { defaultRenderDay, IButton, IDayConfig } from '../Config'
import BinaryHeap from '../utils/BinaryHeap'

import INPUT from '../Inputs/2022/Day19'

interface Robot {
  ore: number
  clay: number
  obsidian: number
  type: 'ore' | 'clay' | 'obsidian' | 'geode'
}

interface Blueprint {
  id: number
  oreRobot: Robot
  clayRobot: Robot
  obsidianRobot: Robot
  geodeRobot: Robot
}

const parseBlueprint = (raw: string): Blueprint => {
  const id = parseInt(raw.split('Blueprint ')[1])
  const oreRobot: Robot = {
    ore: parseInt(raw.split('ore robot costs ')[1]),
    clay: 0,
    obsidian: 0,
    type: 'ore'
  }
  const clayRobot: Robot = {
    ore: parseInt(raw.split('clay robot costs ')[1]),
    clay: 0,
    obsidian: 0,
    type: 'clay'
  }
  const obsidianRobot: Robot = {
    ore: parseInt(raw.split('obsidian robot costs ')[1]),
    clay: parseInt(raw.split(' ore and ')[1]),
    obsidian: 0,
    type: 'obsidian'
  }
  const geodeRobot: Robot = {
    ore: parseInt(raw.split('geode robot costs ')[1]),
    clay: 0,
    obsidian: parseInt(raw.split(' ore and ')[2]),
    type: 'geode'
  }
  return {
    id, oreRobot, clayRobot, obsidianRobot, geodeRobot
  }
}

const getMostGeodes = (blueprint: Blueprint): number => {
  const timerLabel = `Getting geodes with blueprint id ${blueprint.id}`
  console.time(timerLabel)

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
    const timeRemaining = 24 - time
    return (
      ((geodes + (geodeRobots * timeRemaining)) * 1) +
      ((obsidian + (obsidianRobots * timeRemaining)) * 0.1) +
      ((clay + (clayRobots * timeRemaining)) * 0.01) +
      ((ore + (oreRobots * timeRemaining)) * 0.001)
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

  console.timeEnd(timerLabel)

  return maxGeodes
}

const howLongWillItTakeToHarvest = (amountNeeded: number, currentAmount: number, howManyRobots: number): number => {
  if (currentAmount >= amountNeeded) return 0
  // How long will it take to gather supplies though?
  const leftoverNeeded = amountNeeded - currentAmount
  return Math.ceil(leftoverNeeded / howManyRobots)
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
  oreRobot: oreRobotCost, clayRobot: clayRobotCost, obsidianRobot: obsidianRobotCost, geodeRobot: geodeRobotCost
}: Blueprint): string[] => {
  if (time >= 24) return []
  const nextStates: string[] = []
  const nextRobots = [oreRobotCost, clayRobotCost, obsidianRobotCost, geodeRobotCost]

  const maxOreRobotsNeeded = Math.max(oreRobotCost.ore, clayRobotCost.ore, obsidianRobotCost.ore, geodeRobotCost.ore)
  const maxClayRobotsNeeded = obsidianRobotCost.clay
  const maxObsidianRobotsNeeded = geodeRobotCost.obsidian

  const timeRemaining = 24 - time

  // The decision point for the search tree branches is what robot to build next
  // (including how long that takes to gather supplies)
  nextRobots.forEach(({ ore: oreCost, clay: clayCost, obsidian: obsidianCost, type }) => {
    if (
      (ore >= oreCost || oreRobots > 0) &&
      (clay >= clayCost || clayRobots > 0) &&
      (obsidian >= obsidianCost || obsidianRobots > 0)
    ) {
      // We are able to build this robot (eventually or now). But how long will it take?
      const timeToOre = howLongWillItTakeToHarvest(oreCost, ore, oreRobots)
      const timeToClay = howLongWillItTakeToHarvest(clayCost, clay, clayRobots)
      const timeToObsidian = howLongWillItTakeToHarvest(obsidianCost, obsidian, obsidianRobots)
      // It takes one minute to build a robot, after we have enough supplies
      const timeToRobot = Math.max(timeToOre, timeToClay, timeToObsidian) + 1
      if (
        // Do we have enough time to do it?
        (timeToRobot <= timeRemaining) &&
        // Do we not have enough of that bot already?
        (
          (type === 'ore' && (oreRobots < maxOreRobotsNeeded || oreRobots >= timeRemaining)) ||
          (type === 'clay' && (clayRobots < maxClayRobotsNeeded || clayRobots >= timeRemaining)) ||
          (type === 'obsidian' && (obsidianRobots < maxObsidianRobotsNeeded || clayRobots >= timeRemaining)) ||
          // We never have enough geode robots
          type === 'geode'
        )
      ) {
        nextStates.push([
          type === 'ore' ? oreRobots + 1 : oreRobots,
          type === 'clay' ? clayRobots + 1 : clayRobots,
          type === 'obsidian' ? obsidianRobots + 1 : obsidianRobots,
          type === 'geode' ? geodeRobots + 1 : geodeRobots,
          ore + (oreRobots * timeToRobot) - oreCost,
          clay + (clayRobots * timeToRobot) - clayCost,
          obsidian + (obsidianRobots * timeToRobot) - obsidianCost,
          geodes + (geodeRobots * timeToRobot),
          time + timeToRobot
        ].join(','))
      }
    }
  })

  if (timeRemaining > 0 && nextStates.length === 0) {
    nextStates.push([
      oreRobots,
      clayRobots,
      obsidianRobots,
      geodeRobots,
      ore + (oreRobots * timeRemaining),
      clay + (clayRobots * timeRemaining),
      obsidian + (obsidianRobots * timeRemaining),
      geodes + (geodeRobots * timeRemaining),
      24
    ].join(','))
  }

  return nextStates
}

const BUTTONS: IButton[] = [
  {
    label: 'Get Blueprint Quality Levels',
    onClick: (inputKey: string) => {
      const timerLabel = `Check all the blueprints for ${inputKey}`

      console.time(timerLabel)

      const blueprints = INPUT[inputKey].split('\n').map(parseBlueprint)

      const geodeCounts: Map<number, number> = new Map(blueprints.map(blueprint => (
        [blueprint.id, getMostGeodes(blueprint)]
      )))

      const totalQualityLevels = Array.from(geodeCounts.entries()).reduce((currentSum, [id, maxGeodes]) => (
        currentSum + (id * maxGeodes)
      ), 0)

      console.timeEnd(timerLabel)

      // 1804 is too low

      return {
        answer1: totalQualityLevels.toString()
      }
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The total quality level of all blueprints is{' '}
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
