import inputs from '../../inputs/2022/day22'
import { DayConfig } from '../../routes/Day'

interface WarpZone {
  startRange: {
    row: [number, number]
    col: [number, number]
    dir: 0 | 1 | 2 | 3
  }
  endRange: {
    row: [number, number]
    col: [number, number]
    dir: 0 | 1 | 2 | 3
  }
}

const WARP_ZONES: {
  DEMO: WarpZone[]
  REAL: WarpZone[]
} = {
  DEMO: [
    // A = Top - edge going up
    {
      startRange: {
        row: [0, 0],
        col: [8, 11],
        dir: 3,
      },
      endRange: {
        row: [4, 4],
        col: [3, 0],
        dir: 1,
      },
    },
    // A = Middle top left - edge going up
    {
      startRange: {
        row: [4, 4],
        col: [0, 3],
        dir: 3,
      },
      endRange: {
        row: [0, 0],
        col: [11, 8],
        dir: 1,
      },
    },
    // B = Top left | edge going left
    {
      startRange: {
        row: [0, 3],
        col: [8, 8],
        dir: 2,
      },
      endRange: {
        row: [4, 4],
        col: [7, 4],
        dir: 1,
      },
    },
    // B = Middle top - edge going up
    {
      startRange: {
        row: [4, 4],
        col: [4, 7],
        dir: 3,
      },
      endRange: {
        row: [0, 3],
        col: [8, 8],
        dir: 0,
      },
    },
    // C = Middle left | edge going left
    {
      startRange: {
        row: [4, 7],
        col: [0, 0],
        dir: 2,
      },
      endRange: {
        row: [11, 11],
        col: [15, 12],
        dir: 3,
      },
    },
    // C = Bottom far right - edge going down
    {
      startRange: {
        row: [11, 11],
        col: [12, 15],
        dir: 1,
      },
      endRange: {
        row: [7, 4],
        col: [0, 0],
        dir: 0,
      },
    },
    // D = Middle bottom left - edge going down
    {
      startRange: {
        row: [7, 7],
        col: [0, 3],
        dir: 1,
      },
      endRange: {
        row: [11, 11],
        col: [11, 8],
        dir: 3,
      },
    },
    // D = Bottom middle - edge going down
    {
      startRange: {
        row: [11, 11],
        col: [8, 11],
        dir: 1,
      },
      endRange: {
        row: [7, 7],
        col: [3, 0],
        dir: 3,
      },
    },
    // E = Middle middle bottom left - edge going down
    {
      startRange: {
        row: [7, 7],
        col: [4, 7],
        dir: 1,
      },
      endRange: {
        row: [11, 8],
        col: [8, 8],
        dir: 0,
      },
    },
    // E = Bottom left | edge going left
    {
      startRange: {
        row: [8, 11],
        col: [8, 8],
        dir: 2,
      },
      endRange: {
        row: [7, 7],
        col: [7, 4],
        dir: 3,
      },
    },
    // F = Middle right | edge going right
    {
      startRange: {
        row: [4, 7],
        col: [11, 11],
        dir: 0,
      },
      endRange: {
        row: [8, 8],
        col: [15, 12],
        dir: 1,
      },
    },
    // F = Bottom right - edge going up
    {
      startRange: {
        row: [8, 8],
        col: [12, 15],
        dir: 3,
      },
      endRange: {
        row: [7, 4],
        col: [11, 11],
        dir: 2,
      },
    },
    // G = Top right | edge going right
    {
      startRange: {
        row: [0, 3],
        col: [11, 11],
        dir: 0,
      },
      endRange: {
        row: [11, 8],
        col: [15, 15],
        dir: 2,
      },
    },
    // G = Bottom right | edge going right
    {
      startRange: {
        row: [8, 11],
        col: [15, 15],
        dir: 0,
      },
      endRange: {
        row: [3, 0],
        col: [11, 11],
        dir: 2,
      },
    },
  ],
  REAL: [
    // A = Top left - edge going up
    {
      startRange: {
        row: [0, 0],
        col: [50, 99],
        dir: 3
      },
      endRange: {
        row: [150, 199],
        col: [0, 0],
        dir: 0
      }
    },
    // A = Bottom left | edge going left
    {
      startRange: {
        row: [150, 199],
        col: [0, 0],
        dir: 2
      },
      endRange: {
        row: [0, 0],
        col: [50, 99],
        dir: 1
      }
    },
    // B = Top right - edge going up
    {
      startRange: {
        row: [0, 0],
        col: [100, 149],
        dir: 3
      },
      endRange: {
        row: [199, 199],
        col: [0, 49],
        dir: 3
      }
    },
    // B = Bottom - edge going down
    {
      startRange: {
        row: [199, 199],
        col: [0, 49],
        dir: 1
      },
      endRange: {
        row: [0, 0],
        col: [100, 149],
        dir: 1
      }
    },
    // C = Top right | edge going right
    {
      startRange: {
        row: [0, 49],
        col: [149, 149],
        dir: 0
      },
      endRange: {
        row: [149, 100],
        col: [99, 99],
        dir: 2
      }
    },
    // C = Lower mid | edge going right
    {
      startRange: {
        row: [100, 149],
        col: [99, 99],
        dir: 0
      },
      endRange: {
        row: [49, 0],
        col: [149, 149],
        dir: 2
      }
    },
    // D = Top lower - edge going down
    {
      startRange: {
        row: [49, 49],
        col: [100, 149],
        dir: 1
      },
      endRange: {
        row: [50, 99],
        col: [99, 99],
        dir: 2
      }
    },
    // D = Upper mid | edge going right
    {
      startRange: {
        row: [50, 99],
        col: [99, 99],
        dir: 0
      },
      endRange: {
        row: [49, 49],
        col: [100, 149],
        dir: 3
      }
    },
    // E = Lower - edge going down
    {
      startRange: {
        row: [149, 149],
        col: [50, 99],
        dir: 1
      },
      endRange: {
        row: [150, 199],
        col: [49, 49],
        dir: 2
      }
    },
    // E = Bottom right | edge going right
    {
      startRange: {
        row: [150, 199],
        col: [49, 49],
        dir: 0
      },
      endRange: {
        row: [149, 149],
        col: [50, 99],
        dir: 3
      }
    },
    // F = Upper left | edge going left
    {
      startRange: {
        row: [0, 49],
        col: [50, 50],
        dir: 2
      },
      endRange: {
        row: [149, 100],
        col: [0, 0],
        dir: 0
      }
    },
    // F = Mid lower | edge going left
    {
      startRange: {
        row: [100, 149],
        col: [0, 0],
        dir: 2
      },
      endRange: {
        row: [49, 0],
        col: [50, 50],
        dir: 0
      }
    },
    // G = Upper mid | edge going left
    {
      startRange: {
        row: [50, 99],
        col: [50, 50],
        dir: 2
      },
      endRange: {
        row: [100, 100],
        col: [0, 49],
        dir: 1
      }
    },
    // G = Mid left - edge going up
    {
      startRange: {
        row: [100, 100],
        col: [0, 49],
        dir: 3
      },
      endRange: {
        row: [50, 99],
        col: [50, 50],
        dir: 0
      }
    }
  ],
}

const cubeWrap = (
  input: string,
  [row, col, dir]: [number, number, number]
): [number, number, number] => {
  const warpZones = input.split('\n').length < 20 ?
    WARP_ZONES.DEMO : WARP_ZONES.REAL

  const warpZone = warpZones.find(({ startRange }) => (
    row >= startRange.row[0] && row <= startRange.row[1] && col >= startRange.col[0] && col <= startRange.col[1] && dir === startRange.dir
  ))

  if (!warpZone) throw new Error('warp zone not found!')

  const { startRange, endRange } = warpZone

  const swapRowForCol = Math.abs(startRange.dir - endRange.dir) === 1 || Math.abs(startRange.dir - endRange.dir) === 3

  const rowOffset = row - startRange.row[0]
  const colOffset = col - startRange.col[0]

  const newRow = (() => {
    const offset = swapRowForCol ? colOffset : rowOffset
    const reverseIt = endRange.row[1] < endRange.row[0]
    return reverseIt ? endRange.row[0] - offset : endRange.row[0] + offset
  })()
  const newCol = (() => {
    const offset = swapRowForCol ? rowOffset : colOffset
    const reverseIt = endRange.col[1] < endRange.col[0]
    return reverseIt ? endRange.col[0] - offset : endRange.col[0] + offset
  })()

  return [newRow, newCol, endRange.dir]
}

const takeStep = (
  [row, col, dir]: [number, number, number],
  step: string,
  map: string[],
  inputKey: string,
  isCube = false
): [number, number, number] => {
  const position: [number, number, number] = [row, col, dir]
  const distance = parseInt(step)
  if (isNaN(distance)) {
    if (step === 'L') {
      position[2] = (position[2] + 4 - 1) % 4
    }
    if (step === 'R') {
      position[2] = (position[2] + 1) % 4
    }
  } else {
    // The bug is that we have a distance loop within each direction switch-case
    // So even when we wrap around a cube corner and are supposed to change direction, we don't
    // So we instead need a single direction loop, and within each iteration, we check the direction
    distanceLoop: for (let i = 1; i <= distance; i++) {
      switch (position[2]) {
        // Right
        case 0: {
          const nextSpot = map[position[0]].charAt(position[1] + 1)
          switch (nextSpot) {
            case '.': {
              // Open space, we can move there
              position[1] = position[1] + 1
              break
            }
            case '#': {
              // Wall, stop moving entirely
              break distanceLoop
            }
            case ' ':
            case '': {
              // Off the map, wrap around
              if (isCube) {
                const nextPosition = cubeWrap(inputKey, position)
                const nextSpot = map[nextPosition[0]].charAt(nextPosition[1])
                switch (nextSpot) {
                  case '.': {
                    // We can move here
                    position[0] = nextPosition[0]
                    position[1] = nextPosition[1]
                    position[2] = nextPosition[2]
                    break
                  }
                  case '#': {
                    // We can't move here so we should stop
                    break distanceLoop
                  }
                  default: {
                    break
                  }
                }
              } else {
                const firstSpace = map[position[0]].indexOf('.')
                const firstWall = map[position[0]].indexOf('#')
                if (firstSpace < firstWall) {
                  position[1] = firstSpace
                } else {
                  break distanceLoop
                }
              }
              break
            }
            default: {
              break
            }
          }
          break
        }
        // Down
        case 1: {
          let nextRow = position[0] + 1
          if (!isCube) nextRow = nextRow % map.length
          let nextPosition = map[nextRow] !== undefined ? map[nextRow].charAt(position[1]) : ''
          switch (nextPosition) {
            case '.': {
              // Open space, we can move there
              position[0] = position[0] + 1
              break
            }
            case '#': {
              // Wall, stop moving entirely
              break distanceLoop
            }
            case ' ':
            case '': {
              // Off the map, wrap around
              if (isCube) {
                const nextPosition = cubeWrap(inputKey, position)
                const nextSpot = map[nextPosition[0]].charAt(nextPosition[1])
                switch (nextSpot) {
                  case '.': {
                    // We can move here
                    position[0] = nextPosition[0]
                    position[1] = nextPosition[1]
                    position[2] = nextPosition[2]
                    break
                  }
                  case '#': {
                    // We can't move here so we should stop
                    break distanceLoop
                  }
                  default: {
                    break
                  }
                }
              } else {
                while (nextPosition === ' ' || nextPosition === '') {
                  nextRow = (nextRow + 1) % map.length
                  nextPosition = map[nextRow].charAt(position[1])
                }
                if (nextPosition === '.') {
                  position[0] = nextRow
                }
                if (nextPosition === '#') {
                  break distanceLoop
                }
              }
              break
            }
            default: {
              break
            }
          }
          break
        }
        // Left
        case 2: {
          let nextCol = position[1] - 1
          if (!isCube) nextCol = (nextCol + map[position[0]].length) % map[position[0]].length
          const nextSpot = nextCol >= 0 ? map[position[0]].charAt(nextCol) : ''
          switch (nextSpot) {
            case '.': {
              // Open space, we can move there
              position[1] =
                (position[1] - 1 + map[position[0]].length) %
                map[position[0]].length
              break
            }
            case '#': {
              // Wall, stop moving entirely
              break distanceLoop
            }
            case ' ':
            case '': {
              // Off the map, wrap around
              if (isCube) {
                const nextPosition = cubeWrap(inputKey, position)
                const nextSpot = map[nextPosition[0]].charAt(nextPosition[1])
                switch (nextSpot) {
                  case '.': {
                    // We can move here
                    position[0] = nextPosition[0]
                    position[1] = nextPosition[1]
                    position[2] = nextPosition[2]
                    break
                  }
                  case '#': {
                    // We can't move here so we should stop
                    break distanceLoop
                  }
                  default: {
                    break
                  }
                }
              } else {
                const lastSpace = map[position[0]].lastIndexOf('.')
                const lastWall = map[position[0]].lastIndexOf('#')
                if (lastSpace > lastWall) {
                  position[1] = lastSpace
                } else {
                  break distanceLoop
                }
              }
              break
            }
            default: {
              break
            }
          }
          break
        }
        // Up
        case 3: {
          let nextRow = position[0] - 1
          if (!isCube) nextRow = (nextRow + map.length) % map.length
          let nextPosition = map[nextRow] !== undefined ? map[nextRow].charAt(position[1]) : ''
          switch (nextPosition) {
            case '.': {
              // Open space, we can move there
              position[0] = nextRow
              break
            }
            case '#': {
              // Wall, stop moving entirely
              break distanceLoop
            }
            case ' ':
            case '': {
              // Off the map, wrap around
              if (isCube) {
                const nextPosition = cubeWrap(inputKey, position)
                const nextSpot = map[nextPosition[0]].charAt(nextPosition[1])
                switch (nextSpot) {
                  case '.': {
                    // We can move here
                    position[0] = nextPosition[0]
                    position[1] = nextPosition[1]
                    position[2] = nextPosition[2]
                    break
                  }
                  case '#': {
                    // We can't move here so we should stop
                    break distanceLoop
                  }
                  default: {
                    break
                  }
                }
              } else {
                while (nextPosition === ' ' || nextPosition === '') {
                  nextRow = (nextRow - 1 + map.length) % map.length
                  nextPosition = map[nextRow].charAt(position[1])
                }
                if (nextPosition === '.') {
                  position[0] = nextRow
                }
                if (nextPosition === '#') {
                  break distanceLoop
                }
              }
              break
            }
            default: {
              break
            }
          }
          break
        }
      }
    }
  }
  return position
}

export const getPassword = (input: string, part: 1 | 2) => {
  const [mapRaw, path] = input.split('\n\n')
  const map = mapRaw.split('\n')

  // [row, col, dir]
  // Facing is 0 for right (>), 1 for down (v), 2 for left (<), and 3 for up (^).
  let position: [number, number, number] = [0, map[0].indexOf('.'), 0]

  let x = 0
  const nextStepRegex = /[RL]|\d*/
  while (x < path.length) {
    const nextStep = path.slice(x).match(nextStepRegex)
    if (!nextStep) throw new Error('something fucked up')
    position = takeStep(position, nextStep[0], map, input, part === 2)
    x += nextStep[0].length
  }

  return (
    (position[0] + 1) * 1000 +
    (position[1] + 1) * 4 +
    position[2]
  )
}

const day22: Omit<DayConfig, 'year'> = {
  answer1Text: 'The password is answer.',
  answer2Text: 'The actual password for the cube is answer.',
  buttons: [
    {
      label: 'Get the Password',
      onClick: (input) => ({ answer1: getPassword(input, 1) })
    },
    {
      label: 'Get the Password for the Cube',
      onClick: (input) => ({ answer2: getPassword(input, 2) })
    },
  ],
  id: 22,
  inputs,
  title: 'Monkey Map',
}

export default day22

/**
 * Notes:

DEMO

        AAAA
        B#.G
        B..G
        B..G
AAAABBBB...F
C.......#..F
C.#....#...F
CDDDEEEE..#F
        E..#FFFF
        E....#.G
        E#.....G
        DDDDCCCG


REAL

     AAAAABBBBB
     F........C
     F........C
     F........C
     F....DDDDC
     G...D
     G...D
     G...D
     G...D
     G...D
FGGGG....C
F........C
F........C
F........C
F....EEEEC
A...E
A...E
A...E
A...E
ABBBB

 */
