import inputs from '../../inputs/2022/day01'
import { DayConfig } from '../../routes/Day'

export const countCalories = (input: string) => ({
  answer1: input.split('\n\n').reduce((currMax, elf) => {
    const calories = elf.split('\n').map(n => Number(n)).reduce((a, b) => a + b)
    return Math.max(calories, currMax)
  }, 0)
})

export const countCaloriesTopThree = (input: string) => ({
  answer2: input.split('\n\n').map(
    elf => elf.split('\n').map(n => Number(n)).reduce((a, b) => a + b)
  ).sort((a, b) => b - a).slice(0, 3).reduce((a, b) => a + b)
})

const day01: Omit<DayConfig, 'year'> = {
  answer1Text: 'The elf with the most calories has answer calories.',
  answer2Text: 'The top three elves are carrying answer calories.',
  buttons: [
    {
      label: 'Count Calories',
      onClick: countCalories
    },
    {
      label: 'Count Calories (Top Three)',
      onClick: countCaloriesTopThree
    },
  ],
  id: 1,
  inputs,
  title: 'Calorie Counting',
}

export default day01
