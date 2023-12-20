import inputs from '../../inputs/2019/day06'
import { DayConfig } from '../../routes/Day'

interface SpaceObject {
  directOrbit: string
  label: string
  orbitedBy: string[]
  totalOrbits: number | undefined
}

const parseInput = (input: string): Map<string, SpaceObject> => {
  const map: Map<string, SpaceObject> = new Map()
  input.split('\n').forEach((listing) => {
    const [directOrbitName, objectName] = listing.split(')')
    const directOrbitObject = map.get(directOrbitName)
    if (!directOrbitObject) {
      map.set(directOrbitName, {
        directOrbit: '',
        label: directOrbitName,
        orbitedBy: [objectName],
        totalOrbits: directOrbitName === 'COM' ? 0 : undefined,
      })
    } else {
      directOrbitObject.orbitedBy.push(objectName)
    }
    const object = map.get(objectName)
    const totalOrbits =
      directOrbitName === 'COM'
        ? 1
        : directOrbitObject && typeof directOrbitObject.totalOrbits === 'number'
        ? directOrbitObject.totalOrbits + 1
        : undefined
    if (!object) {
      map.set(objectName, {
        directOrbit: directOrbitName,
        label: objectName,
        orbitedBy: [],
        totalOrbits,
      })
    } else {
      object.directOrbit = directOrbitName
      object.totalOrbits = object.totalOrbits || totalOrbits
    }
  })
  return map
}

const getTotalOrbits = (
  objectName: string,
  map: Map<string, SpaceObject>
): number => {
  const object = map.get(objectName)
  if (!object) throw new Error('Oops!')
  if (object.totalOrbits !== undefined) return object.totalOrbits
  else {
    const totalOrbits = getTotalOrbits(object.directOrbit, map) + 1
    object.totalOrbits = totalOrbits
    return totalOrbits
  }
}

export const countOrbits = (input: string) => {
  const map = parseInput(input)
  let totalOrbits = 0
  map.forEach((_, key) => {
    totalOrbits += getTotalOrbits(key, map)
  })
  return {
    answer1: totalOrbits,
  }
}

export const findSanta = (input: string) => {
  const map = parseInput(input)
  const stepsFromSanta: string[] = []
  let santa = map.get('SAN')
  if (!santa) throw new Error('Oops!')
  while (santa.label !== 'COM') {
    santa = map.get(santa.directOrbit)
    if (!santa) throw new Error('Oops!')
    stepsFromSanta.push(santa.label)
  }
  let you = map.get('YOU')
  if (!you) throw new Error('Oops!')
  you = map.get(you.directOrbit)
  if (!you) throw new Error('Oops!')
  let steps = 0
  while (you.label !== 'COM') {
    if (stepsFromSanta.includes(you.label)) {
      return {
        answer2: stepsFromSanta.indexOf(you.label) + steps,
      }
    }
    steps++
    you = map.get(you.directOrbit)
    if (!you) throw new Error('Oops!')
  }

  return {}
}

const day06: Omit<DayConfig, 'year'> = {
  answer1Text: 'The total number of orbits is answer.',
  answer2Text: 'The number of orbital transfers to find Santa is answer.',
  buttons: [
    {
      label: 'Count Orbits',
      onClick: countOrbits,
    },
    {
      label: 'Find Santa',
      onClick: findSanta,
    },
  ],
  id: 6,
  inputs,
  title: 'Universal Orbit Map',
}

export default day06
