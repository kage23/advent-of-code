import inputs from '../../inputs/2015/day16'
import { DayConfig } from '../../routes/Day'

interface Sue {
  akitas?: number
  cars?: number
  cats?: number
  children?: number
  goldfish?: number
  number: number
  perfumes?: number
  pomeranians?: number
  samoyeds?: number
  trees?: number
  vizslas?: number
  [key: string]: number | undefined
}

const analysis: Sue = {
  akitas: 0,
  cars: 2,
  cats: 7,
  children: 3,
  goldfish: 5,
  number: -1,
  perfumes: 1,
  pomeranians: 3,
  samoyeds: 2,
  trees: 3,
  vizslas: 0,
}

const parseInput = (input: string): Sue[] =>
  input
    .split('\n')
    .map((sueLine, i) => {
      const number = i + 1
      const sue: Sue = { number }

      if (sueLine.includes('akitas')) {
        sue.akitas = parseInt(sueLine.split('akitas: ')[1])
      }
      if (sueLine.includes('cars')) {
        sue.cars = parseInt(sueLine.split('cars: ')[1])
      }
      if (sueLine.includes('cats')) {
        sue.cats = parseInt(sueLine.split('cats: ')[1])
      }
      if (sueLine.includes('children')) {
        sue.children = parseInt(sueLine.split('children: ')[1])
      }
      if (sueLine.includes('goldfish')) {
        sue.goldfish = parseInt(sueLine.split('goldfish: ')[1])
      }
      if (sueLine.includes('perfumes')) {
        sue.perfumes = parseInt(sueLine.split('perfumes: ')[1])
      }
      if (sueLine.includes('pomeranians')) {
        sue.pomeranians = parseInt(sueLine.split('pomeranians: ')[1])
      }
      if (sueLine.includes('samoyeds')) {
        sue.samoyeds = parseInt(sueLine.split('samoyeds: ')[1])
      }
      if (sueLine.includes('trees')) {
        sue.trees = parseInt(sueLine.split('trees: ')[1])
      }
      if (sueLine.includes('vizslas')) {
        sue.vizslas = parseInt(sueLine.split('vizslas: ')[1])
      }

      return sue
    })

export const determineTheSue = (input: string) => {
  const sues = parseInput(input)
  for (let i = 0; i < sues.length; i++) {
    const sue = sues[i]
    let theRightSue = true
    for (const key of Object.keys(sue)) {
      if (sue[key] !== analysis[key] && key !== 'number') {
        theRightSue = false
        break
      }
    }
    if (theRightSue) {
      return {
        answer1: sue.number,
      }
    }
  }
}

export const determineTheActualSue = (input: string) => {
  const sues = parseInput(input)
  for (let i = 0; i < sues.length; i++) {
    const sue = sues[i]
    let theRightSue = true
    keyLoop: for (const key of Object.keys(sue)) {
      if (key !== 'number') {
        switch (key) {
          case 'cats':
          case 'trees':
            if (
              typeof sue[key] !== 'undefined' &&
              typeof analysis[key] !== 'undefined' &&
              (sue[key] || 0) <= (analysis[key] || 0)
            ) {
              theRightSue = false
              break keyLoop
            }
            break

          case 'pomeranians':
          case 'goldfish':
            if (
              typeof sue[key] !== 'undefined' &&
              typeof analysis[key] !== 'undefined' &&
              (sue[key] || 0) >= (analysis[key] || 0)
            ) {
              theRightSue = false
              break keyLoop
            }
            break

          default:
            if (sue[key] !== analysis[key]) {
              theRightSue = false
              break keyLoop
            }
            break
        }
      }
    }
    if (theRightSue) {
      return {
        answer2: sue.number,
      }
    }
  }
}

const day16: Omit<DayConfig, 'year'> = {
  answer1Text: 'Sue #answer got you the gift.',
  answer2Text: 'Sue #answer actually got you the gift.',
  buttons: [
    {
      label: 'Determine the Sue',
      onClick: determineTheSue,
    },
    {
      label: 'Determine the Actual Sue',
      onClick: determineTheActualSue,
    },
  ],
  id: 16,
  inputs,
  title: 'Aunt Sue',
}

export default day16
