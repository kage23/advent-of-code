import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'

import INPUT from '../Inputs/2021/Day10'

const checkSyntax = (line: string): string | string[] => {
  const openers: string[] = []

  for (let i = 0; i < line.length; i++) {
    const char = line.charAt(i)

    switch (char) {
      case '(':
      case '[':
      case '{':
      case '<':
        openers.push(char)
        break

      case ')':
        if (openers.pop() !== '(') {
          return char
        }
        break

      case ']':
        if (openers.pop() !== '[') {
          return char
        }
        break

      case '}':
        if (openers.pop() !== '{') {
          return char
        }
        break

      case '>':
        if (openers.pop() !== '<') {
          return char
        }
        break

      default:
        break
    }
  }

  return openers
}

const BUTTONS: IButton[] = [
  {
    label: 'Score the Syntax Errors',
    onClick: (inputKey: string) => {
      const rows = INPUT[inputKey].split('\n')
      const score = rows.reduce((accScore, currRow) => {
        const rowResult = checkSyntax(currRow)
        if (rowResult === ')') {
          return accScore + 3
        }
        if (rowResult === ']') {
          return accScore + 57
        }
        if (rowResult === '}') {
          return accScore + 1197
        }
        if (rowResult === '>') {
          return accScore + 25137
        }
        return accScore
      }, 0)

      return {
        answer1: score.toString()
      }
    }
  },
  {
    label: 'Complete the Incomplete Lines',
    onClick: (inputKey: string) => {
      const rows = INPUT[inputKey].split('\n')

      const lineScores = rows
        .reduce((scores, row) => {
          const rowResult = checkSyntax(row)

          if (typeof rowResult !== 'string') {
            const score = rowResult.reverse().reduce((accScore, opener) => {
              let newScore = accScore * 5

              switch (opener) {
                case '(':
                  newScore += 1
                  break

                case '[':
                  newScore += 2
                  break

                case '{':
                  newScore += 3
                  break

                case '<':
                  newScore += 4
                  break
              }

              return newScore
            }, 0)
            scores.push(score)
          }

          return scores
        }, [] as number[])
        .sort((a, b) => a - b)

      return {
        answer2: lineScores[(lineScores.length - 1) / 2].toString()
      }
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The total syntax error score is <code>{answer}</code>.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      The middle line completion score is <code>{answer}</code>.
    </span>
  ),
  buttons: BUTTONS,
  day: 10,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Syntax Scoring'
}

export default config
