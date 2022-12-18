import { defaultRenderDay, IButton, IDayConfig } from '../Config'

import INPUT from '../Inputs/2022/Day17'

type RockTypes = '-' | '+' | 'L' | '|' | '*'
type WindDirections = '<' | '>'

interface Rock {
  type: RockTypes
  left: number
  right: number
  bottom: number
}

/**

####

.#.
###
.#.

..#
..#
###

#
#
#
#

##
##

*/

const rockOrder: RockTypes[] = ['-', '+', 'L', '|', '*']
const getInitialRight = (rockTypeIndex: number): number => {
  switch (rockOrder[rockTypeIndex]) {
    case '-':
      return 5
    case '+':
    case 'L':
      return 4
    case '|':
      return 2
    case '*':
      return 3
  }
}

const dropOneRock = (
  jetStream: WindDirections[],
  tower: Map<number, string>,
  windIndex: number,
  rockTypeIndex: number
): {
  nextWindIndex: number
  nextRockTypeIndex: number
} => {
  let currentWindIndex = windIndex
  const rock: Rock = {
    type: rockOrder[rockTypeIndex],
    left: 2,
    right: getInitialRight(rockTypeIndex),
    bottom: tower.size ? Math.max(...Array.from(tower.keys())) + 4 : 4
  }

  let areWeDoneYet = false
  while (!areWeDoneYet) {
    blowOneWind(rock, jetStream[currentWindIndex], tower)
    currentWindIndex = (currentWindIndex + 1) % jetStream.length
    areWeDoneYet = dropItOnce(rock, tower)
  }

  return {
    nextWindIndex: currentWindIndex,
    nextRockTypeIndex: (rockTypeIndex + 1) % rockOrder.length
  }
}

const blowOneWind = (rock: Rock, wind: WindDirections, tower: Map<number, string>) => {
  const locationsToCheck: [number, number][] = []
  switch (rock.type) {
    case '-': {
      locationsToCheck.push(
        [
          wind === '<' ? rock.left - 1 : rock.right + 1,
          rock.bottom
        ]
      )
      break
    }
    case '+': {
      if (wind === '<') {
        locationsToCheck.push(
          [rock.left, rock.bottom],
          [rock.left - 1, rock.bottom + 1],
          [rock.left, rock.bottom + 2]
        )
      }
      else {
        locationsToCheck.push(
          [rock.right, rock.bottom],
          [rock.right + 1, rock.bottom + 1],
          [rock.right, rock.bottom + 2]
        )
      }
      break
    }
    case 'L': {
      if (wind === '<') {
        locationsToCheck.push(
          [rock.left - 1, rock.bottom],
          [rock.left + 1, rock.bottom + 1],
          [rock.left + 1, rock.bottom + 2]
        )
      }
      else {
        locationsToCheck.push(
          [rock.right + 1, rock.bottom],
          [rock.right + 1, rock.bottom + 1],
          [rock.right + 1, rock.bottom + 2]
        )
      }
      break
    }
    case '|': {
      if (wind === '<') {
        locationsToCheck.push(
          [rock.left - 1, rock.bottom],
          [rock.left - 1, rock.bottom + 1],
          [rock.left - 1, rock.bottom + 2],
          [rock.left - 1, rock.bottom + 3],
        )
      }
      else {
        locationsToCheck.push(
          [rock.right + 1, rock.bottom],
          [rock.right + 1, rock.bottom + 1],
          [rock.right + 1, rock.bottom + 2],
          [rock.right + 1, rock.bottom + 3],
        )
      }
      break
    }
    case '*': {
      if (wind === '<') {
        locationsToCheck.push(
          [rock.left - 1, rock.bottom],
          [rock.left - 1, rock.bottom + 1]
        )
      }
      else {
        locationsToCheck.push(
          [rock.right + 1, rock.bottom],
          [rock.right + 1, rock.bottom + 1]
        )
      }
      break
    }
  }

  if (locationsToCheck.every(([x, y]) => {
    const row = (tower.get(y) || blankRow)
    return y > 0 && x >= 0 && x <= 6 && row.charAt(x) === '.'
  })) {
    switch (wind) {
      case '<': {
        rock.left -= 1
        rock.right -= 1
        break
      }
      case '>': {
        rock.left += 1
        rock.right += 1
        break
      }
    }
  }
}

const blankRow = '.......'

// Returns areWeDoneYet: boolean
const dropItOnce = (rock: Rock, tower: Map<number, string>): boolean => {
  // This will be a bit tricky because we need to check the bottom contours
  // of the rocks to see if they hit anything anywhere.

  // [x: charAt, y: rowOfTower]
  const locationsToCheck: [number, number][] = []

  switch (rock.type) {
    case '-': {
      for (let x = rock.left; x <= rock.right; x++) {
        locationsToCheck.push([x, rock.bottom - 1])
      }
      break
    }
    case '+': {
      locationsToCheck.push(
        [rock.left, rock.bottom],
        [rock.left + 1, rock.bottom - 1],
        [rock.right, rock.bottom],
      )
      break
    }
    case 'L': {
      for (let x = rock.left; x <= rock.right; x++) {
        locationsToCheck.push([x, rock.bottom - 1])
      }
      break
    }
    case '|': {
      locationsToCheck.push([rock.left, rock.bottom - 1])
      break
    }
    case '*': {
      locationsToCheck.push(
        [rock.left, rock.bottom - 1],
        [rock.right, rock.bottom - 1]
      )
      break
    }
  }

  // It's clear, so the rock falls one
  if (locationsToCheck.every(([x, y]) => {
    const row = tower.get(y) || blankRow

    return row.charAt(x) === '.' && y > 0
  })) {
    rock.bottom -= 1

    return false
  }
  // It's not clear, so the rock lands
  else {
    switch (rock.type) {
      case '-': {
        const currentRow = tower.get(rock.bottom) || blankRow
        const newRow =
          `${currentRow.slice(0, rock.left)}####${currentRow.slice(rock.right + 1)}`
        tower.set(rock.bottom, newRow)
        break
      }
      case '+': {
        const bottomRow = tower.get(rock.bottom) || blankRow
        const middleRow = tower.get(rock.bottom + 1) || blankRow
        const topRow = tower.get(rock.bottom + 2) || blankRow
        const newBottom =
          `${bottomRow.slice(0, rock.left + 1)}#${bottomRow.slice(rock.right)}`
        const newMiddle =
          `${middleRow.slice(0, rock.left)}###${middleRow.slice(rock.right + 1)}`
        const newTop =
          `${topRow.slice(0, rock.left + 1)}#${topRow.slice(rock.right)}`
        tower.set(rock.bottom, newBottom)
        tower.set(rock.bottom + 1, newMiddle)
        tower.set(rock.bottom + 2, newTop)
        break
      }
      case 'L': {
        const bottomRow = tower.get(rock.bottom) || blankRow
        const middleRow = tower.get(rock.bottom + 1) || blankRow
        const topRow = tower.get(rock.bottom + 2) || blankRow
        const newBottom =
          `${bottomRow.slice(0, rock.left)}###${bottomRow.slice(rock.right + 1)}`
        const newMiddle =
          `${middleRow.slice(0, rock.right)}#${middleRow.slice(rock.right + 1)}`
        const newTop =
          `${topRow.slice(0, rock.right)}#${topRow.slice(rock.right + 1)}`
        tower.set(rock.bottom, newBottom)
        tower.set(rock.bottom + 1, newMiddle)
        tower.set(rock.bottom + 2, newTop)
        break
      }
      case '|': {
        const bottomRow = tower.get(rock.bottom) || blankRow
        const middle1Row = tower.get(rock.bottom + 1) || blankRow
        const middle2Row = tower.get(rock.bottom + 2) || blankRow
        const topRow = tower.get(rock.bottom + 3) || blankRow
        const newBottom =
          `${bottomRow.slice(0, rock.left)}#${bottomRow.slice(rock.right + 1)}`
        const newMiddle1 =
          `${middle1Row.slice(0, rock.left)}#${middle1Row.slice(rock.right + 1)}`
        const newMiddle2 =
          `${middle2Row.slice(0, rock.left)}#${middle2Row.slice(rock.right + 1)}`
        const newTop =
          `${topRow.slice(0, rock.left)}#${topRow.slice(rock.right + 1)}`
        tower.set(rock.bottom, newBottom)
        tower.set(rock.bottom + 1, newMiddle1)
        tower.set(rock.bottom + 2, newMiddle2)
        tower.set(rock.bottom + 3, newTop)
        break
      }
      case '*': {
        const bottomRow = tower.get(rock.bottom) || blankRow
        const topRow = tower.get(rock.bottom + 1) || blankRow
        const newBottom =
          `${bottomRow.slice(0, rock.left)}##${bottomRow.slice(rock.right + 1)}`
        const newTop =
          `${topRow.slice(0, rock.left)}##${topRow.slice(rock.right + 1)}`
        tower.set(rock.bottom, newBottom)
        tower.set(rock.bottom + 1, newTop)
        break
      }
    }

    return true
  }
}

const BUTTONS: IButton[] = [
  {
    label: 'Simulate Falling Rocks',
    onClick: (inputKey: string) => {
      const jetStream = INPUT[inputKey].split('') as WindDirections[]

      // Map of row numbers to what's on that row
      const tower: Map<number, string> = new Map()

      // debugger

      let result: {
        nextWindIndex: number
        nextRockTypeIndex: number
      } = {
        nextWindIndex: 0,
        nextRockTypeIndex: 0
      }

      for (let i = 0; i < 2022; i++) {
        result = dropOneRock(jetStream, tower, result.nextWindIndex, result.nextRockTypeIndex)
      }

      // debugger

      return {
        answer1: Array.from(tower.keys()).sort((a, b) => b - a)[0].toString()
      }
    }
  },
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      After 2022 rocks, the tower will be{' '}
      <code>{answer}</code> units tall.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      Working with an elephant, the most pressure you can release is{' '}
      <code>{answer}</code>.
    </span>
  ),
  buttons: BUTTONS,
  day: 17,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Pyroclastic Flow',
}

export default config
