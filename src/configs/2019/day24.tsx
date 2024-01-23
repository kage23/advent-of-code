import inputs from '../../inputs/2019/day24'
import { DayConfig } from '../../routes/Day'

const EMPTY_FIELD = '............?............'
const SIZE = 5

let field = ''
let minutes = 0
const statesSeen: Map<string, true> = new Map()
let fieldPart2: Map<number, string> = new Map()

export const reset = (input: string) => {
  field = input.split('\n').join('')
  minutes = 0
  statesSeen.clear()
  fieldPart2.clear()
}

const getXYFromIndex = (index: number): [number, number] => {
  const x = index % SIZE
  const y = Math.floor(index / SIZE)
  return [x, y]
}

const getIndexFromXY = ([x, y]: [number, number]): number => y * SIZE + x

const countAdjacentBugs = (
  index: number,
  part2?: boolean,
  level?: number
): number => {
  const [x, y] = getXYFromIndex(index)
  if (part2) {
    if (level === undefined) throw new Error('fuck')
    const adjacents = [
      [x - 1, y],
      [x + 1, y],
      [x, y - 1],
      [x, y + 1],
    ].reduce((list, [ax, ay]) => {
      if (ax < 0) {
        list.push([1, 2, level - 1])
      } else if (ax >= SIZE) {
        list.push([3, 2, level - 1])
      } else if (ay < 0) {
        list.push([2, 1, level - 1])
      } else if (ay >= SIZE) {
        list.push([2, 3, level - 1])
      } else if (ax === 2 && ay === 2) {
        if (x === 2 && y === 1) {
          list.push([0, 0, level + 1])
          list.push([1, 0, level + 1])
          list.push([2, 0, level + 1])
          list.push([3, 0, level + 1])
          list.push([4, 0, level + 1])
        } else if (x === 1 && y === 2) {
          list.push([0, 0, level + 1])
          list.push([0, 1, level + 1])
          list.push([0, 2, level + 1])
          list.push([0, 3, level + 1])
          list.push([0, 4, level + 1])
        } else if (x === 3 && y === 2) {
          list.push([4, 0, level + 1])
          list.push([4, 1, level + 1])
          list.push([4, 2, level + 1])
          list.push([4, 3, level + 1])
          list.push([4, 4, level + 1])
        } else if (x === 2 && y === 3) {
          list.push([0, 4, level + 1])
          list.push([1, 4, level + 1])
          list.push([2, 4, level + 1])
          list.push([3, 4, level + 1])
          list.push([4, 4, level + 1])
        }
      } else {
        list.push([ax, ay, level])
      }

      return list
    }, [] as [number, number, number][])

    return adjacents.filter(([ax, ay, az]) => {
      const fieldLevel = fieldPart2.get(az)
      if (!fieldLevel) return false
      return fieldLevel.charAt(getIndexFromXY([ax, ay])) === '#'
    }).length
  } else {
    const adjacents = [
      [x - 1, y],
      [x + 1, y],
      [x, y - 1],
      [x, y + 1],
    ]
    return adjacents.filter(([ax, ay]) => {
      if (ax < 0 || ax >= SIZE || ay < 0 || ay >= SIZE) return false
      return field.charAt(getIndexFromXY([ax, ay])) === '#'
    }).length
  }
}

const advanceOneMinute = (inField: string, part2?: boolean, level?: number) => {
  const { length } = inField
  let newField = ''

  for (let i = 0; i < length; i++) {
    if (part2 && i === 12) {
      newField += '?'
    } else {
      const char = inField.charAt(i)
      const adjacentBugCount = countAdjacentBugs(i, part2, level)
      if (char === '#') {
        if (adjacentBugCount === 1) newField += '#'
        else newField += '.'
      }
      if (char === '.') {
        if (adjacentBugCount === 1 || adjacentBugCount === 2) newField += '#'
        else newField += '.'
      }
    }
  }

  return newField
}

const renderField = (inField: string) => {
  let render = ''
  const { length } = inField
  for (let i = 0; i < length; i++) {
    const char = inField.charAt(i)
    const [x, y] = getXYFromIndex(i)
    if (x % SIZE === 0 && y !== 0) render += '\n'
    render += char
  }
  return render
}

const oneMinuteAdvance = () => {
  field = advanceOneMinute(field)

  minutes++

  return {
    specialRender: () => (
      <>
        <h3>Minutes passed: {minutes}</h3>
        <pre>{renderField(field)}</pre>
      </>
    ),
  }
}

const calculateBiodiversity = (): number =>
  field.split('').reduce((rating, char, index) => {
    if (char === '#') {
      return rating + Math.pow(2, index)
    } else return rating
  }, 0)

export const advanceUntilRepeat = () => {
  while (!statesSeen.get(field)) {
    statesSeen.set(field, true)
    field = advanceOneMinute(field)
  }

  return {
    answer1: calculateBiodiversity(),
  }
}

export const reset2 = (input: string) => {
  field = input.split('\n').join('')
  field = `${field.slice(0, 12)}?${field.slice(13)}`
  minutes = 0
  fieldPart2.clear()
  fieldPart2.set(0, field)
}

const advanceOneMinutePart2 = () => {
  const newFieldPart2: Map<number, string> = new Map()
  const levels = Array.from(fieldPart2.keys()).sort((a, b) => a - b)
  levels.unshift(levels[0] - 1)
  levels.push(levels[levels.length - 1] + 1)
  for (let i = 0; i < levels.length; i++) {
    const level = levels[i]
    const fieldLevel = fieldPart2.get(level) || EMPTY_FIELD
    if (fieldLevel === EMPTY_FIELD) fieldPart2.set(level, fieldLevel)
    const newFieldLevel = advanceOneMinute(fieldLevel, true, level)
    newFieldPart2.set(level, newFieldLevel)
  }
  fieldPart2 = newFieldPart2
}

const countTotalBugs = (): number =>
  Array.from(fieldPart2.values()).reduce(
    (totalCount, localField) =>
      totalCount +
      localField.split('').filter((x, i) => x === '#' && i !== 12).length,
    0
  )

const oneMinuteAdvance2 = () => {
  advanceOneMinutePart2()

  minutes++

  return {
    answer2: countTotalBugs(),
  }
}

export const advanceTo200 = (_: string, time = 200) => {
  while (minutes < time) {
    advanceOneMinutePart2()

    minutes++
  }

  return {
    answer2: countTotalBugs(),
  }
}

const day24: Omit<DayConfig, 'year'> = {
  answer1Text: 'The biodiversity rating of the field is answer.',
  answer2Text: 'There are currently answer bugs present.',
  buttons: [
    {
      label: 'Reset',
      onClick: reset,
    },
    {
      label: 'Advance One Minute',
      onClick: oneMinuteAdvance,
    },
    {
      label: 'Advance Until Repeat',
      onClick: advanceUntilRepeat,
    },
    {
      label: 'Reset for Part Two',
      onClick: reset2,
    },
    {
      label: 'Advance One Minute, Part 2',
      onClick: oneMinuteAdvance2,
    },
    {
      label: 'Advance to 10 Minutes, Part 2',
      onClick: () => advanceTo200('', 10),
    },
    {
      label: 'Advance to 200 Minutes, Part 2',
      onClick: advanceTo200,
    },
  ],
  id: 24,
  inputs,
  title: 'Planet of Discord',
}

export default day24
