import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'

import INPUT from '../Inputs/2019/Day06'

interface ISpaceObject {
  directOrbit: string
  label: string
  orbitedBy: string[]
  totalOrbits: number | undefined
}

const getTotalOrbits = (objectName: string, map: Map<string, ISpaceObject>): number => {
  const object = map.get(objectName)
  if (!object) throw new Error('Oops!')
  if (object.totalOrbits !== undefined) return object.totalOrbits
  else {
    const totalOrbits = getTotalOrbits(object.directOrbit, map) + 1
    object.totalOrbits = totalOrbits
    return totalOrbits
  }
}

const parseInput = (inputKey: string): Map<string, ISpaceObject> => {
  const map: Map<string, ISpaceObject> = new Map()
  INPUT[inputKey].split('\n').forEach(listing => {
    const [directOrbitName, objectName] = listing.split(')')
    const directOrbitObject = map.get(directOrbitName)
    if (!directOrbitObject) {
      map.set(directOrbitName, {
        directOrbit: '',
        label: directOrbitName,
        orbitedBy: [objectName],
        totalOrbits: directOrbitName === 'COM' ? 0 : undefined
      })
    } else {
      directOrbitObject.orbitedBy.push(objectName)
    }
    const object = map.get(objectName)
    const totalOrbits = directOrbitName === 'COM' ? 1 : directOrbitObject && typeof directOrbitObject.totalOrbits === 'number'
      ? directOrbitObject.totalOrbits + 1
      : undefined
    if (!object) {
      map.set(objectName, {
        directOrbit: directOrbitName,
        label: objectName,
        orbitedBy: [],
        totalOrbits
      })
    } else {
      object.directOrbit = directOrbitName
      object.totalOrbits = object.totalOrbits || totalOrbits
    }
  })
  return map
}

const BUTTONS: IButton[] = [
  {
    label: 'Count Orbits',
    onClick: (inputKey: string) => {
      const map = parseInput(inputKey)
      let totalOrbits = 0
      map.forEach((object, key) => {
        totalOrbits += getTotalOrbits(key, map)
      })
      return {
        answer1: totalOrbits.toString()
      }
    }
  },
  {
    label: 'Find Santa',
    onClick: (inputKey: string) => {
      const map = parseInput(inputKey)
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
            answer2: (stepsFromSanta.indexOf(you.label) + steps).toString()
          }
        }
        steps++
        you = map.get(you.directOrbit)
        if (!you) throw new Error('Oops!')
      }

      return {}
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The total number of orbits is <code>{answer}</code>.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      The number of orbital transfers to find Santa is{' '}
      <code>{answer}</code>.
    </span>
  ),
  buttons: BUTTONS,
  day: 6,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Universal Orbit Map'
}

export default config
