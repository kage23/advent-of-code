import { defaultRenderDay, IButton, IDayConfig } from '../Config'

import INPUT from '../Inputs/2022/Day25'

const desnafify = (snafuNumber: string): number =>
  snafuNumber
    .split('')
    .reverse()
    .reduce((accumulator, n, i) => {
      const columnValue = 5 ** i
      switch (n) {
        case '2': {
          return columnValue * 2 + accumulator
        }
        case '1': {
          return columnValue * 1 + accumulator
        }
        case '0': {
          return accumulator
        }
        case '-': {
          return columnValue * -1 + accumulator
        }
        case '=': {
          return columnValue * -2 + accumulator
        }
        default:
          return accumulator
      }
    }, 0)

// / What's the biggest snafu number you can make if you have a 2 in this column?
const getBiggestWithTwo = (howManyDigits: number): number => {
  if (howManyDigits <= 0) return 0
  return 2 * 5 ** (howManyDigits - 1) + getBiggestWithTwo(howManyDigits - 1)
}

const snafify = (n: number): string => {
  let snafuNumber = ''
  let i = 1
  while (n > getBiggestWithTwo(i)) {
    i += 1
  }
  let runningNumber = 0
  while (i > 0) {
    i -= 1
    const biggestWithOne = 5 ** i + getBiggestWithTwo(i)
    if (n > runningNumber + biggestWithOne) {
      snafuNumber += '2'
      runningNumber += 2 * 5 ** i
    } else if (n >= runningNumber + 5 ** i - getBiggestWithTwo(i)) {
      snafuNumber += '1'
      runningNumber += 5 ** i
    } else if (n >= runningNumber) {
      snafuNumber += '0'
    } else if (n >= runningNumber - 5 ** i - getBiggestWithTwo(i)) {
      snafuNumber += '-'
      runningNumber -= 5 ** i
    } else {
      snafuNumber += '='
      runningNumber -= 2 * 5 ** i
    }
  }

  return snafuNumber
}

const BUTTONS: IButton[] = [
  {
    label: 'Get the SNAFU Number',
    onClick: (inputKey: string) => {
      const snafuNumbers = INPUT[inputKey].split('\n')
      const realNumbers = snafuNumbers.map(desnafify)
      const sum = realNumbers.reduce((a, b) => a + b, 0)

      return {
        answer1: snafify(sum),
      }
    },
  },
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The SNAFU number is <code>{answer}</code>.
    </span>
  ),
  answer2Text: () => <span />,
  buttons: BUTTONS,
  day: 25,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Full of Hot Air',
}

export default config
