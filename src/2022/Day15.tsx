import React from 'react'
import { defaultRenderDay, IButton, IDayConfig } from '../Config'

import INPUT from '../Inputs/2022/Day15'
import { manhattanDistance } from '../utils/Various'

class Field {
  xMin: number
  xMax: number
  yMin: number
  yMax: number

  sensors: string[]
  beacons: string[]

  rangesOfNoBeaconsOnRow: [number, number][]
  beaconsOnRow: number[]

  constructor(inputKey: string, rowWeCareAbout: number) {
    this.xMin = Number.MAX_SAFE_INTEGER
    this.xMax = Number.MIN_SAFE_INTEGER
    this.yMin = Number.MAX_SAFE_INTEGER
    this.yMax = Number.MIN_SAFE_INTEGER

    this.sensors = []
    this.beacons = []

    this.rangesOfNoBeaconsOnRow = []
    this.beaconsOnRow = []

    INPUT[inputKey].split('\n').forEach((line) => {
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

      if (beaconY === rowWeCareAbout && !this.beaconsOnRow.includes(beaconX)) {
        this.beaconsOnRow.push(beaconX)
      }
    })

    this.sensors.forEach((sensor, i) => {
      const [sensorX, sensorY] = sensor.split(',').map((n) => Number(n))
      const [beaconX, beaconY] = this.beacons[i]
        .split(',')
        .map((n) => Number(n))

      const distance = manhattanDistance([sensorX, sensorY], [beaconX, beaconY])

      const distanceToRowWeCareAbout = Math.abs(sensorY - rowWeCareAbout)

      const remainingDistance = distance - distanceToRowWeCareAbout

      if (remainingDistance >= 0) {
        const xRangeOnRow = [
          sensorX - remainingDistance,
          sensorX + remainingDistance,
        ].sort((a, b) => a - b) as [number, number]
        this.rangesOfNoBeaconsOnRow.push(xRangeOnRow)
      }
    })
  }

  countNoBeaconsOnRow() {
    this.rangesOfNoBeaconsOnRow.sort((a, b) => a[0] - b[0])

    this.rangesOfNoBeaconsOnRow = this.rangesOfNoBeaconsOnRow.reduce(
      (accumulator, currentRange, i) => {
        if (i === 0) {
          accumulator.push(currentRange)
        } else {
          const prevRange = accumulator[accumulator.length - 1]
          if (
            currentRange[0] <= prevRange[1] + 1 &&
            currentRange[1] > prevRange[1]
          ) {
            accumulator[accumulator.length - 1][1] = currentRange[1]
          } else if (currentRange[0] > prevRange[1]) {
            accumulator.push(currentRange)
          }
        }
        return accumulator
      },
      [] as [number, number][]
    )

    let count = this.rangesOfNoBeaconsOnRow.reduce(
      (currentCount, currentRange) => {
        return currentCount + (currentRange[1] - currentRange[0])
      },
      1
    )

    this.beaconsOnRow.forEach((beaconX) => {
      if (
        this.rangesOfNoBeaconsOnRow.some(
          ([min, max]) => min <= beaconX && max >= beaconX
        )
      )
        count -= 1
    })

    return count
  }
}

const BUTTONS: IButton[] = [
  {
    label: 'Check for Beacons',
    onClick: (inputKey: string) => {
      const rowWeCareAbout = inputKey === 'DEMO' ? 10 : 2000000

      const field = new Field(inputKey, rowWeCareAbout)

      const answer = field.countNoBeaconsOnRow()

      debugger

      // 5710544 is too high
      // and it's not off-by-one; 5710543 is also too high :P

      return {
        answer1: answer.toString(),
      }
    },
  },
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The row has <code>{answer}</code> spaces that can't have a beacon.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      With a floor, <code>{answer}</code> grains of sand will come to rest.
    </span>
  ),
  buttons: BUTTONS,
  day: 15,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Beacon Exclusion Zone',
}

export default config
