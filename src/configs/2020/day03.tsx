import inputs from '../../inputs/2020/day03'
import { DayConfig } from '../../routes/Day'

const isTree = (map: string[], x: number, y: number): boolean =>
  map[y].charAt(x) === '#'

const countTrees = (
  map: string[],
  rightAmt: number,
  downAmt: number
): number => {
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

export const checkSleddingPath = (input: string) => ({
  answer1: countTrees(input.split('\n'), 3, 1),
})

export const checkVariousPaths = (input: string) => {
  const treeCount1 = countTrees(input.split('\n'), 1, 1)
  const treeCount2 = countTrees(input.split('\n'), 3, 1)
  const treeCount3 = countTrees(input.split('\n'), 5, 1)
  const treeCount4 = countTrees(input.split('\n'), 7, 1)
  const treeCount5 = countTrees(input.split('\n'), 1, 2)

  return {
    answer2: treeCount1 * treeCount2 * treeCount3 * treeCount4 * treeCount5,
  }
}

const day03: Omit<DayConfig, 'year'> = {
  answer1Text: 'This path hits answer trees.',
  answer2Text: 'The product-check for various paths is answer.',
  buttons: [
    {
      label: 'Check Sledding Path',
      onClick: checkSleddingPath,
    },
    {
      label: 'Check Various Paths',
      onClick: checkVariousPaths,
    },
  ],
  id: 3,
  inputs,
  title: 'Toboggan Trajectory',
}

export default day03
