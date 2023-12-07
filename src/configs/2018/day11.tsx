import inputs from '../../inputs/2018/day11'
import { DayConfig } from '../../routes/Day'

const calculateCellPower = (x: number, y: number, input: string): number => {
  const serialNumber = parseInt(inputs.get(input)!)
  const rackId = x + 10
  let powerLevel = rackId * y
  powerLevel += serialNumber
  powerLevel *= rackId
  powerLevel = Math.floor(powerLevel / 100) % 10
  powerLevel -= 5

  return powerLevel
}

const calculatePowerGrid = (x: number, y: number, inSize: number, input: string): number => {
  const size = Math.min(inSize, 301 - x, 301 - y)
  let totalPower = 0
  for (let xi = x; xi < x + size; xi++)
    for (let yi = y; yi < y + size; yi++)
      totalPower += calculateCellPower(xi, yi, input)
  return totalPower
}

export const findBestGrid = (input: string, size = 3): { answer1: string } => {
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

export const findBestVariableSizeGrid = (input: string): { answer2: string } => {
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

const day11: Omit<DayConfig, 'year'> = {
  answer1Text: 'The best 3x3 grid starts at answer.',
  answer2Text: 'The best variable size grid is answer.',
  buttons: [
    {
      label: 'Find Best 3x3 Grid',
      onClick: findBestGrid
    },
    {
      label: 'Find Best Variable Size Grid',
      onClick: findBestVariableSizeGrid
    },
  ],
  id: 11,
  inputs,
  title: 'Chronal Charge',
}

export default day11
