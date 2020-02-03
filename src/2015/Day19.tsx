import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'
import SLL from '../utils/SLL'

import INPUT from './Input/Day19'

const findShortestPathToTarget = (start: string, target: string, replacements: Map<string, string[]>): number => {
  const queue: SLL = new SLL(start)
  const parents: { [key:string]: string } = { [start]: '' }

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

      for (let nextStep of generatePossibleNexts(current, replacements)) {
        if (nextStep in parents) continue // We've seen this before
        parents[nextStep] = current
        sortIntoSearchQueue(nextStep, queue)
      }
    }
  }

  return NaN
}

function * generatePossibleNexts(molecule: string, replacements: Map<string, string[]>) {
  const replacementFroms = Array.from(replacements.keys()).sort((a, b) => b.length - a.length)
  for (let i = 0; i < replacementFroms.length; i++) {
    const from = replacementFroms[i]
    if (molecule.includes(from)) {
      const replacement = (replacements.get(from) || [])[0]
      yield molecule.replace(from, replacement)
    }
  }
}

const getPossibleNextMolecules = (molecule: string, replacements: Map<string, string[]>): string[] => {
  // Generate possible molecules
  let nextMolecules: string[] = []
  for (let i = 0; i < molecule.length; i++) {
    const char = molecule.charAt(i)
    let currentReplacements = replacements.get(char)
    if (currentReplacements) {
      currentReplacements.forEach(replacement => {
        nextMolecules.push(`${molecule.slice(0, i)}${replacement}${molecule.slice(i + 1)}`)
      })
    } else {
      currentReplacements = replacements.get(molecule.slice(i, i + 2))
      if (currentReplacements) {
        currentReplacements.forEach(replacement => {
          nextMolecules.push(`${molecule.slice(0, i)}${replacement}${molecule.slice(i + 2)}`)
        })
        i++
      }
    }
  }
  // De-dupe list
  nextMolecules = nextMolecules.filter((mol, i) => nextMolecules.indexOf(mol) === i)

  return nextMolecules
}

const parseReplacements = (inputList: string[], reverse?: boolean): Map<string, string[]> => {
  const replacements: Map<string, string[]> = new Map()

  inputList.forEach(inputLine => {
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

const sortIntoSearchQueue = (insert: string, searchQueue: SLL): void => {
  if (!searchQueue.length) {
    searchQueue.push(insert)
  } else {
    let insertAfter = searchQueue.head
    while (
      insertAfter
      && insertAfter.value.length <= insert.length
      && insertAfter.next
      && insertAfter.next.value.length <= insert.length
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

const BUTTONS: IButton[] = [
  {
    label: 'Calibrate Machine',
    onClick: (inputKey) => {
      const molecule = INPUT[inputKey].split('\n').reverse()[0]
      const replacements = parseReplacements(INPUT[inputKey].split('\n').slice(0, -2))
      const nextMolecules = getPossibleNextMolecules(molecule, replacements)
      return {
        answer1: nextMolecules.length.toString()
      }
    }
  },
  {
    label: 'Generate Molecule',
    onClick: (inputKey) => {
      const molecule = INPUT[inputKey].split('\n').reverse()[0]
      const replacements = parseReplacements(INPUT[inputKey].split('\n').slice(0, -2), true)
      return {
        answer2: findShortestPathToTarget(molecule, 'e', replacements).toString()
      }
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      You can generate <code>{answer}</code> unique molecules after one replacement step.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      It will take <code>{answer}</code> steps to generate the molecule.
    </span>
  ),
  buttons: BUTTONS,
  day: 19,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Medicine for Rudolph'
}

export default config