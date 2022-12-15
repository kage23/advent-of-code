import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'
import INPUT from '../Inputs/2020/Day15'

const playNumberGame = (startingNumbers: number[], turnsToPlay: number): number => {
  const numbersSpokenOnTurns: Map<number, number[]> = new Map()
  let prevNumber = 0

  for (let turn = 1; turn <= turnsToPlay; turn++) {
    if (turn % 10000 === 0) console.log(`taking turn ${turn}`)
    if (turn <= startingNumbers.length) {
      prevNumber = startingNumbers[turn - 1]
      numbersSpokenOnTurns.set(startingNumbers[turn - 1], [turn])
    } else {
      const prevNumberSpokenOnTurns = numbersSpokenOnTurns.get(prevNumber)
      if (prevNumberSpokenOnTurns === undefined) throw new Error('fuck')
      const numberToSpeak = prevNumberSpokenOnTurns.length === 1
        ? 0
        : prevNumberSpokenOnTurns[1] - prevNumberSpokenOnTurns[0]
      const currentNumberPrevTurns = numbersSpokenOnTurns.get(numberToSpeak)
      const currentNumberTurns = currentNumberPrevTurns === undefined
        ? [turn]
        : [currentNumberPrevTurns[currentNumberPrevTurns.length - 1], turn]
      numbersSpokenOnTurns.set(numberToSpeak, currentNumberTurns)
      prevNumber = numberToSpeak
    }
  }

  return prevNumber
}

const BUTTONS: IButton[] = [
  {
    label: 'Play Number Game',
    onClick: (inputKey: string) => {
      const startingNumbers = INPUT[inputKey].split(',').map(x => parseInt(x))

      return {
        answer1: playNumberGame(startingNumbers, 2020).toString()
      }
    }
  },
  {
    label: 'Play Long Number Game',
    onClick: (inputKey: string) => {
      const startingNumbers = INPUT[inputKey].split(',').map(x => parseInt(x))

      return {
        answer2: playNumberGame(startingNumbers, 30000000).toString()
      }
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The <code>2020th</code> number spoken will be <code>{answer}</code>.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      The <code>30000000th</code> number spoken will be <code>{answer}</code>.
    </span>
  ),
  buttons: BUTTONS,
  day: 15,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Rambunctious Recitation'
}

export default config