import inputs from '../../inputs/2020/day24'
import { DayConfig } from '../../routes/Day'

const getNeighbors = ([x, y]: [number, number]): {
  [key: string]: [number, number]
} => ({
  nw: [x - 1, y + 1],
  ne: [x + 1, y + 1],
  w: [x - 2, y],
  e: [x + 2, y],
  sw: [x - 1, y - 1],
  se: [x + 1, y - 1]
})

const getTileCoords = (instruction: string): string => {
  let currentCoord = [0, 0] as [number, number]
  let i = 0
  while (i < instruction.length) {
    let next = instruction.charAt(i)
    if (next === 'n' || next === 's') {
      next += instruction.charAt(i + 1)
      i += 2
    } else {
      i++
    }
    currentCoord = getNeighbors(currentCoord)[next]
  }
  return JSON.stringify(currentCoord)
}

export const flipTiles = (input: string) => {
  const instructionsList = input.split('\n')

  // false/undefined is white, true is black
  const tiles = new Map<string, boolean>()

  instructionsList.forEach(instruction => {
    const tileCoords = getTileCoords(instruction)
    const tile = tiles.get(tileCoords)
    tiles.set(tileCoords, !tile)
  })

  return {
    answer1: Array.from(tiles.values()).filter(x => x).length
  }
}

const getAllNeighbors = (coords: string): string[] => {
  const [x, y] = JSON.parse(coords)
  return [
    [x - 1, y + 1],
    [x + 1, y + 1],
    [x - 2, y],
    [x + 2, y],
    [x - 1, y - 1],
    [x + 1, y - 1]
  ].map(x => JSON.stringify(x))
}

const advanceOneStep = (tiles: Map<string, boolean>): Map<string, boolean> => {
  const newTiles: Map<string, boolean> = new Map()
  for (const [coords, value] of tiles.entries()) {
    getAllNeighbors(coords).forEach(tileNeighbor => {
      if (!newTiles.has(tileNeighbor)) {
        newTiles.set(tileNeighbor, false)
      }
    })
    const neighborBlackCount = getAllNeighbors(coords).map(x => tiles.get(x)).filter(x => x).length
    if (value) {
      // Tile is currently black
      newTiles.set(coords, neighborBlackCount !== 0 && neighborBlackCount <= 2)
    } else {
      // Tile is currently white
      newTiles.set(coords, neighborBlackCount === 2)
    }
  }
  return newTiles
}

export const conwaysGameOfTiles = (input: string) => {
  // Set initial tiles
  const instructionsList = input.split('\n')

  // false/undefined is white, true is black
  let tiles = new Map<string, boolean>()

  instructionsList.forEach(instruction => {
    const tileCoords = getTileCoords(instruction)
    const tile = tiles.get(tileCoords)
    tiles.set(tileCoords, !tile)
    getAllNeighbors(tileCoords).forEach(tileNeighbor => {
      if (!tiles.has(tileNeighbor)) {
        tiles.set(tileNeighbor, false)
      }
    })
  })

  for (let i = 0; i < 100; i++) {
    if (i % 10 === 0) console.log(`About to do Day ${i + 1}...`)
    tiles = advanceOneStep(tiles)
  }

  return {
    answer2: Array.from(tiles.values()).filter(x => x).length
  }
}

const day24: Omit<DayConfig, 'year'> = {
  answer1Text: 'After following all the instructions, answer tiles are black.',
  answer2Text: 'After 100 days, answer tiles are black.',
  buttons: [
    {
      label: 'Flip Tiles',
      onClick: flipTiles
    },
    {
      label: "Conway's Game of Tiles",
      onClick: conwaysGameOfTiles
    },
  ],
  id: 24,
  inputs,
  title: 'Lobby Layout',
}

export default day24
