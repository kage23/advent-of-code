import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'

import INPUT from '../Inputs/2022/Day03'

const findSharedItem = (rucksack: string) => {
  const halfLength = rucksack.length / 2
  const halfA = rucksack.substring(0, halfLength)
  const halfB = rucksack.substring(halfLength)
  return halfA.split('').find(x => halfB.includes(x))
}

const getItemPriority = (char: string) => {
  const charCode = char.charCodeAt(0)
  if (charCode >= 97) {
    // Lower-case a is 97, so subtract 96 to get the priority 1 - 26
    return charCode - 96
  }
  // Upper-case A is 65, so subtract 38 to get the priority 27 - 52
  return charCode - 38
}

const BUTTONS: IButton[] = [
  {
    label: 'Analyze Rucksack Contents',
    onClick: (inputKey: string) => {
      const rucksacks = INPUT[inputKey].split('\n')

      const priority = rucksacks.reduce((sum, rucksack) => {
        const sharedItem = findSharedItem(rucksack)
        return sum + getItemPriority(sharedItem!)
      }, 0)

      return {
        answer1: priority.toString()
      }
    }
  },
  {
    label: 'Analyze Elf-Group Badge Priorities',
    onClick: (inputKey: string) => {
      const rucksacks = INPUT[inputKey].split('\n')
      const elfGroups: string[][] = []
      let group: string[] = []
      for (let i = 0; i < rucksacks.length; i++) {
        group.push(rucksacks[i])
        if (i % 3 === 2) {
          elfGroups.push([...group])
          group = []
        }
      }
      const priority = elfGroups.reduce((p, elfGroup) => {
        const sharedItem = elfGroup[0].split('').find(
          x => elfGroup[1].includes(x) && elfGroup[2].includes(x)
        )
        return p + getItemPriority(sharedItem!)
      }, 0)

      return {
        answer2: priority.toString()
      }
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The shared-item-type priorities total{' '}
      <code>{answer}</code> points.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      The elf-groups priorities total{' '}
      <code>{answer}</code> points.
    </span>
  ),
  buttons: BUTTONS,
  day: 3,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Rucksack Reorganization'
}

export default config
