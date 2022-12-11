import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'

import INPUT from '../Inputs/2022/Day11'

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

  inspectItem = (item: number, keepWorrying?: boolean): number => {
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
    return keepWorrying ? worry : Math.floor(worry / 3)
  }

  testItem = (item: number): number =>
    item % this.testDivisibleBy === 0 ? this.trueThrowTo : this.falseThrowTo
}

const chaseTheMonkeys = (inputKey: string, rounds: number, keepWorrying?: boolean): number => {
  const monkeys = INPUT[inputKey].split('\n\n').map(x => new Monkey(x))

  for (let round = 0; round < rounds; round++) {
    monkeys.forEach(monkey => {
      while (monkey.items.length) {
        let item = monkey.inspectItem(monkey.items.shift()!, keepWorrying)
        const throwTo = monkey.testItem(item)
        monkeys[throwTo].items.push(item)
      }
    })
  }

  monkeys.sort((a, b) => b.inspectionCount - a.inspectionCount)

  return monkeys[0].inspectionCount * monkeys[1].inspectionCount
}

const BUTTONS: IButton[] = [
  {
    label: 'Chase the Monkeys',
    onClick: (inputKey: string) => ({
      answer1: chaseTheMonkeys(inputKey, 20).toString()
    })
  },
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The level of monkey business after 20 rounds is{' '}
      <code>{answer}</code>.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      Check the console for the answer!
      {/* <code>{answer}</code> locations. */}
    </span>
  ),
  buttons: BUTTONS,
  day: 11,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Monkey in the Middle'
}

export default config
