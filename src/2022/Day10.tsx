import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'

import INPUT from '../Inputs/2022/Day10'

const determineSignalStrengths = (inputKey: string) => {
  const instructions = INPUT[inputKey].split('\n')
  let registerX = 1
  let cycle = 1
  let signalStrengthSum = 0

  let currentLine = instructions.shift()
  let addReady = false

  while (instructions.length) {
    if (cycle % 40 === 20) signalStrengthSum += (registerX * cycle)
    if (currentLine === 'noop') {
      cycle += 1
      currentLine = instructions.shift()
    } else if (currentLine?.startsWith('addx')) {
      if (!addReady) {
        addReady = true
        cycle += 1
      } else {
        addReady = false
        registerX += Number(currentLine.split(' ')[1])
        cycle += 1
        currentLine = instructions.shift()
      }
    }
  }

  return {
    answer1: signalStrengthSum.toString()
  }
}

const runTheProgram = (inputKey: string) => {
  const instructions = INPUT[inputKey].split('\n')
  let spritePosition = 1
  let cycle = 1

  let currentLine = instructions.shift()
  let addReady = false

  let screen = ''

  while (instructions.length) {
    if (Math.abs(spritePosition - ((cycle - 1) % 40)) <= 1) screen += '#'
    else screen += '.'
    if (cycle % 40 === 0) screen += '\n'

    if (currentLine === 'noop') {
      cycle += 1
      currentLine = instructions.shift()
    } else if (currentLine?.startsWith('addx')) {
      if (!addReady) {
        addReady = true
        cycle += 1
      } else {
        addReady = false
        spritePosition += Number(currentLine.split(' ')[1])
        cycle += 1
        currentLine = instructions.shift()
      }
    }
  }

  console.log(screen)

  return {
    answer2: ''
  }
}

const BUTTONS: IButton[] = [
  {
    label: 'Determine Signal Strengths',
    onClick: determineSignalStrengths
  },
  {
    label: 'Run the Program',
    onClick: runTheProgram
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The sum of the important register cycles is{' '}
      <code>{answer}</code>.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      Check the console for the answer!
      {/* <code>{answer}</code> locations. */}
    </span>
  ),
  buttons: BUTTONS,
  day: 10,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Cathode-Ray Tube'
}

export default config
