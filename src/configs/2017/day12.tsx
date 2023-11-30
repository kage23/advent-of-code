import inputs from '../../inputs/2017/day12'
import { DayConfig } from '../../routes/Day'

interface Program {
  connectedTo: number[]
  inZeroGroup?: boolean
}

const parseInput = (input: string): Map<number, Program> => {
  const programMap: Map<number, Program> = new Map()

  input.split('\n').forEach((line) => {
    const [originString, connectedToString] = line.split(' <-> ')

    programMap.set(parseInt(originString), {
      connectedTo: connectedToString.split(', ').map((x) => parseInt(x)),
    })
  })

  return programMap
}

const connectedToZero = (
  origin: number,
  program: Program,
  programMap: Map<number, Program>,
  parents: number[]
): boolean => {
  if (program.inZeroGroup) return true

  const { connectedTo } = program

  if (origin === 0) {
    programMap.set(origin, {
      connectedTo,
      inZeroGroup: true,
    })
    return true
  } else {
    const inZeroGroup = connectedTo.some((subOrigin) => {
      if (subOrigin === origin || parents.indexOf(subOrigin) !== -1)
        return false
      const subProgram = programMap.get(subOrigin)
      if (subProgram) {
        if (subProgram.inZeroGroup) return true
        const newParents = parents.concat(origin)
        return connectedToZero(subOrigin, subProgram, programMap, newParents)
      }
      return false
    })
    program.inZeroGroup = inZeroGroup
    return inZeroGroup
  }
}

const viewNeighbors = (
  program: Program,
  programMap: Map<number, Program>,
  seenMap: Map<number, boolean>
): void => {
  program.connectedTo.forEach((connectedId) => {
    if (!seenMap.get(connectedId)) {
      seenMap.set(connectedId, true)
      const connectedProgram = programMap.get(connectedId)
      if (connectedProgram) viewNeighbors(connectedProgram, programMap, seenMap)
    }
  })
}

export const findConnectedToZero = (inputKey: string) => {
  let programCount = 0
  const programMap = parseInput(inputs.get(inputKey)!)

  for (const [id, program] of programMap) {
    if (connectedToZero(id, program, programMap, [])) programCount++
  }

  return {
    answer1: programCount,
  }
}

export const countGroups = (inputKey: string) => {
  const programMap = parseInput(inputs.get(inputKey)!)
  const seenMap: Map<number, boolean> = new Map()
  let groupCount = 0

  for (const [id, program] of programMap) {
    if (!seenMap.get(id)) {
      groupCount++
      seenMap.set(id, true)
      viewNeighbors(program, programMap, seenMap)
    }
  }

  return {
    answer2: groupCount,
  }
}

const day12: Omit<DayConfig, 'year'> = {
  answer1Text: 'answer programs are in the group that contains program ID 0.',
  answer2Text: 'There are answer groups of programs.',
  buttons: [
    {
      label: 'Find Programs Connected to 0',
      onClick: findConnectedToZero,
    },
    {
      label: 'Count Groups',
      onClick: countGroups,
    },
  ],
  id: 12,
  inputs,
  title: 'Digital Plumber',
}

export default day12
