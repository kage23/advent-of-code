import inputs from '../../inputs/2020/day07'
import { DayConfig } from '../../routes/Day'

interface IRule {
  bagColor: string
  contents: {
    bagColor: string
    count: number
  }[]
  possibleParents: IRule[]
}

const analyzeRule = (rule: string): IRule => {
  const [bagColor, contentsList] = rule.split(' bags contain ')
  const contents: {
    bagColor: string
    count: number
  }[] =
    contentsList === 'no other bags.'
      ? []
      : contentsList.split(', ').map((content) => {
          const count = parseInt(content)
          const bagColorStr = content.split(' bag')[0]
          const bagColor = bagColorStr.slice(bagColorStr.indexOf(' ') + 1)
          return {
            bagColor,
            count,
          }
        })
  return {
    bagColor,
    contents,
    possibleParents: [] as IRule[],
  }
}

const addParentsToRuleSet = (rule: IRule, idx: number, rules: IRule[]) => {
  rule.contents.forEach((bagChild) => {
    rules
      .find(({ bagColor }) => bagColor === bagChild.bagColor)
      ?.possibleParents.push(rule)
  })
}

const countChildBags = (bag: IRule | undefined, rules: IRule[]): number =>
  bag === undefined
    ? 0
    : bag.contents.reduce(
        (totalChildCount, childBag) =>
          totalChildCount +
          childBag.count *
            countChildBags(
              rules.find((ruleBag) => ruleBag.bagColor === childBag.bagColor),
              rules
            ) +
          childBag.count,
        0
      )

export const analyzeRules = (input: string) => {
  const rules = input.split('\n').map(analyzeRule)
  rules.forEach(addParentsToRuleSet)
  const possibleAncestors =
    rules.find(({ bagColor }) => bagColor === 'shiny gold')?.possibleParents ||
    []
  for (let i = 0; i < possibleAncestors.length; i++) {
    possibleAncestors[i].possibleParents.forEach((possibleParent) => {
      if (
        possibleAncestors.find(
          (possibleAncestor) =>
            possibleAncestor.bagColor === possibleParent.bagColor
        ) === undefined
      ) {
        possibleAncestors.push(possibleParent)
      }
    })
  }

  return {
    answer1: possibleAncestors.length,
  }
}

export const countTheChildBags = (input: string) => {
  const rules = input.split('\n').map(analyzeRule)
  rules.forEach(addParentsToRuleSet)

  const shinyGold = rules.find(({ bagColor }) => bagColor === 'shiny gold')
  if (!shinyGold) throw new Error('fuck')

  return {
    answer2: countChildBags(shinyGold, rules),
  }
}

const day07: Omit<DayConfig, 'year'> = {
  answer1Text: 'answer bags can eventually contain your shiny gold bag.',
  answer2Text: 'A single shiny gold bag will contain answer other bags.',
  buttons: [
    {
      label: 'Analyze Rules',
      onClick: analyzeRules,
    },
    {
      label: 'Count Child Bags',
      onClick: countTheChildBags,
    },
  ],
  id: 7,
  inputs,
  title: 'Handy Haversacks',
}

export default day07
