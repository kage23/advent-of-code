import inputs from '../../inputs/2022/day09'
import { DayConfig } from '../../routes/Day'

const getNewTail = (head: [number, number], tail: [number, number]): [number, number] => {
  // If they overlap or are one away, tail does not move
  if (
    Math.abs(head[0] - tail[0]) <= 1 && Math.abs(head[1] - tail[1]) <= 1
  ) {
    return tail
  }
  // If they're in the same col (same x), move along that col
  if (head[0] === tail[0]) {
    return [
      tail[0],
      head[1] < tail[1] ? tail[1] - 1 : tail[1] + 1
    ]
  }
  // If they're in the same row (same y), move along that row
  if (head[1] === tail[1]) {
    return [
      head[0] < tail[0] ? tail[0] - 1 : tail[0] + 1,
      tail[1]
    ]
  }
  // It was a diagonal move
  return [
    head[0] < tail[0] ? tail[0] - 1 : tail[0] + 1,
    head[1] < tail[1] ? tail[1] - 1 : tail[1] + 1
  ]
}

export const trackTheRopeTail = (input: string) => {
  // [x, y]
  const head: [number, number] = [0, 0]
  let tail: [number, number] = [0, 0]
  const tailVisited = ['0,0']

  const instructions = input.split('\n')

  instructions.forEach(instruction => {
    const [direction, distance] = instruction.split(' ')
    for (let i = 0; i < Number(distance); i++) {
      // Move the head
      switch (direction) {
        case 'U':
          head[1] -= 1
          break
        case 'D':
          head[1] += 1
          break
        case 'L':
          head[0] -= 1
          break
        case 'R':
          head[0] += 1
          break
      }
      // Maybe move the tail
      tail = getNewTail(head, tail)
      // If so, track the position visited
      const tailPos = tail.map(x => String(x)).join(',')
      if (!tailVisited.includes(tailPos)) tailVisited.push(tailPos)
    }
  })

  return { answer1: tailVisited.length }
}

export const trackTheLongTail = (input: string) => {
  // [x, y]
  const rope: [number, number][] = [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
  ]
  const tailVisited = ['0,0']

  const instructions = input.split('\n')

  instructions.forEach(instruction => {
    const [direction, distance] = instruction.split(' ')
    for (let i = 0; i < Number(distance); i++) {
      // Move the head
      switch (direction) {
        case 'U':
          rope[0][1] -= 1
          break
        case 'D':
          rope[0][1] += 1
          break
        case 'L':
          rope[0][0] -= 1
          break
        case 'R':
          rope[0][0] += 1
          break
      }
      // Maybe move each next knot
      for (let k = 1; k < rope.length; k++) {
        rope[k] = getNewTail(rope[k - 1], rope[k])
      }
      // Track the position of the tail
      const tailPos = rope[rope.length - 1].map(x => String(x)).join(',')
      if (!tailVisited.includes(tailPos)) tailVisited.push(tailPos)
    }
  })

  return { answer2: tailVisited.length }
}

const day09: Omit<DayConfig, 'year'> = {
  answer1Text: 'The rope tail visited answer locations.',
  answer2Text: 'The long rope tail visited answer locations.',
  buttons: [
    {
      label: 'Track the Rope Tail',
      onClick: trackTheRopeTail
    },
    {
      label: 'Track the Long Rope Tail',
      onClick: trackTheLongTail
    },
  ],
  id: 9,
  inputs,
  title: 'Rope Bridge',
}

export default day09
