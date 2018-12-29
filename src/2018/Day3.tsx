import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
 } from '../Config'

import INPUT from './Input/Day3'

const pathKey = (x: number, y: number): string => `${x}_${y}`

const parseInput = (input: string): number[][] => {
  return input.split('\n')
  .map(line => {
    const id = parseInt(line.slice(1))
    const x = parseInt(line.slice(line.indexOf('@') + 2))
    const y = parseInt(line.slice(line.indexOf(',') + 1))
    const w = parseInt(line.slice(line.indexOf(':') + 2))
    const h = parseInt(line.slice(line.indexOf('x') + 1))

    return [ id, x, y, w, h ]
  })
}

const makeClaimsMap = (claims: number[][]): Map<string, number[]> => {
  const claimsMap: Map<string, number[]> = new Map()
  claims.forEach(([id, x, y, width, height]) => {
    for (let xi = x; xi < x + width; xi++) {
      for (let yi = y; yi < y + height; yi++) {
        let claimsAt = claimsMap.get(pathKey(xi, yi))
        if (!claimsAt) claimsAt = []
        claimsAt.push(id)
        claimsMap.set(pathKey(xi, yi), claimsAt)
      }
    }
  })
  return claimsMap
}

const part1 = (input: string) => {
  const claims = parseInput(INPUT[input])
  const claimsMap = makeClaimsMap(claims)

  let overlappingSquares = 0
  for (const [, value] of claimsMap) if (value.length > 1) overlappingSquares++
  return {
    answer1: overlappingSquares.toString()
  }
}

const BUTTONS: IButton[] = [
  {
    label: 'Determine Fabric Overlap',
    onClick: part1
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      <code>{answer}</code> square inches of fabric are in two or more claims.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      The ID of the only non-overlapping claim is ID #
      <code>{answer}</code>.
    </span>
  ),
  buttons: BUTTONS,
  day: 3,
  INPUT,
  renderDay: (inputKey) => defaultRenderDay(inputKey),
  title: 'No Matter How You Slice It'
}

export default config