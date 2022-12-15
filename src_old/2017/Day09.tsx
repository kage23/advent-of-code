import {
  IButton,
  IDayConfig
} from '../Config'

import INPUT from '../Inputs/2017/Day09'

let groups = 0
let prevInputKey = ''

const processStream = (input: string): {
  score: number
  garbage: number
} => {
  let len = input.length
  let score = 0
  let garbage = 0
  let parentScore = 0
  let inGarbage = false

  for (let i = 0; i < len; i++) {
    switch (input.charAt(i)) {
      case '{':
        if (!inGarbage) {
          groups++
          parentScore++
          score += parentScore
        }
        if (inGarbage) garbage++
        break

      case '}':
        if (!inGarbage) parentScore--
        if (inGarbage) garbage++
        break

      case '<':
        if (inGarbage) garbage++
        inGarbage = true
        break

      case '>':
        inGarbage = false
        break

      case '!':
        i++
        break

      default:
        if (inGarbage) garbage++
        break
    }
  }

  return {
    score,
    garbage
  }
}

const BUTTONS: IButton[] = [
  {
    label: 'Process Stream',
    onClick: (inputKey) => {
      const result = processStream(INPUT[inputKey])

      return {
        answer1: result.score.toString(),
        answer2: result.garbage.toString()
      }
    }
  }
]

export const renderDay = (dayConfig: IDayConfig, inputKey: string): JSX.Element => {
  if (prevInputKey !== inputKey) {
    groups = 0
    prevInputKey = inputKey
  }

  return (
    <div className="render-box">
      <h3>Input:</h3>
      <pre className="render-box--pre-wrap">{dayConfig.INPUT[inputKey]}</pre>
    </div>
  )
}


const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      There are <code>{groups}</code> groups, with a total score of <code>{answer}</code>.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      There was <code>{answer}</code> uncancelled garbage.
    </span>
  ),
  buttons: BUTTONS,
  day: 9,
  INPUT,
  renderDay,
  title: 'Stream Processing'
}

export default config