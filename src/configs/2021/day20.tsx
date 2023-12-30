import inputs from '../../inputs/2021/day20'
import { DayConfig } from '../../routes/Day'

const drawImageInConsole = (image: Map<string, "#" | ".">) => {
  let drawing = ''

  let minRow = Number.MAX_SAFE_INTEGER
  let minCol = Number.MAX_SAFE_INTEGER
  let maxRow = Number.MIN_SAFE_INTEGER
  let maxCol = Number.MIN_SAFE_INTEGER

  Array.from(image.keys()).forEach(key => {
    const [rowIdx, colIdx] = key.split(',').map(n => Number(n))
    minRow = Math.min(minRow, rowIdx)
    maxRow = Math.max(maxRow, rowIdx)
    minCol = Math.min(minCol, colIdx)
    maxCol = Math.max(maxCol, colIdx)
  })

  for (let row = minRow; row <= maxRow; row++) {
    for (let col = minCol; col <= maxCol; col++) {
      drawing += (image.get(`${row},${col}`) || '.')
    }
    drawing += '\n'
  }

  console.log(drawing)
}

const getNeighborNumber = (
  row: number,
  col: number,
  image: Map<string, '#' | '.'>,
  time: number,
  demo: boolean
): number => {
  const neighbors = [
    [row - 1, col - 1], [row - 1, col], [row - 1, col + 1],
    [row, col - 1], [row, col], [row, col + 1],
    [row + 1, col - 1], [row + 1, col], [row + 1, col + 1]
  ]
  const binary = neighbors.reduce((bin, [nRow, nCol]) => {
    let char = image.get(`${nRow},${nCol}`)
    if (char === undefined) {
      if (demo || time % 2 === 1) {
        char = '.'
      } else {
        char = '#'
      }
    }
    return bin + (char === '#' ? '1' : '0')
  }, '')
  return parseInt(binary, 2)
}

const enhance = (
  image: Map<string, '#' | '.'>,
  algStr: string,
  time: number,
  demo: boolean
): Map<string, '#' | '.'> => {
  const newImg: Map<string, '#' | '.'> = new Map()

  let minRow = Number.MAX_SAFE_INTEGER
  let minCol = Number.MAX_SAFE_INTEGER
  let maxRow = Number.MIN_SAFE_INTEGER
  let maxCol = Number.MIN_SAFE_INTEGER

  Array.from(image.keys()).forEach(key => {
    const [rowIdx, colIdx] = key.split(',').map(n => Number(n))
    minRow = Math.min(minRow, rowIdx)
    maxRow = Math.max(maxRow, rowIdx)
    minCol = Math.min(minCol, colIdx)
    maxCol = Math.max(maxCol, colIdx)
  })

  for (let row = minRow - 2; row <= maxRow + 2; row++) {
    for (let col = minCol - 2; col <= maxCol + 2; col++) {
      const neighborNumber = getNeighborNumber(row, col, image, time, demo)
      newImg.set(`${row},${col}`, algStr.charAt(neighborNumber) as '#' | '.')
    }
  }

  return newImg
}

const countLights = (image: Map<string, "#" | ".">): number => {
  return Array.from(image.values()).filter(x => x === '#').length
}

export const enhanceTwice = (input: string, demo = false) => {
  const [algStr, imgStr] = input.split('\n\n')

  let image: Map<string, '#' | '.'> = new Map()

  imgStr.split('\n').forEach((row, rowIndex) => {
    row.split('').forEach((char, colIdx) => {
      image.set(`${rowIndex},${colIdx}`, char as '#' | '.')
    })
  })

  drawImageInConsole(image)

  image = enhance(image, algStr, 1, demo)

  drawImageInConsole(image)

  image = enhance(image, algStr, 2, demo)

  drawImageInConsole(image)

  return {
    answer1: countLights(image)
  }
}

export const enhanceFiftyTimes = (input: string, demo = false) => {
  const [algStr, imgStr] = input.split('\n\n')

  let image: Map<string, '#' | '.'> = new Map()

  imgStr.split('\n').forEach((row, rowIndex) => {
    row.split('').forEach((char, colIdx) => {
      image.set(`${rowIndex},${colIdx}`, char as '#' | '.')
    })
  })

  for (let time = 1; time <= 50; time++) {
    image = enhance(image, algStr, time, demo)
  }

  return {
    answer2: countLights(image)
  }
}

const day20: Omit<DayConfig, 'year'> = {
  answer1Text: 'The resulting image has answer lit pixels.',
  answer2Text: 'The resulting image has answer lit pixels.',
  buttons: [
    {
      label: 'Enhance Twice (Demo)',
      onClick: (input) => enhanceTwice(input, true)
    },
    {
      label: 'Enhance Twice',
      onClick: enhanceTwice
    },
    {
      label: 'Enhance Fifty Times (Demo)',
      onClick: (input) => enhanceFiftyTimes(input, true)
    },
    {
      label: 'Enhance Fifty Times',
      onClick: enhanceFiftyTimes
    }
  ],
  id: 20,
  inputs,
  title: 'Trench Map',
}

export default day20
