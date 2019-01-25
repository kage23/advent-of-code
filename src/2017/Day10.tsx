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
    label: 'Apply Twists (One Round)',
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
  },
  {
    label: 'Apply Twists (Full Algorithm)',
    onClick: (inputKey) => {
      const lengths = (
        inputKey === 'DEMO_1'
          ? INPUT[inputKey].split(',').map(x => parseInt(x))
          : INPUT[inputKey].split('').map(x => x.charCodeAt(0))
        ).concat(17, 31, 73, 47, 23)

      const runs = 64
      for (let i = 0; i < runs; i++) {
        lengths.forEach(x => twistAndAdvance(x))
      }

      // Now you should have the sparse hash; make the dense hash
      let currentNode = list.head
      const denseHashArray = []
      let currentSubHash = 0
      for (let count = 0; count < list.length; count++) {
        if (currentNode) {
          currentSubHash = currentSubHash ^ currentNode.value
          currentNode = currentNode.next
        }
        if (count % 16 === 15) {
          denseHashArray.push(currentSubHash)
          currentSubHash = 0
        }
      }

      // Now use the dense hash to make the hex string
      let result = ''
      denseHashArray.forEach(x => {
        let hexStr = x.toString(16)
        if (hexStr.length % 2) hexStr = `0${hexStr}`
        result += hexStr
      })

      return {
        answer2: result
      }
    }
  }
]

const renderDay = (dayConfig: IDayConfig, inputKey: string): JSX.Element => {
  const listSize = inputKey === 'DEMO_1' ? 5 : 256
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
      <h3>Input:</h3>
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
      The final hash is{' '}
      <code>{answer}</code>.
    </span>
  ),
  buttons: BUTTONS,
  day: 10,
  INPUT,
  renderDay,
  title: 'Knot Hash'
}

export default config