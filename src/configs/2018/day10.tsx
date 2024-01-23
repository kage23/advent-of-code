import inputs from '../../inputs/2018/day10'
import { DayConfig } from '../../routes/Day'

interface Star {
  id: number | 'max' | 'min'
  position: number[]
  velocity: number[]
}

interface Starfield {
  max: number[]
  min: number[]
  stars: Star[]
}

let time = 0
let starfield: Starfield = {
  max: [0, 0],
  min: [0, 0],
  stars: [],
}

const step = (stars: Star[]): Starfield => {
  const min = [Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER]
  const max = [Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER]
  for (const star of stars) {
    if (star.id !== 'min' && star.id !== 'max') {
      min[0] = Math.min(min[0], star.position[0] + star.velocity[0])
      min[1] = Math.min(min[1], star.position[1] + star.velocity[1])
      max[0] = Math.max(max[0], star.position[0] + star.velocity[0])
      max[1] = Math.max(max[1], star.position[1] + star.velocity[1])
    }
    star.position = [
      star.position[0] + star.velocity[0],
      star.position[1] + star.velocity[1],
    ]
  }
  time++
  return {
    stars,
    max,
    min,
  }
}

const stepBack = (stars: Star[]): Starfield => {
  const min = [Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER]
  const max = [Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER]
  for (const star of stars) {
    if (star.id !== 'min' && star.id !== 'max') {
      min[0] = Math.min(min[0], star.position[0] - star.velocity[0])
      min[1] = Math.min(min[1], star.position[1] - star.velocity[1])
      max[0] = Math.max(max[0], star.position[0] - star.velocity[0])
      max[1] = Math.max(max[1], star.position[1] - star.velocity[1])
    }
    star.position = [
      star.position[0] - star.velocity[0],
      star.position[1] - star.velocity[1],
    ]
  }
  time--
  return {
    stars,
    max,
    min,
  }
}

const findMessage = (
  stars: Star[],
  time = 0
): {
  starfield: Starfield
  time: number
} => {
  let currMin = [0, 0]
  let currMax = [0, 0]
  for (const star of stars) {
    currMin = [
      Math.min(currMin[0], star.position[0]),
      Math.min(currMin[1], star.position[1]),
    ]
    currMax = [
      Math.max(currMax[0], star.position[0]),
      Math.max(currMax[1], star.position[1]),
    ]
  }
  let prevHeight = currMax[1] - currMin[1]

  let next = {
    stars,
    min: currMin,
    max: currMax,
  }

  while (next.max[1] - next.min[1] <= prevHeight) {
    prevHeight = next.max[1] - next.min[1]
    next = step(next.stars)
    time++
    for (const star of next.stars) {
      currMin = [
        Math.min(currMin[0], star.position[0]),
        Math.min(currMin[1], star.position[1]),
      ]
      currMax = [
        Math.max(currMax[0], star.position[0]),
        Math.max(currMax[1], star.position[1]),
      ]
    }
  }

  const final = stepBack(next.stars)
  time--

  return {
    starfield: final,
    time,
  }
}

const getStars = (input: string): Starfield => {
  const min = [Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER]
  const max = [Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER]
  const stars: Star[] = input.split('\n').map((line, id) => {
    const posX = parseInt(line.slice(line.indexOf('<') + 1))
    const posY = parseInt(line.slice(line.indexOf(', ') + 1))
    const velX = parseInt(line.slice(line.lastIndexOf('<') + 1))
    const velY = parseInt(line.slice(line.lastIndexOf(', ') + 1))
    min[0] = Math.min(min[0], posX)
    min[1] = Math.min(min[1], posY)
    max[0] = Math.max(max[0], posX)
    max[1] = Math.max(max[1], posY)

    return {
      id,
      position: [posX, posY],
      velocity: [velX, velY],
    }
  })
  return {
    min,
    max,
    stars,
  }
}

const getStarfield = (stars: Star[], min: number[], max: number[]) => {
  const field: string[] = []

  const yOff = min[1] * -1
  for (let y = min[1]; y <= max[1]; y++) {
    field[y + yOff] = ''
    for (let x = min[0]; x <= max[0]; x++) {
      const star = stars.some(
        (sStar) => sStar.position[0] === x && sStar.position[1] === y
      )
      field[y + yOff] += star ? '#' : '.'
    }
  }
  return field
}

const printStarfield = (starfield: Starfield) => {
  const { stars } = starfield
  const { min, max } = starfield
  let printedStarfield = ''
  getStarfield(stars, min, max).forEach(
    (row) => (printedStarfield += `${row.replaceAll('.', ' ')}\n`)
  )
  return printedStarfield
}

export const alignTheStars = (input: string) => {
  starfield = getStars(input)
  time = 0
  const result = findMessage(starfield.stars, time)
  starfield = result.starfield
  time = result.time
  const printedStarfield = printStarfield(starfield)
  console.log(printedStarfield)
  return {
    answer1: printedStarfield,
    answer2: time,
  }
}

const day10: Omit<DayConfig, 'year'> = {
  answer1Text: 'Look in your console!',
  answer2Text: 'The time until the message is answer.',
  buttons: [
    {
      label: 'Find Message',
      onClick: alignTheStars,
    },
  ],
  id: 10,
  inputs,
  title: 'The Stars Align',
}

export default day10
