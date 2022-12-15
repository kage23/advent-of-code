import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'

import INPUT from '../Inputs/2019/Day05'
import { intcodeComputer2019 } from '../utils/Various'

const parseInput = (inputKey: string): number[] =>
  INPUT[inputKey].split(',').map(inputStr => parseInt(inputStr))

const BUTTONS: IButton[] = [
  {
    label: 'Run AC Diagnostic',
    onClick: (inputKey: string) => {
      const input = parseInput(inputKey)

      const { outputs } = intcodeComputer2019(input, [1])
      const output = outputs.pop()

      return output !== undefined ? {
        answer1: output.toString()
      } : {}
    }
  },
  {
    label: 'Get Radiator Code',
    onClick: (inputKey: string) => {
      const input = parseInput(inputKey)

      const { outputs } = intcodeComputer2019(input, [5])
      const output = outputs.pop()

      return output !== undefined ? {
        answer2: output.toString()
      } : {}
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The final output code is <code>{answer}</code>.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      The diagnostic code for system ID <code>5</code> is{' '}
      <code>{answer}</code>.
    </span>
  ),
  buttons: BUTTONS,
  day: 5,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Sunny with a Chance of Asteroids'
}

export default config
