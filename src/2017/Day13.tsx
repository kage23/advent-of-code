import React from 'react'
import {
  IButton,
  IDayConfig
} from '../Config'

import INPUT from '../Inputs/2017/Day13'

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
let prevInputKey = ''
const startingInputWithDelay: Map<number, string> = new Map()

const parseInput = (input: string): Map<number, ILayer> => {
  const firewall: Map<number, ILayer> = new Map()
  input.split('\n').forEach(line => {
    const [
      depthStr,
      rangeStr,
      posStr,
      dir
    ] = line.split(': ')
    firewall.set(parseInt(depthStr), {
      range: parseInt(rangeStr),
      scannerPos: posStr ? parseInt(posStr) : 0,
      scannerDir: dir === '+' || dir === '-' ? dir : '+'
    })
    totalFirewallDepth = Math.max(totalFirewallDepth, parseInt(depthStr))
  })
  return firewall
}

const reset = (inputKey: string): void => {
  totalFirewallDepth = 0
  firewall = parseInput(INPUT[inputKey])
  time = -1
  currentPosition = -1
  ongoingSeverity = 0
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

const judgeSeverity = (): boolean => {
  const layer = firewall.get(currentPosition)
  if (layer && layer.scannerPos === 0) {
    ongoingSeverity = ongoingSeverity + (currentPosition * layer.range)
    return true
  }
  return false
}

const readFirewallIntoInputString = (firewall: Map<number, ILayer>): string => {
  let result: string[] = []
  for (const [depth, layer] of firewall) {
    result.push(`${depth}: ${layer.range}: ${layer.scannerPos}: ${layer.scannerDir}`)
  }
  return result.join('\n')
}

const isCaught = (range: number, time: number): boolean => {
  const position = time % ((range - 1) * 2)

  return position === 0
}

const BUTTONS: IButton[] = [
  {
    label: 'Step',
    onClick: () => {
      currentPosition++
      judgeSeverity()
      advanceScanners()
      time++
      return {}
    }
  },
  {
    label: 'Take Trip',
    onClick: () => {
      while (currentPosition < totalFirewallDepth) {
        currentPosition++
        judgeSeverity()
        advanceScanners()
        time++
      }
      return {
        answer1: ongoingSeverity.toString()
      }
    }
  },
  {
    label: 'Find Delay (Slow Method)',
    onClick: () => {
      let delay = 0
      let answer2: undefined | string = undefined

      while (!answer2) {
        currentPosition = -1
        time = -1
        let caught = false
        const firewallInput = startingInputWithDelay.get(delay)
        if (firewallInput) {
          firewall = parseInput(firewallInput)
        } else {
          const prevFirewallInput = startingInputWithDelay.get(delay - 1)
          if (prevFirewallInput) {
            firewall = parseInput(prevFirewallInput)
            advanceScanners()
            startingInputWithDelay.set(delay, readFirewallIntoInputString(firewall))
          }
        }
        while (currentPosition < totalFirewallDepth && !caught) {
          currentPosition++
          caught = judgeSeverity()
          advanceScanners()
          time++
        }
        if (!caught) {
          answer2 = delay.toString()
        } else delay++
      }

      return {
        answer2
      }
    }
  },
  {
    label: 'Find Delay (Fast Method)',
    onClick: (inputKey) => {
      let delay = 0
      const input = INPUT[inputKey]

      // [ depth, range ]
      const guards: number[][] = input.split('\n').map(s => {
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
        answer2: delay.toString()
      }
    }
  }
]

const renderDay = (dayConfig: IDayConfig, inputKey: string): JSX.Element => {
  if (prevInputKey !== inputKey) {
    startingInputWithDelay.clear()
    reset(inputKey)
    startingInputWithDelay.set(0, dayConfig.INPUT[inputKey])
    prevInputKey = inputKey
  }

  const firewallLayers: JSX.Element[] = []
  for (let i = 0; i <= totalFirewallDepth; i++) {
    const layer = firewall.get(i)
    if (layer) {
      const ranges: JSX.Element[] = []
      for (let j = 0; j < layer.range; j++) {
        ranges.push((
          <div key={j}>
            {currentPosition === i && j === 0 ? '(' : '['}{
              layer.scannerPos === j ? 'S' : ' '
            }{currentPosition === i && j === 0 ? ')' : ']'}&nbsp;
          </div>
        ))
      }
      firewallLayers.push((
        <div key={i}>
          <div>
            {i < 10 ? <span>&nbsp;</span> : ''}
            {i}&nbsp;&nbsp;
          </div>
          {ranges}
        </div>
      ))
    } else {
      firewallLayers.push((
        <div key={i}>
          <div>
            {i < 10 ? <span>&nbsp;</span> : ''}
            {i}&nbsp;&nbsp;
          </div>
          <div>{currentPosition === i ? '(' : '.'}.{currentPosition === i ? ')' : '.'}&nbsp;</div>
        </div>
      ))
    }
  }

  return (
    <div className="render-box render-box--no-wrap">
      <div>
        <h3>Input:</h3>
        <pre>{dayConfig.INPUT[inputKey]}</pre>
      </div>
      <div className="render-box--left-margin">
        <h3>Picosecond: {time}</h3>
        <h3>Total Ongoing Severity: {ongoingSeverity}</h3>
        <div
          style={{
            display: 'flex'
          }}
        >
          {firewallLayers}
        </div>
      </div>
    </div>
  )
}

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The total trip severity is{' '}
      <code>{answer}</code>.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      You will be safe if you delay{' '}
      <code>{answer}</code> picoseconds.
    </span>
  ),
  buttons: BUTTONS,
  day: 13,
  INPUT,
  renderDay,
  title: 'Packet Scanners'
}

export default config