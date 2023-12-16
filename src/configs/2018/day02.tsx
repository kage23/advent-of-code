import inputs from '../../inputs/2018/day02'
import { DayConfig } from '../../routes/Day'

export const findChecksum = (input: string) => {
  const boxIDs = input.split('\n')
  let twoCount = 0
  let threeCount = 0
  boxIDs.forEach((boxID) => {
    const letterCounts: { [key: string]: number } = {}
    let twos = false
    let threes = false
    boxID.split('').forEach((letter) => {
      if (!letterCounts[letter]) letterCounts[letter] = 1
      else letterCounts[letter]++
    })
    for (const letter in letterCounts) {
      if (letterCounts[letter] === 2) twos = true
      if (letterCounts[letter] === 3) threes = true
      if (twos && threes) break
    }
    if (twos) twoCount++
    if (threes) threeCount++
  })
  return {
    answer1: twoCount * threeCount,
  }
}

export const findCommonLetters = (input: string) => {
  const boxIDs = input.split('\n')
  const n = boxIDs.length
  const l = boxIDs[0].length
  for (const boxID of boxIDs) {
    for (let i = 0; i < n; i++) {
      const searchBoxID = boxIDs[i]
      if (searchBoxID !== boxID) {
        let diffs = 0
        for (let j = 0; j < l; j++) {
          if (boxID[j] !== searchBoxID[j]) diffs++
          if (diffs > 1) break
        }
        if (diffs === 1) {
          return {
            answer2: [boxID, searchBoxID].reduce((a, b) => {
              let result = ''
              const n = a.length

              for (let i = 0; i < n; i++) if (a[i] === b[i]) result += a[i]

              return result
            }),
          }
        }
      }
    }
  }
}

const day02: Omit<DayConfig, 'year'> = {
  answer1Text: 'The checksum is answer.',
  answer2Text: 'The common letters are answer.',
  buttons: [
    {
      label: 'Find Checksum',
      onClick: findChecksum,
    },
    {
      label: 'Find Common Letters',
      onClick: findCommonLetters,
    },
  ],
  id: 2,
  inputs,
  title: 'Inventory Management System',
}

export default day02
