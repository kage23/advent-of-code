import React from 'react'
import {
  IButton,
  IDayConfig
} from '../Config'

import INPUT from './Input/Day17'
import DLL from '../utils/DLL'

let numbers = new DLL(0)
let prevInputKey = ''

const createNodes = (max: number, skipSize: number): DLL => {
  let numbers = new DLL(0)
  let currentNode = numbers.head
  for (let i = 1; i <= max; i++) {
    if (i % 10000 === 0) console.log(i)
    for (let j = 0; j < skipSize; j++) {
      if (currentNode) {
        currentNode = currentNode.next
      }
    }
    if (currentNode) {
      currentNode = numbers.insertAfter(i, currentNode)
    }
  }
  return numbers
}

const BUTTONS: IButton[] = [
  {
    label: 'Solve Part 1',
    onClick: (inputKey) => {
      const max = 2017
      const skipSize = parseInt(INPUT[inputKey])
      numbers = createNodes(max, skipSize)
      let currentNode = numbers.head
      while (currentNode && currentNode.value !== max) currentNode = currentNode.next
      return {
        answer1: currentNode && currentNode.next ? currentNode.next.value.toString() : undefined
      }
    }
  },
  {
    label: 'Solve Part 2',
    onClick: (inputKey) => {
      const max = 50000000
      const skipSize = parseInt(INPUT[inputKey])
      numbers = createNodes(max, skipSize)
      let currentNode = numbers.head
      while (currentNode && currentNode.value !== 0) currentNode = currentNode.next
      return {
        answer2: currentNode && currentNode.next ? currentNode.next.value.toString() : undefined
      }
    }
  }
]

const renderDay = (dayConfig: IDayConfig, inputKey: string): JSX.Element => {
  if (inputKey !== prevInputKey) {
    numbers = new DLL(0)
    prevInputKey = inputKey
  }

  const numbersDisplay: JSX.Element[] = []
  let currentNode = numbers.head
  for (let i = 0; i < Math.min(numbers.length, 2050); i++) {
    if (currentNode) {
      numbersDisplay.push((
        <span key={i}>{currentNode.value}{' '}</span>
      ))
      currentNode = currentNode.next
    }
  }
  if (numbers.length > 2050) {
    numbersDisplay.push((
      <span key='more'>...</span>
    ))
  }

  return (
    <div className="render-box">
      <h3>Input:</h3>
      <pre>{dayConfig.INPUT[inputKey]}</pre>
      <h3>Nodes:</h3>
      <pre className="render-box--pre-wrap">{numbersDisplay}</pre>
    </div>
  )
}

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The value after <code>2017</code> is{' '}
      <code>{answer}</code>.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      The value after <code>0</code> is{' '}
      <code>{answer}</code>
    </span>
  ),
  buttons: BUTTONS,
  day: 17,
  INPUT,
  renderDay,
  title: 'Spinlock'
}

export default config