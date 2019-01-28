import React from 'react'
import {
  IButton,
  IDayConfig
} from '../Config'

import INPUT from './Input/Day13'
import { cpus } from 'os';

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

const parseInput = (input: string): Map<number, ILayer> => {
  const firewall: Map<number, ILayer> = new Map()
  input.split('\n').forEach(line => {
    const [
      depthStr,
      rangeStr
    ] = line.split(': ')
    firewall.set(parseInt(depthStr), {
      range: parseInt(rangeStr),
      scannerPos: 0,
      scannerDir: '+'
    })
    totalFirewallDepth = Math.max(totalFirewallDepth, parseInt(depthStr))
  })
  return firewall
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

const judgeSeverity = (): void => {
  const layer = firewall.get(currentPosition)
  if (layer && layer.scannerPos === 0) {
    ongoingSeverity = ongoingSeverity + (currentPosition * layer.range)
  }
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
  }
]

const renderDay = (dayConfig: IDayConfig, inputKey: string): JSX.Element => {
  if (prevInputKey !== inputKey) {
    totalFirewallDepth = 0
    firewall = parseInput(dayConfig.INPUT[inputKey])
    time = -1
    currentPosition = -1
    ongoingSeverity = 0
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
      <code>{answer}</code>
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      <code>{answer}</code>
    </span>
  ),
  buttons: BUTTONS,
  day: 13,
  INPUT,
  renderDay,
  title: 'Packet Scanners'
}

export default config