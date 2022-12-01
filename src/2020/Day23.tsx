import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'
import DLL, { IDLLNode } from '../utils/DLL'
import INPUT from '../Inputs/2020/Day23'

const playARound = (cups: DLL, currentCup: IDLLNode) => {
  const nextThree: number[] = []
  nextThree.push((cups.removeNode(currentCup.next) as IDLLNode).value as number)
  nextThree.push((cups.removeNode(currentCup.next) as IDLLNode).value as number)
  nextThree.push((cups.removeNode(currentCup.next) as IDLLNode).value as number)

  let destination = currentCup.value - 1
  if (destination === 0) destination = cups.length + 3
  while (nextThree.includes(destination)) {
    destination--
    if (destination === 0) destination = cups.length + 3
  }
  let destinationNode = cups.getNode(destination)
  while (destinationNode && nextThree.length) {
    destinationNode = cups.insertAfter(nextThree.shift(), destinationNode)
  }
}

const BUTTONS: IButton[] = [
  {
    label: 'Play 100 Rounds',
    onClick: (inputKey: string) => {
      const cups = new DLL()

      INPUT[inputKey].split('').forEach(x => {
        cups.push(parseInt(x))
      })

      let currentNode = cups.head
      for (let i = 0; i < 100; i++) {
        if (!currentNode) throw new Error('fuck')
        playARound(cups, currentNode)
        currentNode = currentNode.next
      }

      const cup1 = cups.getNode(1)
      if (!cup1) throw new Error('fuck')
      let answer1 = ''
      while (cup1.next !== cup1) {
        const nextNode = cups.removeNode(cup1.next)
        if (!nextNode) throw new Error('fuck')
        answer1 += (nextNode.value as number).toString()
      }

      return {
        answer1
      }
    }
  },
  {
    label: 'Play the Real Thing',
    onClick: (inputKey: string) => {
      const cups = new DLL()

      INPUT[inputKey].split('').forEach(x => {
        cups.push(parseInt(x))
      })

      for (let i = 10; i <= 1000000; i++) cups.push(i)

      let currentNode = cups.head
      for (let i = 0; i < 10000000; i++) {
        if (i % 10000 === 1) console.log(`About to play round ${i}`)
        if (!currentNode) throw new Error('fuck')
        playARound(cups, currentNode)
        currentNode = currentNode.next
      }

      const cup1 = cups.getNode(1)
      if (!cup1) throw new Error('fuck')
      let answer2 = 1
      let nextCup = cup1.next
      for (let j = 0; nextCup && j < 2; j++) {
        answer2 *= nextCup.value
        nextCup = nextCup.next
      }

      return {
        answer2: answer2.toString()
      }
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      After 100 rounds, the cups after Cup 1 are <code>{answer}</code>.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      After 10,000,000 rounds with 1,000,000 cups, the product of the two cups
      after Cup 1 is <code>{answer}</code>.
    </span>
  ),
  buttons: BUTTONS,
  day: 23,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Crab Cups'
}

export default config