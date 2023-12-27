import inputs from '../../inputs/2020/day18'
import { DayConfig } from '../../routes/Day'

const solveProblem = (problem: string): number => {
  let ongoing = 0
  let currentOperation: '+' | '*' = '+'
  let i = 0
  while (i < problem.length) {
    const char = problem.charAt(i)
    if (!isNaN(parseInt(char))) {
      ongoing = currentOperation === '+'
        ? ongoing + parseInt(char)
        : ongoing * parseInt(char)
      i++
    } else {
      switch (char) {
        case ' ':
          i++
          break

        case '+':
        case '*':
          currentOperation = char
          i++
          break

        case '(': {
          let openingParenCount = 1
          let closingParenCount = 0
          let j = i + 1
          while (closingParenCount < openingParenCount) {
            if (problem.charAt(j) === '(') openingParenCount++
            if (problem.charAt(j) === ')') closingParenCount++
            j++
          }
          const subproblem = problem.slice(i + 1, j - 1)
          const nextNumber = solveProblem(subproblem)
          ongoing = currentOperation === '+'
            ? ongoing + nextNumber
            : ongoing * nextNumber
          i = j
          break
        }

        default:
          break
      }
    }
  }

  return ongoing
}

export const calculateEachLine = (input: string) => {
  const problems = input.split('\n')

  return {
    answer1: problems.reduce((sum, problem) => sum + solveProblem(problem), 0)
  }
}

const solveProblem__v2 = (problem: string): number => {
  let ongoing = 0
  let currentOperation: '+' | '*' = '+'
  let i = 0
  while (i < problem.length) {
    const char = problem.charAt(i)
    if (!isNaN(parseInt(char))) {
      const num = `${parseInt(problem.slice(i))}`
      if (problem.charAt(i + num.length + 1) === '+') {
        let substring = ''
        if (!isNaN(parseInt(problem.charAt(i + num.length + 3)))) {
          for (let k = i + 5; k <= problem.length; k++) {
            if (problem.charAt(k) === '*' || problem.charAt(k) === ')' || k === problem.length) {
              substring = problem.slice(i, k).trim()
              break
            }
          }
          if (substring === problem) {
            return problem
              .split(' ')
              .filter(x => !isNaN(parseInt(x)))
              .map(x => parseInt(x))
              .reduce((a, b) => a + b)
          }
          const nextNumber = solveProblem__v2(substring)
          ongoing = currentOperation === '+'
            ? ongoing + nextNumber
            : ongoing * nextNumber
          i += substring.length
        } else {
          let openingParenCount = 1
          let closingParenCount = 0
          let j = i + 5
          while (closingParenCount < openingParenCount) {
            if (problem.charAt(j) === '(') openingParenCount++
            if (problem.charAt(j) === ')') closingParenCount++
            j++
          }
          const subproblem = problem.slice(i + 5, j - 1)
          const subanswer = solveProblem__v2(subproblem)
          const nextNumber = solveProblem__v2(`${problem.slice(i, i + 4)}${subanswer}`)
          ongoing = currentOperation === '+'
            ? ongoing + nextNumber
            : ongoing * nextNumber
          i = j
        }
      } else {
        ongoing = currentOperation === '+'
          ? ongoing + parseInt(problem.slice(i))
          : ongoing * parseInt(problem.slice(i))
        i += `${parseInt(problem.slice(i))}`.length
      }
    } else {
      switch (char) {
        case ' ':
          i++
          break

        case '+':
        case '*':
          currentOperation = char
          i++
          break

        default:
          break
      }
    }
  }
  return ongoing
}

const reduceParens = (problem: string): string => {
  while (problem.includes('(')) {
    const firstOpening = problem.indexOf('(')
    let openingParenCount = 1
    let closingParenCount = 0
    let i = firstOpening + 1
    while (closingParenCount < openingParenCount) {
      if (problem.charAt(i) === '(') openingParenCount++
      if (problem.charAt(i) === ')') closingParenCount++
      i++
    }
    const subproblem = problem.slice(firstOpening + 1, i - 1)
    const subproblem_reduced = reduceParens(subproblem)
    const nextNumber = solveProblem__v2(subproblem_reduced)
    problem = problem.replace(`(${subproblem})`, `${nextNumber}`)
  }
  return problem
}

export const properlyCalculateEachLine = (input: string) => {
  const problems = input.split('\n')

  return {
    answer2: problems
      .map(reduceParens)
      .reduce((sum, problem) => sum + solveProblem__v2(problem), 0)
  }
}

const day18: Omit<DayConfig, 'year'> = {
  answer1Text: 'The sum of the answers from each line is answer.',
  answer2Text: 'The sum of the answers from each line when solved properly is answer.',
  buttons: [
    {
      label: 'Calculate Each Line',
      onClick: calculateEachLine
    },
    {
      label: 'Properly Calculate Each Line',
      onClick: properlyCalculateEachLine
    },
  ],
  id: 18,
  inputs,
  title: 'Operation Order',
}

export default day18
