import md5 from 'md5'
import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'

import INPUT from './Input/Day15'

interface IDisc {
  numberOfPositions: number
  startingPosition: number
}

const getPositionAtBallTime = (disc: IDisc, discIndex: number, buttonTime: number): number => {
  const ballTime = buttonTime + discIndex
  return (disc.startingPosition + ballTime) % disc.numberOfPositions
}

const parseInput = (inputKey: string): IDisc[] => {
  const discs: IDisc[] = []

  INPUT[inputKey].split('\n').forEach(line => {
    const numberOfPositions = parseInt(line.split(' has ')[1])
    const startingPosition = parseInt(line.split(' at position ')[1])
    discs.push({
      numberOfPositions,
      startingPosition
    })
  })

  discs.unshift({
    numberOfPositions: 1,
    startingPosition: 0
  })

  return discs
}

const BUTTONS: IButton[] = [
  {
    label: 'Get a Capsule!',
    onClick: (inputKey: string) => {
      const discs = parseInput(inputKey)

      let t = 0
      ballCheck:
      while (true) {
        const positionsAtBallTime = discs.map((disc, i) => getPositionAtBallTime(disc, i, t))
        if (positionsAtBallTime.every(pos => pos === 0)) break ballCheck
        t++
      }

      return {
        answer1: t.toString()
      }
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      Push the button at time=<code>{answer}</code> to get a capsule.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      {/* Index <code>{answer}</code> produces the <code>64</code>th stretched key. */}
    </span>
  ),
  buttons: BUTTONS,
  day: 15,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Timing is Everything'
}

export default config