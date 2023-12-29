import inputs from '../../inputs/2021/day13'
import { DayConfig } from '../../routes/Day'

interface Field {
  field: Map<string, '#'>
  minX: number
  maxX: number
  minY: number
  maxY: number
}

const initializeField = (dots: string[]): Field => {
  const field: Map<string, '#'> = new Map()

  let minX = Number.MAX_SAFE_INTEGER
  let minY = Number.MAX_SAFE_INTEGER
  let maxX = Number.MIN_SAFE_INTEGER
  let maxY = Number.MIN_SAFE_INTEGER

  dots.forEach(dot => {
    const [x, y] = dot.split(',').map(n => Number(n))
    minX = Math.min(x, minX)
    minY = Math.min(y, minY)
    maxX = Math.max(x, maxX)
    maxY = Math.max(y, maxY)
    field.set(dot, '#')
  })

  return { field, minX, maxX, minY, maxY }
}

const doAFold = (field: Field, fold: string) => {
  const [foldLineDir, foldLineStr] = fold.split('fold along ')[1].split('=')
  const foldLine = Number(foldLineStr)
  field.field.forEach((_, key, map) => {
    const [x, y] = key.split(',').map(n => Number(n))
    switch (foldLineDir) {
      case 'x':
        if (x > foldLine) {
          const diff = x - foldLine
          const newX = foldLine - diff
          map.set(`${newX},${y}`, '#')
          map.delete(key)
          field.maxX = foldLine - 1
        }
        break

      case 'y':
        if (y > foldLine) {
          const diff = y - foldLine
          const newY = foldLine - diff
          map.set(`${x},${newY}`, '#')
          map.delete(key)
          field.maxY = foldLine - 1
        }
        break
    }
  })
}

export const firstFold = (input: string) => {
  const [dots, folds] = input.split('\n\n').map(group => group.split('\n'))
  const field = initializeField(dots)
  doAFold(field, folds[0])

  return {
    answer1: field.field.size
  }
}

const drawTheFieldInConsole = (field: Field) => {
  const { field: actualField, minX, maxX, minY, maxY } = field
  let drawing = ''
  for (let y = minY; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) {
      const value = actualField.get(`${x},${y}`) || ' '
      drawing += value
    }
    drawing += '\n'
  }

  console.log(drawing)
}

export const foldItUp = (input: string) => {
  const [dots, folds] = input.split('\n\n').map(group => group.split('\n'))
  const field = initializeField(dots)
  folds.forEach(fold => {
    doAFold(field, fold)
  })
  drawTheFieldInConsole(field)

  return {
    answer2: ''
  }
}

const day13: Omit<DayConfig, 'year'> = {
  answer1Text: 'There are answer dots after doing the first fold.',
  answer2Text: 'Check your console!!!',
  buttons: [
    {
      label: 'First Fold!',
      onClick: firstFold
    },
    {
      label: 'Fold It Up!',
      onClick: foldItUp
    }
  ],
  id: 13,
  inputs,
  title: 'Transparent Origami',
}

export default day13
