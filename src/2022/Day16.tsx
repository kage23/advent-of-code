import { defaultRenderDay, IButton, IDayConfig } from '../Config'

import AStar from '../utils/AStar'
import BinaryHeap from '../utils/BinaryHeap'
import INPUT from '../Inputs/2022/Day16'

class Valve {
  id: string
  flowRate: number
  tunnels: string[]

  constructor(line: string) {
    const words = line.split(' ')
    this.id = words[1]
    this.flowRate = Number(words[4].split('=')[1].slice(0, -1))
    this.tunnels = line.split(/leads* to valves* /)[1].split(', ')
  }
}

const parseInput = (inputKey: string): {
  valves: Map<string, Valve>
  valveDistances: Map<string, number>
} => {
  const timerLabel = 'Parsing the input and precalculating the distances'

  console.time(timerLabel)

  const input = INPUT[inputKey].split('\n')
  const valves: Map<string, Valve> = new Map()
  input.forEach(line => {
    const valve = new Valve(line)
    valves.set(valve.id, valve)
  })

  const valveDistances: Map<string, number> = new Map()
  const valveIds = Array.from(valves.keys())

  for (let i = 0; i < valveIds.length - 1; i++) {
    for (let j = i + 1; j < valveIds.length; j++) {
      const valvePair = [valves.get(valveIds[i])!, valves.get(valveIds[j])!].sort((a, b) => a.id.localeCompare(b.id))
      const h = (from: string) => from === valvePair[1].id ? 0 : 1
      const getNeighbors = (currentId: string) => valves.get(currentId)!.tunnels
      const distance = AStar(valvePair[0].id, valvePair[1].id, () => 1, h, getNeighbors)
      valveDistances.set(valvePair.map(({ id }) => id).join(','), distance)
    }
  }

  console.timeEnd(timerLabel)

  return { valves, valveDistances }
}

interface Node {
  time: number
  openValves: string[]
  totalPressureRelease: number
  location: string
}

const getNextStates = (
  node: Node,
  valves: Map<string, Valve>,
  valveDistances: Map<string, number>,
  totalTime: number,
  saveSomeForMe?: boolean,
  onlyLookAtTheseValves?: string[]
): Node[] => {
  const nextStates: Node[] = []

  // We only care about valves with flow rates higher than zero.
  // Also, if there's an allowlist, we should make sure it's on it.
  const valvesWeCareAbout = Array.from(valves.keys()).filter(valveId => (
    valves.get(valveId)!.flowRate > 0 &&
    (!onlyLookAtTheseValves || onlyLookAtTheseValves.includes(valveId))
  ))

  // If there's going to be another worker, we should save some for them
  if (saveSomeForMe && node.openValves.length >= (valvesWeCareAbout.length / 2)) {
    return [{
      ...node,
      time: totalTime
    }]
  }

  // What valve should we open next?
  // Could be any currently closed valve that we care about and is close enough that we can get to it.
  const closedValves = valvesWeCareAbout.filter(valveId => {
    const valvePairId = [valveId, node.location].sort((a, b) => a.localeCompare(b)).join(',')
    return (
      !node.openValves.includes(valveId) &&
      (node.location === valveId || (node.time + valveDistances.get(valvePairId)! + 1) <= totalTime)
    )
  })
  closedValves.forEach(valveId => {
    const valvePairId = [valveId, node.location].sort((a, b) => a.localeCompare(b)).join(',')
    const timeToNextState = valveId === node.location ? 1 : valveDistances.get(valvePairId)! + 1
    nextStates.push({
      time: node.time + timeToNextState,
      openValves: [...node.openValves, valveId],
      totalPressureRelease: node.totalPressureRelease + (
        valves.get(valveId)!.flowRate * ((totalTime + 1) - (node.time + timeToNextState))
      ),
      location: valveId
    })
  })

  // If they're all open, nothing to do but sit here and wait
  if (!closedValves.length) {
    nextStates.push({
      ...node,
      time: totalTime
    })
  }

  return nextStates
}

const findPathsInXTime = (
  valves: Map<string, Valve>,
  valveDistances: Map<string, number>,
  time: number,
  saveSomeForMe?: boolean,
  onlyLookAtTheseValves?: string[]
): Node[] => {
  const paths: Node[] = []

  const getMinimumValue = ({ totalPressureRelease }: Node) => totalPressureRelease

  const queue = new BinaryHeap<Node>(getMinimumValue, 'max', {
    time: 1,
    openValves: [],
    totalPressureRelease: 0,
    location: 'AA'
  })

  while (queue.size()) {
    const currentState = queue.pop()
    if (currentState.time < time) {
      const nextStates = getNextStates(
        currentState!,
        valves,
        valveDistances,
        time,
        saveSomeForMe,
        onlyLookAtTheseValves
      )
      nextStates.forEach(ns => queue.push(ns))
    } else {
      paths.push(currentState)
    }
  }

  return paths
}

const BUTTONS: IButton[] = [
  {
    label: 'Open Valves',
    onClick: (inputKey: string) => {
      const { valves, valveDistances } = parseInput(inputKey)

      const timerLabel = 'Actually finding the best plan'
      console.time(timerLabel)

      const paths = findPathsInXTime(valves, valveDistances, 30)
        .sort((a, b) => b.totalPressureRelease - a.totalPressureRelease)

      console.timeEnd(timerLabel)

      return {
        answer1: paths[0].totalPressureRelease.toString()
      }
    }
  },
  {
    label: 'Work With an Elephant',
    onClick: (inputKey: string) => {
      const { valves, valveDistances } = parseInput(inputKey)

      const timerLabel = 'Actually finding the best plan'
      console.time(timerLabel)

      const myBestPath = findPathsInXTime(valves, valveDistances, 26, true)
        .sort((a, b) => b.totalPressureRelease - a.totalPressureRelease)[0]

      const elephantsBestPath = findPathsInXTime(
        valves,
        valveDistances,
        26,
        false,
        Array.from(valves.keys()).filter(valveId => !myBestPath.openValves.includes(valveId))
      ).sort((a, b) => b.totalPressureRelease - a.totalPressureRelease)[0]

      console.timeEnd(timerLabel)

      return {
        answer2: (myBestPath.totalPressureRelease + elephantsBestPath.totalPressureRelease).toString()
      }
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The most pressure you can release is{' '}
      <code>{answer}</code>.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      Working with an elephant, the most pressure you can release is{' '}
      <code>{answer}</code>.
    </span>
  ),
  buttons: BUTTONS,
  day: 16,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Proboscidea Volcanium',
}

export default config
