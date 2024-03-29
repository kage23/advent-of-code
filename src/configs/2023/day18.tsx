import inputs from '../../inputs/2023/day18'
import { DayConfig } from '../../routes/Day'
import { bigPolygonArea } from '../../utils/polygonArea'

const writeFieldToConsole = (
  dugHoles: Set<string>,
  rowRange: number[],
  colRange: number[]
) => {
  let field = ''
  for (let row = rowRange[0]; row <= rowRange[1]; row++) {
    for (let col = colRange[0]; col <= colRange[1]; col++) {
      if (dugHoles.has([row, col].join(','))) field += '#'
      else field += '.'
    }
    field += '\n'
  }
  console.log(field)
}

export const digLagoon = (input: string) => {
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

const getAreaBetter = (input: string) => {
  const position = [0, 0]
  const instructions = input.split('\n')

  const vertices = [position.join(',')]
  instructions.forEach((line) => {
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

  return bigPolygonArea(vertices.map((v) => v.split(',').map(Number)))
}

export const digLagoonBetter = (input: string) => ({
  answer1: getAreaBetter(input).toString(),
})

export const digGiantLagoon = (input: string) => {
  const newInput = input
    .split('\n')
    .map((line) => {
      const hexCode = line.match(/[0-9a-f]{6}/)![0]
      const distance = parseInt(hexCode.slice(0, 5), 16)
      const x = hexCode.charAt(5)
      const dir = x === '0' ? 'R' : x === '1' ? 'D' : x === '2' ? 'L' : 'U'
      return `${dir} ${distance}`
    })
    .join('\n')
  return { answer2: getAreaBetter(newInput).toString() }
}

const day18: Omit<DayConfig, 'year'> = {
  answer1Text: 'The dug-out area is answer cubic meters.',
  answer2Text: 'The bigger dug-out area is answer cubic meters.',
  buttons: [
    {
      label: 'Dig Lagoon',
      onClick: digLagoon,
    },
    {
      label: 'Dig Lagoon Better',
      onClick: digLagoonBetter,
    },
    {
      label: 'Dig Giant Lagoon',
      onClick: digGiantLagoon,
    },
  ],
  id: 18,
  inputs,
  title: 'Lavaduct Lagoon',
}

export default day18
