import inputs from '../../inputs/2015/day02'
import { DayConfig } from '../../routes/Day'

export const getWrappingPaperSize = (present: string): number => {
  const [l, w, h] = present.split('x').map((x) => parseInt(x))
  const slack = Math.min(l * w, l * h, w * h)
  return 2 * l * w + 2 * l * h + 2 * w * h + slack
}

export const getRibbon = (present: string): number => {
  const [l, w, h] = present.split('x').map((x) => parseInt(x))
  return Math.min(l * 2 + w * 2, l * 2 + h * 2, w * 2 + h * 2) + l * w * h
}

export const calculateWrappingPaper = (input: string) => {
  const presentSizeList = input.split('\n')

  return {
    answer1: presentSizeList.reduce(
      (total, currentPresent) => total + getWrappingPaperSize(currentPresent),
      0
    ),
  }
}

export const calculateRibbon = (input: string) => {
  const presentSizeList = input.split('\n')

  return {
    answer2: presentSizeList.reduce(
      (total, currentPresent) => total + getRibbon(currentPresent),
      0
    ),
  }
}

const day02: Omit<DayConfig, 'year'> = {
  answer1Text: 'The elves should order answer square feet of wrapping paper.',
  answer2Text: 'The elves should order answer feet of ribbon.',
  buttons: [
    {
      label: 'Calculate Wrapping Paper',
      onClick: calculateWrappingPaper,
    },
    {
      label: 'Calculate Ribbon',
      onClick: calculateRibbon,
    },
  ],
  id: 2,
  inputs,
  title: 'I Was Told There Would Be No Math',
}

export default day02
