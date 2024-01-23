import inputs from '../../inputs/2017/day24'
import { DayConfig } from '../../routes/Day'
import SLL from '../../utils/SLL'

interface Bridge {
  connectionType: number
  ports: number[][]
}

const parseInput = (input: string): number[][] =>
  input
    .split('\n')
    .map((line) => {
      const [aStr, bStr] = line.split('/')
      const a = Math.min(parseInt(aStr), parseInt(bStr))
      const b = Math.max(parseInt(aStr), parseInt(bStr))
      return [a, b]
    })
    .sort((a, b) => a[0] - b[0])

const findBridges__recursive = (
  startingPortType: number,
  ports: number[][],
  inBridge?: number[][]
): number[][][] => {
  const result: number[][][] = []
  const bridge: number[][] = inBridge || []

  for (let i = 0; i < ports.length; i++) {
    const port = ports[i]
    const indexOfStartingPortType = port.indexOf(startingPortType)
    if (indexOfStartingPortType !== -1) {
      const nextStartingPortType = port[(indexOfStartingPortType + 1) % 2]
      result.push(
        ...findBridges__recursive(
          nextStartingPortType,
          ports.filter((port, idx) => idx !== i),
          bridge.concat([port])
        )
      )
      result.push(bridge.concat([port]))
    }
  }

  return result
}

const totalNodeStrength = (node: number[]): number => node[0] + node[1]

const totalBridgeStrength = (bridge: number[][]): number =>
  bridge.reduce((strength, node) => strength + totalNodeStrength(node), 0)

export const findStrongestBridgeRecursively = (input: string) => {
  const ports: number[][] = parseInput(input)
  const possibleBridges = findBridges__recursive(0, ports).sort((a, b) => {
    return totalBridgeStrength(b) - totalBridgeStrength(a)
  })

  return {
    answer1: totalBridgeStrength(possibleBridges[0]),
  }
}

const findBridges = (ports: number[][]): Bridge[] => {
  const completeBridges: Bridge[] = []
  const bridges = new SLL<Bridge>()
  ports
    .filter((port) => port[0] === 0)
    .forEach((port) => {
      bridges.push({
        connectionType: port[1],
        ports: [port],
      } as Bridge)
    })

  let bridge = bridges.shift()

  while (bridge) {
    for (let i = 0; i < ports.length; i++) {
      const port = ports[i]
      // For each port, if it's not already in the bridge, ...
      if (
        !bridge.ports.some(
          (bridgePort: number[]) =>
            bridgePort[0] === port[0] && bridgePort[1] === port[1]
        )
      ) {
        // Try to extend the bridge with it and if it's a valid extension, add it to the bridges list
        if (port[0] !== 0 && port.indexOf(bridge.connectionType) !== -1) {
          bridges.push({
            connectionType: port[(port.indexOf(bridge.connectionType) + 1) % 2],
            ports: [...bridge.ports, port],
          } as Bridge)
        }
      }
    }
    completeBridges.push(bridge)
    bridge = bridges.shift()
  }

  return completeBridges
}

export const findStrongestBridge = (input: string) => {
  const ports: number[][] = parseInput(input)
  const possibleBridges = findBridges(ports).sort((a, b) => {
    return totalBridgeStrength(b.ports) - totalBridgeStrength(a.ports)
  })

  return {
    answer1: totalBridgeStrength(possibleBridges[0].ports),
  }
}

export const findLongestBridge = (input: string) => {
  const ports: number[][] = parseInput(input)
  const possibleBridges = findBridges(ports).sort((a, b) => {
    return a.ports.length > b.ports.length
      ? -1
      : a.ports.length < b.ports.length
      ? 1
      : totalBridgeStrength(b.ports) - totalBridgeStrength(a.ports)
  })

  return {
    answer2: totalBridgeStrength(possibleBridges[0].ports),
  }
}

const day24: Omit<DayConfig, 'year'> = {
  answer1Text: 'The strength of the strongest bridge you can build is answer.',
  answer2Text: 'The strength of the longest bridge you can build is answer.',
  buttons: [
    {
      label: 'Find Strongest Bridge (Recursively)',
      onClick: findStrongestBridgeRecursively,
    },
    {
      label: 'Find Strongest Bridge (Non-Recursively)',
      onClick: findStrongestBridge,
    },
    {
      label: 'Find Longest Bridge',
      onClick: findLongestBridge,
    },
  ],
  id: 24,
  inputs,
  title: 'Electromagnetic Moat',
}

export default day24
