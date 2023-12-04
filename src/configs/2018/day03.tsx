import inputs from '../../inputs/2018/day03'
import { DayConfig } from '../../routes/Day'

const parseInput = (input: string): number[][] => {
  return input.split('\n').map((line) => {
    const id = parseInt(line.slice(1))
    const x = parseInt(line.slice(line.indexOf('@') + 2))
    const y = parseInt(line.slice(line.indexOf(',') + 1))
    const w = parseInt(line.slice(line.indexOf(':') + 2))
    const h = parseInt(line.slice(line.indexOf('x') + 1))

    return [id, x, y, w, h]
  })
}

const pathKey = (x: number, y: number): string => `${x}_${y}`

const makeClaimsMap = (claims: number[][]): Map<string, number[]> => {
  const claimsMap: Map<string, number[]> = new Map()
  claims.forEach(([id, x, y, width, height]) => {
    for (let xi = x; xi < x + width; xi++) {
      for (let yi = y; yi < y + height; yi++) {
        let claimsAt = claimsMap.get(pathKey(xi, yi))
        if (!claimsAt) claimsAt = []
        claimsAt.push(id)
        claimsMap.set(pathKey(xi, yi), claimsAt)
      }
    }
  })
  return claimsMap
}

export const determineFabricOverlap = (inputKey: string) => {
  const claims = parseInput(inputs.get(inputKey)!)
  const claimsMap = makeClaimsMap(claims)

  let overlappingSquares = 0
  for (const [, value] of claimsMap) if (value.length > 1) overlappingSquares++
  return {
    answer1: overlappingSquares,
  }
}

export const determineClaimOverlap = (inputKey: string) => {
  const claims = parseInput(inputs.get(inputKey)!)
  const claimsMap = makeClaimsMap(claims)
  const claimOverlaps = [true]

  for (const [, claimIDs] of claimsMap) {
    if (claimIDs.length === 1)
      claimOverlaps[claimIDs[0]] = claimOverlaps[claimIDs[0]] || false
    else claimIDs.forEach((claimID) => (claimOverlaps[claimID] = true))
  }

  return {
    answer2: claimOverlaps.reduce(
      (accumulator, claimDoesOverlap, currentIndex) => {
        return !claimDoesOverlap ? currentIndex : accumulator
      },
      -1
    ),
  }
}

const day03: Omit<DayConfig, 'year'> = {
  answer1Text: 'answer square inches of fabric are in two or more claims.',
  answer2Text: 'The ID of the only non-overlapping claim is ID #answer.',
  buttons: [
    {
      label: 'Determine Fabric Overlap',
      onClick: determineFabricOverlap,
    },
    {
      label: 'Determine Claim Overlap',
      onClick: determineClaimOverlap,
    },
  ],
  id: 3,
  inputs,
  title: 'No Matter How You Slice It',
}

export default day03
