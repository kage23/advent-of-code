import inputs from '../../inputs/2022/day05'
import { DayConfig } from '../../routes/Day'

const runStacks = (inputRaw: string) => {
  const input = inputRaw.split('\n')
  const stacks: string[][] = []
  for (let i = 0; i < input.length; i++) {
    const row = input[i]
    if (row.charAt(1) === '1') {
      // This is the end of the stacks
      // We should skip this row and the next, then process the moves
      i += 1
      continue
    }
    if (row.startsWith('move')) {
      // Deal with the moves
      const [, stuff] = row.split('move ')
      const [howManyString, moreStuff] = stuff.split(' from ')
      const [fromColString, toColString] = moreStuff.split(' to ')
      const fromCol = Number(fromColString) - 1
      const toCol = Number(toColString) - 1
      for (let k = 0; k < Number(howManyString); k++) {
        const crate = stacks[fromCol].pop()
        stacks[toCol].push(crate!)
      }
    } else {
      for (let j = 0; j < row.length; j++) {
        const char = row.charAt(j)
        if (/[A-Z]/.test(char)) {
          const stackIndex = (j - 1) / 4
          if (!stacks[stackIndex]) stacks[stackIndex] = []
          stacks[stackIndex].unshift(char)
        }
      }
    }
  }
  return stacks
}

export const runTheStacks = (input: string) => ({
  answer1: runStacks(input).reduce((answer, stack) => answer + stack.pop(), '')
})

const runStacks9001 = (inputRaw: string) => {
  const input = inputRaw.split('\n')
  const stacks: string[][] = []
  for (let i = 0; i < input.length; i++) {
    const row = input[i]
    if (row.charAt(1) === '1') {
      // This is the end of the stacks
      // We should skip this row and the next, then process the moves
      i += 1
      continue
    }
    if (row.startsWith('move')) {
      // Deal with the moves
      const [, stuff] = row.split('move ')
      const [howManyString, moreStuff] = stuff.split(' from ')
      const [fromColString, toColString] = moreStuff.split(' to ')
      const fromCol = Number(fromColString) - 1
      const toCol = Number(toColString) - 1
      const substack = stacks[fromCol].splice(0 - Number(howManyString))
      stacks[toCol] = stacks[toCol].concat(substack)
    } else {
      for (let j = 0; j < row.length; j++) {
        const char = row.charAt(j)
        if (/[A-Z]/.test(char)) {
          const stackIndex = (j - 1) / 4
          if (!stacks[stackIndex]) stacks[stackIndex] = []
          stacks[stackIndex].unshift(char)
        }
      }
    }
  }
  return stacks
}

export const runTheStacks9001 = (input: string) => ({
  answer2: runStacks9001(input).reduce((answer, stack) => answer + stack.pop(), '')
})

const day05: Omit<DayConfig, 'year'> = {
  answer1Text: 'The top crates are answer.',
  answer2Text: 'The top crates are actually answer.',
  buttons: [
    {
      label: 'Run the Stacks',
      onClick: runTheStacks
    },
    {
      label: 'Run the Stacks 9001',
      onClick: runTheStacks9001
    },
  ],
  id: 5,
  inputs,
  title: 'Supply Stacks',
}

export default day05
