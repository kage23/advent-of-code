import inputs from '../../inputs/2023/day08'
import { DayConfig } from '../../routes/Day'
import { lcmTwoNumbers } from '../../utils/Math'

const parseInput = (input: string) => {
  const [instructions, nodeList] = input.split('\n\n')
  const nodes = nodeList.split('\n').map((node) => {
    const [id, lr] = node.split(' = ')
    const [L, R] = lr.slice(1, -1).split(', ')
    return { id, L, R }
  })
  return { instructions, nodes }
}

export const navigateTheDesert = (input: string) => {
  const { instructions, nodes } = parseInput(input)
  let currentPosition = 'AAA'
  let steps = 0
  while (currentPosition !== 'ZZZ') {
    const node = nodes.find(({ id }) => id === currentPosition)!
    const instruction = instructions.charAt(steps % instructions.length) as
      | 'L'
      | 'R'
    currentPosition = node[instruction]
    steps++
  }
  return {
    answer1: steps,
  }
}

export const navigateAsGhosts = (input: string) => {
  const { instructions, nodes } = parseInput(input)
  const currentPositions = nodes
    .map(({ id }) => id)
    .filter((id) => id.endsWith('A'))
  const stepsToEnd = currentPositions.map((startPosition) => {
    let currentPosition = startPosition
    let steps = 0
    while (!currentPosition.endsWith('Z')) {
      const node = nodes.find(({ id }) => id === currentPosition)!
      const instruction = instructions.charAt(steps % instructions.length) as
        | 'L'
        | 'R'
      currentPosition = node[instruction]
      steps++
    }
    return steps
  })
  return {
    answer2: stepsToEnd.reduce((prod, steps) => lcmTwoNumbers(prod, steps), 1),
  }
}

const day08: Omit<DayConfig, 'year'> = {
  answer1Text: 'It will take answer steps to reach ZZZ.',
  answer2Text: 'It will take answer steps for all the ghosts to reach **Z.',
  buttons: [
    {
      label: 'Navigate the Desert',
      onClick: navigateTheDesert,
    },
    {
      label: 'Navigate the Desert as Ghosts',
      onClick: navigateAsGhosts,
    },
  ],
  id: 8,
  inputs,
  title: 'Haunted Wasteland',
}

export default day08
