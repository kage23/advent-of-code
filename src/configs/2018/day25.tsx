import inputs from '../../inputs/2018/day25'
import { DayConfig } from '../../routes/Day'
import manhattanDistance from '../../utils/manhattanDistance'

const parseInput = (input: string) => input.split('\n').map(line => {
  const [x, y, z, t] = line.split(',')
  return [parseInt(x), parseInt(y), parseInt(z), parseInt(t)]
})

const visitNeighbors = (star: number[], stars: number[][], visitedMap: Map<number[], boolean>) => {
  for (const sStar of stars) {
    if (!visitedMap.get(sStar) && manhattanDistance(star, sStar) <= 3) {
      visitedMap.set(sStar, true)
      visitNeighbors(sStar, stars, visitedMap)
    }
  }
}

export const countConstellations = (inputKey: string) => {
  let count = 0
  const visitedMap = new Map<number[], boolean>()
  const stars = parseInput(inputs.get(inputKey)!)

  stars.forEach((star) => {
    if (!visitedMap.get(star)) {
      count++
      visitedMap.set(star, true)
      visitNeighbors(star, stars, visitedMap)
    }
  })

  return { answer1: count }
}

const day25: Omit<DayConfig, 'year'> = {
  answer1Text: 'There are answer constellations.',
  answer2Text: 'answer',
  buttons: [
    {
      label: 'Count Constellations',
      onClick: countConstellations
    }
  ],
  id: 25,
  inputs,
  title: 'Four-Dimensional Adventure',
}

export default day25
