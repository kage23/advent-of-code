import React from 'react'
import {
  IButton,
  IDayConfig
} from '../Config'
import { intcodeComputer2019 } from '../utils/Various'

import INPUT from './Input/Day19'

const size = 50

let program: number[] = []

let map: string[][] = []

const parseGridString = (str: string): number[] => str.split(',').map(i => parseInt(i))
const renderGridString = (pos: number[]): string => pos.join(',')

const parseInput = (inputKey: string): number[] =>
  INPUT[inputKey].split(',').map(inputStr => parseInt(inputStr))

const renderDay = (dayConfig: IDayConfig, inputKey: string) => {
  return (
    <div>
      <h3>Input: {dayConfig.INPUT[inputKey]}</h3>
      <h3>Program: {program.join(',')}</h3>
      {map.length > 0 && (
        <div>
          <h3>Map:</h3>
          <pre>{map.filter(row => row !== undefined).map(row => row.join('')).join('\n')}</pre>
        </div>
      )}
    </div>
  )
}

const BUTTONS: IButton[] = [
  {
    label: 'Initialize/Reset Program (Click Me First)',
    onClick: (inputKey: string) => {
      program = parseInput(inputKey)

      return {}
    }
  },
  {
    label: 'Map Tractor Beam',
    onClick: () => {
      let count = 0
      map = []

      for (let y = 0; y < size; y++) {
        if (!map[y]) map[y] = []
        for (let x = 0; x < size; x++) {
          // console.log(`Checking ${x}, ${y}...`)
          const result = intcodeComputer2019(program, [x, y])
          if (result.outputs[0]) {
            map[y][x] = '#'
            count++
            console.log(`Tractor Beam at [${x}, ${y}]`)
          } else map[y][x] = '.'
        }
      }

      return {
        answer1: count.toString()
      }
    }
  },
  {
    label: 'Find Place for Ship',
    onClick: () => {
      // Starting at [599, 390] as the upper-right corner (which I found in experimentation and testing),
      // check to see if all four corners are within the beam. If not, move down one, then keep moving
      // right until the edge of the beam, then check all four corners from there.

      const getCorners = (upperRight: [number, number]): [
        [number, number],
        [number, number],
        [number, number],
        [number, number]
      ] => {
        const [ x, y ] = upperRight
        return [
          [x - 99, y],
          [x, y],
          [x - 99, y + 99],
          [x, y + 99]
        ]
      }

      const isNodeInBeam = (node: [number, number]): boolean => {
        const result = intcodeComputer2019(program, node)
        if (result.outputs[0] === 1) return true
        return false
      }

      const getNextNode = (node: [number, number]): [number, number] => {
        let [ x, y ] = node
        // First, go down one
        y++
        // Verify that you're still in the beam
        if (!isNodeInBeam([x, y])) throw new Error('fuck')
        // Then go right until you're out of the beam
        while (isNodeInBeam([x, y])) x++
        // Now that you're out of the beam, go back left one to get back in the beam
        x--
        // That's the next node
        return [x, y]
      }

      const allFourCornersWithin = (upperRight: [number, number]): boolean => {
        console.log(`Checking four corners of upper right: ${JSON.stringify(upperRight)}`)
        return getCorners(upperRight).every(corner => isNodeInBeam(corner))
      }

      let currentNode: [number, number] = [599, 390]

      while (!allFourCornersWithin(currentNode)) {
        currentNode = getNextNode(currentNode)
      }

      const goodCorners = getCorners(currentNode)
      const [ [ x, y ] ] = goodCorners

      return {
        answer2: ((x * 10000) + y).toString()
      }
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The number of points affected by the tractor beam in the 50x50 area closest to the emitter is{' '}
      <code>{answer}</code>.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      The upper left corner of a good spot for the ship is <code>{answer}</code>.
    </span>
  ),
  buttons: BUTTONS,
  day: 19,
  INPUT,
  renderDay: (dayConfig, inputKey) => renderDay(dayConfig, inputKey),
  title: 'Tractor Beam'
}

export default config
