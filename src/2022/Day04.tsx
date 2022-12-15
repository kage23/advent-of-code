import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'

import INPUT from '../Inputs/2022/Day04'

const isPairRedundant = (pair: string) => {
  const [a, b] = pair.split(',')
  const [a1, a2] = a.split('-').map(x => Number(x))
  const [b1, b2] = b.split('-').map(x => Number(x))
  return (a1 <= b1 && a2 >= b2) || (b1 <= a1 && b2 >= a2)
}

const doesPairOverlap = (pair: string) => {
  const [a, b] = pair.split(',')
  const [a1, a2] = a.split('-').map(x => Number(x))
  const [b1, b2] = b.split('-').map(x => Number(x))
  return (
    (a1 >= b1 && a1 <= b2) || (a2 >= b1 && a2 <= b2) ||
    (b1 >= a1 && b1 <= a2) || (b2 >= a1 && b2 <= a2)
  )
}

const BUTTONS: IButton[] = [
  {
    label: 'Find Redundant Pairs',
    onClick: (inputKey: string) => {
      const pairs = INPUT[inputKey].split('\n')

      return {
        answer1: pairs.filter(isPairRedundant).length.toString()
      }
    }
  },
  {
    label: 'Find Overlapping Pairs',
    onClick: (inputKey: string) => {
      const pairs = INPUT[inputKey].split('\n')

      return {
        answer2: pairs.filter(doesPairOverlap).length.toString()
      }
    }
  },
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      There are{' '}
      <code>{answer}</code> fully redundant pairs.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      There are{' '}
      <code>{answer}</code> overlapping pairs.
    </span>
  ),
  buttons: BUTTONS,
  day: 4,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Camp Cleanup'
}

export default config
