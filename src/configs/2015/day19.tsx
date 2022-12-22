import inputs from '../../inputs/2015/day19'
import { DayConfig } from '../../routes/Day'
import SLL from '../../utils/SLL'

const parseReplacements = (
  inputList: string[],
  reverse?: boolean
): Map<string, string[]> => {
  const replacements: Map<string, string[]> = new Map()

  inputList.forEach((inputLine) => {
    const [orig, newThing] = inputLine.split(' => ')
    if (!reverse) {
      const replacementsList = replacements.get(orig) || []
      replacementsList.push(newThing)
      replacements.set(orig, replacementsList)
    } else {
      const replacementsList = replacements.get(newThing) || []
      replacementsList.push(orig)
      replacements.set(newThing, replacementsList)
    }
  })

  return replacements
}

const getPossibleNextMolecules = (
  molecule: string,
  replacements: Map<string, string[]>
): string[] => {
  // Generate possible molecules
  let nextMolecules: string[] = []
  const currentReplacementsForEach = (
    replacement: string,
    i: number,
    plusValue: number
  ) => {
    nextMolecules.push(
      `${molecule.slice(0, i)}${replacement}${molecule.slice(i + plusValue)}`
    )
  }
  for (let i = 0; i < molecule.length; i++) {
    const char = molecule.charAt(i)
    let currentReplacements = replacements.get(char)
    if (currentReplacements) {
      currentReplacements.forEach((replacement) => {
        currentReplacementsForEach(replacement, i, 1)
      })
    } else {
      currentReplacements = replacements.get(molecule.slice(i, i + 2))
      if (currentReplacements) {
        currentReplacements.forEach((replacement) => {
          currentReplacementsForEach(replacement, i, 2)
        })
        i++
      }
    }
  }
  // De-dupe list
  nextMolecules = nextMolecules.filter(
    (mol, i) => nextMolecules.indexOf(mol) === i
  )

  return nextMolecules
}

function* generatePossibleNexts(
  molecule: string,
  replacements: Map<string, string[]>
) {
  const replacementFroms = Array.from(replacements.keys()).sort(
    (a, b) => b.length - a.length
  )
  for (let i = 0; i < replacementFroms.length; i++) {
    const from = replacementFroms[i]
    if (molecule.includes(from)) {
      const replacement = (replacements.get(from) || [])[0]
      yield molecule.replace(from, replacement)
    }
  }
}

const sortIntoSearchQueue = (
  insert: string,
  searchQueue: SLL<string>
): void => {
  if (!searchQueue.length) {
    searchQueue.push(insert)
  } else {
    let insertAfter = searchQueue.head
    while (
      insertAfter &&
      insertAfter.value.length <= insert.length &&
      insertAfter.next &&
      insertAfter.next.value.length <= insert.length
    ) {
      insertAfter = insertAfter.next
    }
    if (insertAfter) {
      searchQueue.insertAfter(insert, insertAfter)
    } else {
      searchQueue.push(insert)
    }
  }
}

const findShortestPathToTarget = (
  start: string,
  target: string,
  replacements: Map<string, string[]>
): number => {
  const queue: SLL<string> = new SLL(start)
  const parents: { [key: string]: string } = { [start]: '' }

  while (queue.length > 0) {
    const current = queue.shift()
    if (current) {
      if (current === target) {
        let pathCurrent = current
        let pathLength = 0

        while (parents[pathCurrent] !== '') {
          pathLength++
          pathCurrent = parents[pathCurrent]
        }

        return pathLength
      }

      for (const nextStep of generatePossibleNexts(current, replacements)) {
        if (nextStep in parents) continue // We've seen this before
        parents[nextStep] = current
        sortIntoSearchQueue(nextStep, queue)
      }
    }
  }

  return NaN
}

export const calibrateMachine = (inputKey: string) => {
  const molecule = inputs.get(inputKey)!.split('\n').reverse()[0]
  const replacements = parseReplacements(
    inputs.get(inputKey)!.split('\n').slice(0, -2)
  )
  const nextMolecules = getPossibleNextMolecules(molecule, replacements)
  return {
    answer1: nextMolecules.length,
  }
}

export const generateMolecule = (inputKey: string) => {
  const molecule = inputs.get(inputKey)!.split('\n').reverse()[0]
  const replacements = parseReplacements(
    inputs.get(inputKey)!.split('\n').slice(0, -2),
    true
  )
  return {
    answer2: findShortestPathToTarget(molecule, 'e', replacements),
  }
}

const day19: Omit<DayConfig, 'year'> = {
  answer1Text:
    'You can generate answer unique molecules after one replacement step.',
  answer2Text: 'It will take answer steps to generate the molecule.',
  buttons: [
    {
      label: 'Calibrate Machine',
      onClick: calibrateMachine,
    },
    {
      label: 'Generate Molecule',
      onClick: generateMolecule,
    },
  ],
  id: 19,
  inputs,
  title: 'Medicine for Rudolph',
}

export default day19
