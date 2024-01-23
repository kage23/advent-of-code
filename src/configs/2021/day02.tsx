import inputs from '../../inputs/2021/day02'
import { DayConfig } from '../../routes/Day'

const parseInput = (input: string) => input.split('\n')

export const findFinalLocation = (input: string) => {
  const directions = parseInput(input)
  const location = [0, 0] // x, y
  directions.forEach(d => {
    const [dir, dist] = d.split(' ')
    switch (dir) {
      case 'forward':
        location[0] += Number(dist)
        break

      case 'down':
        location[1] += Number(dist)
        break

      case 'up':
        location[1] -= Number(dist)
        break
    }
  })

  return {
    answer1: location[0] * location[1]
  }
}

export const findFinalLocationCorrectly = (input: string) => {
  const directions = parseInput(input)
  const location = [0, 0] // x, y
  let aim = 0
  directions.forEach(d => {
    const [dir, dist] = d.split(' ')
    switch (dir) {
      case 'forward':
        location[0] += Number(dist)
        location[1] += (Number(dist) * aim)
        break

      case 'down':
        aim += Number(dist)
        break

      case 'up':
        aim -= Number(dist)
        break
    }
  })

  return {
    answer2: (location[0] * location[1])
  }
}

const day02: Omit<DayConfig, 'year'> = {
  answer1Text: 'The hash of the final location is answer.',
  answer2Text: 'The hash of the correct final location is answer.',
  buttons: [
    {
      label: 'Find Final Location',
      onClick: findFinalLocation
    },
    {
      label: 'Find Final Location Correctly',
      onClick: findFinalLocationCorrectly
    }
  ],
  id: 2,
  inputs,
  title: 'Dive!',
}

export default day02
