import inputs from '../../inputs/2023/day03'
import { DayConfig } from '../../routes/Day'

export const addPartNumbers = (input: string) => ({
  answer1: input.split('\n').reduce((sum, row, rowIndex, grid) => {
    let newSum = sum
    const myRe = /\d+/g
    let match = myRe.exec(row)
    while (match) {
      const index = match.index
      outerLoop: for (
        let i = Math.max(rowIndex - 1, 0);
        i < Math.min(rowIndex + 2, grid.length);
        i++
      ) {
        for (
          let j = Math.max(index - 1, 0);
          j < Math.min(index + match[0].length + 1, row.length);
          j++
        ) {
          if (
            !['.', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(
              grid[i].charAt(j)
            )
          ) {
            newSum += Number(match)
            break outerLoop
          }
        }
      }
      match = myRe.exec(row)
    }
    return newSum
  }, 0),
})

export const addGearRatios = (input: string) => {
  const grid = input.split('\n')

  // Set up the gears list and part numbers list
  const gears: string[] = []
  const partNumbers: Map<string, number> = new Map()
  grid.forEach((row, rowIndex) => {
    const myGearRe = /\*/g
    const myNumberRe = /\d+/g
    let numberMatch = myNumberRe.exec(row)
    while (numberMatch) {
      const colIndex = numberMatch.index
      for (let ci = colIndex; ci < colIndex + numberMatch[0].length; ci++) {
        partNumbers.set(`${rowIndex},${ci}`, Number(numberMatch[0]))
      }
      numberMatch = myNumberRe.exec(row)
    }
    let gearMatch = myGearRe.exec(row)
    while (gearMatch) {
      gears.push(`${rowIndex},${gearMatch.index}`)
      gearMatch = myGearRe.exec(row)
    }
  })

  // For each gear, check if it's connected to two parts, and if so, multiply their IDs
  return {
    answer2: gears.reduce((sum, gear) => {
      const [row, col] = gear.split(',').map(Number)
      const partNeighbors: number[] = []
      for (
        let i = Math.max(row - 1, 0);
        i < Math.min(row + 2, grid.length);
        i++
      ) {
        for (
          let j = Math.max(col - 1, 0);
          j < Math.min(col + 2, grid[i].length);
          j++
        ) {
          if (
            partNumbers.has(`${i},${j}`) &&
            !partNeighbors.includes(partNumbers.get(`${i},${j}`)!)
          ) {
            partNeighbors.push(partNumbers.get(`${i},${j}`)!)
          }
        }
      }
      if (partNeighbors.length === 2)
        return sum + partNeighbors[0] * partNeighbors[1]
      return sum
    }, 0),
  }
}

const day03: Omit<DayConfig, 'year'> = {
  answer1Text: 'The sum of all the part numbers is answer.',
  answer2Text: 'The sum of the game power levels is answer.',
  buttons: [
    {
      label: 'Add the Part Numbers',
      onClick: addPartNumbers,
    },
    {
      label: 'Add Gear Rations',
      onClick: addGearRatios,
    },
  ],
  id: 3,
  inputs,
  title: 'Gear Ratios',
}

export default day03
