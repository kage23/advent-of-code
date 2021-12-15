import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'

import INPUT from './Input/Day14'

const polymerize = (polymer: string, rulesMap: Map<string, string>): string =>
  polymer.split('').reduce((poly, char, i, polyArray) => {
    const pair = polyArray.slice(i, i + 2).join('')
    const newText = `${char}${rulesMap.get(pair) || ''}`
    return `${poly}${newText}`
  }, '')

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

const getPolymerHashsum = (polymer: string): number => {
  const charCount: Map<string, number> = new Map()
  polymer.split('').forEach(char => {
    const count = charCount.get(char) || 0
    charCount.set(char, count + 1)
  })
  return Math.max(...charCount.values()) - Math.min(...charCount.values())
}

const BUTTONS: IButton[] = [
  {
    label: 'Polymerize Ten Times',
    onClick: (inputKey: string) => {
      let [polymer, rules] = INPUT[inputKey].split('\n\n')
      const rulesMap = rules.split('\n').reduce((ruleMap, rule) => {
        const [insertPair, insertion] = rule.split(' -> ')
        ruleMap.set(insertPair, insertion)
        return ruleMap
      }, new Map<string, string>())

      for (let i = 0; i < 10; i++) {
        polymer = polymerize(polymer, rulesMap)
      }

      return {
        answer1: getPolymerHashsum(polymer).toString()
      }
    }
  },
  {
    label: 'Polymerize Forty Times',
    onClick: (inputKey: string) => {
      const startTime = new Date().getTime()
      let [polymer, rules] = INPUT[inputKey].split('\n\n')
      const rulesMap = rules.split('\n').reduce((ruleMap, rule) => {
        const [insertPair, insertion] = rule.split(' -> ')
        ruleMap.set(insertPair, insertion)
        return ruleMap
      }, new Map<string, string>())

      let pairsCount = getInitialPairsCount(polymer)

      debugger

      for (let i = 0; i < 40; i++) {
        pairsCount = polymerizeEfficiently(pairsCount, rulesMap)
      }

      debugger






      return {
        // answer2: getPolymerHashsum(polymer).toString()
      }
    }
  },
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      After ten steps, the hashsum for the polymer is <code>{answer}</code>.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      After forty steps, the hashsum for the polymer is <code>{answer}</code>.
    </span>
  ),
  buttons: BUTTONS,
  day: 14,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Extended Polymerization'
}

export default config
