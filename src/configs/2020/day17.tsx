import inputs from '../../inputs/2020/day17'
import { DayConfig } from '../../routes/Day'

interface Field {
  points: Map<string, boolean>
  xRange: [number, number]
  yRange: [number, number]
  zRange: [number, number]
}

interface HyperField extends Field {
  wRange: [number, number]
}

const parseInput = (input: string): Field => {
  const field: Field = {
    points: new Map(),
    xRange: [0, 0],
    yRange: [0, 0],
    zRange: [0, 0]
  }

  input.split('\n').forEach((row, y) => {
    field.yRange[1] = Math.max(y, field.yRange[1])
    row.split('').forEach((char, x) => {
      field.xRange[1] = Math.max(x, field.xRange[1])
      field.points.set(`${x},${y},0`, char === '#')
    })
  })

  return field
}

const getNeighbors = (
  x: number,
  y: number,
  z: number,
  points: Map<string, boolean>
): boolean[] => (
  [
    ['-', '-', '-'],
    ['-', '-', '0'],
    ['-', '-', '+'],
    ['-', '0', '-'],
    ['-', '0', '0'],
    ['-', '0', '+'],
    ['-', '+', '-'],
    ['-', '+', '0'],
    ['-', '+', '+'],
    ['0', '-', '-'],
    ['0', '-', '0'],
    ['0', '-', '+'],
    ['0', '0', '-'],
    // ['0', '0', '0'],
    ['0', '0', '+'],
    ['0', '+', '-'],
    ['0', '+', '0'],
    ['0', '+', '+'],
    ['+', '-', '-'],
    ['+', '-', '0'],
    ['+', '-', '+'],
    ['+', '0', '-'],
    ['+', '0', '0'],
    ['+', '0', '+'],
    ['+', '+', '-'],
    ['+', '+', '0'],
    ['+', '+', '+'],
  ].map(([xAdj, yAdj, zAdj]) => {
    const x1 = x + (xAdj === '-' ? -1 : xAdj === '+' ? 1 : 0)
    const y1 = y + (yAdj === '-' ? -1 : yAdj === '+' ? 1 : 0)
    const z1 = z + (zAdj === '-' ? -1 : zAdj === '+' ? 1 : 0)

    return points.get(`${x1},${y1},${z1}`) || false
  })
)

const advanceGeneration = (field: Field): Field => {
  const { points, xRange, yRange, zRange } = field

  const newField: Field = {
    points: new Map(),
    xRange: [xRange[0], xRange[1]],
    yRange: [yRange[0], yRange[1]],
    zRange: [zRange[0], zRange[1]]
  }

  for (let x = xRange[0] - 1; x <= xRange[1] + 1; x++) {
    for (let y = yRange[0] - 1; y <= yRange[1] + 1; y++) {
      for (let z = zRange[0] - 1; z <= zRange[1] + 1; z++) {
        const currentActive = points.get(`${x},${y},${z}`) || false
        if (currentActive) {
          if (x === xRange[0]) newField.xRange[0] = xRange[0] - 1
          if (x === xRange[1]) newField.xRange[1] = xRange[1] + 1
          if (y === yRange[0]) newField.yRange[0] = yRange[0] - 1
          if (y === yRange[1]) newField.yRange[1] = yRange[1] + 1
          if (z === zRange[0]) newField.zRange[0] = zRange[0] - 1
          if (z === zRange[1]) newField.zRange[1] = zRange[1] + 1
        }
        const neighborsActiveCount = getNeighbors(x, y, z, points).filter(x => x).length
        newField.points.set(`${x},${y},${z}`, currentActive
          ? (neighborsActiveCount === 2 || neighborsActiveCount === 3)
          : neighborsActiveCount === 3
        )
      }
    }
  }

  return newField
}

export const advanceSixGenerations = (input: string) => {
  let field: Field = parseInput(input)

  for (let i = 0; i < 6; i++) field = advanceGeneration(field)

  return {
    answer1: [...field.points.values()].filter(x => x).length
  }
}

const parseHyperInput = (input: string): HyperField => {
  const field: HyperField = {
    points: new Map(),
    wRange: [0, 0],
    xRange: [0, 0],
    yRange: [0, 0],
    zRange: [0, 0]
  }

  input.split('\n').forEach((row, y) => {
    field.yRange[1] = Math.max(y, field.yRange[1])
    row.split('').forEach((char, x) => {
      field.xRange[1] = Math.max(x, field.xRange[1])
      field.points.set(`0,${x},${y},0`, char === '#')
    })
  })

  return field
}

const getHyperNeighbors = (
  w: number,
  x: number,
  y: number,
  z: number,
  points: Map<string, boolean>
): boolean[] => (
  [
    ['-', '-', '-', '-'],
    ['-', '-', '-', '0'],
    ['-', '-', '-', '+'],
    ['-', '-', '0', '-'],
    ['-', '-', '0', '0'],
    ['-', '-', '0', '+'],
    ['-', '-', '+', '-'],
    ['-', '-', '+', '0'],
    ['-', '-', '+', '+'],
    ['-', '0', '-', '-'],
    ['-', '0', '-', '0'],
    ['-', '0', '-', '+'],
    ['-', '0', '0', '-'],
    ['-', '0', '0', '0'],
    ['-', '0', '0', '+'],
    ['-', '0', '+', '-'],
    ['-', '0', '+', '0'],
    ['-', '0', '+', '+'],
    ['-', '+', '-', '-'],
    ['-', '+', '-', '0'],
    ['-', '+', '-', '+'],
    ['-', '+', '0', '-'],
    ['-', '+', '0', '0'],
    ['-', '+', '0', '+'],
    ['-', '+', '+', '-'],
    ['-', '+', '+', '0'],
    ['-', '+', '+', '+'],
    ['0', '-', '-', '-'],
    ['0', '-', '-', '0'],
    ['0', '-', '-', '+'],
    ['0', '-', '0', '-'],
    ['0', '-', '0', '0'],
    ['0', '-', '0', '+'],
    ['0', '-', '+', '-'],
    ['0', '-', '+', '0'],
    ['0', '-', '+', '+'],
    ['0', '0', '-', '-'],
    ['0', '0', '-', '0'],
    ['0', '0', '-', '+'],
    ['0', '0', '0', '-'],
    // ['0', '0', '0', '0'],
    ['0', '0', '0', '+'],
    ['0', '0', '+', '-'],
    ['0', '0', '+', '0'],
    ['0', '0', '+', '+'],
    ['0', '+', '-', '-'],
    ['0', '+', '-', '0'],
    ['0', '+', '-', '+'],
    ['0', '+', '0', '-'],
    ['0', '+', '0', '0'],
    ['0', '+', '0', '+'],
    ['0', '+', '+', '-'],
    ['0', '+', '+', '0'],
    ['0', '+', '+', '+'],
    ['+', '-', '-', '-'],
    ['+', '-', '-', '0'],
    ['+', '-', '-', '+'],
    ['+', '-', '0', '-'],
    ['+', '-', '0', '0'],
    ['+', '-', '0', '+'],
    ['+', '-', '+', '-'],
    ['+', '-', '+', '0'],
    ['+', '-', '+', '+'],
    ['+', '0', '-', '-'],
    ['+', '0', '-', '0'],
    ['+', '0', '-', '+'],
    ['+', '0', '0', '-'],
    ['+', '0', '0', '0'],
    ['+', '0', '0', '+'],
    ['+', '0', '+', '-'],
    ['+', '0', '+', '0'],
    ['+', '0', '+', '+'],
    ['+', '+', '-', '-'],
    ['+', '+', '-', '0'],
    ['+', '+', '-', '+'],
    ['+', '+', '0', '-'],
    ['+', '+', '0', '0'],
    ['+', '+', '0', '+'],
    ['+', '+', '+', '-'],
    ['+', '+', '+', '0'],
    ['+', '+', '+', '+'],
  ].map(([wAdj, xAdj, yAdj, zAdj]) => {
    const w1 = w + (wAdj === '-' ? -1 : wAdj === '+' ? 1 : 0)
    const x1 = x + (xAdj === '-' ? -1 : xAdj === '+' ? 1 : 0)
    const y1 = y + (yAdj === '-' ? -1 : yAdj === '+' ? 1 : 0)
    const z1 = z + (zAdj === '-' ? -1 : zAdj === '+' ? 1 : 0)

    return points.get(`${w1},${x1},${y1},${z1}`) || false
  })
)

const advanceHyperGeneration = (field: HyperField): HyperField => {
  const { points, wRange, xRange, yRange, zRange } = field

  const newField: HyperField = {
    points: new Map(),
    wRange: [wRange[0], wRange[1]],
    xRange: [xRange[0], xRange[1]],
    yRange: [yRange[0], yRange[1]],
    zRange: [zRange[0], zRange[1]]
  }

  for (let w = wRange[0] - 1; w <= wRange[1] + 1; w++) {
    for (let x = xRange[0] - 1; x <= xRange[1] + 1; x++) {
      for (let y = yRange[0] - 1; y <= yRange[1] + 1; y++) {
        for (let z = zRange[0] - 1; z <= zRange[1] + 1; z++) {
          const currentActive = points.get(`${w},${x},${y},${z}`) || false
          if (currentActive) {
            if (w === wRange[0]) newField.wRange[0] = wRange[0] - 1
            if (w === wRange[1]) newField.wRange[1] = wRange[1] + 1
            if (x === xRange[0]) newField.xRange[0] = xRange[0] - 1
            if (x === xRange[1]) newField.xRange[1] = xRange[1] + 1
            if (y === yRange[0]) newField.yRange[0] = yRange[0] - 1
            if (y === yRange[1]) newField.yRange[1] = yRange[1] + 1
            if (z === zRange[0]) newField.zRange[0] = zRange[0] - 1
            if (z === zRange[1]) newField.zRange[1] = zRange[1] + 1
          }
          const neighborsActiveCount = getHyperNeighbors(w, x, y, z, points).filter(x => x).length
          newField.points.set(`${w},${x},${y},${z}`, currentActive
            ? (neighborsActiveCount === 2 || neighborsActiveCount === 3)
            : neighborsActiveCount === 3
          )
        }
      }
    }
  }

  return newField
}

export const advanceSixHyperGenerations = (input: string) => {
  let field: HyperField = parseHyperInput(input)

  for (let i = 0; i < 6; i++) field = advanceHyperGeneration(field)

  return {
    answer2: [...field.points.values()].filter(x => x).length
  }
}

const day17: Omit<DayConfig, 'year'> = {
  answer1Text: 'After six generations, answer cubes are active.',
  answer2Text: 'After six hyper-generations, answer cubes are active.',
  buttons: [
    {
      label: 'Advance Six Generations',
      onClick: advanceSixGenerations
    },
    {
      label: 'Advance Six Hyper-Generations',
      onClick: advanceSixHyperGenerations
    },
  ],
  id: 17,
  inputs,
  title: 'Conway Cubes',
}

export default day17
