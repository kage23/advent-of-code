import inputs from '../../inputs/2016/day23'
import { DayConfig } from '../../routes/Day'
import Assembunny from './Assembunny'

export const runPart1 = (input: string) => {
  const bunny = new Assembunny([])
  const inputLines = input.split('\n')
  bunny.registers.clear()
  bunny.registers.set('a', 7)
  bunny.registers.set('b', 0)
  bunny.registers.set('c', 0)
  bunny.registers.set('d', 0)
  bunny.runCode(inputLines)

  return {
    answer1: bunny.registers.get('a')!,
  }
}

export const runPart2 = (input: string) => {
  const bunny = new Assembunny([])
  const inputLines = input.split('\n')
  bunny.registers.clear()
  bunny.registers.set('a', 12)
  bunny.registers.set('b', 0)
  bunny.registers.set('c', 0)
  bunny.registers.set('d', 0)
  bunny.runCode(inputLines)

  return {
    answer2: bunny.registers.get('a')!,
  }
}

const day23: Omit<DayConfig, 'year'> = {
  answer1Text: 'The final value left in register a is answer.',
  answer2Text: 'The final value left in register a is answer.',
  buttons: [
    {
      label: 'Run Assembunny Code',
      onClick: runPart1,
    },
    {
      label: 'Run Assembunny Code, Part 2',
      onClick: runPart2,
    },
  ],
  id: 23,
  inputs,
  title: 'Safe Cracking',
}

export default day23
