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
  timeToValveOpen: number
  location: string
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

const getNextStates__ = (
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

// const getNextStates2 = (
//   {
//     minute,
//     openValves,
//     totalPressureReleaseSoFar,
//     currentPressureReleasePerMinute,
//     you,
//     elephant
//   }: Part2State,
//   valves: Map<string, Valve>,
//   valveDistances: Map<string, number>
// ): Part2State[] => {
//   const nextStates: Part2State[] = []

//   // Closed valves with flow rates higher than 0 that aren't already claimed.
//   // Gotta deal with distance/time elsewhere though!
//   const closedValves = Array.from(valves.keys()).filter(valveId => (
//     !openValves.includes(valveId) &&
//     valves.get(valveId)!.flowRate > 0 &&
//     you.nextValveToOpen !== valveId &&
//     elephant.nextValveToOpen !== valveId
//   ))

//   // If we're totally totally done, it's time to just sit and wait
//   if (!closedValves.length && you.nextValveToOpen === '' && elephant.nextValveToOpen === '') {
//     nextStates.push({
//       minute: 26,
//       openValves,
//       totalPressureReleaseSoFar: totalPressureReleaseSoFar + (
//         currentPressureReleasePerMinute * (26 - minute)
//       ),
//       currentPressureReleasePerMinute,
//       you,
//       elephant
//     })
//   }
//   // Otherwise, we work
//   else {
//     // If both workers are free, we need to generate possible states that send them both somewhere.
//     // So that'll be states with one worker arriving and another worker still traveling (probably, but
//     // possibly both arriving at once).
//     if (you.timeToValveOpen === 0 && elephant.timeToValveOpen === 0) {
//       // Generate a list of valve pairs
//       const valvePairs: [string, string][] = []
//       for (let i = 0; i < closedValves.length - 1; i++) {
//         for (let j = i + 1; j < closedValves.length; j++) {
//           valvePairs.push(
//             [closedValves[i], closedValves[j]]
//               .sort((a, b) => a.localeCompare(b)) as [string, string]
//           )
//         }
//       }
//       // For each pair, we can send one worker to one and the other to the other, or vice versa
//       // If there's enough time
//       valvePairs.forEach(([a, b]) => {
//         // Let's get all the times
//         const timeYouToAOpen = valveDistances.get(
//           [you.location, a].sort((x, y) => x.localeCompare(y)).join(',')
//         )! + 1
//         const timeYouToBOpen = valveDistances.get(
//           [you.location, b].sort((x, y) => x.localeCompare(y)).join(',')
//         )! + 1
//         const timeElephantToAOpen = valveDistances.get(
//           [elephant.location, a].sort((x, y) => x.localeCompare(y)).join(',')
//         )! + 1
//         const timeElephantToBOpen = valveDistances.get(
//           [elephant.location, b].sort((x, y) => x.localeCompare(y)).join(',')
//         )! + 1
//         // Sending you to A
//         if (minute + timeYouToAOpen <= 26) {
//           // Sending elephant to B
//           if (minute + timeElephantToBOpen <= 26) {
//             // You arrive first
//             if (timeYouToAOpen < timeElephantToBOpen) {
//               nextStates.push({
//                 minute: minute + timeYouToAOpen,
//                 openValves: [...openValves, a],
//                 totalPressureReleaseSoFar: totalPressureReleaseSoFar + (
//                   currentPressureReleasePerMinute * timeYouToAOpen
//                 ),
//                 currentPressureReleasePerMinute: currentPressureReleasePerMinute +
//                   valves.get(a)!.flowRate,
//                 you: {
//                   nextValveToOpen: '',
//                   timeToValveOpen: 0,
//                   location: a
//                 },
//                 elephant: {
//                   nextValveToOpen: b,
//                   timeToValveOpen: timeElephantToBOpen - timeYouToAOpen,
//                   location: elephant.location
//                 }
//               })
//             }
//             // Elephant arrives first
//             else if (timeElephantToBOpen < timeYouToAOpen) {
//               nextStates.push({
//                 minute: minute + timeElephantToBOpen,
//                 openValves: [...openValves, b],
//                 totalPressureReleaseSoFar: totalPressureReleaseSoFar + (
//                   currentPressureReleasePerMinute * timeElephantToBOpen
//                 ),
//                 currentPressureReleasePerMinute: currentPressureReleasePerMinute +
//                   valves.get(b)!.flowRate,
//                 you: {
//                   nextValveToOpen: a,
//                   timeToValveOpen: timeYouToAOpen - timeElephantToBOpen,
//                   location: you.location
//                 },
//                 elephant: {
//                   nextValveToOpen: '',
//                   timeToValveOpen: 0,
//                   location: b
//                 }
//               })
//             }
//             // You arrive simultaneously
//             else {
//               nextStates.push({
//                 minute: minute + timeYouToAOpen,
//                 openValves: [...openValves, a, b],
//                 totalPressureReleaseSoFar: totalPressureReleaseSoFar + (
//                   currentPressureReleasePerMinute * timeYouToAOpen
//                 ),
//                 currentPressureReleasePerMinute: currentPressureReleasePerMinute +
//                   valves.get(a)!.flowRate + valves.get(b)!.flowRate,
//                 you: {
//                   nextValveToOpen: '',
//                   timeToValveOpen: 0,
//                   location: a
//                 },
//                 elephant: {
//                   nextValveToOpen: '',
//                   timeToValveOpen: 0,
//                   location: b
//                 }
//               })
//             }
//           }
//           // Elephant doesn't go anywhere
//           else {
//             // debugger
//             nextStates.push({
//               minute: minute + timeYouToAOpen,
//               openValves: [...openValves, a],
//               totalPressureReleaseSoFar: totalPressureReleaseSoFar + (
//                 currentPressureReleasePerMinute * (timeYouToAOpen)
//               ),
//               currentPressureReleasePerMinute: currentPressureReleasePerMinute +
//                 valves.get(a)!.flowRate,
//               you: {
//                 nextValveToOpen: '',
//                 timeToValveOpen: 0,
//                 location: a
//               },
//               elephant: {
//                 nextValveToOpen: '',
//                 timeToValveOpen: 26 - (minute + timeYouToAOpen),
//                 location: elephant.location
//               }
//             })
//           }
//         }
//         // Sending you to B
//         if (minute + timeYouToBOpen <= 26) {
//           // Sending elephant to A
//           if (minute + timeElephantToAOpen <= 26) {
//             // You arrive first
//             if (timeYouToBOpen < timeElephantToAOpen) {
//               nextStates.push({
//                 minute: minute + timeYouToBOpen,
//                 openValves: [...openValves, b],
//                 totalPressureReleaseSoFar: totalPressureReleaseSoFar + (
//                   currentPressureReleasePerMinute * timeYouToBOpen
//                 ),
//                 currentPressureReleasePerMinute: currentPressureReleasePerMinute +
//                   valves.get(b)!.flowRate,
//                 you: {
//                   nextValveToOpen: '',
//                   timeToValveOpen: 0,
//                   location: b
//                 },
//                 elephant: {
//                   nextValveToOpen: a,
//                   timeToValveOpen: timeElephantToAOpen - timeYouToBOpen,
//                   location: elephant.location
//                 }
//               })
//             }
//             // Elephant arrives first
//             else if (timeElephantToAOpen < timeYouToBOpen) {
//               nextStates.push({
//                 minute: minute + timeElephantToAOpen,
//                 openValves: [...openValves, a],
//                 totalPressureReleaseSoFar: totalPressureReleaseSoFar + (
//                   currentPressureReleasePerMinute * timeElephantToAOpen
//                 ),
//                 currentPressureReleasePerMinute: currentPressureReleasePerMinute +
//                   valves.get(a)!.flowRate,
//                 you: {
//                   nextValveToOpen: b,
//                   timeToValveOpen: timeYouToBOpen - timeElephantToAOpen,
//                   location: you.location
//                 },
//                 elephant: {
//                   nextValveToOpen: '',
//                   timeToValveOpen: 0,
//                   location: a
//                 }
//               })
//             }
//             // You arrive simultaneously
//             else {
//               nextStates.push({
//                 minute: minute + timeYouToBOpen,
//                 openValves: [...openValves, a, b],
//                 totalPressureReleaseSoFar: totalPressureReleaseSoFar + (
//                   currentPressureReleasePerMinute * timeYouToBOpen
//                 ),
//                 currentPressureReleasePerMinute: currentPressureReleasePerMinute +
//                   valves.get(a)!.flowRate + valves.get(b)!.flowRate,
//                 you: {
//                   nextValveToOpen: '',
//                   timeToValveOpen: 0,
//                   location: b
//                 },
//                 elephant: {
//                   nextValveToOpen: '',
//                   timeToValveOpen: 0,
//                   location: a
//                 }
//               })
//             }
//           }
//           // Elephant doesn't go anywhere
//           else {
//             // debugger
//             nextStates.push({
//               minute: minute + timeYouToBOpen,
//               openValves: [...openValves, b],
//               totalPressureReleaseSoFar: totalPressureReleaseSoFar + (
//                 currentPressureReleasePerMinute * timeYouToBOpen
//               ),
//               currentPressureReleasePerMinute: currentPressureReleasePerMinute +
//                 valves.get(b)!.flowRate,
//               you: {
//                 nextValveToOpen: '',
//                 timeToValveOpen: 0,
//                 location: b
//               },
//               elephant: {
//                 nextValveToOpen: '',
//                 timeToValveOpen: 26 - (minute + timeYouToBOpen),
//                 location: elephant.location
//               }
//             })
//           }
//         }
//         // You don't go anywhere
//         if ((minute + timeYouToAOpen > 26) && (minute + timeYouToBOpen > 26)) {
//           // Sending elephant to A
//           if (minute + timeElephantToAOpen <= 26) {
//             // debugger
//             nextStates.push({
//               minute: minute + timeElephantToAOpen,
//               openValves: [...openValves, a],
//               totalPressureReleaseSoFar: totalPressureReleaseSoFar + (
//                 currentPressureReleasePerMinute * timeElephantToAOpen
//               ),
//               currentPressureReleasePerMinute: currentPressureReleasePerMinute +
//                 valves.get(a)!.flowRate,
//               you: {
//                 nextValveToOpen: '',
//                 timeToValveOpen: 26 - (minute + timeElephantToAOpen),
//                 location: you.location
//               },
//               elephant: {
//                 nextValveToOpen: '',
//                 timeToValveOpen: 0,
//                 location: a
//               }
//             })
//           }
//           // Sending elephant to B
//           if (minute + timeElephantToBOpen <= 26) {
//             // debugger
//             nextStates.push({
//               minute: minute + timeElephantToBOpen,
//               openValves: [...openValves, b],
//               totalPressureReleaseSoFar: totalPressureReleaseSoFar + (
//                 currentPressureReleasePerMinute * timeElephantToBOpen
//               ),
//               currentPressureReleasePerMinute: currentPressureReleasePerMinute +
//                 valves.get(b)!.flowRate,
//               you: {
//                 nextValveToOpen: '',
//                 timeToValveOpen: 26 - (minute + timeElephantToBOpen),
//                 location: you.location
//               },
//               elephant: {
//                 nextValveToOpen: '',
//                 timeToValveOpen: 0,
//                 location: b
//               }
//             })
//           }
//           // Elephant doesn't go anywhere
//           if ((minute + timeElephantToAOpen > 26) && (minute + timeElephantToBOpen > 26)) {
//             nextStates.push({
//               minute: 26,
//               openValves,
//               totalPressureReleaseSoFar: totalPressureReleaseSoFar + (
//                 currentPressureReleasePerMinute * (26 - minute)
//               ),
//               currentPressureReleasePerMinute,
//               you: {
//                 nextValveToOpen: '',
//                 timeToValveOpen: 0,
//                 location: you.location
//               },
//               elephant: {
//                 nextValveToOpen: '',
//                 timeToValveOpen: 0,
//                 location: elephant.location
//               }
//             })
//           }
//         }
//       })

//       // If there aren't any valve pairs, there's either zero or one closed valve
//       if (!valvePairs.length) {
//         // Here's if there's one
//         if (closedValves.length) {
//           // We should send whoever can get there faster
//           const timeYouToValveOpen = valveDistances.get(
//             [you.location, closedValves[0]].sort((x, y) => x.localeCompare(y)).join(',')
//           )! + 1
//           const timeElephantToValveOpen = valveDistances.get(
//             [elephant.location, closedValves[0]].sort((x, y) => x.localeCompare(y)).join(',')
//           )! + 1
//           // We send you
//           if (timeYouToValveOpen <= timeElephantToValveOpen) {
//             nextStates.push({
//               minute: minute + timeYouToValveOpen,
//               openValves: [...openValves, closedValves[0]],
//               totalPressureReleaseSoFar: totalPressureReleaseSoFar + (
//                 currentPressureReleasePerMinute * timeYouToValveOpen
//               ),
//               currentPressureReleasePerMinute: currentPressureReleasePerMinute +
//                 valves.get(closedValves[0])!.flowRate,
//               you: {
//                 nextValveToOpen: '',
//                 timeToValveOpen: 0,
//                 location: closedValves[0]
//               },
//               elephant: {
//                 nextValveToOpen: elephant.nextValveToOpen,
//                 timeToValveOpen: timeElephantToValveOpen - timeYouToValveOpen,
//                 location: elephant.location
//               }
//             })
//           }
//           // We send the elephant
//           else {
//             nextStates.push({
//               minute: minute + timeElephantToValveOpen,
//               openValves: [...openValves, closedValves[0]],
//               totalPressureReleaseSoFar: totalPressureReleaseSoFar + (
//                 currentPressureReleasePerMinute * timeYouToValveOpen
//               ),
//               currentPressureReleasePerMinute: currentPressureReleasePerMinute +
//                 valves.get(closedValves[0])!.flowRate,
//               you: {
//                 nextValveToOpen: you.nextValveToOpen,
//                 timeToValveOpen: timeYouToValveOpen - timeElephantToValveOpen,
//                 location: you.location
//               },
//               elephant: {
//                 nextValveToOpen: '',
//                 timeToValveOpen: 0,
//                 location: closedValves[0]
//               }
//             })
//           }
//         }
//         // Here's if there's zero
//         else {
//           // You can both just chill and wait
//           nextStates.push({
//             minute: 26,
//             openValves,
//             totalPressureReleaseSoFar: totalPressureReleaseSoFar + (
//               currentPressureReleasePerMinute * (26 - minute)
//             ),
//             currentPressureReleasePerMinute,
//             you: {
//               nextValveToOpen: '',
//               timeToValveOpen: 0,
//               location: you.location
//             },
//             elephant: {
//               nextValveToOpen: '',
//               timeToValveOpen: 0,
//               location: elephant.location
//             }
//           })
//         }
//       }
//     }

//     // If only one worker is free, we need to generate possible states sending them somewhere, but
//     // the other worker might arrive first.
//     else {
//       // debugger
//       // You're free
//       if (you.timeToValveOpen === 0) {
//         closedValves.forEach(valveId => {
//           const timeYouToValveOpen = valveDistances.get([valveId, you.location].sort((a, b) => a.localeCompare(b)).join(','))! + 1
//           // Can we send you to the valve?
//           if (minute + timeYouToValveOpen <= 26) {
//             // You arrive first
//             if (timeYouToValveOpen < elephant.timeToValveOpen) {
//               nextStates.push({
//                 minute: minute + timeYouToValveOpen,
//                 openValves: [...openValves, valveId],
//                 totalPressureReleaseSoFar: totalPressureReleaseSoFar + (
//                   currentPressureReleasePerMinute * timeYouToValveOpen
//                 ),
//                 currentPressureReleasePerMinute: currentPressureReleasePerMinute +
//                   valves.get(valveId)!.flowRate,
//                 you: {
//                   nextValveToOpen: '',
//                   timeToValveOpen: 0,
//                   location: valveId
//                 },
//                 elephant: {
//                   nextValveToOpen: elephant.nextValveToOpen,
//                   timeToValveOpen: elephant.timeToValveOpen - timeYouToValveOpen,
//                   location: elephant.location
//                 }
//               })
//             }
//             // The elephant arrives first
//             else if (elephant.timeToValveOpen < timeYouToValveOpen) {
//               // if (elephant.nextValveToOpen === '') debugger
//               nextStates.push({
//                 minute: minute + elephant.timeToValveOpen,
//                 openValves: [...openValves, elephant.nextValveToOpen],
//                 totalPressureReleaseSoFar: totalPressureReleaseSoFar + (
//                   currentPressureReleasePerMinute * elephant.timeToValveOpen
//                 ),
//                 currentPressureReleasePerMinute: currentPressureReleasePerMinute +
//                   valves.get(elephant.nextValveToOpen)!.flowRate,
//                 you: {
//                   nextValveToOpen: valveId,
//                   timeToValveOpen: timeYouToValveOpen - (elephant.timeToValveOpen),
//                   location: you.location
//                 },
//                 elephant: {
//                   nextValveToOpen: '',
//                   timeToValveOpen: 0,
//                   location: elephant.nextValveToOpen
//                 }
//               })
//             }
//             // You arrive simultaneously
//             else {
//               nextStates.push({
//                 minute: minute + timeYouToValveOpen,
//                 openValves: [...openValves, valveId, elephant.nextValveToOpen],
//                 totalPressureReleaseSoFar: totalPressureReleaseSoFar + (
//                   currentPressureReleasePerMinute * timeYouToValveOpen
//                 ),
//                 currentPressureReleasePerMinute: currentPressureReleasePerMinute +
//                   valves.get(valveId)!.flowRate + valves.get(elephant.nextValveToOpen)!.flowRate,
//                 you: {
//                   nextValveToOpen: '',
//                   timeToValveOpen: 0,
//                   location: valveId
//                 },
//                 elephant: {
//                   nextValveToOpen: '',
//                   timeToValveOpen: 0,
//                   location: elephant.nextValveToOpen
//                 }
//               })
//             }
//           }
//           // Otherwise, you just wait for the elephant I guess
//           else {
//             // debugger
//             nextStates.push({
//               minute: minute + elephant.timeToValveOpen,
//               openValves: [...openValves, elephant.nextValveToOpen],
//               totalPressureReleaseSoFar: totalPressureReleaseSoFar + (
//                 currentPressureReleasePerMinute * elephant.timeToValveOpen
//               ),
//               currentPressureReleasePerMinute: currentPressureReleasePerMinute +
//                 valves.get(elephant.nextValveToOpen)!.flowRate,
//               you: {
//                 nextValveToOpen: '',
//                 timeToValveOpen: 26 - (minute + elephant.timeToValveOpen),
//                 location: you.location
//               },
//               elephant: {
//                 nextValveToOpen: '',
//                 timeToValveOpen: 26 - (minute + elephant.timeToValveOpen),
//                 location: elephant.nextValveToOpen
//               }
//             })
//           }
//         })
//         // If there's nothing left for you to do, you have to wait for the elephant
//         if (!closedValves.length) {
//           // debugger
//           nextStates.push({
//             minute: minute + elephant.timeToValveOpen,
//             openValves: [...openValves, elephant.nextValveToOpen],
//             totalPressureReleaseSoFar: totalPressureReleaseSoFar + (
//               currentPressureReleasePerMinute * elephant.timeToValveOpen
//             ),
//             currentPressureReleasePerMinute: currentPressureReleasePerMinute +
//               valves.get(elephant.nextValveToOpen)!.flowRate,
//             you: {
//               nextValveToOpen: '',
//               timeToValveOpen: 26 - (minute + elephant.timeToValveOpen),
//               location: you.location
//             },
//             elephant: {
//               nextValveToOpen: '',
//               timeToValveOpen: 26 - (minute + elephant.timeToValveOpen),
//               location: elephant.nextValveToOpen
//             }
//           })
//         }
//       }
//       // Elephant is free
//       else {
//         closedValves.forEach(valveId => {
//           const timeElephantToValveOpen = valveDistances.get([valveId, elephant.location].sort((a, b) => a.localeCompare(b)).join(','))! + 1
//           // Can we send the elephant to the valve?
//           if (minute + timeElephantToValveOpen <= 26) {
//             // You arrive first
//             if (you.timeToValveOpen < timeElephantToValveOpen) {
//               nextStates.push({
//                 minute: minute + you.timeToValveOpen,
//                 openValves: [...openValves, you.nextValveToOpen],
//                 totalPressureReleaseSoFar: totalPressureReleaseSoFar + (
//                   currentPressureReleasePerMinute * you.timeToValveOpen
//                 ),
//                 currentPressureReleasePerMinute: currentPressureReleasePerMinute +
//                   valves.get(you.nextValveToOpen)!.flowRate,
//                 you: {
//                   nextValveToOpen: '',
//                   timeToValveOpen: 0,
//                   location: you.nextValveToOpen
//                 },
//                 elephant: {
//                   nextValveToOpen: valveId,
//                   timeToValveOpen: timeElephantToValveOpen - you.timeToValveOpen,
//                   location: elephant.location
//                 }
//               })
//             }
//             // The elephant arrives first
//             else if (timeElephantToValveOpen < you.timeToValveOpen) {
//               nextStates.push({
//                 minute: minute + timeElephantToValveOpen,
//                 openValves: [...openValves, valveId],
//                 totalPressureReleaseSoFar: totalPressureReleaseSoFar + (
//                   currentPressureReleasePerMinute * timeElephantToValveOpen
//                 ),
//                 currentPressureReleasePerMinute: currentPressureReleasePerMinute +
//                   valves.get(valveId)!.flowRate,
//                 you: {
//                   nextValveToOpen: you.nextValveToOpen,
//                   timeToValveOpen: you.timeToValveOpen - timeElephantToValveOpen,
//                   location: you.location
//                 },
//                 elephant: {
//                   nextValveToOpen: '',
//                   timeToValveOpen: 0,
//                   location: valveId
//                 }
//               })
//             }
//             // You arrive simultaneously
//             else {
//               nextStates.push({
//                 minute: minute + timeElephantToValveOpen,
//                 openValves: [...openValves, valveId, you.nextValveToOpen],
//                 totalPressureReleaseSoFar: totalPressureReleaseSoFar + (
//                   currentPressureReleasePerMinute * timeElephantToValveOpen
//                 ),
//                 currentPressureReleasePerMinute: currentPressureReleasePerMinute +
//                   valves.get(valveId)!.flowRate + valves.get(you.nextValveToOpen)!.flowRate,
//                 you: {
//                   nextValveToOpen: '',
//                   timeToValveOpen: 0,
//                   location: you.nextValveToOpen
//                 },
//                 elephant: {
//                   nextValveToOpen: '',
//                   timeToValveOpen: 0,
//                   location: valveId
//                 }
//               })
//             }
//           }
//           // Otherwise the elephant waits for you I guess
//           else {
//             // debugger
//             nextStates.push({
//               minute: minute + you.timeToValveOpen,
//               openValves: [...openValves, you.nextValveToOpen],
//               totalPressureReleaseSoFar: totalPressureReleaseSoFar + (
//                 currentPressureReleasePerMinute * you.timeToValveOpen
//               ),
//               currentPressureReleasePerMinute: currentPressureReleasePerMinute +
//                 valves.get(you.nextValveToOpen)!.flowRate,
//               you: {
//                 nextValveToOpen: '',
//                 timeToValveOpen: 0,
//                 location: you.nextValveToOpen
//               },
//               elephant: {
//                 nextValveToOpen: '',
//                 timeToValveOpen: 26 - you.timeToValveOpen,
//                 location: elephant.location
//               }
//             })
//           }
//         })
//         // If there's nothing left for the elephant to do, it has to wait for you
//         if (!closedValves.length) {
//           // debugger
//           nextStates.push({
//             minute: minute + you.timeToValveOpen,
//             openValves: [...openValves, you.nextValveToOpen],
//             totalPressureReleaseSoFar: totalPressureReleaseSoFar + (
//               currentPressureReleasePerMinute * you.timeToValveOpen
//             ),
//             currentPressureReleasePerMinute: currentPressureReleasePerMinute +
//               valves.get(you.nextValveToOpen)!.flowRate,
//             you: {
//               nextValveToOpen: '',
//               timeToValveOpen: 0,
//               location: you.nextValveToOpen
//             },
//             elephant: {
//               nextValveToOpen: '',
//               timeToValveOpen: 26 - (minute + you.timeToValveOpen),
//               location: elephant.location
//             }
//           })
//         }
//       }
//     }
//   }

//   return nextStates
// }

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
  totalTime: number
): Node[] => {
  const nextStates: Node[] = []

  // What valve should we open next?
  // Could be any currently closed valve that has a flow rate higher than 0 and is close enough that we can get to it.
  const closedValves = Array.from(valves.keys()).filter(valveId => {
    const valvePairId = [valveId, node.location].sort((a, b) => a.localeCompare(b)).join(',')
    return (
      !node.openValves.includes(valveId) &&
      valves.get(valveId)!.flowRate > 0 &&
      (node.location === valveId || (node.time + valveDistances.get(valvePairId)! + 1) <= totalTime)
    )
  })
  closedValves.forEach(valveId => {
    const valvePairId = [valveId, node.location].sort((a, b) => a.localeCompare(b)).join(',')
    const timeToNextState = valveId === node.location ? 1 : valveDistances.get(valvePairId)! + 1
    // if (!node.openValves.length && valveId === 'DD') debugger
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
  time: number
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
      const nextStates = getNextStates(currentState!, valves, valveDistances, time)
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

      // const getPredictedValue = ({ id, currentPressureReleasePerMinute, totalPressureReleaseSoFar }: Minute) =>
      //   totalPressureReleaseSoFar + (currentPressureReleasePerMinute * (31 - id))
      // const queue = new BinaryHeap<Minute>(getPredictedValue, 'max', {
      //   id: 1,
      //   openValves: [],
      //   totalPressureReleaseSoFar: 0,
      //   currentPressureReleasePerMinute: 0,
      //   location: valves.get('AA')!
      // })

      // let maxPressureRelease = 0

      // while (queue.size()) {
      //   const currentState = queue.pop()
      //   if (currentState.id < 30) {
      //     const nextStates = getNextStates(currentState!, valves, valveDistances)
      //     nextStates.forEach(ns => queue.push(ns))
      //   } else {
      //     maxPressureRelease = Math.max(
      //       maxPressureRelease,
      //       currentState.totalPressureReleaseSoFar
      //     )
      //   }
      // }

      const paths = findPathsInXTime(valves, valveDistances, 30)
        .sort((a, b) => b.totalPressureRelease - a.totalPressureRelease)

      console.timeEnd(timerLabel)

      return {
        answer1: paths[0].totalPressureRelease.toString()
      }
    }
  },
  // {
  //   label: 'Work with an Elephant',
  //   onClick: (inputKey: string) => {
  //     const { valves, valveDistances } = parseInput(inputKey)

  //     const startTime = new Date().getTime()

  //     const getPredictedValue = ({ minute, currentPressureReleasePerMinute, totalPressureReleaseSoFar }: Part2State) =>
  //       totalPressureReleaseSoFar + (currentPressureReleasePerMinute * (31 - minute))
  //     const queue = new BinaryHeap<Part2State>(getPredictedValue, 'max', {
  //       minute: 1,
  //       openValves: [],
  //       totalPressureReleaseSoFar: 0,
  //       currentPressureReleasePerMinute: 0,
  //       you: {
  //         nextValveToOpen: '',
  //         timeToValveOpen: 0,
  //         location: 'AA'
  //       },
  //       elephant: {
  //         nextValveToOpen: '',
  //         timeToValveOpen: 0,
  //         location: 'AA'
  //       }
  //     })

  //     let maxPressureRelease = 0

  //     while (queue.size()) {
  //       const currentState = queue.pop()
  //       if (currentState.minute < 26) {
  //         // if (currentState.minute >= 14) debugger
  //         const nextStates = getNextStates2(currentState!, valves, valveDistances)
  //         nextStates.forEach(ns => queue.push(ns))
  //       } else {
  //         // console.log('state', currentState)
  //         maxPressureRelease = Math.max(
  //           maxPressureRelease,
  //           currentState.totalPressureReleaseSoFar
  //         )
  //       }
  //     }

  //     console.log(`And then it took another ${new Date().getTime() - startTime}ms to actually figure out the best plan.`)

  //     return {
  //       answer2: maxPressureRelease.toString()
  //     }
  //   }
  // }
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
