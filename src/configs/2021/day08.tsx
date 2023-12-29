import inputs from '../../inputs/2021/day08'
import { DayConfig } from '../../routes/Day'

const actualSignalCombos = [
  ['AAA', 'BBB', 'CCC', 'EEE', 'FFF', 'GGG'], // 0
  ['CCC', 'FFF'], // 1
  ['AAA', 'CCC', 'DDD', 'EEE', 'GGG'], // 2
  ['AAA', 'CCC', 'DDD', 'FFF', 'GGG'], // 3
  ['BBB', 'CCC', 'DDD', 'FFF'], // 4
  ['AAA', 'BBB', 'DDD', 'FFF', 'GGG'], // 5
  ['AAA', 'BBB', 'DDD', 'EEE', 'FFF', 'GGG'], // 6
  ['AAA', 'CCC', 'FFF'], // 7
  ['AAA', 'BBB', 'CCC', 'DDD', 'EEE', 'FFF', 'GGG'], // 8
  ['AAA', 'BBB', 'CCC', 'DDD', 'FFF', 'GGG'] // 9
]

export const countSomeNumbers = (input: string) => {
  const data = input.split('\n')
  const count = data.reduce((acc, curr) => {
    const [, output] = curr.split(' | ')
    const nums = output.split(' ')
    return acc + nums.filter(n => (
      n.length === 2 || n.length === 3 || n.length === 4 || n.length === 7
    )).length
  }, 0)

  return {
    answer1: count
  }
}

const understandTheSignals = (inputSigs: string[]) => {
  const knownSigs: { [key: string]: string | undefined } = {}
  const sigs = inputSigs
    .map(s => (
      s
        .split('')
        .sort((a, b) => a.localeCompare(b))
        .join('')
    ))
    .sort((a, b) => a.length - b.length)
  // Lengths of sigs: [2, 3, 4, 5, 5, 5, 6, 6, 6, 7]
  // They represent:  [1, 7, 4, ?, ?, ?, ?, ?, ?, 8]

  // Get the AAA signal from the piece in the 7 that's not in the 1
  sigs[1].split('').forEach(letter => {
    if (!sigs[0].includes(letter)) {
      knownSigs[letter] = 'AAA'
    }
  })

  // CCC and FFF are in the 1. We can tell them apart because there are
  // eight numbers that use CCC and nine numbers that use FFF.
  sigs[0].split('').forEach(letter => {
    const letterCount = sigs.filter(sig => sig.includes(letter)).length
    if (letterCount === 8) {
      knownSigs[letter] = 'CCC'
    }
    if (letterCount === 9) {
      knownSigs[letter] = 'FFF'
    }
  })

  // BBB and DDD are in the 4. We can tell them apart because there are
  // six numbers that use BBB and seven numbers that use DDD.
  sigs[2].split('').forEach(letter => {
    if (knownSigs[letter] === undefined) {
      const letterCount = sigs.filter(sig => sig.includes(letter)).length
      if (letterCount === 6) {
        knownSigs[letter] = 'BBB'
      }
      if (letterCount === 7) {
        knownSigs[letter] = 'DDD'
      }
    }
  })

    // EEE and GGG are the only ones left to parse. There are four that
    // use EEE and there are seven that use GGG.
    // EEE is the only one used by four numbers.
    ;['a', 'b', 'c', 'd', 'e', 'f', 'g'].forEach(letter => {
      if (knownSigs[letter] === undefined) {
        const letterCount = sigs.filter(sig => sig.includes(letter)).length
        if (letterCount === 4) {
          knownSigs[letter] = 'EEE'
        }
      }
    })

    // GGG is whichever one remains.
    ;['a', 'b', 'c', 'd', 'e', 'f', 'g'].forEach(letter => {
      if (knownSigs[letter] === undefined) {
        knownSigs[letter] = 'GGG'
      }
    })
  return knownSigs
}

const understandANumber = (
  displayNumber: string,
  knownSigs: { [key: string]: string | undefined }
) => {
  const outputSigArray = displayNumber
    .split('')
    .map(letter => knownSigs[letter] as string)
    .sort((a, b) => a.localeCompare(b))
  const actualDigit = actualSignalCombos.findIndex(actSigCombo =>
    JSON.stringify(actSigCombo) === JSON.stringify(outputSigArray)
  )
  return actualDigit
}

export const addThemAllUp = (input: string) => {
  const data = input.split('\n')
  const total = data.reduce((accTotal, display) => {
    const [signals, output] = display.split(' | ')
    const parsedSignals = understandTheSignals(signals.split(' '))
    const outputNumberString = output.split(' ').reduce((acc, curr) =>
      `${acc}${understandANumber(curr, parsedSignals)}`, ''
    )
    const outputNumber = Number(outputNumberString)
    return accTotal + outputNumber
  }, 0)

  return {
    answer2: total
  }
}

const day08: Omit<DayConfig, 'year'> = {
  answer1Text: 'There are answer 1s, 4s, 7s, and 8s.',
  answer2Text: 'The sum of all the outputs is answer.',
  buttons: [
    {
      label: 'Count the 1s, 4s, 7s, and 8s',
      onClick: countSomeNumbers
    },
    {
      label: 'Add Them All Up',
      onClick: addThemAllUp
    }
  ],
  id: 8,
  inputs,
  title: 'Seven Segment Search',
}

export default day08
