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

const shoutingMonkeys = (monkeys: Map<string, Monkey>, part: 1 | 2): number | boolean => {
  const monkeyIds = Array.from(monkeys.keys())

  while (true) {
    for (let i = 0; i < monkeyIds.length; i++) {
      const { id, value } = monkeys.get(monkeyIds[i])!
      if (id === 'root' && typeof value === 'number') {
        return value
      }
      if (typeof value !== 'number') {
        const monkeyA = monkeys.get(value.monkeyA)!
        const monkeyB = monkeys.get(value.monkeyB)!
        if (
          typeof monkeyA.value === 'number' &&
          typeof monkeyB.value === 'number'
        ) {
          if (part === 2 && id === 'root') {
            return monkeyA.value === monkeyB.value
          }
          switch (value.symbol) {
            case '+': {
              monkeys.set(id, {
                id,
                value: monkeyA.value + monkeyB.value
              })
              break
            }
            case '-': {
              monkeys.set(id, {
                id,
                value: monkeyA.value - monkeyB.value
              })
              break
            }
            case '*': {
              monkeys.set(id, {
                id,
                value: monkeyA.value * monkeyB.value
              })
              break
            }
            case '/': {
              monkeys.set(id, {
                id,
                value: monkeyA.value / monkeyB.value
              })
              break
            }
          }
        }
      }
    }
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

      const answer1 = (shoutingMonkeys(monkeys, 1) as number).toString()

      console.timeEnd(timerLabel)

      return { answer1 }
    },
  },
  {
    label: 'Shout With the Monkeys',
    onClick: (inputKey: string) => {
      const timerLabel = 'monkey shouting timer'
      console.time(timerLabel)

      let i = 1
      while (true) {
        const monkeys: Map<string, Monkey> = new Map(
          INPUT[inputKey].split('\n').map(parseMonkey)
        )
        monkeys.set('humn', { id: 'humn', value: i })
        const result = shoutingMonkeys(monkeys, 2) as boolean
        if (result) {
          console.timeEnd(timerLabel)
          return { answer2: i.toString() }
        }
        i += 1
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
