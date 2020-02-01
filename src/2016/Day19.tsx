import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'

import DLL from '../utils/DLL'

import INPUT from './Input/Day19'

const doTheBadWhiteElephant = (inputKey: string): { answer1: string } => {
  const elfCount = parseInt(INPUT[inputKey])
  const circle = new DLL()

  for (let i = 1; i <= elfCount; i++) {
    circle.push({
      giftCount: 1,
      position: i
    })
  }

  let currentElf = circle.head
  while (circle.length > 1) {
    if (currentElf && currentElf.next) {
      currentElf.value.giftCount += currentElf.next.value.giftCount
      circle.removeNode(currentElf.next)
      currentElf = currentElf.next
    }
  }

  return {
    answer1: currentElf ? currentElf.value.position.toString() : ''
  }
}

const doTheBadWhiteElephant_v2 = (inputKey: string): { answer2?: string } => {
  const elfCount = parseInt(INPUT[inputKey])
  const circle = new DLL()

  const startTime = new Date().getTime()

  for (let i = 1; i <= elfCount; i++) {
    circle.push({
      giftCount: 1,
      position: i
    })
  }

  let currentElf = circle.head
  const stealFromCount = Math.floor(circle.length / 2)
  let stealFrom = currentElf
  for (let i = 0; i < stealFromCount; i++)
    if (stealFrom && stealFrom.next) stealFrom = stealFrom.next

  searchLoop:
  while (circle.length > 1) {
    if (currentElf && stealFrom) {
      currentElf.value.giftCount += stealFrom.value.giftCount
      circle.removeNode(stealFrom)
      if (currentElf.next) currentElf = currentElf.next
      if (circle.length % 2 === 0) {
        // Advance stealFrom by two
        if (stealFrom && stealFrom.next) stealFrom = stealFrom.next
        if (stealFrom && stealFrom.next) stealFrom = stealFrom.next
      } else {
        // Advance stealFrom by one
        if (stealFrom && stealFrom.next) stealFrom = stealFrom.next
      }
    }
  }

  console.log(`Total time: ${new Date().getTime() - startTime}`)

  return {
    answer2: currentElf ? currentElf.value.position.toString() : ''
  }
}


const BUTTONS: IButton[] = [
  {
    label: 'Do the Bad White Elephant',
    onClick: doTheBadWhiteElephant
  },
  {
    label: 'Do the Bad White Elephant, v2',
    onClick: doTheBadWhiteElephant_v2
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The elf in position <code>{answer}</code> gets all the presents.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      The elf in position <code>{answer}</code> gets all the presents.
    </span>
  ),
  buttons: BUTTONS,
  day: 19,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'An Elephant Named Joseph'
}

export default config