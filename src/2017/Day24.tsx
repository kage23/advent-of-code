import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'

import INPUT from './Input/Day24'

import SLL, { ISLLNode } from '../utils/SLL'

// port: number[]
// bridge: number[][]
// possibleBridges: number[][][]

const parseInput = (input: string): number[][] => (
  input.split('\n').map(line => {
    const [ aStr, bStr ] = line.split('/')
    const a = Math.min(parseInt(aStr), parseInt(bStr))
    const b = Math.max(parseInt(aStr), parseInt(bStr))
    return [a, b]
  })
  .sort((a, b) => a[0] - b[0])
)

const totalBridgeStrength = (bridge: number[][]): number => (
  bridge.reduce((strength, node) => strength + totalNodeStrength(node), 0)
)

const totalNodeStrength = (node: number[]): number => node[0] + node[1]

const findBridges__recursive = (startingPortType: number, ports: number[][], inBridge?: number[][]): number[][][] => {
  const result: number[][][] = []
  const bridge: number[][] = inBridge || []

  for (let i = 0; i < ports.length; i++) {
    const port = ports[i]
    const indexOfStartingPortType = port.indexOf(startingPortType)
    if (indexOfStartingPortType !== -1) {
      const nextStartingPortType = port[(indexOfStartingPortType + 1) % 2]
      result.push(
        ...findBridges__recursive(nextStartingPortType, ports.filter((port, idx) => idx !== i), bridge.concat([port]))
      )
      result.push(bridge.concat([port]))
    }
  }

  return result
}

const findBridges = (ports: number[][]): number[][][] => {
  debugger
  const completeBridges: number[][][] = []
  const bridges = new SLL()
  let prevConnectionType = 0
  ports.filter(port => port[0] === 0).forEach(port => bridges.push([port]))

  let bridge = bridges.shift()

  let i = 0
  while (bridge) {
    // if (i % 10000 === 0)
    console.log(`Complete bridges: ${completeBridges.length}. Bridges remaining: ${bridges.length}. Total bridges: ${completeBridges.length + bridges.length}.`)
    i++
    const connectionPort = bridge[bridge.length - 1]
    for (let i = 0; i < ports.length; i++) {
      const port = ports[i]
      // For each port, if it's not already in the bridge, ...
      if (!bridge.some((bridgePort: number[]) => bridgePort[0] === port[0] && bridgePort[1] === port[1])) {
        // Try to extend the bridge with it and if it's a valid extension, add it to the bridges list
        if (port[0] !== 0 && (connectionPort.indexOf(port[0]) !== -1 || connectionPort.indexOf(port[1]) !== -1)) {
          // THE ABOVE IS WRONG AND WILL MAKE BAD BRIDGES LIKE: [0, 2] [2, 3] [3, 5] [3, 4] . The middle three is connecting to both but that's illegal.
          // Keeping track of the bridge's connection type is fucky. I guess maybe make a method that you can just pass the thing to, and re-figure connection type each bridge loop
          bridges.push([...bridge, port])
        }
      }
    }
    completeBridges.push(bridge)
    bridge = bridges.shift()
  }

  return completeBridges
}

const BUTTONS: IButton[] = [
  {
    label: 'Find Strongest Bridge (Recursively)',
    onClick: (inputKey) => {
      const ports: number[][] = parseInput(INPUT[inputKey])
      const possibleBridges = findBridges__recursive(0, ports).sort((a, b) => {
        return totalBridgeStrength(b) - totalBridgeStrength(a)
      })

      return {
        answer1: totalBridgeStrength(possibleBridges[0]).toString()
      }
    }
  },
  {
    label: 'Find Strongest Bridge (Non-Recursively)',
    onClick: (inputKey) => {
      const ports: number[][] = parseInput(INPUT[inputKey])
      const possibleBridges = findBridges(ports).sort((a, b) => {
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