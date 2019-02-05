import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'

import INPUT from './Input/Day24'

// port: number[]
// bridge: number[][]
// possibleBridges: number[][][]

const parseInput = (input: string): number[][] => (
  input.split('\n').map(line => {
    const [ a, b ] = line.split('/')
    return [ parseInt(a), parseInt(b) ]
  })
  .sort((a, b) => a[0] - b[0])
)

const totalBridgeStrength = (bridge: number[][]): number => (
  bridge.reduce((strength, node) => strength + totalNodeStrength(node), 0)
)

const totalNodeStrength = (node: number[]): number => node[0] + node[1]

const findBridges = (startingPortType: number, ports: number[][], inBridge?: number[][]): number[][][] => {
  const result: number[][][] = []
  const bridge: number[][] = inBridge || []

  for (let i = 0; i < ports.length; i++) {
    const port = ports[i]
    const indexOfStartingPortType = port.indexOf(startingPortType)
    if (indexOfStartingPortType !== -1) {
      const nextStartingPortType = port[(indexOfStartingPortType + 1) % 2]
      result.push(
        ...findBridges(nextStartingPortType, ports.filter((port, idx) => idx !== i), bridge.concat([port]))
      )
      result.push(bridge.concat([port]))
    }
  }

  return result
}

const BUTTONS: IButton[] = [
  {
    label: 'Find Strongest Bridge',
    onClick: (inputKey) => {
      const ports: number[][] = parseInput(INPUT[inputKey])
      const possibleBridges = findBridges(0, ports).sort((a, b) => {
        return totalBridgeStrength(b) - totalBridgeStrength(a)
      })

      return {
        answer1: totalBridgeStrength(possibleBridges[0]).toString()
      }
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The strength of the strongest bridge you can build is{' '}
      <code>{answer}</code>.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      <code>{answer}</code>
    </span>
  ),
  buttons: BUTTONS,
  day: 24,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Electromagnetic Moat'
}

export default config