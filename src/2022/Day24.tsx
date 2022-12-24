import { defaultRenderDay, IButton, IDayConfig } from '../Config'

import INPUT from '../Inputs/2022/Day24'
import AStar from '../utils/AStar'
import { manhattanDistance } from '../utils/Various'

type Direction = '^' | '>' | '<' | 'v'
type Space = Direction | '.' | '#'

const advanceBlizzards = (
  blizzards: string[],
  map: string[]
): { blizzards: string[]; map: string[] } => {
  for (let b = 0; b < blizzards.length; b++) {
    const blizzard = blizzards[b]
    const [row, col, dir] = blizzard.split(',')
    let nextRow = Number(row)
    let nextCol = Number(col)
    switch (dir as Direction) {
      case '<': {
        nextCol -= 1
        if (nextCol === 0) nextCol = map[0].length - 2
        blizzards[b] = `${row},${nextCol},${dir}`
        break
      }
      case '>': {
        nextCol += 1
        if (nextCol === map[0].length - 1) nextCol = 1
        blizzards[b] = `${row},${nextCol},${dir}`
        break
      }
      case '^': {
        nextRow -= 1
        if (nextRow === 0) nextRow = map.length - 2
        blizzards[b] = `${nextRow},${col},${dir}`
        break
      }
      case 'v': {
        nextRow += 1
        if (nextRow === map.length - 1) nextRow = 1
        blizzards[b] = `${nextRow},${col},${dir}`
        break
      }
    }
  }
  const nextMap = Array(map.length - 2).fill(
    `${'#'.padEnd(map[0].length - 1, '.')}#`
  )
  nextMap.unshift(map[0])
  nextMap.push(map[map.length - 1])
  blizzards.forEach((blizzard) => {
    const [row, col, dir] = blizzard.split(',')
    nextMap[Number(row)] = `${nextMap[Number(row)].slice(
      0,
      Number(col)
    )}${dir}${nextMap[Number(row)].slice(Number(col) + 1)}`
  })
  return { blizzards, map: nextMap }
}

const BUTTONS: IButton[] = [
  {
    label: 'Avoid the Blizzards',
    onClick: (inputKey: string) => {
      const map = INPUT[inputKey].split('\n')
      const rowMax = map.length - 1
      const colMax = map[0].length - 1
      let blizzards: string[] = []
      for (let row = 0; row <= rowMax; row++) {
        for (let col = 0; col <= colMax; col++) {
          const char = map[row].charAt(col) as Space
          if (char === '<' || char === '>' || char === '^' || char === 'v') {
            blizzards.push(`${row},${col},${char}`)
          }
        }
      }

      const startKey = `0,${map[0].indexOf('.')};${map.join(
        '\n'
      )};${blizzards.join('B')}`
      const endKey = `${map.length - 1},${map[map.length - 1].indexOf('.')}`
      const h = (from: string, to: string) => {
        const fromCoords = from
          .split(';')[0]
          .split(',')
          .map((n) => Number(n))
        const toCoords = to
          .split(',')
          .slice(0, 2)
          .map((n) => Number(n))
        return manhattanDistance(fromCoords, toCoords)
      }
      const getNeighbors = (current: string) => {
        const [coords, currentMap, blizzardList] = current.split(';')
        const [row, col] = coords.split(',').map((n) => Number(n))
        const next = advanceBlizzards(
          blizzardList.split('B'),
          currentMap.split('\n')
        )
        const possibleNeighbors = [
          [row - 1, col],
          [row + 1, col],
          [row, col - 1],
          [row, col + 1],
          [row, col],
        ]
        return possibleNeighbors
          .filter(
            ([neighborRow, neighborCol]) =>
              `${neighborRow},${neighborCol}` === endKey ||
              (neighborRow >= 0 &&
                neighborRow < rowMax &&
                neighborCol >= 0 &&
                neighborCol < colMax &&
                (next.map[neighborRow].charAt(neighborCol) as Space) === '.')
          )
          .map(([neighborRow, neighborCol]) =>
            `${neighborRow},${neighborCol}` === endKey
              ? endKey
              : `${neighborRow},${neighborCol};${next.map.join(
                  '\n'
                )};${next.blizzards.join('B')}`
          )
      }
      return {
        answer1: AStar(startKey, endKey, () => 1, h, getNeighbors).toString(),
      }
    },
  },
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      It will take <code>{answer}</code> steps to reach the exit.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      The first round where no elf moves is round <code>{answer}</code>.
    </span>
  ),
  buttons: BUTTONS,
  day: 24,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Blizzard Basin',
}

export default config
