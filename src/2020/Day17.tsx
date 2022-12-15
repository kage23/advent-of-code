import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'
import INPUT from '../Inputs/2020/Day17'

interface IField {
  points: Map<string, boolean>
  xRange: [number, number]
  yRange: [number, number]
  zRange: [number, number]
}

interface IHyperField extends IField {
  wRange: [number, number]
}

const advanceGeneration = (field: IField): IField => {
  const { points, xRange, yRange, zRange } = field

  const newField: IField = {
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

const advanceHyperGeneration = (field: IHyperField): IHyperField => {
  const { points, wRange, xRange, yRange, zRange } = field

  const newField: IHyperField = {
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

const parseInput = (input: string): IField => {
  const field: IField = {
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

const parseHyperInput = (input: string): IHyperField => {
  const field: IHyperField = {
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

const BUTTONS: IButton[] = [
  {
    label: 'Advance Six Generations',
    onClick: (inputKey: string) => {
      let field: IField = parseInput(INPUT[inputKey])

      for (let i = 0; i < 6; i++) field = advanceGeneration(field)

      return {
        answer1: [...field.points.values()].filter(x => x).length.toString()
      }
    }
  },
  {
    label: 'Advance Six Hyper-Generations',
    onClick: (inputKey: string) => {
      let field: IHyperField = parseHyperInput(INPUT[inputKey])

      for (let i = 0; i < 6; i++) field = advanceHyperGeneration(field)

      return {
        answer2: [...field.points.values()].filter(x => x).length.toString()
      }
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      After six generations, <code>{answer}</code> cubes are active.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      After six hyper-generations, <code>{answer}</code> cubes are active.
    </span>
  ),
  buttons: BUTTONS,
  day: 17,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Conway Cubes'
}

export default config