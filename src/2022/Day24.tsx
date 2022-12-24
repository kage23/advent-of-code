import { defaultRenderDay, IButton, IDayConfig } from '../Config'

import INPUT from '../Inputs/2022/Day24'

type Direction = '^' | '>' | '<' | 'v'
type Space = Direction | '.' | '#'

const advanceBlizzards = (
  blizzards: string[],
  rowCount: number,
  colCount: number
): string[] =>
  blizzards.map((blizzard) => {
    const [row, col, dir] = blizzard.split(',')
    let nextRow = Number(row)
    let nextCol = Number(col)
    switch (dir as Direction) {
      case '<': {
        nextCol -= 1
        if (nextCol === 0) nextCol = colCount
        return `${row},${nextCol},${dir}`
      }
      case '>': {
        nextCol += 1
        if (nextCol > colCount) nextCol = 1
        return `${row},${nextCol},${dir}`
      }
      case '^': {
        nextRow -= 1
        if (nextRow === 0) nextRow = rowCount
        return `${nextRow},${col},${dir}`
      }
      case 'v': {
        nextRow += 1
        if (nextRow > rowCount) nextRow = 1
        return `${nextRow},${col},${dir}`
      }
    }
    return ''
  })

const generateBlizzardLists = (
  rowCount: number,
  colCount: number,
  blizzards: string[]
) => {
  const blizzardsAtTime: Map<number, string[]> = new Map([[0, blizzards]])
  let nextBlizzards = [...blizzards]
  for (let t = 1; t < rowCount * colCount; t++) {
    nextBlizzards = advanceBlizzards(nextBlizzards, rowCount, colCount)
    blizzardsAtTime.set(t, nextBlizzards)
  }
  return blizzardsAtTime
}

const BUTTONS: IButton[] = [
  {
    label: 'Avoid the Blizzards',
    onClick: (inputKey: string) => {
      const timerLabel = 'Avoid the blizzards'
      console.time(timerLabel)

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

      const timerLabel2 = 'Precalculate the blizzards'
      console.time(timerLabel2)
      const blizzardsAtTime = generateBlizzardLists(
        rowMax - 1,
        colMax - 1,
        blizzards
      )
      console.timeEnd(timerLabel2)
      const endKey = `${map.length - 1},${map[map.length - 1].indexOf('.')}`

      let time = 0
      const possibleSquaresAtTime = [[`0,${map[0].indexOf('.')}`]]
      while (
        !possibleSquaresAtTime[possibleSquaresAtTime.length - 1].includes(
          endKey
        )
      ) {
        time += 1
        const currentBlizzards = blizzardsAtTime
          .get(time % blizzardsAtTime.size)!
          .map((b) => b.split(',').slice(0, 2).join(','))
        const possibleSquares: string[] = []
        possibleSquaresAtTime[possibleSquaresAtTime.length - 1].forEach(
          (prevSquare) => {
            const [row, col] = prevSquare.split(',').map((n) => Number(n))
            const neighbors = [
              [row - 1, col],
              [row + 1, col],
              [row, col - 1],
              [row, col + 1],
              [row, col],
            ].filter(
              ([row, col]) =>
                (row === 0 && col === 1) ||
                (row > 0 && row <= rowMax && col > 0 && col <= colMax)
            )
            neighbors.forEach((neighbor) => {
              if (
                !currentBlizzards.includes(neighbor.join(',')) &&
                !possibleSquares.includes(neighbor.join(','))
              )
                possibleSquares.push(neighbor.join(','))
            })
            possibleSquaresAtTime.push(possibleSquares)
          }
        )
      }

      console.timeEnd(timerLabel)

      // 181 is too low

      return { answer1: time.toString() }
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
