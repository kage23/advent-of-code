import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'
import { intcodeComputer2019 } from '../utils/Various'

import INPUT from './Input/Day2'

const parseInput = (inputKey: string): number[] =>
  INPUT[inputKey].split(',').map(inputStr => parseInt(inputStr))

const BUTTONS: IButton[] = [
  {
    label: 'Find 1202 Alarm State',
    onClick: (inputKey: string) => {
      const input = parseInput(inputKey)
      input[1] = 12
      input[2] = 2

      const { program } = intcodeComputer2019(input)

      return {
        answer1: program[0].toString()
      }
    }
  },
  {
    label: 'Find Correct Inputs',
    onClick: (inputKey: string) => {
      const target = 19690720
      let noun = 0
      let verb = 0

      nounLoop:
      for (noun = 0; noun <= 99; noun++) {
        for (verb = 0; verb <= 99; verb++) {
          const input = parseInput(inputKey)
          input[1] = noun
          input[2] = verb
          const { program } = intcodeComputer2019(input)
          console.log(`noun ${noun} verb ${verb} result ${program[0]}`)
          if (program[0] === target) {
            break nounLoop
          }
        }
      }

      return {
        answer2: ((noun * 100) + verb).toString()
      }
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The value at position 0 after the program halts is{' '}
      <code>{answer}</code>.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      The answer (<code>(100 * noun) + verb</code>) is{' '}
      <code>{answer}</code>.
    </span>
  ),
  buttons: BUTTONS,
  day: 2,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: '1202 Program Alarm'
}

export default config
