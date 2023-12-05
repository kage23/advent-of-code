import inputs from '../../inputs/2023/day05'
import { DayConfig } from '../../routes/Day'

const getMapping = (rules: string[]) =>
  rules
    .map((rule) => {
      const [destStart, sourceStart, rangeLength] = rule.split(' ').map(Number)
      return { destStart, sourceStart, rangeLength }
    })
    .sort((a, b) => a.sourceStart - b.sourceStart)

export const getSeedLocations = (input: string) => {
  const inputChunks = input.split('\n\n')
  const seeds = inputChunks.shift()!.match(/\d+/g)!
  const locations = seeds.map((seed) =>
    inputChunks.reduce((id, map) => {
      const mapping = getMapping(map.split('\n').slice(1))

      let mappedId: number | undefined
      for (const item of mapping) {
        if (
          id >= item.sourceStart &&
          id < item.sourceStart + item.rangeLength
        ) {
          mappedId = item.destStart + id - item.sourceStart
          break
        }
      }

      return mappedId || id
    }, Number(seed))
  )
  return {
    answer1: Math.min(...locations),
  }
}

export const getMoreSeedLocations = (input: string) => {
  const inputChunks = input.split('\n\n')
  const seeds = inputChunks.shift()!.match(/\d+/g)!
  const seedList: number[] = []
  for (let i = 0; i < seeds.length; i += 2) {
    const start = Number(seeds[i])
    const range = Number(seeds[i + 1])
    for (let x = start; x < start + range; x++) seedList.push(x)
  }
  const locations = seedList.map((seed) =>
    inputChunks.reduce((id, map) => {
      const mapping = getMapping(map.split('\n').slice(1))

      let mappedId: number | undefined
      for (const item of mapping) {
        if (
          id >= item.sourceStart &&
          id < item.sourceStart + item.rangeLength
        ) {
          mappedId = item.destStart + id - item.sourceStart
          break
        }
      }

      return mappedId || id
    }, seed)
  )
  return {
    answer2: Math.min(...locations),
  }
}

const day05: Omit<DayConfig, 'year'> = {
  answer1Text: 'The lowest location to get a seed is answer.',
  answer2Text: 'The lowest location to get a seed is answer.',
  buttons: [
    {
      label: 'Get Seed Locations',
      onClick: getSeedLocations,
    },
    {
      label: 'Get More Seed Locations',
      onClick: getMoreSeedLocations,
    },
  ],
  id: 5,
  inputs,
  title: 'If You Give A Seed A Fertilizer',
}

export default day05
