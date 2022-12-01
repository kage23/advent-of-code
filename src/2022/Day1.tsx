import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'

import INPUT from '../Inputs/2022/Day1'

const BUTTONS: IButton[] = [
  {
    label: 'Count Calories',
    onClick: (inputKey: string) => {
      const elves = INPUT[inputKey].split('\n\n')
      const max = elves.reduce((currMax, elf) => {
        const calories = elf.split('\n').map(n => Number(n)).reduce((a, b) => a + b)
        return Math.max(calories, currMax)
      }, 0)
      return {
        answer1: max.toString()
      }
    }
  },
  {
    label: 'Count Calories (Top Three)',
    onClick: (inputKey: string) => {
      const elves = INPUT[inputKey].split('\n\n').map(
        elf => elf.split('\n').map(n => Number(n)).reduce((a, b) => a + b)
      ).sort((a, b) => b - a).slice(0, 3)
      return {
        answer2: elves.reduce((a, b) => a + b).toString()
      }
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The elf with the most calories has{' '}
      <code>{answer}</code> calories.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      The top three elves are carrying{' '}
      <code>{answer}</code> calories.
    </span>
  ),
  buttons: BUTTONS,
  day: 1,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Calorie Counting'
}

export default config
