import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'

import INPUT from './Input/Day7'

interface IProgram {
  name: string
  children: string[]
  parent?: string
  weight?: number
}

const parseInput = (input: string): IProgram[] => {
  const programs: IProgram[] = []

  input.split('\n').forEach(row => {
    const name = row.split(' ')[0]
    let program = programs.find(program => program.name === name)
    if (!program) {
      program = programs[programs.push({
        name,
        children: []
      }) - 1]
    }
    program.weight = parseInt(row.split('(')[1])
    if (row.indexOf('->') !== -1) {
      row.split('-> ')[1].split(', ').forEach(child => {
        if (program) program.children.push(child)
        let childProgram = programs.find(fProgram => fProgram.name === child)
        if (!childProgram) {
          childProgram = programs[programs.push({
            name: child,
            children: []
          }) - 1]
        }
        childProgram.parent = name
      })
    }
  })

  return programs
}

const BUTTONS: IButton[] = [
  {
    label: 'Find Bottom Program',
    onClick: (inputKey) => {
      const program = parseInput(INPUT[inputKey]).find(program => !program.parent)

      return {
        answer1: program ? program.name : undefined
      }
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The bottom program is <code>{answer}</code>.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      <code>{answer}</code>
    </span>
  ),
  buttons: BUTTONS,
  day: 7,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Recursive Circus'
}

export default config