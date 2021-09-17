import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'

import INPUT from './Input/Day3'

const countTrees = (map: string[], rightAmt: number, downAmt: number): number => {
  let treeCount = 0
  let x = 0
  let y = 0

  while (y < map.length) {
    if (isTree(map, x, y)) treeCount++

    x = (x + rightAmt) % map[0].length
    y += downAmt
  }

  return treeCount
}

const isTree = (map: string[], x: number, y: number): boolean =>
  map[y].charAt(x) === '#'

const BUTTONS: IButton[] = [
  {
    label: 'Check Sledding Path',
    onClick: (inputKey: string) => {
      const treeCount = countTrees(INPUT[inputKey].split('\n'), 3, 1)

      return {
        answer1: treeCount.toString()
      }
    }
  },
  {
    label: 'Check Various Paths',
    onClick: (inputKey: string) => {
      const treeCount1 = countTrees(INPUT[inputKey].split('\n'), 1, 1)
      const treeCount2 = countTrees(INPUT[inputKey].split('\n'), 3, 1)
      const treeCount3 = countTrees(INPUT[inputKey].split('\n'), 5, 1)
      const treeCount4 = countTrees(INPUT[inputKey].split('\n'), 7, 1)
      const treeCount5 = countTrees(INPUT[inputKey].split('\n'), 1, 2)

      return {
        answer2: (treeCount1 * treeCount2 * treeCount3 * treeCount4 * treeCount5).toString()
      }
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      This path hits <code>{answer}</code> trees.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      The product-check for various paths is <code>{answer}</code>.
    </span>
  ),
  buttons: BUTTONS,
  day: 3,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Toboggan Trajectory'
}

export default config