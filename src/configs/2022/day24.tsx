import inputs from '../../inputs/2022/day24'
import { DayConfig } from '../../routes/Day'

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

export const avoidBlizzards = (input: string) => {
  const map = input.split('\n')
  const rowMax = map.length - 1
  const colMax = map[0].length - 1
  const blizzards: string[] = []

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
            `${row},${col}` === endKey ||
            (row === 0 && col === 1) ||
            (row > 0 && row <= rowMax - 1 && col > 0 && col <= colMax - 1)
        )
        neighbors.forEach((neighbor) => {
          if (
            !currentBlizzards.includes(neighbor.join(',')) &&
            !possibleSquares.includes(neighbor.join(','))
          )
            possibleSquares.push(neighbor.join(','))
        })
      }
    )
    possibleSquaresAtTime.push(possibleSquares)
  }

  return { answer1: time }
}

export const getSnacks = (input: string) => {
  const map = input.split('\n')
  const rowMax = map.length - 1
  const colMax = map[0].length - 1
  const blizzards: string[] = []

  for (let row = 0; row <= rowMax; row++) {
    for (let col = 0; col <= colMax; col++) {
      const char = map[row].charAt(col) as Space
      if (char === '<' || char === '>' || char === '^' || char === 'v') {
        blizzards.push(`${row},${col},${char}`)
      }
    }
  }

  const precalcTimer = 'Precalculate the blizzards'
  console.time(precalcTimer)
  const blizzardsAtTime = generateBlizzardLists(
    rowMax - 1,
    colMax - 1,
    blizzards
  )
  console.timeEnd(precalcTimer)
  const startKey = `0,${map[0].indexOf('.')}`
  const endKey = `${map.length - 1},${map[map.length - 1].indexOf('.')}`

  const firstTripTimer = 'First trip out'
  console.time(firstTripTimer)
  let time = 0
  const possibleSquaresAtTime = [[startKey]]
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
            `${row},${col}` === endKey ||
            (row === 0 && col === 1) ||
            (row > 0 && row <= rowMax - 1 && col > 0 && col <= colMax - 1)
        )
        neighbors.forEach((neighbor) => {
          if (
            !currentBlizzards.includes(neighbor.join(',')) &&
            !possibleSquares.includes(neighbor.join(','))
          )
            possibleSquares.push(neighbor.join(','))
        })
      }
    )
    possibleSquaresAtTime.push(possibleSquares)
  }
  console.timeEnd(firstTripTimer)

  const tripBackTimer = 'Back for snacks'
  console.time(tripBackTimer)
  possibleSquaresAtTime[time] = [endKey]
  while (
    !possibleSquaresAtTime[possibleSquaresAtTime.length - 1].includes(
      startKey
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
            `${row},${col}` === endKey ||
            (row === 0 && col === 1) ||
            (row > 0 && row <= rowMax - 1 && col > 0 && col <= colMax - 1)
        )
        neighbors.forEach((neighbor) => {
          if (
            !currentBlizzards.includes(neighbor.join(',')) &&
            !possibleSquares.includes(neighbor.join(','))
          )
            possibleSquares.push(neighbor.join(','))
        })
      }
    )
    possibleSquaresAtTime.push(possibleSquares)
  }
  console.timeEnd(tripBackTimer)

  const finalTripTimer = 'Final trip out with snacks'
  console.time(finalTripTimer)
  possibleSquaresAtTime[time] = [startKey]
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
            `${row},${col}` === endKey ||
            (row === 0 && col === 1) ||
            (row > 0 && row <= rowMax - 1 && col > 0 && col <= colMax - 1)
        )
        neighbors.forEach((neighbor) => {
          if (
            !currentBlizzards.includes(neighbor.join(',')) &&
            !possibleSquares.includes(neighbor.join(','))
          )
            possibleSquares.push(neighbor.join(','))
        })
      }
    )
    possibleSquaresAtTime.push(possibleSquares)
  }
  console.timeEnd(finalTripTimer)

  return { answer2: time }
}

const day24: Omit<DayConfig, 'year'> = {
  answer1Text: 'It will take answer steps to reach the exit.',
  answer2Text: 'It will take answer minutes to go out, go back for snacks, and return with them.',
  buttons: [
    {
      label: 'Avoid the Blizzards',
      onClick: avoidBlizzards
    },
    {
      label: 'Go Get the Snacks',
      onClick: getSnacks
    },
  ],
  id: 24,
  inputs,
  title: 'Blizzard Basin',
}

export default day24
