import inputs from '../../inputs/2020/day08'
import { DayConfig } from '../../routes/Day'

type Command = 'acc' | 'jmp' | 'nop'

interface Instruction {
  amount: number
  command: Command
}

const parseInstructions = (rawInstructions: string): Instruction[] => {
  return rawInstructions.split('\n').map((instruction) => {
    const [command, amount] = instruction.split(' ')
    return {
      amount: parseInt(amount),
      command: command as Command,
    }
  })
}

class GamingSystem {
  accumulator: number
  currentLine: number
  instructions: Instruction[]

  constructor(rawInstructions: string, initialAccumulator?: number) {
    this.accumulator = initialAccumulator !== undefined ? initialAccumulator : 0
    this.currentLine = 0
    this.instructions = parseInstructions(rawInstructions)
  }

  runUntilLoopOrTerminate = (): {
    accumulator: number
    result: 'loop' | 'terminate'
  } => {
    const linesRun: Map<number, true> = new Map()
    while (
      !linesRun.get(this.currentLine) &&
      this.currentLine < this.instructions.length
    ) {
      linesRun.set(this.currentLine, true)
      this.step()
    }
    return {
      accumulator: this.accumulator,
      result:
        this.currentLine >= this.instructions.length ? 'terminate' : 'loop',
    }
  }

  step = (): {
    accumulator: number
    currentLine: number
  } => {
    const instruction = this.instructions[this.currentLine]
    switch (instruction.command) {
      case 'acc':
        this.accumulator += instruction.amount
        this.currentLine++
        break

      case 'jmp':
        this.currentLine += instruction.amount
        break

      case 'nop':
        this.currentLine++
        break
    }
    return {
      accumulator: this.accumulator,
      currentLine: this.currentLine,
    }
  }
}

export const runUntilLoopOrTerminate = (input: string) => {
  const gamingSystem = new GamingSystem(input)
  return {
    answer1: gamingSystem.runUntilLoopOrTerminate().accumulator,
  }
}

export const permuteAndFixCode = (input: string) => {
  const corruptedSystem = new GamingSystem(input)
  for (let i = 0; i < corruptedSystem.instructions.length; i++) {
    const newInstructions = JSON.parse(
      JSON.stringify(corruptedSystem.instructions)
    ) as Instruction[]
    if (corruptedSystem.instructions[i].command === 'nop') {
      newInstructions[i].command = 'jmp'
      const result = new GamingSystem(
        newInstructions.join('\n')
      ).runUntilLoopOrTerminate()
      if (result.result === 'terminate') {
        return {
          answer2: result.accumulator,
        }
      }
    } else if (corruptedSystem.instructions[i].command === 'jmp') {
      newInstructions[i].command = 'nop'
      const newInstructionsString = newInstructions
        .map(({ amount, command }) => `${command} ${amount}`)
        .join('\n')
      const result = new GamingSystem(
        newInstructionsString
      ).runUntilLoopOrTerminate()
      if (result.result === 'terminate') {
        return {
          answer2: result.accumulator,
        }
      }
    }
  }
  throw new Error('answer not found')
}

const day08: Omit<DayConfig, 'year'> = {
  answer1Text: 'The accumulator when a loop is detected is answer.',
  answer2Text: 'The accumulator when the corrected code terminates is answer.',
  buttons: [
    {
      label: 'Run Until Loop Or Terminate',
      onClick: runUntilLoopOrTerminate,
    },
    {
      label: 'Permute and Fix Code',
      onClick: permuteAndFixCode,
    },
  ],
  id: 8,
  inputs,
  title: 'Handheld Halting',
}

export default day08
