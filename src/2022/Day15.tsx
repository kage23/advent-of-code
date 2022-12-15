import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'

import INPUT from '../Inputs/2022/Day15'
import { manhattanDistance } from '../utils/Various'

class Field {
  xMin: number
  xMax: number
  yMin: number
  yMax: number

  sensors: string[]
  beacons: string[]

  noBeaconList: string[]

  constructor(inputKey: string) {
    this.xMin = Number.MAX_SAFE_INTEGER
    this.xMax = Number.MIN_SAFE_INTEGER
    this.yMin = Number.MAX_SAFE_INTEGER
    this.yMax = Number.MIN_SAFE_INTEGER

    this.sensors = []
    this.beacons = []
    this.noBeaconList = []

    INPUT[inputKey].split('\n').forEach(line => {
      const [sensorText, beaconText] = line.split(': ')
      const sensorX = Number(sensorText.slice(12).split(',')[0])
      const sensorY = Number(sensorText.split('y=')[1])
      const beaconX = Number(beaconText.slice(23).split(',')[0])
      const beaconY = Number(beaconText.split('y=')[1])

      this.xMin = Math.min(this.xMin, sensorX, beaconX)
      this.xMax = Math.max(this.xMax, sensorX, beaconX)
      this.yMin = Math.min(this.yMin, sensorY, beaconY)
      this.yMax = Math.max(this.yMax, sensorY, beaconY)

      this.sensors.push(`${sensorX},${sensorY}`)
      this.beacons.push(`${beaconX},${beaconY}`)

      const distance = manhattanDistance([sensorX, sensorY], [beaconX, beaconY])

      for (let x = sensorX - distance; x <= sensorX + distance; x++) {
        this.xMin = Math.min(this.xMin, x)
        this.xMax = Math.max(this.xMax, x)
        const yVariant = distance - Math.abs(x - sensorX)
        for (let y = sensorY - yVariant; y <= sensorY + yVariant; y++) {
          if (
            !this.beacons.includes(`${x},${y}`) &&
            !this.noBeaconList.includes(`${x},${y}`)
          ) {
            this.noBeaconList.push(`${x},${y}`)
          }
        }
      }
    })
  }

  countNoBeaconsOnRow(row: number) {
    let count = 0
    for (let x = this.xMin; x <= this.xMax; x++) {
      if (this.noBeaconList.includes(`${x},${row}`)) count += 1
    }
    return count
  }
}

const BUTTONS: IButton[] = [
  {
    label: 'Check for Beacons',
    onClick: (inputKey: string) => {
      const field = new Field(inputKey)

      return {
        answer1: field.countNoBeaconsOnRow(
          inputKey === 'DEMO' ? 10 : 2000000
        ).toString()
      }
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The row has{' '}
      <code>{answer}</code> spaces that can't have a beacon.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      With a floor,{' '}
      <code>{answer}</code> grains of sand will come to rest.
    </span>
  ),
  buttons: BUTTONS,
  day: 15,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Beacon Exclusion Zone'
}

export default config
