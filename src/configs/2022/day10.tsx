import inputs from '../../inputs/2022/day10'
import { DayConfig } from '../../routes/Day'

export const determineSignalStrengths = (input: string) => {
  const instructions = input.split('\n')
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
    answer1: signalStrengthSum
  }
}

export const runTheProgram = (input: string) => {
  const instructions = input.split('\n')
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
    answer2: screen
  }
}

const day10: Omit<DayConfig, 'year'> = {
  answer1Text: 'The sum of the important register cycles is answer.',
  answer2Text: 'Check your console!',
  buttons: [
    {
      label: 'Determine Signal Strengths',
      onClick: determineSignalStrengths
    },
    {
      label: 'Run the Program',
      onClick: runTheProgram
    },
  ],
  id: 10,
  inputs,
  title: 'Cathode-Ray Tube',
}

export default day10
