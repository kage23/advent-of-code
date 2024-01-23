import inputs from '../../inputs/2023/day09'
import { DayConfig } from '../../routes/Day'

export const getNextValues = (input: string) => ({
  answer1: input
    .split('\n')
    .map((line) => {
      const numberStacks = [line.split(' ').map(Number)]
      for (
        let i = 0;
        i < numberStacks.length && numberStacks[i].some((x) => x !== 0);
        i++
      ) {
        const nextStack: number[] = []
        for (let j = 1; j < numberStacks[i].length; j++) {
          nextStack.push(numberStacks[i][j] - numberStacks[i][j - 1])
        }
        numberStacks.push(nextStack)
      }
      for (let k = numberStacks.length - 1; k >= 0; k--) {
        if (numberStacks[k].every((x) => x === 0)) numberStacks[k].push(0)
        else {
          numberStacks[k].push(
            numberStacks[k][numberStacks[k].length - 1] +
              numberStacks[k + 1][numberStacks[k + 1].length - 1]
          )
        }
      }
      return numberStacks[0][numberStacks[0].length - 1]
    })
    .reduce((sum, number) => sum + number, 0),
})

export const getPreviousValues = (input: string) => ({
  answer2: input
    .split('\n')
    .map((line) => {
      const numberStacks = [line.split(' ').map(Number)]
      for (
        let i = 0;
        i < numberStacks.length && numberStacks[i].some((x) => x !== 0);
        i++
      ) {
        const nextStack: number[] = []
        for (let j = 1; j < numberStacks[i].length; j++) {
          nextStack.push(numberStacks[i][j] - numberStacks[i][j - 1])
        }
        numberStacks.push(nextStack)
      }
      for (let k = numberStacks.length - 1; k >= 0; k--) {
        if (numberStacks[k].every((x) => x === 0)) numberStacks[k].unshift(0)
        else {
          numberStacks[k].unshift(numberStacks[k][0] - numberStacks[k + 1][0])
        }
      }
      return numberStacks[0][0]
    })
    .reduce((sum, number) => sum + number, 0),
})

const day09: Omit<DayConfig, 'year'> = {
  answer1Text: 'The sum of the next values in the sequences is answer.',
  answer2Text: 'The sum of the previous values in the sequences is answer.',
  buttons: [
    {
      label: 'Get Next Values',
      onClick: getNextValues,
    },
    {
      label: 'Get Previous Values',
      onClick: getPreviousValues,
    },
  ],
  id: 9,
  inputs,
  title: 'Mirage Maintenance',
}

export default day09
