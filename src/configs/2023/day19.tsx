import inputs from '../../inputs/2023/day19'
import { DayConfig } from '../../routes/Day'

enum Category {
  x = 'x',
  m = 'm',
  a = 'a',
  s = 's',
}

interface Part {
  [Category.x]: number
  [Category.m]: number
  [Category.a]: number
  [Category.s]: number
}

interface Rule {
  category?: Category
  comparison?: '>' | '<'
  value?: number
  result: string
}

const getRule = (input: string): Rule => {
  const inputSplit = input.split(':')
  if (inputSplit.length === 1) return { result: input }

  const category =
    input.charAt(0) === 'x'
      ? Category.x
      : input.charAt(0) === 'm'
      ? Category.m
      : input.charAt(0) === 'a'
      ? Category.a
      : Category.s
  const comparison = input.charAt(1) as '>' | '<'
  const value = Number(inputSplit[0].slice(2))

  return {
    category,
    comparison,
    value,
    result: inputSplit[1],
  }
}

const evaluatePart = (part: Part, workflows: Map<string, Rule[]>) => {
  let workflow = workflows.get('in')!
  let result = ''
  while (result !== 'A' && result !== 'R') {
    rulesLoop: for (let i = 0; i < workflow.length; i++) {
      const rule = workflow[i]
      if (rule.comparison === undefined) {
        result = rule.result
        if (result !== 'A' && result !== 'R') workflow = workflows.get(result)!
        break rulesLoop
      }
      const partValue =
        rule.category === 'x'
          ? part.x
          : rule.category === 'm'
          ? part.m
          : rule.category === 'a'
          ? part.a
          : part.s
      if (
        (rule.comparison === '>' && partValue > rule.value!) ||
        (rule.comparison === '<' && partValue < rule.value!)
      ) {
        result = rule.result
        if (result !== 'A' && result !== 'R') workflow = workflows.get(result)!
        break rulesLoop
      }
    }
  }
  return result === 'A'
}

export const sortPartsSlowly = (input: string) => {
  const workflows: Map<string, Rule[]> = new Map()
  input
    .split('\n\n')[0]
    .split('\n')
    .forEach((line) => {
      const [id, rest] = line.split('{')
      const rules = rest.slice(0, -1).split(',').map(getRule)
      workflows.set(id, rules)
    })

  const parts = input
    .split('\n\n')[1]
    .split('\n')
    .map((line) => {
      const part = {} as Part
      line
        .slice(1, -1)
        .split(',')
        .forEach((chunk) => {
          const [cat, val] = chunk.split('=')
          if (cat === 'x') part.x = Number(val)
          if (cat === 'm') part.m = Number(val)
          if (cat === 'a') part.a = Number(val)
          if (cat === 's') part.s = Number(val)
        })
      return part
    })

  return {
    answer1: parts
      .filter((part) => evaluatePart(part, workflows))
      .reduce((sum, part) => sum + part.x + part.m + part.a + part.s, 0),
  }
}

interface Combo {
  count: number
  workflow: Rule[]
}

export const figureOutGoodCombos = (input: string) => {
  const workflows: Map<string, Rule[]> = new Map()
  input
    .split('\n\n')[0]
    .split('\n')
    .forEach((line) => {
      const [id, rest] = line.split('{')
      const rules = rest.slice(0, -1).split(',').map(getRule)
      workflows.set(id, rules)
    })

  let winners = 0
  let workflow = workflows.get('in')!
  const queue: Combo[] = []
  rulesLoop: for (let i = 0; i < workflow.length; i++) {
    const rule = workflow[i]
  }
}

const day19: Omit<DayConfig, 'year'> = {
  answer1Text: 'The good parts total value is answer.',
  answer2Text:
    'There are answer distinct combinations of ratings that will be accepted.',
  buttons: [
    {
      label: 'Sort Parts Slowly',
      onClick: sortPartsSlowly,
    },
    {
      label: 'Figure Out Good Combos',
      onClick: figureOutGoodCombos,
    },
  ],
  id: 19,
  inputs,
  title: 'Aplenty',
}

export default day19
