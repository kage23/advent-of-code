import {
  IButton,
  IDayConfig
} from '../Config'

import INPUT from '../Inputs/2016/Day12'
import Assembunny from './Assembunny'

const assembunny = new Assembunny([])

const renderDay = (dayConfig: IDayConfig, inputKey: string) => (
  <div className="render-box">
    <div>
      <h3>Input:</h3>
      <pre>{dayConfig.INPUT[inputKey]}</pre>
    </div>
    <div className="render-box--left-margin">
      <h3>Registers:</h3>
      <pre>
        A: {assembunny.registers.get('a')} <br />
        B: {assembunny.registers.get('b')} <br />
        C: {assembunny.registers.get('c')} <br />
        D: {assembunny.registers.get('d')}
      </pre>
    </div>
  </div>
)

const BUTTONS: IButton[] = [
  {
    label: 'Run Assembunny Code',
    onClick: (inputKey: string) => {
      const input = INPUT[inputKey].split('\n')

      assembunny.registers.clear()
      assembunny.registers.set('a', 0)
      assembunny.registers.set('b', 0)
      assembunny.registers.set('c', 0)
      assembunny.registers.set('d', 0)

      assembunny.runCode(input)

      return {
        answer1: (assembunny.registers.get('a') || 0).toString()
      }
    }
  },
  {
    label: 'Run Assembunny Code, Part 2',
    onClick: (inputKey: string) => {
      const input = INPUT[inputKey].split('\n')

      assembunny.registers.clear()
      assembunny.registers.set('a', 0)
      assembunny.registers.set('b', 0)
      assembunny.registers.set('c', 1)
      assembunny.registers.set('d', 0)
      assembunny.runCode(input)

      return {
        answer2: (assembunny.registers.get('a') || 0).toString()
      }
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The final value left in register <code>a</code> is <code>{answer}</code>.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      The final value left in register <code>a</code> is <code>{answer}</code>.
    </span>
  ),
  buttons: BUTTONS,
  day: 12,
  INPUT,
  renderDay: (dayConfig, inputKey) => renderDay(dayConfig, inputKey),
  title: `Leonardo's Monorail`
}

export default config