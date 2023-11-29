import inputs from '../../inputs/2017/day06'
import { DayConfig } from '../../routes/Day'

const parseInput = (input: string) => input.split(/\s/).map(x => Number(x))

export const findLoop = (inputKey: string) => {
  let cycles = 0
  const memoryBanks = parseInput(inputs.get(inputKey)!)
  const stateAtTimeMap: Map<string, number> = new Map()
  let memBanksStr = JSON.stringify(memoryBanks)

  const cycle = () => {
    const redistributeCount = Math.max(...memoryBanks)
    let i = memoryBanks.indexOf(redistributeCount)
    memoryBanks[i] = 0
    for (let j = 0; j < redistributeCount; j++) {
      i = (i + 1) % memoryBanks.length
      memoryBanks[i]++
    }
    cycles++
  }

  while (typeof stateAtTimeMap.get(memBanksStr) === 'undefined') {
    stateAtTimeMap.set(memBanksStr, cycles)
    cycle()
    memBanksStr = JSON.stringify(memoryBanks)
  }

  return {
    answer1: cycles,
    answer2: (cycles - (stateAtTimeMap.get(memBanksStr) || 0))
  }
}

const day06: Omit<DayConfig, 'year'> = {
  answer1Text: 'It takes answer cycles to detect a loop.',
  answer2Text: 'The loop is answer cycles long.',
  buttons: [
    {
      label: 'Find Loop',
      onClick: findLoop
    }
  ],
  id: 6,
  inputs,
  title: 'Memory Reallocation',
}

export default day06
