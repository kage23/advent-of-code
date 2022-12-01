import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'
import INPUT from '../Inputs/2020/Day25'

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

const BUTTONS: IButton[] = [
  {
    label: 'Hack Door',
    onClick: (inputKey: string) => {
      const [cardPublic, doorPublic] = INPUT[inputKey].split('\n').map(x => parseInt(x))

      const doorLoopSize = findLoopSize(doorPublic, 7)

      return {
        answer1: calculateEncryptionKey(doorLoopSize, cardPublic).toString()
      }
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The door's encryption key is <code>{answer}</code>.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      {/* After 100 days, <code>{answer}</code> tiles are black. */}
    </span>
  ),
  buttons: BUTTONS,
  day: 25,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Combo Breaker'
}

export default config