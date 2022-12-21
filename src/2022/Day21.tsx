import { defaultRenderDay, IButton, IDayConfig } from '../Config'

import INPUT from '../Inputs/2022/Day21'

interface Monkey {
  id: string
  raw: string
  value: number | Operation
}

interface Operation {
  monkeyA: string
  monkeyB: string
  symbol: OperationSymbol
}

type OperationSymbol = '+' | '-' | '*' | '/'

const parseMonkey = (line: string): [string, Monkey] => {
  const [id, value] = line.split(': ')
  if (!isNaN(Number(value))) {
    return [id, { id, raw: line, value: Number(value) }]
  }
  const [monkeyA, symbol, monkeyB] = value.split(' ')
  return [id, {
    id,
    raw: line,
    value: {
      monkeyA,
      symbol: symbol as OperationSymbol,
      monkeyB
    }
  }]
}

const solveMonkey = (
  { id, raw, value }: Monkey,
  monkeys: Map<string, Monkey>
): Monkey | undefined => {
  if (typeof value === 'number') return { id, raw, value }
  const monkeyA = solveMonkey(monkeys.get(value.monkeyA)!, monkeys)!
  const monkeyB = solveMonkey(monkeys.get(value.monkeyB)!, monkeys)!
  switch (value.symbol) {
    case '+': {
      return {
        id,
        raw,
        value: (monkeyA.value as number) + (monkeyB.value as number)
      }
    }
    case '-': {
      return {
        id,
        raw,
        value: (monkeyA.value as number) - (monkeyB.value as number)
      }
    }
    case '*': {
      return {
        id,
        raw,
        value: (monkeyA.value as number) * (monkeyB.value as number)
      }
    }
    case '/': {
      return {
        id,
        raw,
        value: (monkeyA.value as number) / (monkeyB.value as number)
      }
    }
  }
}

const solveForMonkey = (
  monkeyId: string,
  monkeys: Map<string, Monkey>,
  operationsToUndo = [] as [OperationSymbol, number, boolean][]
): number => {
  // Find the monkey that uses the monkey we're solving for (the parentMonkey)
  const parentMonkey = Array.from(monkeys.values()).find(({ value }) => (
    typeof value !== 'number' && (value.monkeyA === monkeyId || value.monkeyB === monkeyId)
  ))!
  // Get the value of the other monkey that the parentMonkey uses (the siblingMonkey)
  const siblingValue = (
    monkeyId === (parentMonkey.value as Operation).monkeyA ?
      solveMonkey(monkeys.get((parentMonkey.value as Operation).monkeyB)!, monkeys)! :
      solveMonkey(monkeys.get((parentMonkey.value as Operation).monkeyA)!, monkeys)!
  ).value as number
  // If the parent is root, run through the list of operations to undo
  if (parentMonkey.id === 'root') {
    return operationsToUndo.reduce((accumulator, [symbol, number, swap]) => {
      switch (symbol) {
        case '*':
          return accumulator / number
        case '+':
          return accumulator - number
        case '-':
          return swap ? number - accumulator : accumulator + number
        case '/':
          return swap ? number / accumulator : accumulator * number
      }
      return accumulator
    }, siblingValue)
  }
  // Otherwise, add parentMonkey's operation to a list of operations to undo, and solve for the parent
  else {
    let swap = false
    if (
      ((parentMonkey.value as Operation).symbol === '-' || (parentMonkey.value as Operation).symbol === '/') &&
      monkeyId === (parentMonkey.value as Operation).monkeyB
    ) swap = true
    operationsToUndo.unshift([(parentMonkey.value as Operation).symbol, siblingValue, swap])
    return solveForMonkey(parentMonkey.id, monkeys, operationsToUndo)
  }
}

const BUTTONS: IButton[] = [
  {
    label: 'Listen to the Shouting Monkeys',
    onClick: (inputKey: string) => {
      const timerLabel = 'monkey listening timer'
      console.time(timerLabel)

      const monkeys: Map<string, Monkey> = new Map(
        INPUT[inputKey].split('\n').map(parseMonkey)
      )

      const answer1 = (
        solveMonkey(monkeys.get('root')!, monkeys)!.value as number
      ).toString()

      console.timeEnd(timerLabel)

      return { answer1 }
    },
  },
  {
    label: 'Shout With the Monkeys',
    onClick: (inputKey: string) => {
      const timerLabel = 'monkey shouting timer'
      console.time(timerLabel)

      const monkeys: Map<string, Monkey> = new Map(
        INPUT[inputKey].split('\n').map(parseMonkey)
      )

      const answer2 = solveForMonkey('humn', monkeys).toString()

      console.timeEnd(timerLabel)

      return {
        answer2
      }
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The root monkey's number is <code>{answer}</code>.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      If you shout <code>{answer}</code>, the root monkey's equality check will pass.
    </span>
  ),
  buttons: BUTTONS,
  day: 21,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Monkey Math',
}

export default config
