import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'

import INPUT from './Input/Day11'

const validFacilities: Map<string, boolean> = new Map()

/**
 * Facility interface:
 * [
 *    floor of elevator,
 *    [floor of generator, floor of microchip for a thing],
 *    [floor of generator, floor of microchip for a thing],
 *    ...
 * ]
 */

const findShortestPath = (facility: (number | [number, number])[]): number => {
  const targetScore = ((facility.length * 2) - 1) * 3

  const startingString = JSON.stringify(facility)
  const queue: string[] = [startingString]
  const parents: { [key:string]: string } = { [startingString]: '' }

  while (queue.length > 0) {
    const current = queue.shift()
    if (current) {
      const currentState = JSON.parse(current)
      if (getScore(currentState) >= targetScore) {
        let pathCurrent = current
        let pathLength = 0

        while (parents[pathCurrent] !== '') {
          pathLength++
          pathCurrent = parents[pathCurrent]
        }

        return pathLength
      }

      for (let nextStep of getPossibleNexts(currentState)) {
        if (nextStep in parents) {
          continue
        }
        parents[nextStep] = current
        queue.push(nextStep)
      }
    }
  }

  return NaN
}

const normalizeFacility = (inFacility: string[][], elevatorFloor: number): (number | [number, number])[] => {
  const facility: [number, number][] = []

  inFacility.forEach((floor, floorIndex) => {
    floor.forEach(item => {
      const [label, type] = item.split('-')
      const itemIndex = label.charCodeAt(0) - 65
      if (!facility[itemIndex]) facility[itemIndex] = [NaN, NaN]
      if (type === 'gen') facility[itemIndex][0] = floorIndex
      if (type === 'chip') facility[itemIndex][1] = floorIndex
    })
  })

  return [
    elevatorFloor,
    ...facility
  ].sort(sortFacility)
}

function * getPossibleNexts(inFacility: (number | [number, number])[]) {
  const elevatorFloor = inFacility.shift()

  if (typeof elevatorFloor === 'number') {
    const facility: string[][] = [
      [],
      [],
      [],
      []
    ]

    inFacility.forEach((itemPair: any, index) => {
      const label = String.fromCharCode(index + 65)
      const [genFloor, chipFloor] = itemPair
      facility[genFloor].push(`${label}-gen`)
      facility[chipFloor].push(`${label}-chip`)
    })

    // Make a list of possible things to move, two first then one
    const listToMove: string[][] = []
    for (let i = 0; i < facility[elevatorFloor].length; i++) {
      for (let j = i + 1; j < facility[elevatorFloor].length; j++) {
        listToMove.push([facility[elevatorFloor][i], facility[elevatorFloor][j]])
      }
    }
    facility[elevatorFloor].forEach(item => listToMove.push([item]))

    if (elevatorFloor < 3) {
      const newElevator = elevatorFloor + 1
      for (let toMove of listToMove) {
        const newFacility = facility.map((floor, floorIndex) => {
          if (floorIndex !== newElevator && floorIndex !== elevatorFloor) return floor
          if (floorIndex === elevatorFloor) {
            return floor.filter(item => !toMove.includes(item))
          }
          if (floorIndex === newElevator) {
            return [...floor, ...toMove]
          }
          throw new Error('fuck')
        })
        const newFacilityNormalized = JSON.stringify(normalizeFacility(newFacility, newElevator))
        if (isValidFacility(newFacilityNormalized)) yield newFacilityNormalized
      }
    }
    if (elevatorFloor > 0) {
      const newElevator = elevatorFloor - 1
      for (let toMove of listToMove.reverse()) {
        const newFacility = facility.map((floor, floorIndex) => {
          if (floorIndex !== newElevator && floorIndex !== elevatorFloor) return floor
          if (floorIndex === elevatorFloor) {
            return floor.filter(item => !toMove.includes(item))
          }
          if (floorIndex === newElevator) {
            return [...floor, ...toMove]
          }
          throw new Error('fuck')
        })
        const newFacilityNormalized = JSON.stringify(normalizeFacility(newFacility, newElevator))
        if (isValidFacility(newFacilityNormalized)) yield newFacilityNormalized
      }
    }
  }
}

const getScore = (facility: (number | [number, number])[]): number => {
  let totalScore = 0
  facility.forEach(item => {
    if (typeof item === 'number') totalScore += item
    else item.forEach(subItem => totalScore += subItem)
  })
  return totalScore
}

const isValidFacility = (facilityString: string): boolean => {
  if (validFacilities.get(facilityString)) return true

  let isValid = true
  const facility = JSON.parse(facilityString)
  const elevatorFloor = facility.shift()

  // The first item in the facility is the elevator floor number.
  // The other items represent itemPairs - [generator floor, microchip floor]
  // For every microchip, if it is on a different floor than its generator, it is UNPROTECTED.
  // If there is an UNPROTECTED microchip on the same floor as a DIFFERENT generator, this is invalid.

  const generatorFloors = facility.map(([x]: [number]) => x)

  facility.forEach(([gFloor, mFloor]: [number, number]) => {
    if (gFloor >= 4 || mFloor >= 4) isValid = false
  })

  facility
    // Filter out protected microchips
    .filter(([gFloor, mFloor]: [number, number]) => gFloor !== mFloor)
    .forEach(([, mFloor]: [number, number]) => {
      // For unprotected chips, see if the microchip's floor is in the list of generator floors. If so, invalid.
      if (generatorFloors.includes(mFloor)) isValid = false
    })

  validFacilities.set(facilityString, isValid)

  return isValid
}

const parseInput = (inputKey: string): (number | [number, number])[] => {
  const input = INPUT[inputKey]

  const facility: (number | [number, number])[] = [inputKey === 'DEMO_TEST' ? 3 : 0]
  const itemMap: { [key:string]: [number, number] } = {}

  validFacilities.clear()

  input.split('\n').forEach((line, floorIndex) => {
    const contents = line.split('contains a ')[1]
    if (contents) {
      const items = contents.split(' a ')
      items.forEach(item => {
        const itemID = item.charAt(0)
        const itemArray: [number, number] = itemMap[itemID] || [NaN, NaN]
        if (item.includes('generator')) itemArray[0] = floorIndex
        if (item.includes('microchip')) itemArray[1] = floorIndex
        itemMap[itemID] = itemArray
      })
    }
  })

  Object.values(itemMap).forEach(itemPair => facility.push(itemPair))

  return facility.sort(sortFacility)
}

const sortFacility = (a: number | number[], b: number | number[]) => {
  if (typeof a === 'number') return -1
  if (typeof b === 'number') return 1
  return a[0] - b[0] || a[1] - b[1]
}

const BUTTONS: IButton[] = [
  {
    label: 'Take Objects to Fourth Floor',
    onClick: (inputKey: string) => {
      const facility = parseInput(inputKey)

      const shortestPathLength = findShortestPath(facility)

      return {
        answer1: shortestPathLength.toString()
      }
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      It takes <code>{answer}</code> steps to get everything to the fourth floor.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      <code>{answer}</code>
    </span>
  ),
  buttons: BUTTONS,
  day: 11,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Radioisotope Thermoelectric Generators'
}

export default config