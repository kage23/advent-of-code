import inputs from '../../inputs/2016/day12'
import { DayConfig } from '../../routes/Day'
import Assembunny from './Assembunny'

export const runAssembunnyCode = (input: string) => {
  const assembunny = new Assembunny([])

  const inputLines = input.split('\n')

  assembunny.registers.clear()
  assembunny.registers.set('a', 0)
  assembunny.registers.set('b', 0)
  assembunny.registers.set('c', 0)
  assembunny.registers.set('d', 0)

  assembunny.runCode(inputLines)

  return {
    answer1: assembunny.registers.get('a') || 0,
  }
}

export const runAssembunnyCodeWithIgnitionSet = (input: string) => {
  const assembunny = new Assembunny([])

  const inputLines = input.split('\n')

  assembunny.registers.clear()
  assembunny.registers.set('a', 0)
  assembunny.registers.set('b', 0)
  assembunny.registers.set('c', 1)
  assembunny.registers.set('d', 0)

  assembunny.runCode(inputLines)

  return {
    answer2: assembunny.registers.get('a') || 0,
  }
}

const day12: Omit<DayConfig, 'year'> = {
  answer1Text: 'The final value left in register A is answer.',
  answer2Text: 'The final value left in register A is answer.',
  buttons: [
    {
      label: 'Run Assembunny Code',
      onClick: runAssembunnyCode,
    },
    {
      label: 'Run Assembunny Code with Ignition Set',
      onClick: runAssembunnyCodeWithIgnitionSet,
    },
  ],
  id: 12,
  inputs,
  title: `Leonardo's Monorail`,
}

export default day12
