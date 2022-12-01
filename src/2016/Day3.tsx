import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'

import INPUT from '../Inputs/2016/Day3'

const getTrianglePart1 = (input: string): number[] => {
  const regexp = /[\d]+/g
  const sides = input.match(regexp)

  if (sides) return sides.map(x => parseInt(x))

  return []
}

const getVerticalTriangles = (input: string[]): number[][] => {
  const result: number[][] = []

  if (input.length % 3 !== 0) throw new Error(`Something's wrong with this input data.`)

  const inputNumbers = input.map(line => getTrianglePart1(line))

  for (let col = 0; col < input[0].length; col++) {
    for (let row = 0; row < input.length; row += 3) {
      const triangle = [
        inputNumbers[row][col],
        inputNumbers[row + 1][col],
        inputNumbers[row + 2][col]
      ]

      if (isTriangleValid(triangle)) result.push(triangle)
    }
  }

  return result
}

const isTriangleValid = (input: number[]): boolean => {
  if (input.length !== 3) return false

  return (
    (input[0] + input[1] > input[2])
    && (input[0] + input[2] > input[1])
    && (input[1] + input[2] > input[0])
  )
}

const BUTTONS: IButton[] = [
  {
    label: 'Evaluate Triangles',
    onClick: inputKey => ({
      answer1: INPUT[inputKey].split('\n').map(getTrianglePart1).filter(isTriangleValid).length.toString()
    })
  },
  {
    label: 'Evaluate Triangles (Vertically)',
    onClick: inputKey => ({
      answer2: getVerticalTriangles(INPUT[inputKey].split('\n')).length.toString()
    })
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      Of the triangles listed, only{' '}
      <code>{answer}</code> of them are actually possible.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      Of the triangles listed when you read the list by columns, only{' '}
      <code>{answer}</code> of them are actually possible.
    </span>
  ),
  buttons: BUTTONS,
  day: 3,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Squares With Three Sides'
}

export default config