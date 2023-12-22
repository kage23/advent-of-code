import inputs from '../../inputs/2023/day22'
import { DayConfig } from '../../routes/Day'

interface Brick {
  coords: [number, number, number, number, number, number]
  falling: boolean
  id: number
  squares: string[]
  supportedBy: number[]
  supporting: number[]
}

const squareIsFilled = (square: string, area: Map<string, number>) => {
  const [, , z] = square.split(',').map(Number)
  return z < 1 || area.has(square)
}

const sortBricks = (a: Brick, b: Brick) => {
  const {
    coords: [, , az1, , , az2],
  } = a
  const {
    coords: [, , bz1, , , bz2],
  } = b
  return Math.min(az1, az2) - Math.min(bz1, bz2)
}

const disintegrateAndCountFallers = (id: number, bricks: Brick[]): number => {
  const nonsupporters = new Set([id])
  return bricks.sort(sortBricks).filter((brick) => {
    if (
      brick.id === id ||
      (brick.supportedBy.length > 0 &&
        brick.supportedBy.every((sId) => nonsupporters.has(sId)))
    ) {
      nonsupporters.add(brick.id)
      return brick.id !== id
    }
    return false
  }).length
}

export const pickOneBrickToDisintegrate = (input: string) => {
  let area = new Map<string, number>()

  // Set up bricks
  const bricks: Brick[] = input
    .split('\n')
    .map((line, id) => {
      const [x1, y1, z1, x2, y2, z2] = line.split(/[,~]/).map(Number)

      const squares: string[] = []
      for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
        for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
          for (let z = Math.min(z1, z2); z <= Math.max(z1, z2); z++) {
            area.set([x, y, z].join(','), id)
            squares.push([x, y, z].join(','))
          }
        }
      }

      return {
        coords: [x1, y1, z1, x2, y2, z2] as [
          number,
          number,
          number,
          number,
          number,
          number
        ],
        falling: true,
        id,
        squares,
        supportedBy: [],
        supporting: [],
      }
    })
    .sort(sortBricks)

  // Simulate falling
  while (bricks.some(({ falling }) => falling)) {
    const newArea = new Map<string, number>()
    bricks.forEach((brick) => {
      const {
        coords: [x1, y1, z1, x2, y2, z2],
        falling,
        id,
        squares,
      } = brick
      if (falling) {
        const squaresBelow: string[] = []
        if (z1 !== z2) {
          squaresBelow.push([x1, y1, Math.min(z1, z2) - 1].join(','))
        } else if (y1 !== y2) {
          for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
            squaresBelow.push([x1, y, z1 - 1].join(','))
          }
        } else if (x1 !== x2) {
          for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
            squaresBelow.push([x, y1, z1 - 1].join(','))
          }
        } else {
          squaresBelow.push([x1, y1, z1 - 1].join(','))
        }
        if (!squaresBelow.some((square) => squareIsFilled(square, newArea))) {
          brick.squares = squares.map((sq) => {
            const [nx, ny, nz] = sq.split(',').map(Number)
            const newSquare = [nx, ny, nz - 1].join(',')
            newArea.set(newSquare, id)
            return newSquare
          })
          brick.coords[2] = z1 - 1
          brick.coords[5] = z2 - 1
        } else {
          brick.falling = false
          brick.squares.forEach((sq) => {
            newArea.set(sq, id)
          })
        }
      } else {
        brick.squares.forEach((sq) => {
          newArea.set(sq, id)
        })
      }
    })
    bricks.sort(sortBricks)
    area = newArea
  }

  // Figure out which bricks are good to disintegrate
  bricks.forEach((brick) => {
    const { id, squares } = brick
    const supportedBy: number[] = []
    const supporting: number[] = []
    const squaresBelow = squares.map((sq) => {
      const [x, y, z] = sq.split(',').map(Number)
      return [x, y, z - 1].join(',')
    })
    const squaresAbove = squares.map((sq) => {
      const [x, y, z] = sq.split(',').map(Number)
      return [x, y, z + 1].join(',')
    })
    squaresBelow.forEach((sq) => {
      if (
        area.has(sq) &&
        area.get(sq) !== id &&
        !supportedBy.includes(area.get(sq)!)
      )
        supportedBy.push(area.get(sq)!)
    })
    squaresAbove.forEach((sq) => {
      if (
        area.has(sq) &&
        area.get(sq) !== id &&
        !supporting.includes(area.get(sq)!)
      )
        supporting.push(area.get(sq)!)
    })
    brick.supportedBy = supportedBy
    brick.supporting = supporting
  })

  return {
    answer1: bricks.filter(({ supporting }) =>
      supporting.every((id) => {
        const b = bricks.find((brick) => brick.id === id)
        return b && b.supportedBy.length > 1
      })
    ).length,
  }
}

export const chooseChainReactionBrick = (input: string) => {
  let area = new Map<string, number>()

  // Set up bricks
  const bricks: Brick[] = input
    .split('\n')
    .map((line, id) => {
      const [x1, y1, z1, x2, y2, z2] = line.split(/[,~]/).map(Number)

      const squares: string[] = []
      for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
        for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
          for (let z = Math.min(z1, z2); z <= Math.max(z1, z2); z++) {
            area.set([x, y, z].join(','), id)
            squares.push([x, y, z].join(','))
          }
        }
      }

      return {
        coords: [x1, y1, z1, x2, y2, z2] as [
          number,
          number,
          number,
          number,
          number,
          number
        ],
        falling: true,
        id,
        squares,
        supportedBy: [],
        supporting: [],
      }
    })
    .sort(sortBricks)

  // Simulate falling
  while (bricks.some(({ falling }) => falling)) {
    const newArea = new Map<string, number>()
    bricks.forEach((brick) => {
      const {
        coords: [x1, y1, z1, x2, y2, z2],
        falling,
        id,
        squares,
      } = brick
      if (falling) {
        const squaresBelow: string[] = []
        if (z1 !== z2) {
          squaresBelow.push([x1, y1, Math.min(z1, z2) - 1].join(','))
        } else if (y1 !== y2) {
          for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
            squaresBelow.push([x1, y, z1 - 1].join(','))
          }
        } else if (x1 !== x2) {
          for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
            squaresBelow.push([x, y1, z1 - 1].join(','))
          }
        } else {
          squaresBelow.push([x1, y1, z1 - 1].join(','))
        }
        if (!squaresBelow.some((square) => squareIsFilled(square, newArea))) {
          brick.squares = squares.map((sq) => {
            const [nx, ny, nz] = sq.split(',').map(Number)
            const newSquare = [nx, ny, nz - 1].join(',')
            newArea.set(newSquare, id)
            return newSquare
          })
          brick.coords[2] = z1 - 1
          brick.coords[5] = z2 - 1
        } else {
          brick.falling = false
          brick.squares.forEach((sq) => {
            newArea.set(sq, id)
          })
        }
      } else {
        brick.squares.forEach((sq) => {
          newArea.set(sq, id)
        })
      }
    })
    bricks.sort(sortBricks)
    area = newArea
  }

  // Figure out support
  bricks.forEach((brick) => {
    const { id, squares } = brick
    const supportedBy: number[] = []
    const supporting: number[] = []
    const squaresBelow = squares.map((sq) => {
      const [x, y, z] = sq.split(',').map(Number)
      return [x, y, z - 1].join(',')
    })
    const squaresAbove = squares.map((sq) => {
      const [x, y, z] = sq.split(',').map(Number)
      return [x, y, z + 1].join(',')
    })
    squaresBelow.forEach((sq) => {
      if (
        area.has(sq) &&
        area.get(sq) !== id &&
        !supportedBy.includes(area.get(sq)!)
      )
        supportedBy.push(area.get(sq)!)
    })
    squaresAbove.forEach((sq) => {
      if (
        area.has(sq) &&
        area.get(sq) !== id &&
        !supporting.includes(area.get(sq)!)
      )
        supporting.push(area.get(sq)!)
    })
    brick.supportedBy = supportedBy
    brick.supporting = supporting
  })

  return {
    answer2: bricks.reduce(
      (sum, brick) => sum + disintegrateAndCountFallers(brick.id, bricks),
      0
    ),
  }
}

const day22: Omit<DayConfig, 'year'> = {
  answer1Text: 'answer bricks can be safely disintegrated.',
  answer2Text: 'The sum of the total number of fallers is answer.',
  buttons: [
    {
      label: 'Pick One Brick to Disintegrate',
      onClick: pickOneBrickToDisintegrate,
    },
    {
      label: 'Choose Best Brick for Chain Reaction',
      onClick: chooseChainReactionBrick,
    },
  ],
  id: 22,
  inputs,
  title: 'Sand Slabs',
}

export default day22
