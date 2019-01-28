import React from 'react'
import {
  IButton,
  IDayConfig
} from '../Config'

import INPUT from './Input/Day13'

interface ILayer {
  range: number
  scannerPos: number
  scannerDir: '+' | '-'
}

let firewall: Map<number, ILayer> = new Map()
let totalFirewallDepth = 0
let time = 0
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

const BUTTONS: IButton[] = [
  {
    label: 'Advance Scanners',
    onClick: () => {
      advanceScanners()
      time++
      return {}
    }
  }
]

const renderDay = (dayConfig: IDayConfig, inputKey: string): JSX.Element => {
  if (prevInputKey !== inputKey) {
    totalFirewallDepth = 0
    firewall = parseInput(dayConfig.INPUT[inputKey])
    time = 0
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
            [{
              layer.scannerPos === j ? 'S' : ' '
            }]&nbsp;
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
          <div>...&nbsp;</div>
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
        <h3>Picoseconds: {time}</h3>
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