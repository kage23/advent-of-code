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
  const queue = [['in', 1, 4000, 1, 4000, 1, 4000, 1, 4000, 0].join(',')]
  let winners = BigInt(0)
  queueLoop:
  while (queue.length) {
    const state = queue.shift()!.split(',')
    const workflowId = state.shift()!
    const [xMin, xMax, mMin, mMax, aMin, aMax, sMin, sMax, ruleId] = state.map(Number)
    if (workflowId === 'A') {
      winners += BigInt((xMax - xMin + 1) * (mMax - mMin + 1) * (aMax - aMin + 1) * (sMax - sMin + 1))
      continue queueLoop
    } else if (workflowId === 'R') continue queueLoop
    const rule = workflows.get(workflowId)![ruleId]
    if (!rule.category || !rule.comparison || !rule.value) {
      if (rule.result === 'A') {
        winners += BigInt((xMax - xMin + 1) * (mMax - mMin + 1) * (aMax - aMin + 1) * (sMax - sMin + 1))
        continue queueLoop
      } else if (rule.result === 'R') continue queueLoop
      else {
        queue.push([rule.result, xMin, xMax, mMin, mMax, aMin, aMax, sMin, sMax, 0].join(','))
        continue queueLoop
      }
    } else {
      // Evaluate the rule
      const range = rule.category === 'x' ? [xMin, xMax] : rule.category === 'm' ? [mMin, mMax] : rule.category === 'a' ? [aMin, aMax] : [sMin, sMax]
      comparisonSwitch:
      switch (rule.comparison) {
        case '<': {
          if (range[0] < rule.value) {
            queue.push([
              rule.result,
              xMin,
              rule.category === 'x' ? Math.min(xMax, rule.value - 1) : xMax,
              mMin,
              rule.category === 'm' ? Math.min(mMax, rule.value - 1) : mMax,
              aMin,
              rule.category === 'a' ? Math.min(aMax, rule.value - 1) : aMax,
              sMin,
              rule.category === 's' ? Math.min(sMax, rule.value - 1) : sMax,
              0
            ].join(','))
          }
          if (range[1] >= rule.value) {
            queue.push([
              workflowId,
              rule.category === 'x' ? Math.max(xMin, rule.value) : xMin,
              xMax,
              rule.category === 'm' ? Math.max(mMin, rule.value) : mMin,
              mMax,
              rule.category === 'a' ? Math.max(aMin, rule.value) : aMin,
              aMax,
              rule.category === 's' ? Math.max(sMin, rule.value) : sMin,
              sMax,
              ruleId + 1
            ].join(','))
          }
          break comparisonSwitch
        }
        case '>': {
          if (range[0] <= rule.value) {
            queue.push([
              workflowId,
              xMin,
              rule.category === 'x' ? Math.min(xMax, rule.value) : xMax,
              mMin,
              rule.category === 'm' ? Math.min(mMax, rule.value) : mMax,
              aMin,
              rule.category === 'a' ? Math.min(aMax, rule.value) : aMax,
              sMin,
              rule.category === 's' ? Math.min(sMax, rule.value) : sMax,
              ruleId + 1
            ].join(','))
          }
          if (range[1] > rule.value) {
            queue.push([
              rule.result,
              rule.category === 'x' ? Math.max(xMin, rule.value + 1) : xMin,
              xMax,
              rule.category === 'm' ? Math.max(mMin, rule.value + 1) : mMin,
              mMax,
              rule.category === 'a' ? Math.max(aMin, rule.value + 1) : aMin,
              aMax,
              rule.category === 's' ? Math.max(sMin, rule.value + 1) : sMin,
              sMax,
              0
            ].join(','))
          }
          break comparisonSwitch
        }
      }
      continue queueLoop
    }
  }
  return { answer2: winners.toString() }
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
