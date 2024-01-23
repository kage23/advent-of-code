import inputs from '../../inputs/2021/day10'
import { DayConfig } from '../../routes/Day'

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

export const scoreSyntaxErrors = (input: string) => {
  const rows = input.split('\n')
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
    answer1: score
  }
}

export const completeIncompleteLines = (input: string) => {
  const rows = input.split('\n')

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
    answer2: lineScores[(lineScores.length - 1) / 2]
  }
}

const day10: Omit<DayConfig, 'year'> = {
  answer1Text: 'The total syntax error score is answer.',
  answer2Text: 'The middle line completion score is answer.',
  buttons: [
    {
      label: 'Score the Syntax Errors',
      onClick: scoreSyntaxErrors
    },
    {
      label: 'Complete the Incomplete Lines',
      onClick: completeIncompleteLines
    }
  ],
  id: 10,
  inputs,
  title: 'Syntax Scoring',
}

export default day10
