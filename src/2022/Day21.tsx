import { defaultRenderDay, IButton, IDayConfig } from '../Config'

import INPUT from '../Inputs/2022/Day21'

interface Monkey {
  id: string
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
    return [id, { id, value: Number(value) }]
  }
  const [monkeyA, symbol, monkeyB] = value.split(' ')
  return [id, {
    id,
    value: {
      monkeyA,
      symbol: symbol as OperationSymbol,
      monkeyB
    }
  }]
}

const solveMonkey = ({ id, value }: Monkey, monkeys: Map<string, Monkey>): Monkey => {
  // if (id === 'humn') throw new Error('this side has the humn monkey!')
  if (typeof value === 'number') return { id, value }
  const monkeyA = value.monkeyA === 'humn' ?
    monkeys.get(value.monkeyA)! :
    solveMonkey(monkeys.get(value.monkeyA)!, monkeys)
  const monkeyB = value.monkeyB === 'humn' ?
    monkeys.get(value.monkeyB)! :
    solveMonkey(monkeys.get(value.monkeyB)!, monkeys)
  if (value.monkeyA === 'humn' || value.monkeyB === 'humn') {
    return {
      id,
      value: {
        ...value,
        monkeyA: monkeyA.id,
        monkeyB: monkeyB.id
      }
    }
  }
  switch (value.symbol) {
    case '+': {
      return {
        id,
        value: (monkeyA.value as number) + (monkeyB.value as number)
      }
    }
    case '-': {
      return {
        id,
        value: (monkeyA.value as number) - (monkeyB.value as number)
      }
    }
    case '*': {
      return {
        id,
        value: (monkeyA.value as number) * (monkeyB.value as number)
      }
    }
    case '/': {
      return {
        id,
        value: (monkeyA.value as number) / (monkeyB.value as number)
      }
    }
  }
}

const BUTTONS: IButton[] = [
  {
    label: 'Listen to the Shouting Monkeys',
    onClick: (inputKey: string) => {
      const timerLabel = 'monkey listening timer the slow way'
      console.time(timerLabel)

      const monkeys: Map<string, Monkey> = new Map(
        INPUT[inputKey].split('\n').map(parseMonkey)
      )

      const answer1 = (
        solveMonkey(monkeys.get('root')!, monkeys).value as number
      ).toString()

      console.timeEnd(timerLabel)

      return { answer1 }
    },
  },
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
