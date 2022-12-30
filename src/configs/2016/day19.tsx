import inputs from '../../inputs/2016/day19'
import { DayConfig } from '../../routes/Day'
import DLL from '../../utils/DLL'

interface Elf {
  giftCount: number
  position: number
}

export const doTheBadWhiteElephant = (inputKey: string) => {
  const elfCount = parseInt(inputs.get(inputKey)!)
  const circle = new DLL<Elf>()

  for (let i = 1; i <= elfCount; i++) {
    circle.push({
      giftCount: 1,
      position: i,
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
    answer1: currentElf?.value.position,
  }
}

export const doTheBadWhiteElephant_v2 = (inputKey: string) => {
  const elfCount = parseInt(inputs.get(inputKey)!)
  const circle = new DLL<Elf>()

  for (let i = 1; i <= elfCount; i++) {
    circle.push({
      giftCount: 1,
      position: i,
    })
  }

  let currentElf = circle.head
  const stealFromCount = Math.floor(circle.length / 2)
  let stealFrom = currentElf
  for (let i = 0; i < stealFromCount; i++)
    if (stealFrom && stealFrom.next) stealFrom = stealFrom.next

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

  return {
    answer2: currentElf?.value.position,
  }
}

const day19: Omit<DayConfig, 'year'> = {
  answer1Text: 'The elf in position answer gets all the presents.',
  answer2Text: 'The elf in position answer gets all the presents.',
  buttons: [
    {
      label: 'Do the Bad White Elephant',
      onClick: doTheBadWhiteElephant,
    },
    {
      label: 'Do the Bad White Elephant, v2',
      onClick: doTheBadWhiteElephant_v2,
    },
  ],
  id: 19,
  inputs,
  title: 'An Elephant Named Joseph',
}

export default day19
