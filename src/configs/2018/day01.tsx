import inputs from '../../inputs/2018/day01'
import { DayConfig } from '../../routes/Day'

const parseInput = (inputKey: string): number[] =>
  inputs
    .get(inputKey)!
    .split('\n')
    .map((a) => parseInt(a))

export const findFrequency = (inputKey: string) => {
  const input = parseInput(inputKey)
  let count = 0
  input.forEach((n) => (count += n))
  return {
    answer1: count,
  }
}

export const findRepeatedFrequency = (inputKey: string) => {
  const input = parseInput(inputKey)
  const n = input.length
  let freq = 0
  let foundFreqs: boolean[] = []
  let i = 0
  while (!foundFreqs[freq]) {
    foundFreqs[freq] = true
    freq += input[i]
    i += 1
    if (i >= n) i = 0
  }
  return {
    answer2: freq,
  }
}

const day01: Omit<DayConfig, 'year'> = {
  answer1Text: 'The resulting frequency is answer.',
  answer2Text: 'The first frequency reached twice is answer.',
  buttons: [
    {
      label: 'Find Frequency',
      onClick: findFrequency,
    },
    {
      label: 'Find Repeated Frequency',
      onClick: findRepeatedFrequency,
    },
  ],
  id: 1,
  inputs,
  title: 'Chronal Calibration',
}

export default day01
