import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'

import INPUT from './Input/Day12'

interface IProgram {
  connectedTo: number[]
  inZeroGroup?: boolean
}

const parseInput = (input: string): Map<number, IProgram> => {
  const programMap: Map<number, IProgram> = new Map()

  input.split('\n').forEach(line => {
    const [
      originString,
      connectedToString
    ] = line.split(' <-> ')

    programMap.set(parseInt(originString), {
      connectedTo: connectedToString.split(', ').map(x => parseInt(x))
    })
  })

  return programMap
}

const connectedToZero = (origin: number, program: IProgram, programMap: Map<number, IProgram>, parents: number[]): boolean => {
  if (program.inZeroGroup) return true

  const { connectedTo } = program

  if (origin === 0) {
    programMap.set(origin, {
      connectedTo,
      inZeroGroup: true
    })
    return true
  } else {
    const inZeroGroup = connectedTo.some(subOrigin => {
      if (subOrigin === origin || parents.indexOf(subOrigin) !== -1) return false
      const subProgram = programMap.get(subOrigin)
      if (subProgram) {
        if (subProgram.inZeroGroup) return true
        const newParents = parents.concat(origin)
        return connectedToZero(subOrigin, subProgram, programMap, newParents)
      }
      return false
    })
    program.inZeroGroup = inZeroGroup
    return inZeroGroup
  }
}

const countGroups = (inputKey: string): { answer2: string } => {
  const programMap = parseInput(INPUT[inputKey])
  const seenMap: Map<number, boolean> = new Map()
  let groupCount = 0

  for (const [id, program] of programMap) {
    if (!seenMap.get(id)) {
      groupCount++
      seenMap.set(id, true)
      viewNeighbors(program, programMap, seenMap)
    }
  }

  return {
    answer2: groupCount.toString()
  }
}

const viewNeighbors = (program: IProgram, programMap: Map<number, IProgram>, seenMap: Map<number, boolean>): void => {
  program.connectedTo.forEach(connectedId => {
    if (!seenMap.get(connectedId)) {
      seenMap.set(connectedId, true)
      const connectedProgram = programMap.get(connectedId)
      if (connectedProgram) viewNeighbors(connectedProgram, programMap, seenMap)
    }
  })
}

const BUTTONS: IButton[] = [
  {
    label: 'Find Programs Connected to 0',
    onClick: (inputKey) => {
      let programCount = 0
      const programMap = parseInput(INPUT[inputKey])

      for (const [id, program] of programMap) {
        if (connectedToZero(id, program, programMap, [])) programCount++
      }

      return {
        answer1: programCount.toString()
      }
    }
  },
  {
    label: 'Count Groups',
    onClick: countGroups
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      <code>{answer}</code> programs are in the group that contains program ID <code>0</code>.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      There are <code>{answer}</code> groups of programs.
    </span>
  ),
  buttons: BUTTONS,
  day: 12,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Digital Plumber'
}

export default config