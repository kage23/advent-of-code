import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'

import INPUT from '../Inputs/2021/Day02'

const parseInput = (inputKey: string) => INPUT[inputKey].split('\n')

const BUTTONS: IButton[] = [
  {
    label: 'Find Final Location',
    onClick: (inputKey: string) => {
      const directions = parseInput(inputKey)
      const location = [0, 0] // x, y
      directions.forEach(d => {
        const [dir, dist] = d.split(' ')
        switch (dir) {
          case 'forward':
            location[0] += Number(dist)
            break

          case 'down':
            location[1] += Number(dist)
            break

          case 'up':
            location[1] -= Number(dist)
            break
        }
      })

      return {
        answer1: (location[0] * location[1]).toString()
      }
    }
  },
  {
    label: 'Find Final Location Correctly',
    onClick: (inputKey: string) => {
      const directions = parseInput(inputKey)
      const location = [0, 0] // x, y
      let aim = 0
      directions.forEach(d => {
        const [dir, dist] = d.split(' ')
        switch (dir) {
          case 'forward':
            location[0] += Number(dist)
            location[1] += (Number(dist) * aim)
            break

          case 'down':
            aim += Number(dist)
            break

          case 'up':
            aim -= Number(dist)
            break
        }
      })

      return {
        answer2: (location[0] * location[1]).toString()
      }
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The hash of the final location is{' '}
      <code>{answer}</code>.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      The hash of the correct final location is{' '}
      <code>{answer}</code>.
    </span>
  ),
  buttons: BUTTONS,
  day: 2,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Dive!'
}

export default config
