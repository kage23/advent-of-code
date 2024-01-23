import inputs from '../../inputs/2023/day12'
import { DayConfig } from '../../routes/Day'

const solvedMap: Map<string, number> = new Map()

const isFieldGood = (field: string, numbers: string) => {
  const springs = field.match(/#+/g) || []
  const springNumbers = springs.map((x) => x.length).join(',')
  return springNumbers === numbers
}

const countArrangements = (line: string) => {
  const [field, numbers] = line.split(' ')
  const possibleFields: string[] = []
  const unknownIndexes = field.split('').reduce((list, char, i) => {
    if (char === '?') list.push(i)
    return list
  }, [] as number[])

  for (let i = 0; i < Math.pow(2, unknownIndexes.length); i++) {
    const binary = i.toString(2).padStart(unknownIndexes.length, '0')
    let newField = ''
    field.split('').forEach((x, idx) => {
      if (x === '?') {
        const binIndex = unknownIndexes.findIndex((y) => y === idx)
        newField += binary.charAt(binIndex) === '1' ? '#' : '.'
      } else {
        newField += x
      }
    })
    possibleFields.push(newField)
  }

  let goodFieldsCount = 0

  possibleFields.forEach((possibleField) => {
    if (isFieldGood(possibleField, numbers)) goodFieldsCount++
  })

  return goodFieldsCount
}

const unfoldLine = (line: string) => {
  const [field, numbers] = line.split(' ')
  const newField = [field, field, field, field, field].join('?')
  const newNumbers = [numbers, numbers, numbers, numbers, numbers].join(',')
  return [newField, newNumbers].join(' ')
}

const countArrangementsBetter = (line: string): number => {
  if (solvedMap.has(line)) return solvedMap.get(line)!

  const [field, numbers] = line.split(' ')
  const numberList = numbers.split(',').map(Number)

  let result = 0

  if (field.length === 0) {
    result = numbers.length === 0 ? 1 : 0
  } else if (field.charAt(0) === '.') {
    result = countArrangementsBetter(line.slice(1))
  } else if (field.charAt(0) === '?') {
    result =
      countArrangementsBetter(`.${line.slice(1)}`) +
      countArrangementsBetter(`#${line.slice(1)}`)
  } else if (field.charAt(0) === '#') {
    const newNumbers = [...numberList]
    const currentNumber = newNumbers.shift()!
    const group = field.match(/[#?]+/)![0]
    if (group.length === currentNumber) {
      result = countArrangementsBetter(
        [field.slice(currentNumber), newNumbers.join(',')].join(' ')
      )
    } else if (group.length > currentNumber) {
      if (group.charAt(currentNumber) === '?') {
        result = countArrangementsBetter(
          [`.${field.slice(currentNumber + 1)}`, newNumbers.join(',')].join(' ')
        )
      }
    }
  }

  solvedMap.set(line, result)
  return result
}

export const findSpringArrangements = (input: string) => ({
  answer1: input
    .split('\n')
    .reduce((sum, line) => sum + countArrangements(line), 0),
})

export const findSpringArrangementsBetter = (input: string) => ({
  answer1: input
    .split('\n')
    .reduce((sum, line) => sum + countArrangementsBetter(line), 0),
})

export const findMoreSpringArrangements = (input: string) => ({
  answer2: input
    .split('\n')
    .map(unfoldLine)
    .reduce((sum, line) => sum + countArrangementsBetter(line), 0),
})

const day12: Omit<DayConfig, 'year'> = {
  answer1Text: 'The sum of the different arrangements of springs is answer.',
  answer2Text:
    'The sum of the shortest paths between all galaxies when super-expanded is answer.',
  buttons: [
    {
      label: 'Find Spring Arrangements',
      onClick: findSpringArrangements,
    },
    {
      label: 'Find Spring Arrangements Better',
      onClick: findSpringArrangementsBetter,
    },
    {
      label: 'Find More Spring Arrangements',
      onClick: findMoreSpringArrangements,
    },
  ],
  id: 12,
  inputs,
  title: 'Hot Springs',
}

export default day12
