import {
  IButton,
  IDayConfig
} from '../Config'

import Assembunny from './Assembunny'
import INPUT from '../Inputs/2016/Day25'

const assembunny = new Assembunny([])

const evenOddHalves = (number: number, checkEven: boolean): boolean => {
  if (number === 0) {
    return !checkEven
  }
  if (halfEvenOdd(number, checkEven)) {
    return evenOddHalves(Math.floor(number / 2), !checkEven)
  }
  return false
}

const halfEvenOdd = (number: number, even: boolean): boolean => (
  Math.floor(number / 2) % 2 === (even ? 0 : 1)
)

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
    label: 'Work It Out Yourself',
    onClick: () => {
      return {
        answer1: ''
      }
    }
  },
  {
    label: 'Find a Good Number',
    onClick: () => {
      // Find a number that will be floor-halved to even, then to odd, then to even, etc.
      // Minimum is 2551
      // Then the answer will be that number MINUS 2550
      let i = 2551
      while (!evenOddHalves(i, false)) i++

      return {
        answer2: (i - 2550).toString()
      }
    }
  },
  {
    label: 'Run Assembunny Code',
    onClick: (inputKey: string) => {
      const input = INPUT[inputKey].split('\n')

      assembunny.registers.clear()
      assembunny.registers.set('a', 180)
      assembunny.registers.set('b', 0)
      assembunny.registers.set('c', 0)
      assembunny.registers.set('d', 0)

      assembunny.runCode(input)

      return {
        answer1: (assembunny.registers.get('a') || 0).toString()
      }
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      For now, I'm trying to just work out what the Assembunny code does, in general.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      The number to input is <code>{answer}</code>.
    </span>
  ),
  buttons: BUTTONS,
  day: 25,
  INPUT,
  renderDay: (dayConfig, inputKey) => renderDay(dayConfig, inputKey),
  title: 'Clock Signal'
}

export default config