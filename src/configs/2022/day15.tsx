import inputs from '../../inputs/2022/day15'
import { DayConfig } from '../../routes/Day'
import manhattanDistance from '../../utils/manhattanDistance'

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

  constructor(input: string, rowWeCareAbout: number, part2?: boolean) {
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

    input.split('\n').forEach((line) => {
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

export const checkForBeacons = (input: string, rowWeCareAbout = 2000000) => {
  const field = new Field(input, rowWeCareAbout)

  const answer = field.countNoBeaconsOnRow(rowWeCareAbout)

  return {
    answer1: answer
  }
}

export const findDistressBeacon = (input: string, rowWeCareAbout = 2000000) => {
  const field = new Field(input, rowWeCareAbout, true)

  const rowWithGap = Array.from(field.rowInfo.keys()).find(key => {
    const { rangesOfNoBeaconsOnRow } = field.rowInfo.get(key)!
    return rangesOfNoBeaconsOnRow.length === 2
  })!

  const { rangesOfNoBeaconsOnRow } = field.rowInfo.get(rowWithGap)!

  const x = rangesOfNoBeaconsOnRow[0][1] + 1

  return {
    answer2: ((x * 4000000) + rowWithGap)
  }
}

const day15: Omit<DayConfig, 'year'> = {
  answer1Text: `The row has answer spaces that can't have a beacon.`,
  answer2Text: `The distress beacon's tuning frequency is answer.`,
  buttons: [
    {
      label: 'Check for Beacons',
      onClick: checkForBeacons
    },
    {
      label: 'Find Distress Beacon',
      onClick: findDistressBeacon
    },
  ],
  id: 15,
  inputs,
  title: 'Beacon Exclusion Zone',
}

export default day15
