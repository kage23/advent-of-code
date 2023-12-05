import inputs from '../../inputs/2023/day05'
import { DayConfig } from '../../routes/Day'

const getMapping = (rules: string[]) =>
  rules
    .map((rule) => {
      const [destStart, sourceStart, rangeLength] = rule.split(' ').map(Number)
      return { destStart, sourceStart, rangeLength }
    })
    .sort((a, b) => a.sourceStart - b.sourceStart)

interface Converter {
  sourceStart: number
  sourceEnd: number
  adjustment: number
}
const getConverters = (rules: string[]): Converter[] =>
  rules
    .map((rule) => {
      const [destStart, sourceStart, rangeLength] = rule.split(' ').map(Number)
      return {
        sourceStart,
        sourceEnd: sourceStart + rangeLength - 1,
        adjustment: destStart - sourceStart,
      }
    })
    .sort((a, b) => a.sourceStart - b.sourceStart)
    .reduce((converter, rule, i, converters) => {
      const newConverter: Converter[] = [...converter]
      const prevConverter = i > 0 ? converters[i - 1] : undefined
      if (!prevConverter) {
        if (rule.sourceStart !== 0) {
          newConverter.push({
            sourceStart: 0,
            sourceEnd: rule.sourceStart - 1,
            adjustment: 0,
          })
        }
      } else if (rule.sourceStart !== prevConverter.sourceEnd + 1) {
        newConverter.push({
          sourceStart: prevConverter.sourceEnd + 1,
          sourceEnd: rule.sourceStart - 1,
          adjustment: 0,
        })
      }
      newConverter.push(rule)
      return newConverter
    }, [] as Converter[])

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
  const seedRangeInputs = inputChunks
    .shift()!
    .split(': ')[1]
    .split(' ')
    .map(Number)

  const mappings = inputChunks.map((item) =>
    getConverters(item.split('\n').slice(1))
  )

  const locationRangeInputs = mappings.reduce((nextRangeInputs, converters) => {
    const sourceRanges: [number, number][] = []
    for (let i = 0; i < nextRangeInputs.length; i += 2) {
      sourceRanges.push([nextRangeInputs[i], nextRangeInputs[i + 1]])
    }
    sourceRanges.sort((a, b) => a[0] - b[0])

    const destRanges: [number, number][] = []
    while (sourceRanges.length) {
      const [sourceStart, rangeLength] = sourceRanges.shift()!
      const sourceEnd = sourceStart + rangeLength - 1
      const converter = converters.find(
        (c) => sourceStart >= c.sourceStart && sourceStart <= c.sourceEnd
      )
      if (!converter) {
        // If no converter, we ran out of converters so it doesn't need a conversion
        destRanges.push([sourceStart, rangeLength])
      } else {
        if (sourceEnd <= converter.sourceEnd) {
          destRanges.push([sourceStart + converter.adjustment, rangeLength])
        } else {
          destRanges.push([
            sourceStart + converter.adjustment,
            converter.sourceEnd - sourceStart + 1,
          ])
          sourceRanges.unshift([
            converter.sourceEnd + 1,
            sourceEnd - converter.sourceEnd,
          ])
        }
      }
    }

    return destRanges.flat()
  }, seedRangeInputs)

  return { answer2: locationRangeInputs[0] }
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
