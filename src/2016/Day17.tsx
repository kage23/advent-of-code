import md5 from 'md5'
import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'

import INPUT from './Input/Day17'

interface ISearchNode {
  path: string
  position: string
}

const findPath = (passcode: string, lookingForLongest?: boolean): string => {
  let queue: ISearchNode[] = [{
    path: '',
    position: '0,0'
  }]

  let longestPathLength = 0

  const nextStepsForEach = (nextStep: ISearchNode) => {
    let i = 0
    while (
      i < queue.length
      && queue[i]
      && queue[i + 1]
      && queue[i].path.length <= nextStep.path.length
      && queue[i + 1].path.length <= nextStep.path.length
    ) i++
    queue = [
      ...queue.slice(0, i + 1),
      nextStep,
      ...queue.slice(i + 1)
    ]
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

  return longestPathLength === 0 ? 'There is no path!' : longestPathLength.toString()
}

const getNextSteps = ({ path, position }: ISearchNode, passcode: string): ISearchNode[] => {
  const hash = md5(`${passcode}${path}`)
  const [x, y] = position.split(',').map(n => parseInt(n))
  const nextSteps: ISearchNode[] = [
    { position: [x, y - 1], direction: 'U'},
    { position: [x, y + 1], direction: 'D'},
    { position: [x - 1, y], direction: 'L'},
    { position: [x + 1, y], direction: 'R'}
  ]
    .filter((nextStep, i) => (
      nextStep.position.every(n => n >= 0 && n <= 3)
      && (
        (
          hash.charAt(i) === 'b' || hash.charAt(i) === 'c' || hash.charAt(i) === 'd' || hash.charAt(i) === 'e' || hash.charAt(i) === 'f'
        )
      )
    ))
    .map(nextStep => ({
      path: `${path}${nextStep.direction}`,
      position: nextStep.position.join(',')
    }))

  return nextSteps
}

const BUTTONS: IButton[] = [
  {
    label: 'Find Shortest Path',
    onClick: (inputKey: string) => {
      const passcode = INPUT[inputKey]

      return {
        answer1: findPath(passcode)
      }
    }
  },
  {
    label: 'Find Longest Path',
    onClick: (inputKey: string) => {
      const passcode = INPUT[inputKey]

      return {
        answer2: findPath(passcode, true)
      }
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The shortest path to the vault is <code>{answer}</code>.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      The longest path to the vault is <code>{answer}</code> steps long.
    </span>
  ),
  buttons: BUTTONS,
  day: 17,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Two Steps Forward'
}

export default config