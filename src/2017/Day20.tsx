import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'

import INPUT from '../Inputs/2017/Day20'

import { manhattanDistance } from '../utils/Various'

interface IParticle {
  id: number
  position: number[]
  velocity: number[]
  acceleration: number[]
}

const pathKey = (position: number[]) => `${position[0]},${position[1]},${position[2]}`
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

const testForFurtherCollisions = (particles: IParticle[]): boolean => {
  // Check each particle's velocity relative to each other particle.
  // If they are all positive (moving away) from all others, there are no further collisions.

  return particles.some(particleA => (
    particles.some(particleB => {
      if (particleA.id === particleB.id) return false
      // Find current and next distance of particle A and B, then compare them to find relative velocity
      const currentDistance = manhattanDistance(particleA.position, particleB.position)
      const nextDistance = manhattanDistance(
        [
          particleA.position[0] + particleA.velocity[0] + particleA.acceleration[0],
          particleA.position[1] + particleA.velocity[1] + particleA.acceleration[1],
          particleA.position[2] + particleA.velocity[2] + particleA.acceleration[2]
        ],
        [
          particleB.position[0] + particleB.velocity[0] + particleB.acceleration[0],
          particleB.position[1] + particleB.velocity[1] + particleB.acceleration[1],
          particleB.position[2] + particleB.velocity[2] + particleB.acceleration[2]
        ]
      )
      return nextDistance < currentDistance
    })
  ))
}

const advanceParticles = (particles: IParticle[]): IParticle[] => {
  particles.forEach(particle => {
    particle.velocity[0] += particle.acceleration[0]
    particle.velocity[1] += particle.acceleration[1]
    particle.velocity[2] += particle.acceleration[2]

    particle.position[0] += particle.velocity[0]
    particle.position[1] += particle.velocity[1]
    particle.position[2] += particle.velocity[2]
  })
  return removeCollisions(particles)
}

const removeCollisions = (particles: IParticle[]): IParticle[] => {
  const positionMap: Map<string, number[]> = new Map()
  const removeIdsMap: Map<number, boolean> = new Map()
  particles.forEach((particle) => {
    const posArr = positionMap.get(pathKey(particle.position)) || []
    posArr.push(particle.id)
    positionMap.set(pathKey(particle.position), posArr)
  })
  for (const particleIds of positionMap.values()) {
    if (particleIds.length > 1) {
      for (const particleId of particleIds) removeIdsMap.set(particleId, true)
    }
  }
  return particles.filter(particle => !removeIdsMap.get(particle.id))
}

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
  },
  {
    label: 'Run Simulation',
    onClick: (inputKey) => {
      let particles: IParticle[] = parseInput(INPUT[inputKey])

      while (testForFurtherCollisions(particles)) {
        particles = advanceParticles(particles)
      }

      return {
        answer2: particles.length.toString()
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
      After all collisions, there are{' '}
      <code>{answer}</code> particles remaining.
    </span>
  ),
  buttons: BUTTONS,
  day: 20,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Particle Swarm'
}

export default config