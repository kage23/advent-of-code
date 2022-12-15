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

  rowInfo: Map<number, {
    rangesOfNoBeaconsOnRow: [number, number][]
    beaconsOnRow: number[]
  }>

  constructor(inputKey: string, rowWeCareAbout: number, part2?: boolean) {
    this.xMin = Number.MAX_SAFE_INTEGER
    this.xMax = Number.MIN_SAFE_INTEGER
    this.yMin = Number.MAX_SAFE_INTEGER
    this.yMax = part2 ? rowWeCareAbout * 2 : Number.MIN_SAFE_INTEGER

    this.sensors = []
    this.beacons = []

    this.rowInfo = new Map()

    if (!part2) {
      this.rowInfo.set(rowWeCareAbout, {
        rangesOfNoBeaconsOnRow: [],
        beaconsOnRow: []
      })
    } else {
      for (let y = 0; y <= this.yMax; y++) {
        this.rowInfo.set(y, {
          rangesOfNoBeaconsOnRow: [],
          beaconsOnRow: []
        })
      }
    }

    INPUT[inputKey].split('\n').forEach((line) => {
      const [sensorText, beaconText] = line.split(': ')
      const sensorX = Number(sensorText.slice(12).split(',')[0])
      const sensorY = Number(sensorText.split('y=')[1])
      const beaconX = Number(beaconText.slice(23).split(',')[0])
      const beaconY = Number(beaconText.split('y=')[1])

      this.xMin = Math.min(this.xMin, sensorX, beaconX)
      this.xMax = Math.max(this.xMax, sensorX, beaconX)
      this.yMin = Math.min(this.yMin, sensorY, beaconY)
      if (!part2) this.yMax = Math.max(this.yMax, sensorY, beaconY)

      this.sensors.push(`${sensorX},${sensorY}`)
      this.beacons.push(`${beaconX},${beaconY}`)

      for (let y = 0; y <= this.yMax; y++) {
        if (part2 || y === rowWeCareAbout) {
          const { beaconsOnRow } = this.rowInfo.get(y)!
          if (beaconY === y && !beaconsOnRow.includes(beaconX)) {
            beaconsOnRow.push(beaconX)
          }
        }
      }
    })

    this.sensors.forEach((sensor, i) => {
      const [sensorX, sensorY] = sensor.split(',').map((n) => Number(n))
      const [beaconX, beaconY] = this.beacons[i]
        .split(',')
        .map((n) => Number(n))

      const distance = manhattanDistance([sensorX, sensorY], [beaconX, beaconY])

      for (let y = 0; y <= this.yMax; y++) {
        if (part2 || y === rowWeCareAbout) {
          const distanceToRowWeCareAbout = Math.abs(sensorY - y)

          const remainingDistance = distance - distanceToRowWeCareAbout

          if (remainingDistance >= 0) {
            const { rangesOfNoBeaconsOnRow } = this.rowInfo.get(y)!
            const xRangeOnRow = [
              sensorX - remainingDistance,
              sensorX + remainingDistance,
            ].sort((a, b) => a - b) as [number, number]
            rangesOfNoBeaconsOnRow.push(xRangeOnRow)
          }
        }
      }
    })

    Array.from(this.rowInfo.keys()).forEach(row => this.combineRangesOfNoBeaconsOnRow(row))
  }

  combineRangesOfNoBeaconsOnRow(row: number) {
    const rowInfo = this.rowInfo.get(row)
    if (!rowInfo) throw new Error(`we didn't care about row ${row}!`)
    const { beaconsOnRow, rangesOfNoBeaconsOnRow } = rowInfo

    rangesOfNoBeaconsOnRow.sort((a, b) => a[0] - b[0])

    const combinedRangesOfNoBeaconsOnRow = rangesOfNoBeaconsOnRow.reduce(
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

    this.rowInfo.set(row, { beaconsOnRow, rangesOfNoBeaconsOnRow: combinedRangesOfNoBeaconsOnRow })
  }

  countNoBeaconsOnRow(row: number) {
    const rowInfo = this.rowInfo.get(row)
    if (!rowInfo) throw new Error(`we didn't care about row ${row}!`)
    const { beaconsOnRow, rangesOfNoBeaconsOnRow } = rowInfo

    rangesOfNoBeaconsOnRow.sort((a, b) => a[0] - b[0])

    const combinedRangesOfNoBeaconsOnRow = rangesOfNoBeaconsOnRow.reduce(
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

    let count = combinedRangesOfNoBeaconsOnRow.reduce(
      (currentCount, currentRange) => {
        return currentCount + (currentRange[1] - currentRange[0])
      },
      1
    )

    beaconsOnRow.forEach((beaconX) => {
      if (
        combinedRangesOfNoBeaconsOnRow.some(
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
      const startTime = new Date().getTime()

      const rowWeCareAbout = inputKey === 'DEMO' ? 10 : 2000000

      const field = new Field(inputKey, rowWeCareAbout)

      const answer = field.countNoBeaconsOnRow(rowWeCareAbout)

      console.log(`Part 1 run time: ${new Date().getTime() - startTime}ms`)

      return {
        answer1: answer.toString(),
      }
    },
  },
  {
    label: 'Find Distress Beacon',
    onClick: (inputKey: string) => {
      const startTime = new Date().getTime()

      const rowWeCareAbout = inputKey === 'DEMO' ? 10 : 2000000

      const field = new Field(inputKey, rowWeCareAbout, true)

      const rowWithGap = Array.from(field.rowInfo.keys()).find(key => {
        const { rangesOfNoBeaconsOnRow } = field.rowInfo.get(key)!
        return rangesOfNoBeaconsOnRow.length === 2
      })!

      const { rangesOfNoBeaconsOnRow } = field.rowInfo.get(rowWithGap)!

      const x = rangesOfNoBeaconsOnRow[0][1] + 1

      console.log(`Part 2 run time: ${new Date().getTime() - startTime}ms`)

      return {
        answer2: ((x * 4000000) + rowWithGap).toString()
      }
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The row has <code>{answer}</code> spaces that can't have a beacon.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      The distress beacon's tuning frequency is{' '}
      <code>{answer}</code>.
    </span>
  ),
  buttons: BUTTONS,
  day: 15,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Beacon Exclusion Zone',
}

export default config
