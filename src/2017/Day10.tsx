import React from 'react'
import {
  IButton,
  IDayConfig
} from '../Config'

import INPUT from './Input/Day10'

import DLL, { IDLLNode } from '../utils/DLL'

interface INumberNode extends IDLLNode {
  value: number
}

class NumberDLL extends DLL {
  head: INumberNode | undefined
}

let prevInputKey = ''
let list = new NumberDLL()
let currentPosition = 0
let skipSize = 0

const twistAndAdvance = (length: number): void => {
  let startOfTwist = list.head
  const listToReverse: number[] = []

  // Select starting node for twist
  for (let i = 0; i < currentPosition; i++) {
    startOfTwist = startOfTwist ? startOfTwist.next : startOfTwist
  }
  let currentNode = startOfTwist

  // Get values to be reversed
  while (listToReverse.length < length && currentNode) {
    listToReverse.push(currentNode.value)
    currentNode = currentNode.next
  }

  currentNode = startOfTwist
  while (listToReverse.length && currentNode) {
    currentNode.value = listToReverse.pop() || 0
    currentNode = currentNode.next
  }

  currentPosition += (length + skipSize)
  skipSize++
}

const BUTTONS: IButton[] = [
  {
    label: 'Apply Twists',
    onClick: (inputKey) => {
      INPUT[inputKey].split(',').forEach(x => twistAndAdvance(parseInt(x)))

      const head = list.head
      const headNext = head ? head.next : undefined

      return {
        answer1: head && headNext
          ? (head.value * headNext.value).toString()
          : undefined
      }
    }
  }
]

const renderDay = (dayConfig: IDayConfig, inputKey: string): JSX.Element => {
  const listSize = inputKey === 'REAL' ? 256 : 5
  if (prevInputKey != inputKey) {
    list = new NumberDLL()
    currentPosition = 0
    skipSize = 0

    for (let i = 0; i < listSize; i++) list.push(i)

    prevInputKey = inputKey
  }

  const listDisplay: JSX.Element[] = []
  let currentNode = list.head
  for (let i = 0; i < listSize; i++) {
    const value = currentNode ? currentNode.value : 0
    listDisplay.push((
      <span key={value}> {value} </span>
    ))
    currentNode = currentNode ? currentNode.next : currentNode
  }

  return (
    <div className="render-box">
      <h3>Lengths:</h3>
      <p style={{ marginTop: 0 }}>{dayConfig.INPUT[inputKey]}</p>
      <h3>List:</h3>
      <p style={{ marginTop: 0 }}>
        {listDisplay}
      </p>
    </div>
  )
}

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The multiplication checksum is{' '}
      <code>{answer}</code>.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      <code>{answer}</code>
    </span>
  ),
  buttons: BUTTONS,
  day: 10,
  INPUT,
  renderDay,
  title: 'Knot Hash'
}

export default config