import inputs from '../../inputs/2017/day17'
import { DayConfig } from '../../routes/Day'
import DLL from '../../utils/DLL'

const createNodes = (max: number, skipSize: number): DLL<number> => {
  const numbers = new DLL(0)
  let currentNode = numbers.head
  for (let i = 1; i <= max; i++) {
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

export const solvePart1Day17 = (inputKey: string) => {
  const max = 2017
  const skipSize = parseInt(inputs.get(inputKey)!)
  const numbers = createNodes(max, skipSize)
  let currentNode = numbers.head
  while (currentNode && currentNode.value !== max)
    currentNode = currentNode.next
  return {
    answer1:
      currentNode && currentNode.next ? currentNode.next.value : undefined,
  }
}

export const solvePart2Day17 = (inputKey: string) => {
  const max = 50000000
  const skipSize = parseInt(inputs.get(inputKey)!)
  const numbers = createNodes(max, skipSize)
  let currentNode = numbers.head
  while (currentNode && currentNode.value !== 0) currentNode = currentNode.next
  return {
    answer2:
      currentNode && currentNode.next ? currentNode.next.value : undefined,
  }
}

const day17: Omit<DayConfig, 'year'> = {
  answer1Text: 'The value after 2017 is answer.',
  answer2Text: 'The value after 50,000,000 is answer.',
  buttons: [
    {
      label: 'Solve Part 1',
      onClick: solvePart1Day17,
    },
    {
      label: 'Solve Part 2',
      onClick: solvePart2Day17,
    },
  ],
  id: 17,
  inputs,
  title: 'Spinlock',
}

export default day17
