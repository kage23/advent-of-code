import inputs from '../../inputs/2023/day15'
import { DayConfig } from '../../routes/Day'

interface Lens {
  label: string
  focalLength: number
}

interface Box {
  id: number
  lenses: Lens[]
}

const charHash = (char: string, hash = 0) => {
  let newHash = hash
  newHash += char.charCodeAt(0)
  newHash *= 17
  newHash %= 256
  return newHash
}

const wordHash = (word: string) =>
  word.split('').reduce((hash, char) => charHash(char, hash), 0)

const scoreLens = (lens: Lens, box: Box) =>
  (1 + box.id) *
  (box.lenses.findIndex(({ label }) => label === lens.label) + 1) *
  lens.focalLength

export const hashIt = (initSeq: string) => ({
  answer1: initSeq.split(',').reduce((sum, step) => sum + wordHash(step), 0),
})

export const initializeIt = (input: string) => {
  const boxes: Box[] = []
  for (let i = 0; i < 256; i++) boxes.push({ id: i, lenses: [] })
  input.split(',').forEach((instruction) => {
    const [label, focalLength] = instruction.split(/[=-]/)
    const boxId = wordHash(label)
    const box = boxes[boxId]
    const operation = instruction.match(/[=-]/)![0]
    if (operation === '-') {
      const lensToRemove = box.lenses.findIndex((lens) => lens.label === label)
      if (lensToRemove >= 0) {
        box.lenses = [
          ...box.lenses.slice(0, lensToRemove),
          ...box.lenses.slice(lensToRemove + 1),
        ]
      }
    }
    if (operation === '=') {
      const newLens: Lens = { label, focalLength: Number(focalLength) }
      const lensToRemove = box.lenses.findIndex((lens) => lens.label === label)
      if (lensToRemove >= 0) {
        box.lenses = [
          ...box.lenses.slice(0, lensToRemove),
          newLens,
          ...box.lenses.slice(lensToRemove + 1),
        ]
      } else {
        box.lenses.push(newLens)
      }
    }
  })
  return {
    answer2: boxes.reduce(
      (boxSum, box) =>
        boxSum +
        box.lenses.reduce((lensSum, lens) => lensSum + scoreLens(lens, box), 0),
      0
    ),
  }
}

const day15: Omit<DayConfig, 'year'> = {
  answer1Text: 'The HASH of the string is answer.',
  answer2Text: 'The total focusing power is answer.',
  buttons: [
    {
      label: 'Hash It',
      onClick: hashIt,
    },
    {
      label: 'Initialize It',
      onClick: initializeIt,
    },
  ],
  id: 15,
  inputs,
  title: 'Lens Library',
}

export default day15
