import inputs from '../../inputs/2023/day12'
import { DayConfig } from '../../routes/Day'

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

const unfold = (input: string) =>
  input.split('\n').map((line) => {
    const [field, numbers] = line.split(' ')
    const newField = [field, field, field, field, field].join('?')
    const newNumbers = [numbers, numbers, numbers, numbers, numbers].join(',')
    return [newField, newNumbers].join(' ')
  })

export const findSpringArrangements = (input: string) => ({
  answer1: input
    .split('\n')
    .reduce((sum, line) => sum + countArrangements(line), 0),
})

export const findMoreSpringArrangements = (input: string) => {
  const lines = unfold(input)
  return {
    answer2: lines.reduce((sum, line) => sum + countArrangements(line), 0),
  }
}

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
      label: 'Find More Spring Arrangements',
      onClick: findMoreSpringArrangements,
    },
  ],
  id: 12,
  inputs,
  title: 'Hot Springs',
}

export default day12
