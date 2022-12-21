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
  if (typeof value === 'number') return { id, value }
  const monkeyA = solveMonkey(monkeys.get(value.monkeyA)!, monkeys)
  const monkeyB = solveMonkey(monkeys.get(value.monkeyB)!, monkeys)
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

const solveForHumn = (
  monkey: Monkey,
  comparisonValue: number,
  monkeys: Map<string, Monkey>
): number => {
  if (monkey.id === 'humn') return comparisonValue
  if ((monkey.value as Operation).monkeyA === 'humn') {
    const monkeyB = solveMonkey(monkeys.get((monkey.value as Operation).monkeyB)!, monkeys)
    switch ((monkey.value as Operation).symbol) {
      case '*':
        return comparisonValue / (monkeyB.value as number)
      case '+':
        return comparisonValue - (monkeyB.value as number)
      case '-':
        return comparisonValue + (monkeyB.value as number)
      case '/':
        return comparisonValue * (monkeyB.value as number)
    }
  }
  if ((monkey.value as Operation).monkeyB === 'humn') {
    const monkeyA = solveMonkey(monkeys.get((monkey.value as Operation).monkeyB)!, monkeys)
    switch ((monkey.value as Operation).symbol) {
      case '*':
        return comparisonValue / (monkeyA.value as number)
      case '+':
        return comparisonValue - (monkeyA.value as number)
      case '-':
        return comparisonValue + (monkeyA.value as number)
      case '/':
        return comparisonValue * (monkeyA.value as number)
    }
  }
  debugger
  // Probably actually gotta recurse in here maybe? Test case 3
  return 0
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
        solveMonkey(monkeys.get('root')!, monkeys).value as number
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

      const comparisonMonkeys = [
        monkeys.get((monkeys.get('root')!.value as Operation).monkeyA)!,
        monkeys.get((monkeys.get('root')!.value as Operation).monkeyB)!
      ]

      const comparisonValue = solveMonkey(comparisonMonkeys[1], monkeys).value as number
      const answer2 = solveForHumn(comparisonMonkeys[0], comparisonValue, monkeys).toString()

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

/**
 * root: pppw = sjmn
dbpl: 5
cczh: sllz + lgvd
zczc: 2
ptdq: humn - dvpt
dvpt: 3
lfqf: 4
humn: 5
ljgn: 2
sjmn: drzm * dbpl
sllz: 4
pppw: cczh / lfqf
lgvd: ljgn * ptdq
drzm: hmdt - zczc
hmdt: 32



root: pppw = 150
root: cczh / lfqf = 150
root: cczh / 4 = 150
root: cczh = 600
root: sllz + lgvd = 600
root: 4 + lgvd = 600



root: lgvd = 596
root: ljgn * ptdq = 596
root: 2 * ptdq = 596

root: ptdq = 298
root: humn - dvpt = 298
root: humn - 3 = 298
root: humn = 301



 */
