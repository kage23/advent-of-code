import inputs from '../../inputs/2023/day11'
import { DayConfig } from '../../routes/Day'
import manhattanDistance from '../../utils/manhattanDistance'

const expandGalaxy = (input: string) => {
  let rows = input.split('\n')

  for (let i = 0; i < rows.length; i++) {
    if (!rows[i].includes('#')) {
      rows = [
        ...rows.slice(0, i),
        ''.padEnd(rows[i].length, '.'),
        ...rows.slice(i),
      ]
      i++
    }
  }

  for (let j = 0; j < rows[0].length; j++) {
    const col = rows.map((row) => row.charAt(j)).join('')
    if (!col.includes('#')) {
      for (let k = 0; k < rows.length; k++) {
        rows[k] = rows[k].slice(0, j) + '.' + rows[k].slice(j)
      }
      j++
    }
  }

  return rows
}

export const findGalaxyPaths = (input: string) => {
  const cluster = expandGalaxy(input)
  const galaxies: [number, number][] = []
  for (let i = 0; i < cluster.length; i++) {
    for (let j = 0; j < cluster[i].length; j++) {
      if (cluster[i].charAt(j) === '#') galaxies.push([i, j])
    }
  }
  let sum = 0
  for (let k = 0; k < galaxies.length; k++) {
    for (let l = k + 1; l < galaxies.length; l++) {
      sum += manhattanDistance(galaxies[k], galaxies[l])
    }
  }
  return { answer1: sum }
}

export const findExpandedGalaxyPaths = (
  input: string,
  expansionRate = 1000000
) => {
  const cluster = input.split('\n')

  const xRows: Set<number> = new Set()
  for (let i = 0; i < cluster.length; i++) {
    if (!cluster[i].includes('#')) xRows.add(i)
  }

  const xCols: Set<number> = new Set()
  for (let j = 0; j < cluster[0].length; j++) {
    const col = cluster.map((row) => row.charAt(j)).join('')
    if (!col.includes('#')) xCols.add(j)
  }

  const galaxies: [number, number][] = []
  for (let k = 0; k < cluster.length; k++) {
    for (let l = 0; l < cluster[k].length; l++) {
      if (cluster[k].charAt(l) === '#') galaxies.push([k, l])
    }
  }

  let sum = 0
  for (let m = 0; m < galaxies.length; m++) {
    for (let n = m + 1; n < galaxies.length; n++) {
      let distance =
        Math.abs(galaxies[m][0] - galaxies[n][0]) +
        Math.abs(galaxies[m][1] - galaxies[n][1])
      let expansionCrossings = 0
      for (
        let o = Math.min(galaxies[m][0], galaxies[n][0]);
        o < Math.max(galaxies[m][0], galaxies[n][0]);
        o++
      ) {
        if (xRows.has(o)) expansionCrossings++
      }
      for (
        let p = Math.min(galaxies[m][1], galaxies[n][1]);
        p < Math.max(galaxies[m][1], galaxies[n][1]);
        p++
      ) {
        if (xCols.has(p)) expansionCrossings++
      }
      distance -= expansionCrossings
      distance += expansionCrossings * expansionRate
      sum += distance
    }
  }

  return { answer2: sum }
}

const day11: Omit<DayConfig, 'year'> = {
  answer1Text: 'The sum of the shortest paths between all galaxies is answer.',
  answer2Text:
    'The sum of the shortest paths between all galaxies when super-expanded is answer.',
  buttons: [
    {
      label: 'Find the Galaxy Paths',
      onClick: findGalaxyPaths,
    },
    {
      label: 'Find Expanded Galaxy Paths',
      onClick: findExpandedGalaxyPaths,
    },
  ],
  id: 11,
  inputs,
  title: 'Cosmic Expansion',
}

export default day11
