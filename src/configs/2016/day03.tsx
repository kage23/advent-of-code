import inputs from '../../inputs/2016/day03'
import { DayConfig } from '../../routes/Day'

const getTrianglePart1 = (input: string): number[] => {
  const regexp = /[\d]+/g
  const sides = input.match(regexp)

  if (sides) return sides.map((x) => parseInt(x))

  return []
}

const getVerticalTriangles = (input: string[]): number[][] => {
  const result: number[][] = []

  if (input.length % 3 !== 0)
    throw new Error(`Something's wrong with this input data.`)

  const inputNumbers = input.map((line) => getTrianglePart1(line))

  for (let col = 0; col < input[0].length; col++) {
    for (let row = 0; row < input.length; row += 3) {
      const triangle = [
        inputNumbers[row][col],
        inputNumbers[row + 1][col],
        inputNumbers[row + 2][col],
      ]

      if (isTriangleValid(triangle)) result.push(triangle)
    }
  }

  return result
}

const isTriangleValid = (input: number[]): boolean => {
  if (input.length !== 3) return false

  return (
    input[0] + input[1] > input[2] &&
    input[0] + input[2] > input[1] &&
    input[1] + input[2] > input[0]
  )
}

export const evaluateTriangles = (input: string) => ({
  answer1: input
    .split('\n')
    .map(getTrianglePart1)
    .filter(isTriangleValid).length,
})

export const evaluateTrianglesVertically = (input: string) => ({
  answer2: getVerticalTriangles(input.split('\n')).length,
})

const day03: Omit<DayConfig, 'year'> = {
  answer1Text:
    'Of the triangles listed, only answer of them are actually possible.',
  answer2Text:
    'Of the triangles listed when you read the list by columns, only answer of them are actually possible.',
  buttons: [
    {
      label: 'Evaluate Triangles',
      onClick: evaluateTriangles,
    },
    {
      label: 'Evaluate Triangles Vertically',
      onClick: evaluateTrianglesVertically,
    },
  ],
  id: 3,
  inputs,
  title: 'Squares With Three Sides',
}

export default day03
