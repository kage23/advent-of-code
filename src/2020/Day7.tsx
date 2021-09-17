import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'

import INPUT from './Input/Day7'

interface IRule {
  bagColor: string
  contents: {
    bagColor: string
    count: number
  }[]
  possibleParents: IRule[]
}

const addParentsToRuleSet = ((rule: IRule, idx: number, rules: IRule[]) => {
  rule.contents.forEach(bagChild => {
    rules.find(({ bagColor }) => bagColor === bagChild.bagColor)?.possibleParents.push(rule)
  })
})

const analyzeRule = (rule: string): IRule => {
  const [bagColor, contentsList] = rule.split(' bags contain ')
  const contents: {
    bagColor: string
    count: number
  }[] = contentsList === 'no other bags.' ? [] : contentsList.split(', ').map(content => {
    const count = parseInt(content)
    const bagColorStr = content.split(' bag')[0]
    const bagColor = bagColorStr.slice(bagColorStr.indexOf(' ') + 1)
    return {
      bagColor,
      count
    }
  })
  return {
    bagColor,
    contents,
    possibleParents: [] as IRule[]
  }
}

const countChildBags = (bag: IRule | undefined, rules: IRule[]): number =>
  bag === undefined ? 0 : bag.contents.reduce((totalChildCount, childBag) =>
    totalChildCount + (childBag.count * countChildBags(
      rules.find(ruleBag => ruleBag.bagColor === childBag.bagColor), rules
    )) + childBag.count,
    0)

const BUTTONS: IButton[] = [
  {
    label: 'Analyze Rules',
    onClick: (inputKey: string) => {
      const rules = INPUT[inputKey].split('\n').map(analyzeRule)
      rules.forEach(addParentsToRuleSet)
      const possibleAncestors = rules.find(({ bagColor }) => bagColor === 'shiny gold')?.possibleParents || []
      for (let i = 0; i < possibleAncestors.length; i++) {
        possibleAncestors[i].possibleParents.forEach(possibleParent => {
          if (
            possibleAncestors.find(
              possibleAncestor => possibleAncestor.bagColor === possibleParent.bagColor
            ) === undefined
          ) {
            possibleAncestors.push(possibleParent)
          }
        })
      }

      return {
        answer1: possibleAncestors.length.toString()
      }
    }
  },
  {
    label: 'Count Child Bags',
    onClick: (inputKey: string) => {
      const rules = INPUT[inputKey].split('\n').map(analyzeRule)
      rules.forEach(addParentsToRuleSet)

      const shinyGold = rules.find(({ bagColor }) => bagColor === 'shiny gold')
      if (!shinyGold) throw new Error('fuck')

      return {
        answer2: countChildBags(shinyGold, rules).toString()
      }
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      <code>{answer}</code> bags can eventually contain your <code>shiny gold</code> bag.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      A single <code>shiny gold</code> bag will contain <code>{answer}</code> other bags.
    </span>
  ),
  buttons: BUTTONS,
  day: 7,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Handy Haversacks'
}

export default config