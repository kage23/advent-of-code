export type ICommand = 'acc' | 'jmp' | 'nop'

export interface IInstruction {
  amount: number
  command: ICommand
}

const parseInstructions = (rawInstructions: string): IInstruction[] => {
  return rawInstructions
    .split('\n')
    .map(instruction => {
      const [command, amount] = instruction.split(' ')
      return {
        amount: parseInt(amount),
        command: command as ICommand
      }
    })
}

class GamingSystem {
  accumulator: number
  currentLine: number
  instructions: IInstruction[]

  constructor(rawInstructions: string, initialAccumulator?: number) {
    this.accumulator = initialAccumulator !== undefined ? initialAccumulator : 0
    this.currentLine = 0
    this.instructions = parseInstructions(rawInstructions)
  }

  runUntilLoopOrTerminate = (): { accumulator: number, result: 'loop' | 'terminate' } => {
    const linesRun: Map<number, true> = new Map()
    while (!linesRun.get(this.currentLine) && this.currentLine < this.instructions.length) {
      linesRun.set(this.currentLine, true)
      this.step()
    }
    return {
      accumulator: this.accumulator,
      result: this.currentLine >= this.instructions.length ? 'terminate' : 'loop'
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
      currentLine: this.currentLine
    }
  }
}

export default GamingSystem
