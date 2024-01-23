import inputs from '../../inputs/2022/day11'
import { DayConfig } from '../../routes/Day'

class Monkey {
  id: number
  items: number[]
  operation: string
  testDivisibleBy: number
  trueThrowTo: number
  falseThrowTo: number

  inspectionCount: number

  constructor(input: string) {
    const lines = input.split('\n')
    this.id = Number(lines[0].charAt(7))
    this.items = lines[1].split(': ')[1].split(', ').map(x => Number(x))
    this.operation = lines[2].split('new = ')[1]
    this.testDivisibleBy = Number(lines[3].split('divisible by ')[1])
    this.trueThrowTo = Number(lines[4].charAt(lines[4].length - 1))
    this.falseThrowTo = Number(lines[5].charAt(lines[5].length - 1))
    this.inspectionCount = 0
  }

  inspectItem = (item: number, worryLimiter?: number): number => {
    const [, operator, right] = this.operation.split(' ')
    const rightNumber = right === 'old' ? item : Number(right)
    let worry = item

    switch (operator) {
      case '+':
        worry += rightNumber
        break
      case '*':
        worry *= rightNumber
        break
      default:
        break
    }

    this.inspectionCount += 1
    return worryLimiter ? worry % worryLimiter : Math.floor(worry / 3)
  }

  testItem = (item: number): number =>
    item % this.testDivisibleBy === 0 ? this.trueThrowTo : this.falseThrowTo
}

export const chaseMonkeys = (input: string, rounds = 20) => {
  const monkeys = input.split('\n\n').map(x => new Monkey(x))

  const worryLimiter = monkeys.reduce(
    (accumulator, monkey) => accumulator * monkey.testDivisibleBy, 1
  )

  for (let round = 0; round < rounds; round++) {
    monkeys.forEach(monkey => {
      while (monkey.items.length) {
        const item = monkey.inspectItem(monkey.items.shift()!, rounds > 20 ? worryLimiter : undefined)
        const throwTo = monkey.testItem(item)
        monkeys[throwTo].items.push(item)
      }
    })
  }

  monkeys.sort((a, b) => b.inspectionCount - a.inspectionCount)

  const answer = monkeys[0].inspectionCount * monkeys[1].inspectionCount

  if (rounds === 20) return { answer1: answer }

  return { answer2: answer }
}

const day11: Omit<DayConfig, 'year'> = {
  answer1Text: 'The level of monkey business after 20 rounds is answer.',
  answer2Text: 'The level of monkey business after 10,000 rounds is answer.',
  buttons: [
    {
      label: 'Chase the Monkeys',
      onClick: chaseMonkeys
    },
    {
      label: 'Chase the Monkeys for a While',
      onClick: (input) => chaseMonkeys(input, 10000)
    },
  ],
  id: 11,
  inputs,
  title: 'Monkey in the Middle',
}

export default day11
