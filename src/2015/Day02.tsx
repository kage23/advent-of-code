import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'

import INPUT from '../Inputs/2015/Day02'

const getRibbon = (present: string): number => {
  const [l, w, h] = present.split('x').map(x => parseInt(x))
  return Math.min(
    (l * 2) + (w * 2),
    (l * 2) + (h * 2),
    (w * 2) + (h * 2)
  ) + (l * w * h)
}

const getWrappingPaperSize = (present: string): number => {
  const [l, w, h] = present.split('x').map(x => parseInt(x))
  const slack = Math.min(l * w, l * h, w * h)
  return (2 * l * w) + (2 * l * h) + (2 * w * h) + slack
}

const BUTTONS: IButton[] = [
  {
    label: 'Calculate Wrapping Paper',
    onClick: (inputKey) => {
      const presentSizeList = INPUT[inputKey].split('\n')

      return {
        answer1: presentSizeList.reduce(
          (total, currentPresent) => total + getWrappingPaperSize(currentPresent),
          0
        ).toString()
      }
    }
  },
  {
    label: 'Calculate Ribbon',
    onClick: (inputKey) => {
      const presentSizeList = INPUT[inputKey].split('\n')

      return {
        answer2: presentSizeList.reduce(
          (total, currentPresent) => total + getRibbon(currentPresent),
          0
        ).toString()
      }
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The elves should order <code>{answer}</code> square feet of wrapping paper.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      The elves should order <code>{answer}</code> feet of ribbon.
    </span>
  ),
  buttons: BUTTONS,
  day: 2,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'I Was Told There Would Be No Math'
}

export default config