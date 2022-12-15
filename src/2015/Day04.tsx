import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'
import md5 from 'md5'

import INPUT from '../Inputs/2015/Day04'

const BUTTONS: IButton[] = [
  {
    label: 'Look for Hash',
    onClick: (inputKey) => {
      const input = INPUT[inputKey]
      let i = 0
      while (!md5(`${input}${i}`).startsWith('00000')) i++
      return {
        answer1: i.toString()
      }
    }
  },
  {
    label: 'Look for Better Hash',
    onClick: (inputKey) => {
      const input = INPUT[inputKey]
      let i = 0
      while (!md5(`${input}${i}`).startsWith('000000')) i++
      return {
        answer1: i.toString()
      }
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The lowest number that produces a good hash is <code>{answer}</code>.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      {/* With Robo-Santa's help, at least <code>{answer}</code> houses get a present. */}
    </span>
  ),
  buttons: BUTTONS,
  day: 4,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'The Ideal Stocking Stuffer'
}

export default config