import React from 'react'
import {
  IButton,
  IDayConfig
} from '../Config'
import { intcodeComputer2019, IIntcodeComputerResults } from '../utils/Various'

import INPUT from '../Inputs/2019/Day25'

let program: number[] = []
let intcodeComputerResults: IIntcodeComputerResults = {
  finished: false,
  instructionPointer: 0,
  outputs: [],
  relativeBase: 0,
  program
}

let parsedOutput: string = ''

const parseInput = (inputKey: string): number[] =>
  INPUT[inputKey].split(',').map(inputStr => parseInt(inputStr))

const parseOutput = (outputs: number[]): string => outputs.map(x => String.fromCharCode(x)).join('') + '\n'

const renderDay = (dayConfig: IDayConfig, inputKey: string) => {
  return (
    <div>
      <h3>Input: {dayConfig.INPUT[inputKey]}</h3>
      <p>
        Intcode computer ASCII input:{' '}
        <input type="text" size={50} id="intcodeInput" />
      </p>
      <h3>Output:</h3>
      <pre className="render-box--pre-wrap">{parsedOutput}</pre>
    </div>
  )
}

const BUTTONS: IButton[] = [
  {
    label: 'Initialize/Reset Program (Click Me First)',
    onClick: (inputKey: string) => {
      program = parseInput(inputKey)

      intcodeComputerResults = {
        finished: false,
        instructionPointer: 0,
        outputs: [],
        relativeBase: 0,
        program
      }

      parsedOutput = ''

      return {}
    }
  },
  {
    label: 'Run Program',
    onClick: () => {
      const { value } = document.getElementById('intcodeInput') as HTMLInputElement

      const input = value
        ? `${value.trim()}\n`.split('').map(x => x.charCodeAt(0))
        : []

      intcodeComputerResults = intcodeComputer2019(
        intcodeComputerResults.program,
        input,
        false,
        intcodeComputerResults.instructionPointer,
        intcodeComputerResults.relativeBase
      )

      parsedOutput += parseOutput(intcodeComputerResults.outputs)

      return {
        answer1: ''
      }
    }
  },
  {
    label: 'Clear Output',
    onClick: () => {
      parsedOutput = ''
      return {}
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      Have fun playing the text adventure and working out the answer yourself!
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      {/* The robot vacuumed up <code>{answer}</code> dust. */}
    </span>
  ),
  buttons: BUTTONS,
  day: 25,
  INPUT,
  renderDay: (dayConfig, inputKey) => renderDay(dayConfig, inputKey),
  title: 'Cryostasis'
}

export default config
