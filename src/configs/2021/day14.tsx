import inputs from '../../inputs/2021/day14'
import { DayConfig } from '../../routes/Day'

// const polymerize = (polymer: string, rulesMap: Map<string, string>): string =>
//   polymer.split('').reduce((poly, char, i, polyArray) => {
//     const pair = polyArray.slice(i, i + 2).join('')
//     const newText = `${char}${rulesMap.get(pair) || ''}`
//     return `${poly}${newText}`
//   }, '')

// const getPolymerHashsum = (polymer: string): number => {
//   const charCount: Map<string, number> = new Map()
//   polymer.split('').forEach(char => {
//     const count = charCount.get(char) || 0
//     charCount.set(char, count + 1)
//   })
//   return Math.max(...charCount.values()) - Math.min(...charCount.values())
// }

const getInitialPairsCount = (polymer: string): Map<string, number> => {
  const pairs = polymer.split('').reduce((pairList, char, i, polyArr) => {
    const pair = polyArr.slice(i, i + 2).join('')
    pairList.push(pair)

    return pairList
  }, [] as string[])
  const countMap: Map<string, number> = new Map()
  pairs.forEach(pair => {
    const count = countMap.get(pair) || 0
    countMap.set(pair, count + 1)
  })
  return countMap
}

const polymerizeEfficiently = (pairsCount: Map<string, number>, rulesMap: Map<string, string>) => {
  const newPairCountMap: Map<string, number> = new Map()
  pairsCount.forEach((count, pair) => {
    const insertion = rulesMap.get(pair)
    if (insertion !== undefined) {
      const newPairA = `${pair.charAt(0)}${insertion}`
      const newPairACount = newPairCountMap.get(newPairA) || 0
      newPairCountMap.set(newPairA, count + newPairACount)
      const newPairB = `${insertion}${pair.charAt(1)}`
      const newPairBCount = newPairCountMap.get(newPairB) || 0
      newPairCountMap.set(newPairB, count + newPairBCount)
    }
  })
  return newPairCountMap
}

const analyzePairsCount = (pairsCount: Map<string, number>, polymer: string) => {
  const lettersCount: Map<string, number> = new Map()

  pairsCount.forEach((count, pair) => {
    const letter = pair.charAt(0)
    const letterCount = lettersCount.get(letter) || 0
    lettersCount.set(letter, letterCount + count)
  })

  const finalLetterCount = lettersCount.get(polymer.charAt(polymer.length - 1)) || 0
  lettersCount.set(polymer.charAt(polymer.length - 1), finalLetterCount + 1)

  return (Math.max(...lettersCount.values()) - Math.min(...lettersCount.values()))
}

export const polymerizeTenTimes = (input: string) => {
  const [polymer, rules] = input.split('\n\n')
  const rulesMap = rules.split('\n').reduce((ruleMap, rule) => {
    const [insertPair, insertion] = rule.split(' -> ')
    ruleMap.set(insertPair, insertion)
    return ruleMap
  }, new Map<string, string>())

  let pairsCount = getInitialPairsCount(polymer)

  for (let i = 0; i < 10; i++) {
    // polymer = polymerize(polymer, rulesMap)
    pairsCount = polymerizeEfficiently(pairsCount, rulesMap)
  }

  return {
    // answer1: getPolymerHashsum(polymer)
    answer1: analyzePairsCount(pairsCount, polymer)
  }
}

export const polymerizeFortyTimes = (input: string) => {
  const [polymer, rules] = input.split('\n\n')
  const rulesMap = rules.split('\n').reduce((ruleMap, rule) => {
    const [insertPair, insertion] = rule.split(' -> ')
    ruleMap.set(insertPair, insertion)
    return ruleMap
  }, new Map<string, string>())

  let pairsCount = getInitialPairsCount(polymer)

  for (let i = 0; i < 40; i++) {
    pairsCount = polymerizeEfficiently(pairsCount, rulesMap)
  }

  return {
    answer2: analyzePairsCount(pairsCount, polymer)
  }
}

const day14: Omit<DayConfig, 'year'> = {
  answer1Text: 'After ten steps, the hashsum for the polymer is answer.',
  answer2Text: 'After forty steps, the hashsum for the polymer is answer.',
  buttons: [
    {
      label: 'Polymerize Ten Times',
      onClick: polymerizeTenTimes
    },
    {
      label: 'Polymerize Forty Times',
      onClick: polymerizeFortyTimes
    }
  ],
  id: 14,
  inputs,
  title: 'Extended Polymerization',
}

export default day14
