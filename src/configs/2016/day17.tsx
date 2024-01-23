import md5 from 'md5'
import inputs from '../../inputs/2016/day17'
import { DayConfig } from '../../routes/Day'

interface SearchNode {
  path: string
  position: string
}

const getNextSteps = (
  { path, position }: SearchNode,
  passcode: string
): SearchNode[] => {
  const hash = md5(`${passcode}${path}`)
  const [x, y] = position.split(',').map((n) => parseInt(n))
  const nextSteps: SearchNode[] = [
    { position: [x, y - 1], direction: 'U' },
    { position: [x, y + 1], direction: 'D' },
    { position: [x - 1, y], direction: 'L' },
    { position: [x + 1, y], direction: 'R' },
  ]
    .filter(
      (nextStep, i) =>
        nextStep.position.every((n) => n >= 0 && n <= 3) &&
        (hash.charAt(i) === 'b' ||
          hash.charAt(i) === 'c' ||
          hash.charAt(i) === 'd' ||
          hash.charAt(i) === 'e' ||
          hash.charAt(i) === 'f')
    )
    .map((nextStep) => ({
      path: `${path}${nextStep.direction}`,
      position: nextStep.position.join(','),
    }))

  return nextSteps
}

const findPath = (passcode: string, lookingForLongest?: boolean) => {
  let queue: SearchNode[] = [
    {
      path: '',
      position: '0,0',
    },
  ]

  let longestPathLength = 0

  const nextStepsForEach = (nextStep: SearchNode) => {
    let i = 0
    while (
      i < queue.length &&
      queue[i] &&
      queue[i + 1] &&
      queue[i].path.length <= nextStep.path.length &&
      queue[i + 1].path.length <= nextStep.path.length
    )
      i++
    queue = [...queue.slice(0, i + 1), nextStep, ...queue.slice(i + 1)]
  }
  while (queue.length) {
    const current = queue.shift()
    if (current) {
      if (current.position === '3,3') {
        if (lookingForLongest) {
          longestPathLength = Math.max(longestPathLength, current.path.length)
        } else {
          return current.path
        }
      } else {
        const nextSteps = getNextSteps(current, passcode)
        nextSteps.forEach(nextStepsForEach)
      }
    }
  }

  return longestPathLength === 0 ? 'There is no path!' : longestPathLength
}

export const findShortestVaultPath = (passcode: string) => ({
  answer1: findPath(passcode),
})

export const findLongestVaultPath = (passcode: string) => ({
  answer2: findPath(passcode, true),
})

const day17: Omit<DayConfig, 'year'> = {
  answer1Text: 'The shortest path to the vault is answer.',
  answer2Text: 'The longest path to the vault is answer steps long.',
  buttons: [
    {
      label: 'Find Shortest Vault Path',
      onClick: findShortestVaultPath,
    },
    {
      label: 'Find Longest Vault Path',
      onClick: findLongestVaultPath,
    },
  ],
  id: 17,
  inputs,
  title: 'Two Steps Forward',
}

export default day17
