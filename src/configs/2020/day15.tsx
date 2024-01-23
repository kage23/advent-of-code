import inputs from '../../inputs/2020/day15'
import { DayConfig } from '../../routes/Day'

export const playNumberGame = (input: string, turnsToPlay: number) => {
  const startingNumbers = input.split(',').map(x => parseInt(x))

  const numbersSpokenOnTurns: Map<number, number[]> = new Map()
  let prevNumber = 0

  for (let turn = 1; turn <= turnsToPlay; turn++) {
    // if (turn % 10000 === 0) console.log(`taking turn ${turn}`)
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

  return turnsToPlay < 5000 ? { answer1: prevNumber } : { answer2: prevNumber }
}

const day15: Omit<DayConfig, 'year'> = {
  answer1Text: 'The 2020th number spoken will be answer.',
  answer2Text: 'The 30,000,000th number spoken will be answer.',
  buttons: [
    {
      label: 'Play Number Game',
      onClick: (input) => playNumberGame(input, 2020),
    },
    {
      label: 'Play Long Number Game',
      onClick: (input) => playNumberGame(input, 30000000),
    },
  ],
  id: 15,
  inputs,
  title: 'Rambunctious Recitation',
}

export default day15
