import { defaultRenderDay, IButton, IDayConfig } from '../Config'

import INPUT from '../Inputs/2022/Day23'

interface Move {
  from: string
  to: string
}

const checkNorth = (
  [row, col]: [number, number],
  elves: Set<string>
): boolean => {
  const neighbors = [
    [row - 1, col - 1],
    [row - 1, col],
    [row - 1, col + 1],
  ]
  return !neighbors.some(([row, col]) => elves.has(`${row},${col}`))
}

const checkEast = (
  [row, col]: [number, number],
  elves: Set<string>
): boolean => {
  const neighbors = [
    [row - 1, col + 1],
    [row, col + 1],
    [row + 1, col + 1],
  ]
  return !neighbors.some(([row, col]) => elves.has(`${row},${col}`))
}

const checkSouth = (
  [row, col]: [number, number],
  elves: Set<string>
): boolean => {
  const neighbors = [
    [row + 1, col - 1],
    [row + 1, col],
    [row + 1, col + 1],
  ]
  return !neighbors.some(([row, col]) => elves.has(`${row},${col}`))
}

const checkWest = (
  [row, col]: [number, number],
  elves: Set<string>
): boolean => {
  const neighbors = [
    [row - 1, col - 1],
    [row, col - 1],
    [row + 1, col - 1],
  ]
  return !neighbors.some(([row, col]) => elves.has(`${row},${col}`))
}

const checkMove = (
  moveToCheck: string,
  northClear: boolean,
  eastClear: boolean,
  southClear: boolean,
  westClear: boolean
): boolean =>
  (moveToCheck === 'N' && northClear) ||
  (moveToCheck === 'E' && eastClear) ||
  (moveToCheck === 'S' && southClear) ||
  (moveToCheck === 'W' && westClear)

const getTo = ([row, col]: [number, number], move: Direction): string => {
  switch (move) {
    case 'N':
      return [row - 1, col].join(',')
    case 'E':
      return [row, col + 1].join(',')
    case 'S':
      return [row + 1, col].join(',')
    case 'W':
      return [row, col - 1].join(',')
  }
}

type Direction = 'N' | 'S' | 'W' | 'E'
const moveOrder: Direction[] = ['N', 'S', 'W', 'E']

const positionTheElves = (inputKey: string, part: 1 | 2): number => {
  const input = INPUT[inputKey].split('\n')

  const elves = new Set<string>()

  input.forEach((row, rowIndex) => {
    for (let c = 0; c < row.length; c++) {
      const char = row.charAt(c)
      if (char === '#') {
        elves.add(`${rowIndex},${c}`)
      }
    }
  })

  let firstMove = 0
  let i = 1
  while (true) {
    if (part === 1 && i > 10) break
    const proposedMoves: Move[] = []
    const elfList = Array.from(elves)
    for (let e = 0; e < elfList.length; e++) {
      const elf = elfList[e]
      const [row, col] = elf.split(',').map((n) => Number(n))
      const northClear = checkNorth([row, col], elves)
      const eastClear = checkEast([row, col], elves)
      const southClear = checkSouth([row, col], elves)
      const westClear = checkWest([row, col], elves)
      if (!northClear || !eastClear || !southClear || !westClear) {
        let moveToCheck = moveOrder[firstMove]
        if (
          checkMove(moveToCheck, northClear, eastClear, southClear, westClear)
        ) {
          proposedMoves.push({
            from: `${row},${col}`,
            to: getTo([row, col], moveToCheck),
          })
        } else {
          moveToCheck = moveOrder[(firstMove + 1) % moveOrder.length]
          if (
            checkMove(moveToCheck, northClear, eastClear, southClear, westClear)
          ) {
            proposedMoves.push({
              from: `${row},${col}`,
              to: getTo([row, col], moveToCheck),
            })
          } else {
            moveToCheck = moveOrder[(firstMove + 2) % moveOrder.length]
            if (
              checkMove(
                moveToCheck,
                northClear,
                eastClear,
                southClear,
                westClear
              )
            ) {
              proposedMoves.push({
                from: `${row},${col}`,
                to: getTo([row, col], moveToCheck),
              })
            } else {
              moveToCheck = moveOrder[(firstMove + 3) % moveOrder.length]
              if (
                checkMove(
                  moveToCheck,
                  northClear,
                  eastClear,
                  southClear,
                  westClear
                )
              ) {
                proposedMoves.push({
                  from: `${row},${col}`,
                  to: getTo([row, col], moveToCheck),
                })
              }
            }
          }
        }
      }
    }
    if (!proposedMoves.length) {
      break
    }
    const proposedTos = proposedMoves.map(({ to }) => to)
    const approvedTos = proposedTos.filter(
      (to, i) =>
        proposedTos.indexOf(to) === i && proposedTos.lastIndexOf(to) === i
    )
    proposedMoves.forEach(({ from, to }) => {
      if (approvedTos.includes(to)) {
        elves.delete(from)
        elves.add(to)
      }
    })
    firstMove = (firstMove + 1) % moveOrder.length
    i += 1
  }

  let rowMin = 0
  let rowMax = input.length - 1
  let colMin = 0
  let colMax = input[0].length - 1

  elves.forEach((elf) => {
    const [row, col] = elf.split(',').map((n) => Number(n))
    rowMin = Math.min(row, rowMin)
    rowMax = Math.max(row, rowMax)
    colMin = Math.min(col, colMin)
    colMax = Math.max(col, colMax)
  })

  if (part === 1) {
    return (rowMax + 1 - rowMin) * (colMax + 1 - colMin) - elves.size
  }

  return i
}

const BUTTONS: IButton[] = [
  {
    label: 'Position the Elves',
    onClick: (inputKey: string) => {
      const timerLabel = 'Run ten rounds'
      console.time(timerLabel)
      const answer1 = positionTheElves(inputKey, 1).toString()
      console.timeEnd(timerLabel)
      return { answer1 }
    },
  },
  {
    label: 'Fully Position the Elves',
    onClick: (inputKey: string) => {
      const timerLabel = 'Fully position the elves'
      console.time(timerLabel)
      const answer2 = positionTheElves(inputKey, 2).toString()
      console.timeEnd(timerLabel)
      return { answer2 }
    },
  },
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      There is <code>{answer}</code> empty space after ten rounds.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      The first round where no elf moves is round <code>{answer}</code>.
    </span>
  ),
  buttons: BUTTONS,
  day: 23,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Unstable Diffusion',
}

export default config
