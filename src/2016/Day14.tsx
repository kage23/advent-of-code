import md5 from 'md5'
import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'

import INPUT from '../Inputs/2016/Day14'

const hashes: Map<string, string> = new Map()
const stretchedHashes: Map<string, string> = new Map()

const containsRepeat = (input: string, requiredCount: number, letter?: string): false | string => {
  const { length } = input

  for (let i = 0; i <= length - requiredCount; i++) {
    const slice = input.slice(i, i + requiredCount).split('')
    if (
      (
        !letter || slice[0] === letter
      )
      && slice.every(letter => letter === slice[0])
    ) {
      return slice[0]
    }
  }

  return false
}

const getHash = (hashKey: string): string => {
  let hash = hashes.get(hashKey)
  if (!hash) {
    hash = md5(hashKey)
    hashes.set(hashKey, hash)
  }
  return hash
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

const generateKeys = (inputKey: string): { answer1: string } => {
  const keyIndexes: number[] = []

  let i = 0
  keySearch:
  while (keyIndexes.length < 64) {
    const hashKey = `${INPUT[inputKey]}${i}`
    const hash = getHash(hashKey)
    const repeat = containsRepeat(hash, 3)
    if (repeat) {
      console.log(`Triple found at index ${i}. (${keyIndexes.length} keys.)`)
      for (let n = 1; n <= 1000; n++) {
        const checkHash = getHash(`${INPUT[inputKey]}${i + n}`)
        if (containsRepeat(checkHash, 5, repeat)) {
          keyIndexes.push(i)
          console.log(`Key ${keyIndexes.length} found at index ${i}.`)
          i++
          continue keySearch
        }
      }
    }
    i++
  }

  return {
    answer1: (i - 1).toString()
  }
}

const generateStretchedKeys = (inputKey: string): { answer2: string } => {
  const keyIndexes: number[] = []

  let i = 0
  keySearch:
  while (keyIndexes.length < 64) {
    const hashKey = `${INPUT[inputKey]}${i}`
    const hash = getStretchedHash(hashKey)
    const repeat = containsRepeat(hash, 3)
    if (repeat) {
      console.log(`Triple found at index ${i}. (${keyIndexes.length} keys.)`)
      for (let n = 1; n <= 1000; n++) {
        const checkHash = getStretchedHash(`${INPUT[inputKey]}${i + n}`)
        if (containsRepeat(checkHash, 5, repeat)) {
          keyIndexes.push(i)
          console.log(`Stretched key ${keyIndexes.length} found at index ${i}.`)
          i++
          continue keySearch
        }
      }
    }
    i++
  }

  return {
    answer2: (i - 1).toString()
  }
}

const BUTTONS: IButton[] = [
  {
    label: 'Generate Keys',
    onClick: generateKeys
  },
  {
    label: 'Generate Stretched Keys',
    onClick: generateStretchedKeys
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      Index <code>{answer}</code> produces the <code>64</code>th key.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      Index <code>{answer}</code> produces the <code>64</code>th stretched key.
    </span>
  ),
  buttons: BUTTONS,
  day: 14,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'One-Time Pad'
}

export default config