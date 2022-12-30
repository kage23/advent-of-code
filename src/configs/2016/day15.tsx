import inputs from '../../inputs/2016/day15'
import { DayConfig } from '../../routes/Day'

interface Disc {
  numberOfPositions: number
  startingPosition: number
}

const parseInput = (inputKey: string): Disc[] => {
  const discs: Disc[] = []

  const input = inputs.get(inputKey) || inputKey

  input.split('\n').forEach((line) => {
    const numberOfPositions = parseInt(line.split(' has ')[1])
    const startingPosition = parseInt(line.split(' at position ')[1])
    discs.push({
      numberOfPositions,
      startingPosition,
    })
  })

  discs.unshift({
    numberOfPositions: 1,
    startingPosition: 0,
  })

  return discs
}

const getPositionAtBallTime = (
  disc: Disc,
  discIndex: number,
  buttonTime: number
): number => {
  const ballTime = buttonTime + discIndex
  return (disc.startingPosition + ballTime) % disc.numberOfPositions
}

export const getACapsule = (inputKey: string) => {
  const discs = parseInput(inputKey)

  let t = 0
  const getDiscPositionAtBallTime = (disc: Disc, i: number) =>
    getPositionAtBallTime(disc, i, t)
  while (!discs.map(getDiscPositionAtBallTime).every((pos) => pos === 0)) t += 1

  return {
    answer1: t,
  }
}

export const getAnAdvancedCapsule = (inputKey: string) => {
  const input = inputs.get(inputKey)!.split('\n')
  input.push(
    `Disc #${
      input.length + 1
    } has 11 positions; at time=0, it is at position 0.`
  )
  const discs = parseInput(input.join('\n'))

  let t = 0
  const getDiscPositionAtBallTime = (disc: Disc, i: number) =>
    getPositionAtBallTime(disc, i, t)
  while (!discs.map(getDiscPositionAtBallTime).every((pos) => pos === 0)) t += 1

  return {
    answer2: t,
  }
}

const day15: Omit<DayConfig, 'year'> = {
  answer1Text: 'Push the button at time=answer to get a capsule.',
  answer2Text: 'Push the button at time=answer to get an advanced capsule.',
  buttons: [
    {
      label: 'Get a Capsule!',
      onClick: getACapsule,
    },
    {
      label: 'Get an Advanced Capsule!',
      onClick: getAnAdvancedCapsule,
    },
  ],
  id: 15,
  inputs,
  title: 'Timing is Everything',
}

export default day15
