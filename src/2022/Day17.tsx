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

const rockOrder: RockTypes[] = ['-', '+', 'L', '|', '*']
const getInitialRight = (rockTypeIndex: number): number => {
  switch (rockOrder[rockTypeIndex]) {
    case '-':
      return 6
    case '+':
    case 'L':
      return 5
    case '|':
      return 3
    case '*':
      return 4
  }
}

const dropOneRock = (
  jetStream: WindDirections[],
  tower: Map<number, string>,
  windIndex: number,
  rockTypeIndex: number
) => {
  let currentWindIndex = windIndex
  const rock: Rock = {
    type: rockOrder[rockTypeIndex],
    left: 3,
    right: getInitialRight(rockTypeIndex),
    bottom: tower.size ? Math.max(...Array.from(tower.keys())) + 4 : 4
  }
  blowOneWind(rock, jetStream[currentWindIndex])
  const areWeDoneYet = dropItOnce(rock, tower)
}

const blowOneWind = (rock: Rock, wind: WindDirections) => {
  switch (wind) {
    case '<':
      if (rock.left !== 1) {
        rock.left -= 1
        rock.right -= 1
      }
      break
    case '>':
      if (rock.right !== 7) {
        rock.left += 1
        rock.right += 1
      }
      break
  }
}

const dropItOnce = (rock: Rock, tower: Map<number, string>): boolean => {
  // This will be a bit tricky because we need to check the bottom contours
  // of the rocks to see if they hit anything anywhere.
  switch (rock.type) {
    case '-': {
      break
    }
    case '+': {
      break
    }
    case 'L': {
      break
    }
    case '|': {
      break
    }
    case '*': {
      break
    }
  }
  return false
}

const BUTTONS: IButton[] = [
  {
    label: 'Simulate Falling Rocks',
    onClick: (inputKey: string) => {
      const jetStream = INPUT[inputKey].split('') as WindDirections[]

      // Map of row numbers to what's on that row
      const tower: Map<number, string> = new Map()

      let highestStuff = 0
      let currentWindIndex = 0

      let currentRockTypeIndex = 0
      // let currentRock: Rock = {
      //   type: rockOrder[currentRockTypeIndex % rockOrder.length],
      //   left: 2,
      //   bottom: 3
      // }
      debugger

      const result = dropOneRock(jetStream, tower, currentWindIndex, currentRockTypeIndex)

      debugger

      return {
        answer1: ''
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
