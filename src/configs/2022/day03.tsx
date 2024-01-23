import inputs from '../../inputs/2022/day03'
import { DayConfig } from '../../routes/Day'

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

export const analyzeRucksackContents = (input: string) => ({
  answer1: input.split('\n').reduce((sum, rucksack) => {
    const sharedItem = findSharedItem(rucksack)
    return sum + getItemPriority(sharedItem!)
  }, 0)
})

export const analyzeElfGroupBadgePriorities = (input: string) => {
  const rucksacks = input.split('\n')
  const elfGroups: string[][] = []
  let group: string[] = []
  for (let i = 0; i < rucksacks.length; i++) {
    group.push(rucksacks[i])
    if (i % 3 === 2) {
      elfGroups.push([...group])
      group = []
    }
  }

  return {
    answer2: elfGroups.reduce((p, elfGroup) => {
      const sharedItem = elfGroup[0].split('').find(
        x => elfGroup[1].includes(x) && elfGroup[2].includes(x)
      )
      return p + getItemPriority(sharedItem!)
    }, 0)
  }
}

const day03: Omit<DayConfig, 'year'> = {
  answer1Text: 'The shared-item-type priorities total answer points.',
  answer2Text: 'The elf-groups priorities total answer points.',
  buttons: [
    {
      label: 'Analyze Rucksack Contents',
      onClick: analyzeRucksackContents
    },
    {
      label: 'Analyze Elf-Group Badge Priorities',
      onClick: analyzeElfGroupBadgePriorities
    },
  ],
  id: 3,
  inputs,
  title: 'Rucksack Reorganization',
}

export default day03
