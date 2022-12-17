import { defaultRenderDay, IButton, IDayConfig } from '../Config'

import AStar from '../utils/AStar'
import BinaryHeap from '../utils/BinaryHeap'
import INPUT from '../Inputs/2022/Day16'

interface Minute {
  id: number
  openValves: string[]
  totalPressureReleaseSoFar: number
  currentPressureReleasePerMinute: number
  location: Valve
}

interface Worker {
  nextValveToOpen: string
  timeToValve: number
  location: Valve
}
interface Part2State {
  minute: number
  openValves: string[]
  totalPressureReleaseSoFar: number
  currentPressureReleasePerMinute: number
  you: Worker
  elephant: Worker
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

const parseInput = (inputKey: string): {
  valves: Map<string, Valve>
  valveDistances: Map<string, number>
} => {
  const startTime = new Date().getTime()
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

  console.log(`It took ${new Date().getTime() - startTime}ms to parse the input and pre-calculate the distances.`)

  return { valves, valveDistances }
}

const getNextStates = (
  {
    id,
    openValves,
    totalPressureReleaseSoFar,
    currentPressureReleasePerMinute,
    location
  }: Minute,
  valves: Map<string, Valve>,
  valveDistances: Map<string, number>
): Minute[] => {
  const nextStates: Minute[] = []

  // What valve should we open next?
  // Could be any currently closed valve that has a flow rate higher than 0 and is close enough that we can get to it.
  const closedValves = Array.from(valves.keys()).filter(valveId => {
    const valvePairId = [valveId, location.id].sort((a, b) => a.localeCompare(b)).join(',')
    return (
      !openValves.includes(valveId) &&
      valves.get(valveId)!.flowRate > 0 &&
      (location.id === valveId || (id + valveDistances.get(valvePairId)! + 1) <= 30)
    )
  })
  closedValves.forEach(valveId => {
    const valvePairId = [valveId, location.id].sort((a, b) => a.localeCompare(b)).join(',')
    const timeToNextState = valveId === location.id ? 1 : valveDistances.get(valvePairId)! + 1
    nextStates.push({
      id: id + timeToNextState,
      openValves: [...openValves, valveId],
      totalPressureReleaseSoFar: totalPressureReleaseSoFar + (
        currentPressureReleasePerMinute * timeToNextState
      ),
      currentPressureReleasePerMinute: currentPressureReleasePerMinute +
        valves.get(valveId)!.flowRate,
      location: valves.get(valveId)!
    })
  })

  // If they're all open, nothing to do but sit here and wait
  if (!closedValves.length) {
    nextStates.push({
      openValves,
      currentPressureReleasePerMinute,
      location,
      id: 30,
      totalPressureReleaseSoFar: totalPressureReleaseSoFar + (
        currentPressureReleasePerMinute * (31 - id)
      )
    })
  }

  return nextStates
}

const getNextStates2 = (
  {
    minute,
    openValves,
    totalPressureReleaseSoFar,
    currentPressureReleasePerMinute,
    you,
    elephant
  }: Part2State,
  valves: Map<string, Valve>,
  valveDistances: Map<string, number>
): Part2State[] => {
  const nextStates: Part2State[] = []

  // Closed valves with flow rates higher than 0 that aren't already claimed.
  // Gotta deal with distance/time elsewhere though!
  const closedValves = Array.from(valves.keys()).filter(valveId => (
    !openValves.includes(valveId) &&
    valves.get(valveId)!.flowRate > 0 &&
    you.nextValveToOpen !== valveId &&
    elephant.nextValveToOpen !== valveId
  ))

  // If both workers are free, we need to generate possible states that send them both somewhere.
  // So that'll be states with one worker arriving and another worker still traveling (probably, but
  // possibly both arriving at once).
  if (you.timeToValve === 0 && elephant.timeToValve === 0) {
    // Generate a list of valve pairs
    const valvePairs: [string, string][] = []
    for (let i = 0; i < closedValves.length - 1; i++) {
      for (let j = 1; j < closedValves.length; j++) {
        valvePairs.push(
          [closedValves[i], closedValves[j]]
            .sort((a, b) => a.localeCompare(b)) as [string, string]
        )
      }
    }
    // For each pair, we can send one worker to one and the other to the other, or vice versa
    // If there's enough time
    valvePairs.forEach(([a, b]) => {
      // Let's get all the times
      const timeYouToA = valveDistances.get(
        [you.location.id, a].sort((x, y) => x.localeCompare(y)).join(',')
      )!
      const timeYouToB = valveDistances.get(
        [you.location.id, b].sort((x, y) => x.localeCompare(y)).join(',')
      )!
      const timeElephantToA = valveDistances.get(
        [elephant.location.id, a].sort((x, y) => x.localeCompare(y)).join(',')
      )!
      const timeElephantToB = valveDistances.get(
        [elephant.location.id, b].sort((x, y) => x.localeCompare(y)).join(',')
      )!
      // Sending you to A
      if (minute + timeYouToA + 1 <= 26) {
        // Sending elephant to B
        if (minute + timeElephantToB + 1 <= 26) {
          // You arrive first
          if (timeYouToA < timeElephantToB) {
            nextStates.push({
              minute: minute + timeYouToA + 1,
              openValves: [...openValves, a],
              totalPressureReleaseSoFar: totalPressureReleaseSoFar + (
                currentPressureReleasePerMinute * (timeYouToA + 1)
              ),
              currentPressureReleasePerMinute: currentPressureReleasePerMinute +
                valves.get(a)!.flowRate,
              you: {
                nextValveToOpen: '',
                timeToValve: 0,
                location: valves.get(a)!
              },
              elephant: {
                nextValveToOpen: b,
                timeToValve: timeElephantToB - (timeYouToA + 1),
                location: elephant.location
              }
            })
          }
          // Elephant arrives first
          else if (timeElephantToB < timeYouToA) {
            nextStates.push({
              minute: minute + timeElephantToB + 1,
              openValves: [...openValves, b],
              totalPressureReleaseSoFar: totalPressureReleaseSoFar + (
                currentPressureReleasePerMinute * (timeElephantToB + 1)
              ),
              currentPressureReleasePerMinute: currentPressureReleasePerMinute +
                valves.get(b)!.flowRate,
              you: {
                nextValveToOpen: a,
                timeToValve: timeYouToA - (timeElephantToB + 1),
                location: you.location
              },
              elephant: {
                nextValveToOpen: '',
                timeToValve: 0,
                location: valves.get(b)!
              }
            })
          }
          // You arrive simultaneously
          else {
            nextStates.push({
              minute: minute + timeYouToA + 1,
              openValves: [...openValves, a, b],
              totalPressureReleaseSoFar: totalPressureReleaseSoFar + (
                currentPressureReleasePerMinute * (timeYouToA + 1)
              ),
              currentPressureReleasePerMinute: currentPressureReleasePerMinute +
                valves.get(a)!.flowRate + valves.get(b)!.flowRate,
              you: {
                nextValveToOpen: '',
                timeToValve: 0,
                location: valves.get(a)!
              },
              elephant: {
                nextValveToOpen: '',
                timeToValve: 0,
                location: valves.get(b)!
              }
            })
          }
        }
        // Elephant doesn't go anywhere
        else {
          nextStates.push({
            minute: minute + timeYouToA + 1,
            openValves: [...openValves, a],
            totalPressureReleaseSoFar: totalPressureReleaseSoFar + (
              currentPressureReleasePerMinute * (timeYouToA + 1)
            ),
            currentPressureReleasePerMinute: currentPressureReleasePerMinute +
              valves.get(a)!.flowRate,
            you: {
              nextValveToOpen: '',
              timeToValve: 0,
              location: valves.get(a)!
            },
            elephant: {
              nextValveToOpen: '',
              timeToValve: 27 - (minute + timeYouToA + 1),
              location: elephant.location
            }
          })
        }
      }
      // Sending you to B
      if (minute + timeYouToB + 1 <= 26) {
        // Sending elephant to A
        if (minute + timeElephantToA + 1 <= 26) {
          // You arrive first
          if (timeYouToB < timeElephantToA) {
            nextStates.push({
              minute: minute + timeYouToB + 1,
              openValves: [...openValves, b],
              totalPressureReleaseSoFar: totalPressureReleaseSoFar + (
                currentPressureReleasePerMinute * (timeYouToB + 1)
              ),
              currentPressureReleasePerMinute: currentPressureReleasePerMinute +
                valves.get(b)!.flowRate,
              you: {
                nextValveToOpen: '',
                timeToValve: 0,
                location: valves.get(b)!
              },
              elephant: {
                nextValveToOpen: a,
                timeToValve: timeElephantToA - (timeYouToB + 1),
                location: elephant.location
              }
            })
          }
          // Elephant arrives first
          else if (timeElephantToA < timeYouToB) {
            nextStates.push({
              minute: minute + timeElephantToA + 1,
              openValves: [...openValves, a],
              totalPressureReleaseSoFar: totalPressureReleaseSoFar + (
                currentPressureReleasePerMinute * (timeElephantToA + 1)
              ),
              currentPressureReleasePerMinute: currentPressureReleasePerMinute +
                valves.get(a)!.flowRate,
              you: {
                nextValveToOpen: b,
                timeToValve: timeYouToB - (timeElephantToA + 1),
                location: you.location
              },
              elephant: {
                nextValveToOpen: '',
                timeToValve: 0,
                location: valves.get(a)!
              }
            })
          }
          // You arrive simultaneously
          else {
            nextStates.push({
              minute: minute + timeYouToB + 1,
              openValves: [...openValves, a, b],
              totalPressureReleaseSoFar: totalPressureReleaseSoFar + (
                currentPressureReleasePerMinute * (timeYouToB + 1)
              ),
              currentPressureReleasePerMinute: currentPressureReleasePerMinute +
                valves.get(a)!.flowRate + valves.get(b)!.flowRate,
              you: {
                nextValveToOpen: '',
                timeToValve: 0,
                location: valves.get(b)!
              },
              elephant: {
                nextValveToOpen: '',
                timeToValve: 0,
                location: valves.get(a)!
              }
            })
          }
        }
        // Elephant doesn't go anywhere
        else {
          nextStates.push({
            minute: minute + timeYouToB + 1,
            openValves: [...openValves, b],
            totalPressureReleaseSoFar: totalPressureReleaseSoFar + (
              currentPressureReleasePerMinute * (timeYouToB + 1)
            ),
            currentPressureReleasePerMinute: currentPressureReleasePerMinute +
              valves.get(b)!.flowRate,
            you: {
              nextValveToOpen: '',
              timeToValve: 0,
              location: valves.get(b)!
            },
            elephant: {
              nextValveToOpen: '',
              timeToValve: 27 - (minute + timeYouToB + 1),
              location: elephant.location
            }
          })
        }
      }
      // You don't go anywhere
      if ((minute + timeYouToA + 1 > 26) && (minute + timeYouToB + 1 > 26)) {
        // Sending elephant to A
        if (minute + timeElephantToA + 1 <= 26) {
          nextStates.push({
            minute: minute + timeElephantToA + 1,
            openValves: [...openValves, a],
            totalPressureReleaseSoFar: totalPressureReleaseSoFar + (
              currentPressureReleasePerMinute * (timeElephantToA + 1)
            ),
            currentPressureReleasePerMinute: currentPressureReleasePerMinute +
              valves.get(a)!.flowRate,
            you: {
              nextValveToOpen: '',
              timeToValve: 27 - (minute + timeElephantToA + 1),
              location: you.location
            },
            elephant: {
              nextValveToOpen: '',
              timeToValve: 0,
              location: valves.get(a)!
            }
          })
        }
        // Sending elephant to B
        if (minute + timeElephantToB + 1 <= 26) {
          nextStates.push({
            minute: minute + timeElephantToB + 1,
            openValves: [...openValves, b],
            totalPressureReleaseSoFar: totalPressureReleaseSoFar + (
              currentPressureReleasePerMinute * (timeElephantToB + 1)
            ),
            currentPressureReleasePerMinute: currentPressureReleasePerMinute +
              valves.get(b)!.flowRate,
            you: {
              nextValveToOpen: '',
              timeToValve: 27 - (minute + timeElephantToB + 1),
              location: you.location
            },
            elephant: {
              nextValveToOpen: '',
              timeToValve: 0,
              location: valves.get(b)!
            }
          })
        }
        // Elephant doesn't go anywhere
        if ((minute + timeElephantToA + 1 > 26) && (minute + timeElephantToB + 1 > 26)) {
          nextStates.push({
            minute: 26,
            openValves,
            totalPressureReleaseSoFar: totalPressureReleaseSoFar + (
              currentPressureReleasePerMinute * (27 - minute)
            ),
            currentPressureReleasePerMinute,
            you: {
              nextValveToOpen: '',
              timeToValve: 0,
              location: you.location
            },
            elephant: {
              nextValveToOpen: '',
              timeToValve: 0,
              location: elephant.location
            }
          })
        }
      }
    })
  }

  // If only one worker is free, we need to generate possible states sending them somewhere, but
  // the other worker might arrive first.
  else {
    // You're free
    if (you.timeToValve === 0) {
      closedValves.forEach(valveId => {
        const timeYouToValve = valveDistances.get([valveId, you.location.id].sort((a, b) => a.localeCompare(b)).join(','))!
        // Can we send you to the valve?
        if (minute + timeYouToValve + 1 <= 26) {
          // You arrive first
          if (timeYouToValve < elephant.timeToValve) {
            nextStates.push({
              minute: minute + timeYouToValve + 1,
              openValves: [...openValves, valveId],
              totalPressureReleaseSoFar: totalPressureReleaseSoFar + (
                currentPressureReleasePerMinute * (timeYouToValve + 1)
              ),
              currentPressureReleasePerMinute: currentPressureReleasePerMinute +
                valves.get(valveId)!.flowRate,
              you: {
                nextValveToOpen: '',
                timeToValve: 0,
                location: valves.get(valveId)!
              },
              elephant: {
                nextValveToOpen: elephant.nextValveToOpen,
                timeToValve: elephant.timeToValve - (timeYouToValve + 1),
                location: elephant.location
              }
            })
          }
          // The elephant arrives first
          else if (elephant.timeToValve < timeYouToValve) {
            nextStates.push({
              minute: minute + elephant.timeToValve + 1,
              openValves: [...openValves, elephant.nextValveToOpen],
              totalPressureReleaseSoFar: totalPressureReleaseSoFar + (
                currentPressureReleasePerMinute * (elephant.timeToValve + 1)
              ),
              currentPressureReleasePerMinute: currentPressureReleasePerMinute +
                valves.get(elephant.nextValveToOpen)!.flowRate,
              you: {
                nextValveToOpen: valveId,
                timeToValve: timeYouToValve - (elephant.timeToValve),
                location: you.location
              },
              elephant: {
                nextValveToOpen: '',
                timeToValve: 0,
                location: valves.get(elephant.nextValveToOpen)!
              }
            })
          }
          // You arrive simultaneously
          else {
            nextStates.push({
              minute: minute + timeYouToValve + 1,
              openValves: [...openValves, valveId, elephant.nextValveToOpen],
              totalPressureReleaseSoFar: totalPressureReleaseSoFar + (
                currentPressureReleasePerMinute * (timeYouToValve + 1)
              ),
              currentPressureReleasePerMinute: currentPressureReleasePerMinute +
                valves.get(valveId)!.flowRate + valves.get(elephant.nextValveToOpen)!.flowRate,
              you: {
                nextValveToOpen: '',
                timeToValve: 0,
                location: valves.get(valveId)!
              },
              elephant: {
                nextValveToOpen: '',
                timeToValve: 0,
                location: valves.get(elephant.nextValveToOpen)!
              }
            })
          }
        }
      })
    }
    // Elephant is free
    else {
      closedValves.forEach(valveId => {
        const timeElephantToValve = valveDistances.get([valveId, elephant.location.id].sort((a, b) => a.localeCompare(b)).join(','))!
        // Can we send the elephant to the valve?
        if (minute + timeElephantToValve + 1 <= 26) {
          // You arrive first
          if (you.timeToValve < timeElephantToValve) {
            nextStates.push({
              minute: minute + you.timeToValve + 1,
              openValves: [...openValves, you.nextValveToOpen],
              totalPressureReleaseSoFar: totalPressureReleaseSoFar + (
                currentPressureReleasePerMinute * (you.timeToValve + 1)
              ),
              currentPressureReleasePerMinute: currentPressureReleasePerMinute +
                valves.get(you.nextValveToOpen)!.flowRate,
              you: {
                nextValveToOpen: '',
                timeToValve: 0,
                location: valves.get(you.nextValveToOpen)!
              },
              elephant: {
                nextValveToOpen: valveId,
                timeToValve: elephant.timeToValve - (you.timeToValve + 1),
                location: elephant.location
              }
            })
          }
          // The elephant arrives first
          else if (timeElephantToValve < you.timeToValve) {
            nextStates.push({
              minute: minute + timeElephantToValve + 1,
              openValves: [...openValves, valveId],
              totalPressureReleaseSoFar: totalPressureReleaseSoFar + (
                currentPressureReleasePerMinute * (timeElephantToValve + 1)
              ),
              currentPressureReleasePerMinute: currentPressureReleasePerMinute +
                valves.get(valveId)!.flowRate,
              you: {
                nextValveToOpen: you.nextValveToOpen,
                timeToValve: you.timeToValve - (timeElephantToValve + 1),
                location: you.location
              },
              elephant: {
                nextValveToOpen: '',
                timeToValve: 0,
                location: valves.get(valveId)!
              }
            })
          }
          // You arrive simultaneously
          else {
            nextStates.push({
              minute: minute + timeElephantToValve + 1,
              openValves: [...openValves, valveId, you.nextValveToOpen],
              totalPressureReleaseSoFar: totalPressureReleaseSoFar + (
                currentPressureReleasePerMinute * (timeElephantToValve + 1)
              ),
              currentPressureReleasePerMinute: currentPressureReleasePerMinute +
                valves.get(valveId)!.flowRate + valves.get(you.nextValveToOpen)!.flowRate,
              you: {
                nextValveToOpen: '',
                timeToValve: 0,
                location: valves.get(you.nextValveToOpen)!
              },
              elephant: {
                nextValveToOpen: '',
                timeToValve: 0,
                location: valves.get(valveId)!
              }
            })
          }
        }
      })
    }
  }

  return nextStates
}

const BUTTONS: IButton[] = [
  {
    label: 'Open Valves',
    onClick: (inputKey: string) => {
      const { valves, valveDistances } = parseInput(inputKey)

      const startTime = new Date().getTime()

      const getPredictedValue = ({ id, currentPressureReleasePerMinute, totalPressureReleaseSoFar }: Minute) =>
        totalPressureReleaseSoFar + (currentPressureReleasePerMinute * (31 - id))
      const queue = new BinaryHeap<Minute>(getPredictedValue, 'max', {
        id: 1,
        openValves: [],
        totalPressureReleaseSoFar: 0,
        currentPressureReleasePerMinute: 0,
        location: valves.get('AA')!
      })

      let maxPressureRelease = 0

      while (queue.size()) {
        const currentState = queue.pop()
        if (currentState.id < 30) {
          const nextStates = getNextStates(currentState!, valves, valveDistances)
          nextStates.forEach(ns => queue.push(ns))
        } else {
          maxPressureRelease = Math.max(
            maxPressureRelease,
            currentState.totalPressureReleaseSoFar
          )
        }
      }

      console.log(`And then it took another ${new Date().getTime() - startTime}ms to actually figure out the best plan.`)

      return {
        answer1: maxPressureRelease.toString()
      }
    }
  },
  {
    label: 'Work with an Elephant',
    onClick: (inputKey: string) => {
      const { valves, valveDistances } = parseInput(inputKey)

      const startTime = new Date().getTime()

      const getPredictedValue = ({ minute, currentPressureReleasePerMinute, totalPressureReleaseSoFar }: Part2State) =>
        totalPressureReleaseSoFar + (currentPressureReleasePerMinute * (31 - minute))
      const queue = new BinaryHeap<Part2State>(getPredictedValue, 'max', {
        minute: 1,
        openValves: [],
        totalPressureReleaseSoFar: 0,
        currentPressureReleasePerMinute: 0,
        you: {
          nextValveToOpen: '',
          timeToValve: 0,
          location: valves.get('AA')!
        },
        elephant: {
          nextValveToOpen: '',
          timeToValve: 0,
          location: valves.get('AA')!
        }
      })

      let maxPressureRelease = 0

      while (queue.size()) {
        const currentState = queue.pop()
        if (currentState.minute < 26) {
          const nextStates = getNextStates2(currentState!, valves, valveDistances)
          nextStates.forEach(ns => queue.push(ns))
        } else {
          maxPressureRelease = Math.max(
            maxPressureRelease,
            currentState.totalPressureReleaseSoFar
          )
        }
      }

      console.log(`And then it took another ${new Date().getTime() - startTime}ms to actually figure out the best plan.`)

      return {
        answer2: maxPressureRelease.toString()
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
