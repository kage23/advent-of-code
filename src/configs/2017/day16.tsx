import inputs from '../../inputs/2017/day16'
import { DayConfig } from '../../routes/Day'

const spin = (programs: string, x: number): string =>
  `${programs.slice(x * -1)}${programs.slice(0, programs.length - x)}`

const exchange = (programs: string, a: number, b: number): string => {
  const x = Math.min(a, b)
  const y = Math.max(a, b)

  return `${programs.slice(0, x)}${programs.charAt(y)}${programs.slice(
    x + 1,
    y
  )}${programs.charAt(x)}${programs.slice(y + 1)}`
}

const partner = (programs: string, a: string, b: string): string => {
  const x = Math.min(programs.indexOf(a), programs.indexOf(b))
  const y = Math.max(programs.indexOf(a), programs.indexOf(b))

  return `${programs.slice(0, x)}${programs.charAt(y)}${programs.slice(
    x + 1,
    y
  )}${programs.charAt(x)}${programs.slice(y + 1)}`
}

const dance = (programs: string, instruction: string): string => {
  switch (instruction[0]) {
    case 's':
      return spin(programs, parseInt(instruction.slice(1)))

    case 'x': {
      const [a, b] = instruction.slice(1).split('/')
      return exchange(programs, parseInt(a), parseInt(b))
    }

    case 'p': {
      const [c, d] = instruction.slice(1).split('/')
      return partner(programs, c, d)
    }

    default:
      return ''
  }
}

export const doDance = (input: string, programs = 'abcdefghijklmnop') => {
  input.split(',').forEach((instruction) => {
    programs = dance(programs, instruction)
  })
  return {
    answer1: programs,
  }
}

export const danceABillion = (input: string, programs = 'abcdefghijklmnop') => {
  const danceCount = 1000000000
  const instructions = input.split(',')
  const instrLen = instructions.length
  let count = 0
  const programsAtTime: string[] = []
  const seenBefore: Map<string, number> = new Map()
  while (
    count < danceCount &&
    typeof seenBefore.get(programs) === 'undefined'
  ) {
    seenBefore.set(programs, count)
    programsAtTime.push(programs)
    for (let i = 0; i < instrLen; i++) {
      programs = dance(programs, instructions[i])
    }
    count++
  }
  if (count < danceCount) {
    const seenAt = seenBefore.get(programs) || 0
    const loopSize = count - seenAt
    const remaining = danceCount - count
    programs = programsAtTime[seenAt + (remaining % loopSize)]
    count = danceCount
  }
  return {
    answer2: programs,
  }
}

const day16: Omit<DayConfig, 'year'> = {
  answer1Text: `The programs' final order is answer.`,
  answer2Text: `After a billion dances, the programs' final order is answer.`,
  buttons: [
    {
      label: 'Dance',
      onClick: doDance,
    },
    {
      label: 'Dance a Billion',
      onClick: danceABillion,
    },
  ],
  id: 16,
  inputs,
  title: 'Permutation Promenade',
}

export default day16
