import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'
import INPUT from '../Inputs/2020/Day20'

interface ITile {
  id: number
  edges: string[]
  edgesReversed: string[]
  pattern: string[]
}

const createImage = (puzzle: ITile[][]): string[] => {
  const image: string[] = []
  const tileSize = puzzle[0][0].pattern.length - 2
  const puzzleSize = puzzle.length
  const imageSize = tileSize * puzzleSize

  const puzzleRows = puzzle.map(puzzleRow => (
    puzzleRow.map(({ pattern }) => (
      pattern.slice(1, -1).map(x => x.slice(1, -1))
    ))
  ))

  for (let imageRowIdx = 0; imageRowIdx < imageSize; imageRowIdx++) {
    if (image[imageRowIdx] === undefined) image[imageRowIdx] = ''
    const puzzleRowIdx = Math.floor(imageRowIdx / tileSize)
    const tileRowIdx = imageRowIdx % tileSize
    const puzzleRow = puzzleRows[puzzleRowIdx]
    puzzleRow.forEach(tile => {
      image[imageRowIdx] += tile[tileRowIdx]
    })
  }

  return image
}

const flipPattern = (pattern: string[]): string[] =>
  pattern.map(row => row.split('').reverse().join(''))

const isSeaMonster = (image: string[], row: number, col: number): boolean => {
  /*

                    #
  #    ##    ##    ###
   #  #  #  #  #  #

  */

  return (
    // There are enough rows
    (image.length > row + 2) &&
    // There are enough cols
    (image[0].length > col + 19) &&
    // All of the correct spots are sea monster spots
    image[row + 1].charAt(col + 0) === '#' &&
    image[row + 2].charAt(col + 1) === '#' &&
    image[row + 2].charAt(col + 4) === '#' &&
    image[row + 1].charAt(col + 5) === '#' &&
    image[row + 1].charAt(col + 6) === '#' &&
    image[row + 2].charAt(col + 7) === '#' &&
    image[row + 2].charAt(col + 10) === '#' &&
    image[row + 1].charAt(col + 11) === '#' &&
    image[row + 1].charAt(col + 12) === '#' &&
    image[row + 2].charAt(col + 13) === '#' &&
    image[row + 2].charAt(col + 16) === '#' &&
    image[row + 1].charAt(col + 17) === '#' &&
    image[row + 0].charAt(col + 18) === '#' &&
    image[row + 1].charAt(col + 18) === '#' &&
    image[row + 1].charAt(col + 19) === '#'
  )
}

const markSeaMonster = (image: string[], row: number, col: number): string[] => {
  /*

                #
#    ##    ##    ###
#  #  #  #  #  #

*/

  image[row + 1] = `${image[row + 1].slice(0, col + 0)}O${image[row + 1].slice(col + 0 + 1)}`
  image[row + 2] = `${image[row + 2].slice(0, col + 1)}O${image[row + 2].slice(col + 1 + 1)}`
  image[row + 2] = `${image[row + 2].slice(0, col + 4)}O${image[row + 2].slice(col + 4 + 1)}`
  image[row + 1] = `${image[row + 1].slice(0, col + 5)}O${image[row + 1].slice(col + 5 + 1)}`
  image[row + 1] = `${image[row + 1].slice(0, col + 6)}O${image[row + 1].slice(col + 6 + 1)}`
  image[row + 2] = `${image[row + 2].slice(0, col + 7)}O${image[row + 2].slice(col + 7 + 1)}`
  image[row + 2] = `${image[row + 2].slice(0, col + 10)}O${image[row + 2].slice(col + 10 + 1)}`
  image[row + 1] = `${image[row + 1].slice(0, col + 11)}O${image[row + 1].slice(col + 11 + 1)}`
  image[row + 1] = `${image[row + 1].slice(0, col + 12)}O${image[row + 1].slice(col + 12 + 1)}`
  image[row + 2] = `${image[row + 2].slice(0, col + 13)}O${image[row + 2].slice(col + 13 + 1)}`
  image[row + 2] = `${image[row + 2].slice(0, col + 16)}O${image[row + 2].slice(col + 16 + 1)}`
  image[row + 1] = `${image[row + 1].slice(0, col + 17)}O${image[row + 1].slice(col + 17 + 1)}`
  image[row + 0] = `${image[row + 0].slice(0, col + 18)}O${image[row + 0].slice(col + 18 + 1)}`
  image[row + 1] = `${image[row + 1].slice(0, col + 18)}O${image[row + 1].slice(col + 18 + 1)}`
  image[row + 1] = `${image[row + 1].slice(0, col + 19)}O${image[row + 1].slice(col + 19 + 1)}`

  return image
}

const rotatePattern = (pattern: string[]): string[] => {
  const newPattern: string[] = []
  const size = pattern.length
  for (let rowId = 0; rowId < size; rowId++) {
    const row = pattern[rowId]
    for (let charId = 0; charId < size; charId++) {
      const char = row.charAt(charId)
      const newRowId = size - 1 - charId
      const newCharId = rowId
      if (newPattern[newRowId] === undefined) newPattern[newRowId] = ''.padStart(size, '.')
      newPattern[newRowId] = `${newPattern[newRowId].slice(0, newCharId)}${char}${newPattern[newRowId].slice(newCharId + 1)}`
    }
  }
  pattern = newPattern
  return pattern
}

const BUTTONS: IButton[] = [
  {
    label: 'Find Corners',
    onClick: (inputKey: string) => {
      const tiles = INPUT[inputKey].split('\n\n').map(rawTile => {
        const tileLines = rawTile.split('\n')
        const edges: string[] = []
        const id = parseInt((tileLines.shift() as string).split('Tile ')[1])
        const leftEdge = tileLines.reduce((edge, line) => `${edge}${line.charAt(0)}`, '')
        const rightEdge = tileLines.reduce((edge, line) => `${edge}${line.charAt(line.length - 1)}`, '')
        edges.push(tileLines[0], leftEdge, tileLines[tileLines.length - 1], rightEdge)
        const edgesReversed = edges.map(edge => edge.split('').reverse().join(''))
        return {
          id,
          edges,
          edgesReversed
        }
      })
      const edgeList: Map<string, number> = tiles.reduce((edgeList, tile) => {
        tile.edges.concat(tile.edgesReversed).forEach(edge => {
          const currentEdgeCount = edgeList.get(edge) || 0
          edgeList.set(edge, currentEdgeCount + 1)
        })
        return edgeList
      }, new Map<string, number>())
      const singletons = [...edgeList.entries()].filter(([edge, count]) => count === 1).map(([x]) => x)
      const corners = tiles.filter(({ edges }) => edges.filter(edge => singletons.includes(edge)).length === 2)

      return {
        answer1: corners.reduce((a, b) => a * b.id, 1).toString()
      }
    }
  },
  {
    label: 'Assemble and Analyze Puzzle',
    onClick: (inputKey: string) => {
      const placedTiles: number[] = []
      const tiles: ITile[] = INPUT[inputKey].split('\n\n').map(rawTile => {
        const tileLines = rawTile.split('\n')
        const edges: string[] = []
        const id = parseInt((tileLines.shift() as string).split('Tile ')[1])
        const topEdge = tileLines[0]
        const rightEdge = tileLines.reduce((edge, line) => `${edge}${line.charAt(line.length - 1)}`, '')
        const bottomEdge = tileLines[tileLines.length - 1]
        const leftEdge = tileLines.reduce((edge, line) => `${edge}${line.charAt(0)}`, '')
        edges.push(topEdge, rightEdge, bottomEdge, leftEdge)
        const edgesReversed = edges.map(edge => edge.split('').reverse().join(''))
        return {
          id,
          edges,
          edgesReversed,
          pattern: tileLines
        }
      })
      const edgeList: Map<string, number> = tiles.reduce((edgeList, tile) => {
        tile.edges.concat(tile.edgesReversed).forEach(edge => {
          const currentEdgeCount = edgeList.get(edge) || 0
          edgeList.set(edge, currentEdgeCount + 1)
        })
        return edgeList
      }, new Map<string, number>())
      const singletons = [...edgeList.entries()].filter(([edge, count]) => count === 1).map(([x]) => x)
      const corners = tiles.filter(({ edges }) => edges.filter(edge => singletons.includes(edge)).length === 2)

      const puzzleSize = inputKey.startsWith('DEMO') ? 3 : 12
      const puzzle: ITile[][] = []
      for (let i = 0; i < puzzleSize; i++) {
        puzzle[i] = []
        puzzle[i].length = puzzleSize
      }

      for (let row = 0; row < puzzleSize; row++) {
        for (let col = 0; col < puzzleSize; col++) {
          let tile: ITile | undefined
          if (col === 0) {
            if (row === 0) {
              // Starting. Just grab the first corner and place it
              tile = corners[0]
              // Figure out the correct orientation/reversal to fit this in the top left
              flipAndRotateLoop:
              for (let i = 0; i < 2; i++) {
                for (let j = 0; j < 4; j++) {
                  if (!tile) throw new Error('fuck')
                  if (
                    singletons.includes(tile.pattern[0]) &&
                    singletons.includes(tile.pattern.reduce((leftEdge, row) => `${leftEdge}${row.charAt(0)}`, ''))
                  ) {
                    puzzle[row][col] = tile
                    placedTiles.push(tile.id)
                    break flipAndRotateLoop
                  }
                  tile.pattern = rotatePattern(tile.pattern)
                }
                tile.pattern = flipPattern(tile.pattern)
              }
            } else {
              // Match to the one above
              const edgeToMatch = puzzle[row - 1][col].pattern[puzzle[row - 1][col].pattern.length - 1]
              tile = tiles.find(({ id, edges, edgesReversed }) => (
                !placedTiles.includes(id) && (edges.includes(edgeToMatch) || edgesReversed.includes(edgeToMatch))
              ))
              if (!tile) throw new Error('fuck')
              flipAndRotateLoop:
              for (let i = 0; i < 2; i++) {
                for (let j = 0; j < 4; j++) {
                  if (tile.pattern[0] === edgeToMatch) {
                    puzzle[row][col] = tile
                    placedTiles.push(tile.id)
                    break flipAndRotateLoop
                  }
                  tile.pattern = rotatePattern(tile.pattern)
                }
                tile.pattern = flipPattern(tile.pattern)
              }
            }
          } else {
            // Match to the left
            const edgeToMatch = puzzle[row][col - 1].pattern.reduce((rightEdge, row) => `${rightEdge}${row.charAt(row.length - 1)}`, '')
            tile = tiles.find(({ id, edges, edgesReversed }) => (
              !placedTiles.includes(id) && (edges.includes(edgeToMatch) || edgesReversed.includes(edgeToMatch))
            ))
            if (!tile) throw new Error('fuck')
            flipAndRotateLoop:
            for (let i = 0; i < 2; i++) {
              for (let j = 0; j < 4; j++) {
                if (tile.pattern.reduce((leftEdge, row) => `${leftEdge}${row.charAt(0)}`, '') === edgeToMatch) {
                  puzzle[row][col] = tile
                  placedTiles.push(tile.id)
                  break flipAndRotateLoop
                }
                tile.pattern = rotatePattern(tile.pattern)
              }
              tile.pattern = flipPattern(tile.pattern)
            }
          }
        }
      }

      // Puzzle is assembled, now strip the borders then look for sea monsters
      let image: string[] = createImage(puzzle)
      const imageSize = image.length

      // Find the correct rotation for sea monsters
      flipAndRotateLoop:
      for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 4; j++) {
          let countForRotation = 0
          for (let k = 0; k < imageSize; k++) {
            for (let l = 0; l < imageSize; l++) {
              if (isSeaMonster(image, k, l)) countForRotation++
            }
          }
          if (countForRotation > 0) {
            break flipAndRotateLoop
          }
          image = rotatePattern(image)
        }
        image = flipPattern(image)
      }

      // Mark sea monsters
      for (let row = 0; row < imageSize; row++) {
        for (let col = 0; col < imageSize; col++) {
          if (isSeaMonster(image, row, col)) image = markSeaMonster(image, row, col)
        }
      }

      return {
        answer2: image.join('').split('').filter(x => x === '#').length.toString()
      }
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The product of the corner IDs is <code>{answer}</code>.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      The water's roughness is <code>{answer}</code>.
    </span>
  ),
  buttons: BUTTONS,
  day: 20,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Jurassic Jigsaw'
}

export default config