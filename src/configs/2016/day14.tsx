import md5 from 'md5'
import inputs from '../../inputs/2016/day14'
import { DayConfig } from '../../routes/Day'

const hashes: Map<string, string> = new Map()
const stretchedHashes: Map<string, string> = new Map()

const getHash = (hashKey: string): string => {
  let hash = hashes.get(hashKey)
  if (!hash) {
    hash = md5(hashKey)
    hashes.set(hashKey, hash)
  }
  return hash
}

const containsRepeat = (
  input: string,
  requiredCount: number,
  letter?: string
): false | string => {
  const { length } = input

  for (let i = 0; i <= length - requiredCount; i++) {
    const slice = input.slice(i, i + requiredCount).split('')
    if (
      (!letter || slice[0] === letter) &&
      slice.every((letter) => letter === slice[0])
    ) {
      return slice[0]
    }
  }

  return false
}

const getStretchedHash = (hashKey: string): string => {
  let stretchedHash = stretchedHashes.get(hashKey)
  if (!stretchedHash) {
    stretchedHash = md5(hashKey)
    for (let i = 0; i < 2016; i++) stretchedHash = md5(stretchedHash)
    stretchedHashes.set(hashKey, stretchedHash)
  }
  return stretchedHash
}

export const generateKeys = (inputKey: string) => {
  const keyIndexes: number[] = []
  hashes.clear()

  let i = 0
  keySearch: while (keyIndexes.length < 64) {
    const hashKey = `${inputs.get(inputKey)!}${i}`
    const hash = getHash(hashKey)
    const repeat = containsRepeat(hash, 3)
    if (repeat) {
      for (let n = 1; n <= 1000; n++) {
        const checkHash = getHash(`${inputs.get(inputKey)!}${i + n}`)
        if (containsRepeat(checkHash, 5, repeat)) {
          keyIndexes.push(i)
          i++
          continue keySearch
        }
      }
    }
    i++
  }

  return {
    answer1: i - 1,
  }
}

export const generateStretchedKeys = (inputKey: string) => {
  const keyIndexes: number[] = []
  stretchedHashes.clear()

  let i = 0
  keySearch: while (keyIndexes.length < 64) {
    const hashKey = `${inputs.get(inputKey)!}${i}`
    const hash = getStretchedHash(hashKey)
    const repeat = containsRepeat(hash, 3)
    if (repeat) {
      for (let n = 1; n <= 1000; n++) {
        const checkHash = getStretchedHash(`${inputs.get(inputKey)!}${i + n}`)
        if (containsRepeat(checkHash, 5, repeat)) {
          keyIndexes.push(i)
          i++
          continue keySearch
        }
      }
    }
    i++
  }

  return {
    answer2: i - 1,
  }
}

const day14: Omit<DayConfig, 'year'> = {
  answer1Text: 'Index answer produces the 64th key.',
  answer2Text: 'Index answer produces the 64th stretched key.',
  buttons: [
    {
      label: 'Generate Keys',
      onClick: generateKeys,
    },
    {
      label: 'Generate Stretched Keys',
      onClick: generateStretchedKeys,
    },
  ],
  id: 14,
  inputs,
  title: 'One-Time Pad',
}

export default day14
