import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'

import INPUT from './Input/Day20'

interface IParticle {
  id: number
  position: number[]
  velocity: number[]
  acceleration: number[]
}

const sumAbs = (numbers: number[]): number => numbers.reduce((a, b) => Math.abs(a) + Math.abs(b))

const parseInput = (input: string): IParticle[] => (
  input.split('\n')
  .map((line, id) => {
    const posArr = line.split('p=<')[1].split(',')
    const velArr = line.split('>, v=<')[1].split(',')
    const accArr = line.split('>, a=<')[1].split(',')

    return {
      id,
      position: [
        parseInt(posArr[0]),
        parseInt(posArr[1]),
        parseInt(posArr[2])
      ],
      velocity: [
        parseInt(velArr[0]),
        parseInt(velArr[1]),
        parseInt(velArr[2])
      ],
      acceleration: [
        parseInt(accArr[0]),
        parseInt(accArr[1]),
        parseInt(accArr[2])
      ],
    }
  })
)

const BUTTONS: IButton[] = [
  {
    label: 'Find Closest Particle (Long-Term)',
    onClick: (inputKey) => {
      const particles = parseInput(INPUT[inputKey])
      .sort((a, b) => {
        const accelA = sumAbs(a.acceleration)
        const accelB = sumAbs(b.acceleration)
        const velA = sumAbs(a.velocity)
        const velB = sumAbs(b.velocity)
        const posA = sumAbs(a.position)
        const posB = sumAbs(b.position)

        return accelA !== accelB
          ? accelA - accelB
          : velA !== velB
            ? velA - velB
            : posA - posB
      })

      return {
        answer1: particles[0].id.toString()
      }
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The long-term closest particle to <code>&lt;0,0,0&gt;</code> will be Particle{' '}
      <code>{answer}</code>.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      <code>{answer}</code>
    </span>
  ),
  buttons: BUTTONS,
  day: 20,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Particle Swarm'
}

export default config