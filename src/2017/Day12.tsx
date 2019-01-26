import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'

import INPUT from './Input/Day12'
import { number } from 'prop-types';

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
      <code>{answer}</code>
    </span>
  ),
  buttons: BUTTONS,
  day: 12,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Digital Plumber'
}

export default config