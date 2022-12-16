import { defaultRenderDay, IButton, IDayConfig } from '../Config'

import INPUT from '../Inputs/2022/Day16'

interface Minute {
  id: number
  openValves: string[]
  totalPressureReleaseSoFar: number
  currentPressureReleasePerMinute: number
  location: Valve
}

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

const parseInput = (inputKey: string) => {
  const input = INPUT[inputKey].split('\n')
  const valves: Map<string, Valve> = new Map()
  input.forEach(line => {
    const valve = new Valve(line)
    valves.set(valve.id, valve)
  })
  return valves
}

const getNextStates = (currentState: Minute, valves: Map<string, Valve>): Minute[] => {
  const nextStates: Minute[] = []

  // You can open it
  if (!currentState.openValves.includes(currentState.location.id)) {
    nextStates.push({
      ...currentState,
      id: currentState.id + 1,
      openValves: [...currentState.openValves, currentState.location.id],
      totalPressureReleaseSoFar: currentState.totalPressureReleaseSoFar + currentState.currentPressureReleasePerMinute,
      currentPressureReleasePerMinute: currentState.currentPressureReleasePerMinute + currentState.location.flowRate
    })
  }

  // You can move
  currentState.location.tunnels.forEach(valveId => {
    nextStates.push({
      ...currentState,
      id: currentState.id + 1,
      totalPressureReleaseSoFar: currentState.totalPressureReleaseSoFar + currentState.currentPressureReleasePerMinute,
      location: valves.get(valveId)!
    })
  })

  // You can do nothing
  nextStates.push({
    ...currentState,
    id: currentState.id + 1,
    totalPressureReleaseSoFar: currentState.totalPressureReleaseSoFar + currentState.currentPressureReleasePerMinute
  })

  // Sort these by highest predicted value
  nextStates.sort((a, b) => {
    const predictedAValue = (30 - a.id) * a.currentPressureReleasePerMinute
    const predictedBValue = (30 - b.id) * b.currentPressureReleasePerMinute

    return predictedBValue - predictedAValue
  })

  return nextStates
}

const BUTTONS: IButton[] = [
  {
    label: 'Open Valves',
    onClick: (inputKey: string) => {
      const valves = parseInput(inputKey)

      const queue: Minute[] = [{
        id: 1,
        openValves: [],
        totalPressureReleaseSoFar: 0,
        currentPressureReleasePerMinute: 0,
        location: valves.get('AA')!
      }]

      let maxPressureRelease = 0

      while (queue.length) {
        const currentState = queue.shift()!
        if (currentState.id < 30) {
          queue.unshift(...getNextStates(currentState!, valves))
        } else {
          maxPressureRelease = Math.max(
            maxPressureRelease,
            currentState.totalPressureReleaseSoFar
          )
        }
      }

      return {
        answer1: maxPressureRelease.toString()
      }
    }
  }
  // {
  //   label: 'Check for Beacons',
  //   onClick: (inputKey: string) => {
  //     const startTime = new Date().getTime()

  //     const rowWeCareAbout = inputKey === 'DEMO' ? 10 : 2000000

  //     const field = new Field(inputKey, rowWeCareAbout)

  //     const answer = field.countNoBeaconsOnRow(rowWeCareAbout)

  //     console.log(`Part 1 run time: ${new Date().getTime() - startTime}ms`)

  //     return {
  //       answer1: answer.toString(),
  //     }
  //   },
  // },
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
      The distress beacon's tuning frequency is{' '}
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
