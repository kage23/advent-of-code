import inputs from '../../inputs/2017/day10'
import { DayConfig } from '../../routes/Day'

import DLL from '../../utils/DLL'
import generateKnotHash from '../../utils/generateKnotHash'

export const oneTwist = (inputKey: string) => {
  const list = new DLL<number>()
  let currentPosition = 0
  let skipSize = 0

  const listSize = inputKey === 'DEMO_1' ? 5 : 256
  for (let i = 0; i < listSize; i++) list.push(i)

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

    currentPosition += length + skipSize
    skipSize++
  }

  inputs
    .get(inputKey)!
    .split(',')
    .forEach((x) => twistAndAdvance(parseInt(x)))

  const head = list.head
  const headNext = head ? head.next : undefined

  return {
    answer1: head && headNext ? head.value * headNext.value : undefined,
  }
}

export const fullTwists = (inputKey: string) => {
  return {
    answer2: generateKnotHash(
      inputs.get(inputKey)!,
      256,
      inputKey === 'DEMO_1'
    ),
  }
}

const day10: Omit<DayConfig, 'year'> = {
  answer1Text: 'The multiplication checksum is answer.',
  answer2Text: 'The final hash is answer.',
  buttons: [
    {
      label: 'Apply Twists (One Round)',
      onClick: oneTwist,
    },
    {
      label: 'Apply Twists (Full Algorithm)',
      onClick: fullTwists,
    },
  ],
  id: 10,
  inputs,
  title: 'Knot Hash',
}

export default day10
