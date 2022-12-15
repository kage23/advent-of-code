import {
  IButton,
  IDayConfig
} from '../Config'

import INPUT from '../Inputs/2018/Day11'

const findBestGrid = (input: string, size: number = 3): { answer1: string } => {
  const cellPowerMap: Map<string, number> = new Map()
  for (let x = 1; x <= 300; x++) {
    for (let y = 1; y <= 300; y++) {
      cellPowerMap.set(`${x},${y}`, calculatePowerGrid(x, y, size, input))
    }
  }
  let highestPower = Number.MIN_SAFE_INTEGER
  let bestCell = ''
  for (const [cell, power] of cellPowerMap) {
    if (power > highestPower) {
      highestPower = power
      bestCell = cell
    }
  }
  return {
    answer1: bestCell
  }
}

const findBestVariableSizeGrid = (input: string): { answer2: string } => {
  const cellPowerMap: Map<string, number> = new Map()
  let prev = Number.MIN_SAFE_INTEGER
  for (let x = 1; x <= 300; x++) {
    for (let y = 1; y <= 300; y++) {
      for (let size = 1; size <= 300; size++) {
        if (size + x <= 301 && size + y <= 301) {
          const power = calculatePowerGrid(x, y, size, input)
          cellPowerMap.set(`${x},${y},${size}`, power)
          if (prev > power && size >= 20) break
          prev = power
        }
      }
    }
  }
  let highestPower = Number.MIN_SAFE_INTEGER
  let bestCell = ''
  for (const [cell, power] of cellPowerMap) {
    if (power > highestPower) {
      highestPower = power
      bestCell = cell
    }
  }
  return {
    answer2: bestCell
  }
}

const calculatePowerGrid = (x: number, y: number, inSize: number, input: string): number => {
  const size = Math.min(inSize, 301 - x, 301 - y)
  let totalPower = 0
  for (let xi = x; xi < x + size; xi++)
    for (let yi = y; yi < y + size; yi++)
      totalPower += calculateCellPower(xi, yi, input)
  return totalPower
}

const calculateCellPower = (x: number, y: number, input: string): number => {
  const serialNumber = parseInt(INPUT[input])
  const rackId = x + 10
  let powerLevel = rackId * y
  powerLevel += serialNumber
  powerLevel *= rackId
  powerLevel = Math.floor(powerLevel / 100) % 10
  powerLevel -= 5

  return powerLevel
}

const renderDay = (dayConfig: IDayConfig, inputKey: string): JSX.Element => (
  <div className="render-box">
    <p>Serial Number: {dayConfig.INPUT[inputKey]}</p>
  </div>
)

const BUTTONS: IButton[] = [
  {
    label: 'Find Best 3x3 Grid',
    onClick: findBestGrid
  },
  {
    label: 'Find Best Variable Size Grid',
    onClick: findBestVariableSizeGrid
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The best 3x3 grid starts at <code>{answer}</code>.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      The best variable size grid is <code>{answer}</code>.
    </span>
  ),
  buttons: BUTTONS,
  day: 11,
  INPUT,
  renderDay,
  title: 'Chronal Charge'
}

export default config