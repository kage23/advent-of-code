import inputs from '../../inputs/2017/day13'
import { DayConfig } from '../../routes/Day'

interface ILayer {
  range: number
  scannerPos: number
  scannerDir: '+' | '-'
}

let firewall: Map<number, ILayer> = new Map()
let totalFirewallDepth = 0
let time = -1
let currentPosition = -1
let ongoingSeverity = 0
const startingInputWithDelay: Map<number, string> = new Map()

const parseInput = (input: string): Map<number, ILayer> => {
  const firewall: Map<number, ILayer> = new Map()
  input.split('\n').forEach((line) => {
    const [depthStr, rangeStr, posStr, dir] = line.split(': ')
    firewall.set(parseInt(depthStr), {
      range: parseInt(rangeStr),
      scannerPos: posStr ? parseInt(posStr) : 0,
      scannerDir: dir === '+' || dir === '-' ? dir : '+',
    })
    totalFirewallDepth = Math.max(totalFirewallDepth, parseInt(depthStr))
  })
  return firewall
}

const reset = (inputKey: string): void => {
  startingInputWithDelay.clear()
  totalFirewallDepth = 0
  firewall = parseInput(inputs.get(inputKey)!)
  time = -1
  currentPosition = -1
  ongoingSeverity = 0
  startingInputWithDelay.set(0, inputs.get(inputKey)!)
}

const judgeSeverity = (): boolean => {
  const layer = firewall.get(currentPosition)
  if (layer && layer.scannerPos === 0) {
    ongoingSeverity = ongoingSeverity + currentPosition * layer.range
    return true
  }
  return false
}

const advanceScanners = (): void => {
  for (const layer of firewall.values()) {
    if (layer.scannerDir === '+') {
      layer.scannerPos++
      if (layer.scannerPos >= layer.range) {
        layer.scannerDir = '-'
        layer.scannerPos = layer.scannerPos - 2
      }
    } else if (layer.scannerDir === '-') {
      layer.scannerPos--
      if (layer.scannerPos < 0) {
        layer.scannerDir = '+'
        layer.scannerPos = 1
      }
    }
  }
}

export const takeTrip = (inputKey: string) => {
  reset(inputKey)
  while (currentPosition < totalFirewallDepth) {
    currentPosition++
    judgeSeverity()
    advanceScanners()
    time++
  }
  return {
    answer1: ongoingSeverity,
  }
}

const isCaught = (range: number, time: number): boolean =>
  time % ((range - 1) * 2) === 0

export const findDelayFastMethod = (inputKey: string) => {
  let delay = 0
  const input = inputs.get(inputKey)!

  // [ depth, range ]
  const guards: number[][] = input.split('\n').map((s) => {
    const guard = s.match(/\d+/g)
    return guard ? guard.map(Number) : [0]
  })

  const caughtByGuard = (delay: number) => {
    let caught = false
    for (let i = 0; i < guards.length; i++) {
      const [depth, range] = guards[i]
      caught = caught || isCaught(range, delay + depth)
      if (caught) break
    }
    return caught
  }

  while (caughtByGuard(delay)) delay++

  return {
    answer2: delay,
  }
}

const day13: Omit<DayConfig, 'year'> = {
  answer1Text: 'The total trip severity is answer.',
  answer2Text: 'You will be safe if you delay answer picoseconds.',
  buttons: [
    {
      label: 'Take Trip',
      onClick: takeTrip,
    },
    {
      label: 'Find Delay (Fast Method)',
      onClick: findDelayFastMethod,
    },
  ],
  id: 13,
  inputs,
  title: 'Packet Scanners',
}

export default day13
