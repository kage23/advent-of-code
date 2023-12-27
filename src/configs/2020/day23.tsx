import inputs from '../../inputs/2020/day23'
import { DayConfig } from '../../routes/Day'
import DLL, { DLLNode } from '../../utils/DLL'

const playARound = (cups: DLL<number>, currentCup: DLLNode<number>) => {
  const nextThree: number[] = []
  nextThree.push((cups.removeNode(currentCup.next)!).value)
  nextThree.push((cups.removeNode(currentCup.next)!).value)
  nextThree.push((cups.removeNode(currentCup.next)!).value)

  let destination = currentCup.value - 1
  if (destination === 0) destination = cups.length + 3
  while (nextThree.includes(destination)) {
    destination--
    if (destination === 0) destination = cups.length + 3
  }
  let destinationNode = cups.getNode(destination)
  while (destinationNode && nextThree.length) {
    destinationNode = cups.insertAfter(nextThree.shift()!, destinationNode)
  }
}

export const play100Rounds = (input: string) => {
  const cups = new DLL<number>()

  input.split('').forEach(x => {
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
    answer1 += nextNode.value
  }

  return { answer1 }
}

export const playForReal = (input: string) => {
  const cups = new DLL<number>()

  input.split('').forEach(x => {
    cups.push(parseInt(x))
  })

  for (let i = 10; i <= 1000000; i++) cups.push(i)

  let currentNode = cups.head
  for (let i = 0; i < 10000000; i++) {
    // if (i % 10000 === 1) console.log(`About to play round ${i}`)
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

  return { answer2 }
}

const day23: Omit<DayConfig, 'year'> = {
  answer1Text: 'After 100 rounds, the cups after Cup 1 are answer.',
  answer2Text: 'After 10,000,000 rounds with 1,000,000 cups, the product of the two cups after Cup 1 is answer.',
  buttons: [
    {
      label: 'Play 100 Rounds',
      onClick: play100Rounds
    },
    {
      label: 'Play the Real Thing',
      onClick: playForReal
    },
  ],
  id: 23,
  inputs,
  title: 'Crab Cups',
}

export default day23
