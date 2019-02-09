import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'

import INPUT from './Input/Day3'

const getTriangle = (input: string): number[] => {
  const regexp = /[\d]+/g
  const sides = input.match(regexp)

  if (sides) return sides.map(x => parseInt(x))

  return []
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
      answer1: INPUT[inputKey].split('\n').map(getTriangle).filter(isTriangleValid).length.toString()
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
      <code>{answer}</code>
    </span>
  ),
  buttons: BUTTONS,
  day: 3,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Squares With Three Sides'
}

export default config