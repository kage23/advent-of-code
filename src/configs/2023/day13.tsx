import inputs from '../../inputs/2023/day13'
import { DayConfig } from '../../routes/Day'

const findHorizontalReflection = (rows: string[]) => {
  for (let i = 1; i < rows.length; i++) {
    let isReflection = true
    rowCheck: for (let j = i - 1, k = i; j >= 0 && k < rows.length; j--, k++) {
      if (rows[j] !== rows[k]) {
        isReflection = false
        break rowCheck
      }
    }
    if (isReflection) return i
  }
}

const findHorizontalSmudgedReflection = (rows: string[]) => {
  for (let i = 1; i < rows.length; i++) {
    let differences = 0
    for (let j = i - 1, k = i; j >= 0 && k < rows.length; j--, k++) {
      if (rows[j] !== rows[k]) {
        for (let l = 0; l < rows[j].length; l++) {
          if (rows[j][l] !== rows[k][l]) differences++
        }
      }
    }
    if (differences === 1) return i
  }
}

const findVerticalReflection = (rows: string[]) => {
  for (let i = 1; i < rows[0].length; i++) {
    let isReflection = true
    colCheck: for (
      let j = i - 1, k = i;
      j >= 0 && k < rows[0].length;
      j--, k++
    ) {
      if (
        rows.map((row) => row.charAt(j)).join('') !==
        rows.map((row) => row.charAt(k)).join('')
      ) {
        isReflection = false
        break colCheck
      }
    }
    if (isReflection) return i
  }
}

const findVerticalSmudgedReflection = (rows: string[]) => {
  for (let i = 1; i < rows[0].length; i++) {
    let differences = 0
    for (let j = i - 1, k = i; j >= 0 && k < rows[0].length; j--, k++) {
      const jCol = rows.map((row) => row.charAt(j))
      const kCol = rows.map((row) => row.charAt(k))
      if (jCol.join('') !== kCol.join('')) {
        for (let l = 0; l < jCol.length; l++) {
          if (jCol[l] !== kCol[l]) differences++
        }
      }
    }
    if (differences === 1) return i
  }
}

const findReflection = (
  field: string,
  fieldIndex: number
): { count: number; type: 'v' | 'h' } => {
  // Search for horizontal reflection
  const rows = field.split('\n')
  const hRef = findHorizontalReflection(rows)
  if (hRef) {
    return { count: hRef, type: 'h' }
  }

  // Search for vertical reflection
  const vRef = findVerticalReflection(rows)
  if (vRef) {
    return { count: vRef, type: 'v' }
  }

  throw new Error(`No reflection found in field index ${fieldIndex}:\n${field}`)
}

const findSmudgedReflection = (
  field: string,
  fieldIndex: number
): { count: number; type: 'v' | 'h' } => {
  // Search for horizontal reflection
  const rows = field.split('\n')
  const hRef = findHorizontalSmudgedReflection(rows)
  if (hRef) {
    return { count: hRef, type: 'h' }
  }

  // Search for vertical reflection
  const vRef = findVerticalSmudgedReflection(rows)
  if (vRef) {
    return { count: vRef, type: 'v' }
  }

  throw new Error(`No reflection found in field index ${fieldIndex}:\n${field}`)
}

export const findReflections = (input: string) => ({
  answer1: input.split('\n\n').reduce((sum, field, i) => {
    const { count, type } = findReflection(field, i)
    return sum + (type === 'v' ? count : count * 100)
  }, 0),
})

export const findSmudgedReflections = (input: string) => ({
  answer2: input.split('\n\n').reduce((sum, field, i) => {
    const { count, type } = findSmudgedReflection(field, i)
    return sum + (type === 'v' ? count : count * 100)
  }, 0),
})

const day13: Omit<DayConfig, 'year'> = {
  answer1Text: 'The summary of all the reflections is answer.',
  answer2Text: 'The summary of all the smudged reflections is answer.',
  buttons: [
    {
      label: 'Find the Reflections',
      onClick: findReflections,
    },
    {
      label: 'Find Smudged Reflections',
      onClick: findSmudgedReflections,
    },
  ],
  id: 13,
  inputs,
  title: 'Point of Incidence',
}

export default day13
