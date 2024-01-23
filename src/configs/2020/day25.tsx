import inputs from '../../inputs/2020/day25'
import { DayConfig } from '../../routes/Day'

const calculateEncryptionKey = (loopSize: number, subject: number): number => {
  let value = 1
  for (let i = 0; i < loopSize; i++) {
    value *= subject
    value = value % 20201227
  }
  return value
}

const findLoopSize = (publicKey: number, subject: number): number => {
  let value = 1
  let loopCount = 0
  while (value !== publicKey) {
    value *= subject
    value = value % 20201227
    loopCount++
  }
  return loopCount
}

export const hackDoor = (input: string) => {
  const [cardPublic, doorPublic] = input.split('\n').map(x => parseInt(x))

  const doorLoopSize = findLoopSize(doorPublic, 7)

  return {
    answer1: calculateEncryptionKey(doorLoopSize, cardPublic)
  }
}

const day25: Omit<DayConfig, 'year'> = {
  answer1Text: `The door's encryption key is answer.`,
  answer2Text: '',
  buttons: [
    {
      label: 'Hack Door',
      onClick: hackDoor
    },
  ],
  id: 25,
  inputs,
  title: 'Combo Breaker',
}

export default day25
