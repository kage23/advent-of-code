import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'
import INPUT from '../Inputs/2020/Day19'

interface IRule {
  id: number
  matches?: string[]
  toMatch: string | number[][]
}

const checkNewValidity = (message: string, matchesFor42: string[], matchesFor31: string[]): boolean => {
  let matchCountFor42 = 0
  let matchCountFor31 = 0

  while (matchesFor42.includes(message.slice(0, matchesFor42[0].length))) {
    matchCountFor42++
    message = message.slice(matchesFor42[0].length)
  }
  while (matchesFor31.includes(message.slice(matchesFor31[0].length * -1))) {
    matchCountFor31++
    message = message.slice(0, message.length - matchesFor31[0].length)
  }

  return matchCountFor42 >= 2 && matchCountFor31 >= 1 && matchCountFor31 < matchCountFor42 && message.length === 0
}

const generateMatchesForRule = (id: number, ruleSet: Map<number, IRule>, inMatches?: string[]): string[] => {
  const matches = inMatches || []
  const rule = ruleSet.get(id)
  if (!rule) throw new Error('fuck')

  if (rule.matches) return rule.matches

  if (typeof rule.toMatch === 'string') {
    matches.push(rule.toMatch)
  } else {
    rule.toMatch.forEach(possibleRule => {
      const matchesForRuleHalves = possibleRule.map(mustMatchRuleId => generateMatchesForRule(mustMatchRuleId, ruleSet))
      if (matchesForRuleHalves.length === 1) {
        matches.push(matchesForRuleHalves[0][0])
      } else {
        matchesForRuleHalves[0].forEach(matchHalf => {
          matchesForRuleHalves[1].forEach(secondHalf => {
            if (matchesForRuleHalves.length === 2) {
              matches.push(`${matchHalf}${secondHalf}`)
            } else {
              matchesForRuleHalves[2].forEach(thirdHalf => {
                matches.push(`${matchHalf}${secondHalf}${thirdHalf}`)
              })
            }
          })
        })
      }
    })
  }

  rule.matches = matches
  return matches
}

const messageStartsWithMatch = (message: string, rule: IRule, ruleMap: Map<number, IRule>): number => {
  if (typeof rule.toMatch === 'string') return message.startsWith(rule.toMatch) ? 1 : 0

  for (let i = 0; i < rule.toMatch.length; i++) {
    let cutCount = 0
    let matchString = message
    const possibleRule = rule.toMatch[i]
    let theyAllPass = true
    for (let j = 0; j < possibleRule.length; j++) {
      const mustMatch = possibleRule[j]
      const subrule = ruleMap.get(mustMatch)
      if (!subrule) throw new Error('fuck')
      const matchLength = messageStartsWithMatch(matchString, subrule, ruleMap)
      if (matchLength > 0) {
        cutCount += matchLength
        matchString = matchString.slice(matchLength)
      } else {
        theyAllPass = false
        break
      }
    }
    if (theyAllPass) return cutCount
  }

  return 0
}

const parseInput = (input: string, correctRules?: boolean): [Map<number, IRule>, string[]] => {
  const [rules, messages] = input.split('\n\n')

  const ruleMap = new Map<number, IRule>()

  rules.split('\n').forEach(rule => {
    let useMatchList = false
    let matchList: number[][] = []
    let [id, match] = rule.split(': ')

    if (correctRules && id === '8') {
      ruleMap.set(8, {
        id: 8,
        toMatch: [[42], [42, 8]]
      })
    } else if (correctRules && id === '11') {
      ruleMap.set(11, {
        id: 11,
        toMatch: [[42, 31], [42, 11, 31]]
      })
    } else {
      if (match.startsWith('"')) {
        match = match.charAt(1)
      } else {
        useMatchList = true
        matchList = match.split(' | ').map(x => x.split(' ').map(x => parseInt(x)))
      }

      ruleMap.set(parseInt(id), {
        id: parseInt(id),
        toMatch: useMatchList ? matchList : match
      })
    }
  })

  return [ruleMap, messages.split('\n')]
}

const BUTTONS: IButton[] = [
  {
    label: 'Check Messages',
    onClick: (inputKey: string) => {
      const [rules, messages] = parseInput(INPUT[inputKey])

      const rule0 = rules.get(0)

      if (!rule0) throw new Error('fuck')

      return {
        answer1: messages.filter(message => (
          messageStartsWithMatch(message, rule0, rules) === message.length
        )).length.toString()
      }
    }
  },
  {
    label: 'Check Messages w/ Corrected Rules',
    onClick: (inputKey: string) => {
      const [rules, messages] = parseInput(INPUT[inputKey], true)

      const matchesFor42 = generateMatchesForRule(42, rules)
      const matchesFor31 = generateMatchesForRule(31, rules)

      return {
        answer2: messages.filter(
          message => checkNewValidity(message, matchesFor42, matchesFor31)
        ).length.toString()
      }
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      <code>{answer}</code> messages match Rule 0.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      After adjusting Rules 8 and 11, <code>{answer}</code> messages match Rule 0.
    </span>
  ),
  buttons: BUTTONS,
  day: 19,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Monster Messages'
}

export default config