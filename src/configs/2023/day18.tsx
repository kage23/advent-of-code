import inputs from '../../inputs/2023/day18'
import { DayConfig } from '../../routes/Day'

interface LineSegment {
  type: 'h' | 'v'
  start: number
  end: number
  position: number
}

const writeFieldToConsole = (dugHoles: Set<string>, rowRange: number[], colRange: number[]) => {
  let field = ''
  for (let row = rowRange[0]; row <= rowRange[1]; row++) {
    for (let col = colRange[0]; col <= colRange[1]; col++) {
      if (dugHoles.has([row, col].join(','))) field += '#'
      else field += '.'
    }
    field += '\n'
  }
  console.log(field)
  console.log(dugHoles)
}

const isInside = (testPoint: number[], lineSegments: LineSegment[]) =>
  lineSegments.filter(({ type, position, start, end }) => type === 'h' && position < testPoint[0] && start < testPoint[1] && end >= testPoint[1]).length % 2 === 1

export const digTrench = (input: string) => {
  const position = [0, 0]
  const rowRange = [0, 0]
  const colRange = [0, 0]
  const instructions = input.split('\n')
  const dugHoles = new Set<string>()
  dugHoles.add('0,0')
  const verticalCrossings = new Set<string>()
  instructions.forEach((line, i) => {
    const [dir, d] = line.split(' ')
    const dist = Number(d)
    switch (dir) {
      case 'U': {
        for (let r = position[0] - 1, i = 0; i < dist; r--, i++) {
          dugHoles.add([r, position[1]].join(','))
        }
        position[0] -= dist
        if (instructions[i + 1]?.startsWith('R')) {
          verticalCrossings.add(position.join(','))
        }
        break
      }
      case 'D': {
        for (let r = position[0] + 1, i = 0; i < dist; r++, i++) {
          dugHoles.add([r, position[1]].join(','))
        }
        position[0] += dist
        if (instructions[i + 1]?.startsWith('R')) {
          verticalCrossings.add(position.join(','))
        }
        break
      }
      case 'R': {
        for (let c = position[1]; c <= position[1] + dist; c++) {
          dugHoles.add([position[0], c].join(','))
          if (c < position[1] + dist) {
            verticalCrossings.add([position[0], c].join(','))
          }
        }
        position[1] += dist
        break
      }
      case 'L': {
        for (let c = position[1]; c >= position[1] - dist; c--) {
          dugHoles.add([position[0], c].join(','))
          if (c !== position[1]) {
            verticalCrossings.add([position[0], c].join(','))
          }
        }
        position[1] -= dist
        break
      }
    }
    rowRange[0] = Math.min(rowRange[0], position[0])
    rowRange[1] = Math.max(rowRange[1], position[0])
    colRange[0] = Math.min(colRange[0], position[1])
    colRange[1] = Math.max(colRange[1], position[1])
  })
  console.log('after digging trench:')
  writeFieldToConsole(dugHoles, rowRange, colRange)
  // See if the start is a vertical crossing
  if (dugHoles.has('0,1')) verticalCrossings.add('0,0')
  // Loop through the whole grid and dig out the inside pieces
  for (let row = rowRange[0]; row <= rowRange[1]; row++) {
    for (let col = colRange[0]; col <= colRange[1]; col++) {
      // Travel north and count the crossings along the way
      let crossings = 0
      for (let r = row - 1; r >= rowRange[0]; r--) {
        if (verticalCrossings.has([r, col].join(','))) crossings++
      }
      // Odd numbers of crossings means inside
      if (crossings % 2 === 1) dugHoles.add([row, col].join(','))
    }
  }
  console.log('after digging inside:')
  writeFieldToConsole(dugHoles, rowRange, colRange)
  return { answer1: dugHoles.size }
}

const experimentation = (input: string) => {
  const position = [0, 0]
  const instructions = input.split('\n')

  const vertices = [position.join(',')]
  instructions.forEach((line, i) => {
    const [dir, d] = line.split(' ')
    const dist = Number(d)
    switch (dir) {
      case 'U':
        position[0] -= dist
        break
      case 'D':
        position[0] += dist
        break
      case 'L':
        position[1] -= dist
        break
      case 'R':
        position[1] += dist
        break
    }
    if (!(position[0] === 0 && position[1] === 0)) {
      vertices.push(position.join(','))
    }
  })
  console.log('vertices', vertices)

  const area = [...vertices, vertices[0]].reduce((sum, v, i, vArr) => {
    if (i !== vertices.length) {
      const vx = v.split(',').map(Number)
      const vx2 = vArr[i + 1].split(',').map(Number)
      return sum + (vx[0] * vx2[1]) - (vx2[0] * vx[1])
    }
    return sum
  }, 0)
  console.log('area', area)

  // const lineSegments: LineSegment[] = []
  // vertices.forEach((vx, i) => {
  //   const v = vx.split(',').map(Number)
  //   const next = (vertices[i + 1] || vertices[0]).split(',').map(Number)
  //   const ls = {
  //     type: v[0] === next[0] ? 'h' : 'v'
  //   } as LineSegment
  //   ls.position = ls.type === 'h' ? v[0] : v[1]
  //   ls.start = ls.type === 'h' ? Math.min(v[1], next[1]) : Math.min(v[0], next[0])
  //   ls.end = ls.type === 'h' ? Math.max(v[1], next[1]) : Math.max(v[0], next[0])
  //   lineSegments.push(ls)
  // })

  // const doubledVertices = [...vertices, ...vertices]
  // // const innerAreas: number[] = []
  // // const outerAreas: number[] = []
  // vertices.forEach((v, i) => {
  //   const vx = v.split(',').map(Number)
  //   const vx2 = doubledVertices[i + 2].split(',').map(Number)
  //   // const inclusiveArea = (Math.abs(vx2[0] - vx[0]) + 1) * (Math.abs(vx2[1] - vx[1]) + 1)
  //   // const exclusiveArea = (Math.abs(vx2[0] - vx[0])) * (Math.abs(vx2[1] - vx[1]))
  //   const testPoint = [Math.min(vx[0], vx2[0]) + 1, Math.min(vx[1], vx2[1]) + 1]
  //   if (isInside(testPoint, lineSegments)) {
  //     console.log(`(${vx}),(${vx2}) - inner area`)
  //     // innerAreas.push(inclusiveArea)
  //   } else {
  //     console.log(`(${vx}),(${vx2}) - outer area`)
  //     // outerAreas.push(exclusiveArea)
  //   }
  // })
  // // console.log('inner areas', innerAreas)
  // // console.log('outer areas', outerAreas)
}

const day18: Omit<DayConfig, 'year'> = {
  answer1Text: 'The dug-out area is answer cubic meters.',
  answer2Text: 'The bigger dug-out area is answer cubic meters.',
  buttons: [
    {
      label: 'Dig Trench',
      onClick: digTrench,
    },
    {
      label: 'Experimentation',
      onClick: experimentation
    }
    // {
    //   label: 'Find Path for Ultra Crucibles',
    //   onClick: findUltraCruciblePath,
    // },
  ],
  id: 18,
  inputs,
  title: 'Lavaduct Lagoon',
}

export default day18
