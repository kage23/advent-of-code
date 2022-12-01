import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'

import INPUT from '../Inputs/2021/Day11'

const getAdjacents = (i: number, j: number, width: number, height: number) => {
  return [
    [i - 1, j - 1], [i - 1, j], [i - 1, j + 1],
    [i, j - 1], [i, j + 1],
    [i + 1, j - 1], [i + 1, j], [i + 1, j + 1]
  ].filter(([I, J]) => (
    I >= 0 && J >= 0 && I < height && J < width
  )) as [number, number][]
}

const doOneStep = (octopuses: number[][]): number => {
  const toFlash: string[] = []
  const flashed: string[] = []

  // Go through and increase them all by one. If that brings them to 10,
  // add them to the toFlash list.
  for (let row = 0; row < octopuses.length; row++) {
    for (let col = 0; col < octopuses[row].length; col++) {
      octopuses[row][col] += 1
      if (octopuses[row][col] === 10) {
        toFlash.push(`${row},${col}`)
      }
    }
  }

  // Then go through the toFlash list. For each one, add it to the flashed list,
  // reset it to zero, then find its adjacents. For each adjacent, IF IT'S NOT
  // ON THE FLASHED LIST, increase it by one and if that brings it to 10, add
  // it to the toFlash list.
  while (toFlash.length) {
    const key = toFlash.shift() || ''
    const [row, col] = key.split(',').map(n => Number(n))
    flashed.push(key)
    octopuses[row][col] = 0
    const adjacents = getAdjacents(row, col, octopuses[row].length, octopuses.length)
    adjacents.forEach(([aRow, aCol]) => {
      const aKey = `${aRow},${aCol}`
      if (!flashed.includes(aKey)) {
        octopuses[aRow][aCol] += 1
        if (octopuses[aRow][aCol] === 10) {
          toFlash.push(aKey)
        }
      }
    })
  }

  // When we're done with the toFlash list, the flashed list length is the number
  // of flashes this step.
  return flashed.length
}

const BUTTONS: IButton[] = [
  {
    label: 'Watch the Octopuses',
    onClick: (inputKey: string) => {
      const octopuses =
        INPUT[inputKey].split('\n').map(octoRow => octoRow.split('').map(n => Number(n)))

      let flashCount = 0

      for (let i = 0; i < 100; i++) {
        flashCount += doOneStep(octopuses)
      }

      return {
        answer1: flashCount.toString()
      }
    }
  },
  {
    label: 'Wait for Synchronized Flash',
    onClick: (inputKey: string) => {
      const octopuses =
        INPUT[inputKey].split('\n').map(octoRow => octoRow.split('').map(n => Number(n)))

      const width = octopuses[0].length
      const height = octopuses.length

      let flashCount = 0
      let step = 0

      while (flashCount !== width * height) {
        flashCount = doOneStep(octopuses)
        step++
      }

      return {
        answer2: step.toString()
      }
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      After 100 steps, there have been <code>{answer}</code> flashes.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      The flashes synchronize on Step <code>{answer}</code>.
    </span>
  ),
  buttons: BUTTONS,
  day: 11,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Dumbo Octopus'
}

export default config
