import inputs from '../../inputs/2021/day05'
import { DayConfig } from '../../routes/Day'

interface Line {
  x1: number
  y1: number
  x2: number
  y2: number
}

const isHorizOrVert = ({ x1, y1, x2, y2 }: Line): boolean =>
  x1 === x2 || y1 === y2

const drawHOrVLine = (
  map: Map<string, number>,
  { x1, x2, y1, y2 }: Line
) => {
  if (x1 === x2) {
    for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
      const key = `${x1},${y}`
      const prev = map.get(key) || 0
      map.set(key, prev + 1)
    }
  }
  if (y1 === y2) {
    for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
      const key = `${x},${y1}`
      const prev = map.get(key) || 0
      map.set(key, prev + 1)
    }
  }
}

const countIntersections = (map: Map<string, number>) => {
  let intersectionCount = 0
  map.forEach((lineCount) => {
    if (lineCount > 1) intersectionCount++
  })
  return intersectionCount
}

export const checkVents = (input: string) => {
  const lines: Line[] = input.split('\n')
    .map(line => {
      const [start, end] = line.split(' -> ')
      const [x1, y1] = start.split(',')
      const [x2, y2] = end.split(',')
      return {
        x1: Number(x1),
        y1: Number(y1),
        x2: Number(x2),
        y2: Number(y2),
      }
    })
  const map: Map<string, number> = new Map()
  lines
    .filter(line => isHorizOrVert(line))
    .forEach(line => drawHOrVLine(map, line))
  const intersectionCount = countIntersections(map)

  return {
    answer1: intersectionCount
  }
}

const drawDiagLine = (
  map: Map<string, number>,
  { x1, x2, y1, y2 }: Line
) => {
  // Up and to the right
  if (x1 < x2 && y1 < y2) {
    for (
      let x = x1, y = y1;
      x <= x2 && y <= y2;
      x++, y++
    ) {
      const key = `${x},${y}`
      const prev = map.get(key) || 0
      map.set(key, prev + 1)
    }
  }
  // Down and to the right
  if (x1 < x2 && y1 > y2) {
    for (
      let x = x1, y = y1;
      x <= x2 && y >= y2;
      x++, y--
    ) {
      const key = `${x},${y}`
      const prev = map.get(key) || 0
      map.set(key, prev + 1)
    }
  }
  // Up and to the left
  if (x1 > x2 && y1 < y2) {
    for (
      let x = x1, y = y1;
      x >= x2 && y <= y2;
      x--, y++
    ) {
      const key = `${x},${y}`
      const prev = map.get(key) || 0
      map.set(key, prev + 1)
    }
  }
  // Down and to the left
  if (x1 > x2 && y1 > y2) {
    for (
      let x = x1, y = y1;
      x >= x2 && y >= y2;
      x--, y--
    ) {
      const key = `${x},${y}`
      const prev = map.get(key) || 0
      map.set(key, prev + 1)
    }
  }
}

export const checkAllVents = (input: string) => {
  const lines: Line[] = input.split('\n')
    .map(line => {
      const [start, end] = line.split(' -> ')
      const [x1, y1] = start.split(',')
      const [x2, y2] = end.split(',')
      return {
        x1: Number(x1),
        y1: Number(y1),
        x2: Number(x2),
        y2: Number(y2),
      }
    })
  const map: Map<string, number> = new Map()
  lines
    .forEach(line => isHorizOrVert(line) ?
      drawHOrVLine(map, line) :
      drawDiagLine(map, line)
    )
  const intersectionCount = countIntersections(map)

  return {
    answer2: intersectionCount
  }
}

const day05: Omit<DayConfig, 'year'> = {
  answer1Text: 'There are answer intersecting spots.',
  answer2Text: 'There are actually answer intersecting spots.',
  buttons: [
    {
      label: 'Check the Vents',
      onClick: checkVents
    },
    {
      label: 'Check All the Vents',
      onClick: checkAllVents
    }
  ],
  id: 5,
  inputs,
  title: 'Hydrothermal Venture',
}

export default day05
