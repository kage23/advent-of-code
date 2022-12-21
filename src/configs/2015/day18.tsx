import inputs from '../../inputs/2015/day18'
import { DayConfig } from '../../routes/Day'

const countOnNeighbors = (grid: string, x: number, y: number): number => {
  const parsedGrid = grid.split('\n')

  const coordsToCheck = [
    [x - 1, y - 1],
    [x - 1, y],
    [x - 1, y + 1],
    [x, y - 1],
    [x, y + 1],
    [x + 1, y - 1],
    [x + 1, y],
    [x + 1, y + 1],
  ]
    .filter(([x, y]) => x >= 0 && y >= 0 && x <= parsedGrid[0].length - 1 && y <= parsedGrid.length - 1)

  return coordsToCheck
    .map(([x, y]) => parsedGrid[y].charAt(x))
    .filter(x => x === '#')
    .length
}

const getNextGrid = (grid: string, part: 1 | 2): string => {
  const gridSize = grid.split('\n').length
  let nextGrid = ''

  let x = 0
  let y = 0
  for (let i = 0; i < grid.length; i++) {
    const char = grid[i]
    let onNeighborsCount = 0
    if (
      part === 2 &&
      (
        (x === 0 && y === 0) ||
        (x === 0 && y === gridSize - 1) ||
        (x === gridSize - 1 && y === 0) ||
        (x === gridSize - 1 && y === gridSize - 1)
      )
    ) {
      nextGrid += '#'
      x++
    } else {
      switch (char) {
        case '.':
          onNeighborsCount = countOnNeighbors(grid, x, y)
          if (onNeighborsCount === 3) {
            nextGrid += '#'
          } else {
            nextGrid += '.'
          }
          x++
          break

        case '#':
          onNeighborsCount = countOnNeighbors(grid, x, y)
          if (onNeighborsCount === 2 || onNeighborsCount === 3) {
            nextGrid += '#'
          } else {
            nextGrid += '.'
          }
          x++
          break

        case '\n':
        default:
          y++
          x = 0
          nextGrid += char
          break
      }
    }
  }

  return nextGrid
}

export const runLightAnimation = (inputKey: string) => {
  let grid = inputs.get(inputKey)!
  const animationSteps = inputKey.startsWith('DEMO') ? 4 : 100
  for (let i = 0; i < animationSteps; i++) {
    grid = getNextGrid(grid, 1)
  }
  return {
    answer1: grid.split('').filter(x => x === '#').length
  }
}

export const runLightAnimationWithStuckOnLights = (inputKey: string) => {
  let grid = inputs.get(inputKey)!
  // Set the stuck-on lights
  // Top left and bottom right
  grid = `#${grid.slice(1, -1)}#`
  // Top right and bottom left are trickier
  grid = grid.split('\n').map((line, i, gridLines) => {
    if (i === 0) return `${line.slice(0, -1)}#`
    if (i === gridLines.length - 1) return `#${line.slice(1)}`
    return line
  }).join('\n')
  const animationSteps = inputKey.startsWith('DEMO') ? 5 : 100
  for (let i = 0; i < animationSteps; i++) {
    grid = getNextGrid(grid, 2)
  }
  return {
    answer2: grid.split('').filter(x => x === '#').length
  }
}

const day18: Omit<DayConfig, 'year'> = {
  answer1Text: 'At the end of the animation, answer lights are turned on.',
  answer2Text: 'At the end of the animation, answer lights are turned on (including the corner lights which are stuck on).',
  buttons: [
    {
      label: 'Run Light Animation',
      onClick: runLightAnimation
    },
    {
      label: 'Run Light Animation with Stuck On Lights',
      onClick: runLightAnimationWithStuckOnLights
    }
  ],
  id: 18,
  inputs,
  title: 'Like a GIF For Your Yard',
}

export default day18
