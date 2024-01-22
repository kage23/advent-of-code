import inputs from '../../inputs/2022/day13'
import { DayConfig } from '../../routes/Day'

type Item = number | Item[] | undefined

const isPairSorted = (a: Item, b: Item): boolean | undefined => {
  if (a === undefined) return b === undefined ? undefined : false
  // Right side ran out of items
  if (b === undefined) return false
  if (typeof a === typeof b) {
    if (typeof a === 'number') {
      return a === b ? undefined : a < b!
    }
    for (let i = 0; i < a.length; i++) {
      const subA = a[i]
      const subB = (b as Item[])[i]
      const subSort = isPairSorted(subA, subB)
      if (subSort !== undefined) return subSort
    }
    // Left side ran out of items
    if (a.length < (b as Item[]).length) return true
  } else {
    if (typeof a === 'number') return isPairSorted([a], b)
    return isPairSorted(a, [b])
  }
}

export const examinePairs = (input: string) => {
  const pairs = input.split('\n\n')

  return {
    answer1: pairs.reduce((accumulator, pair, index) => {
      const [a, b] = pair.split('\n').map(x => JSON.parse(x) as Item)
      return isPairSorted(a, b) ? accumulator + (index + 1) : accumulator
    }, 0)
  }
}

export const sortPackets = (input: string) => {
  const packets = input
    .split('\n')
    .filter(x => x.length)

  // Add the divider packets
  packets.push('[[2]]')
  packets.push('[[6]]')

  // Sort them all
  packets.sort((a, b) => {
    const sorted = isPairSorted(JSON.parse(a), JSON.parse(b))
    if (sorted === undefined) return 0
    return sorted ? -1 : 1
  })

  // Find the divider packets
  const dividerTwoIndex = packets.indexOf('[[2]]') + 1
  const dividerSixIndex = packets.indexOf('[[6]]') + 1

  return {
    answer2: (dividerTwoIndex * dividerSixIndex)
  }
}

const day13: Omit<DayConfig, 'year'> = {
  answer1Text: 'The sum of the sorted indices is answer.',
  answer2Text: 'The decoder key is answer.',
  buttons: [
    {
      label: 'Examine Pairs',
      onClick: examinePairs
    },
    {
      label: 'Sort All the Packets',
      onClick: sortPackets
    },
  ],
  id: 13,
  inputs,
  title: 'Distress Signal',
}

export default day13
