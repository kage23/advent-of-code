import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'

import INPUT from '../Inputs/2022/Day05'

const runStacks = (inputKey: string) => {
  const input = INPUT[inputKey].split('\n')
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

const runStacks9001 = (inputKey: string) => {
  const input = INPUT[inputKey].split('\n')
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

const BUTTONS: IButton[] = [
  {
    label: 'Run the Stacks',
    onClick: (inputKey: string) => {
      const stacks = runStacks(inputKey)

      return {
        answer1: stacks.reduce((answer, stack) => answer + stack.pop(), '')
      }
    }
  },
  {
    label: 'Run the Stacks 9001',
    onClick: (inputKey: string) => {
      const stacks = runStacks9001(inputKey)

      return {
        answer2: stacks.reduce((answer, stack) => answer + stack.pop(), '')
      }
    }
  },
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The top crates are{' '}
      <code>{answer}</code>.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      The top crates are actually{' '}
      <code>{answer}</code>.
    </span>
  ),
  buttons: BUTTONS,
  day: 5,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Supply Stacks'
}

export default config
