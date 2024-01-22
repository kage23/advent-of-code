import inputs from '../../inputs/2022/day20'
import { DayConfig } from '../../routes/Day'

const mixTheFile = (file: number[], mixIterations = 1) => {
  let newFile: {
    value: number
    originalIndex: number
  }[] = file.map((value, index) => ({ value, originalIndex: index }))
  for (let mixI = 0; mixI < mixIterations; mixI++) {
    for (let i = 0; i < file.length; i++) {
      // This is potentially going to bog down the run time!
      const oldIndex = newFile.findIndex(({ originalIndex }) => originalIndex === i)
      const thingToMove = newFile[oldIndex]
      const newIndex = (oldIndex + thingToMove.value + file.length - 1) % (file.length - 1)
      // Cut it out from the old index
      newFile = [...newFile.slice(0, oldIndex), ...newFile.slice(oldIndex + 1)]
      // Insert it at the new index
      newFile = [...newFile.slice(0, newIndex), thingToMove, ...newFile.slice(newIndex)]
    }
  }
  return newFile.map(({ value }) => value)
}

export const mixIt = (input: string) => {
  const file = input.split('\n').map(n => Number(n))

  const mixedFile = mixTheFile(file)

  const indexOfZero = mixedFile.indexOf(0)
  const indexOfX = (indexOfZero + 1000) % file.length
  const indexOfY = (indexOfZero + 2000) % file.length
  const indexOfZ = (indexOfZero + 3000) % file.length

  return {
    answer1: (mixedFile[indexOfX] + mixedFile[indexOfY] + mixedFile[indexOfZ])
  }
}

export const decryptIt = (input: string) => {
  const file = input.split('\n').map(n => Number(n) * 811589153)

  const mixedFile = mixTheFile(file, 10)

  const indexOfZero = mixedFile.indexOf(0)
  const indexOfX = (indexOfZero + 1000) % file.length
  const indexOfY = (indexOfZero + 2000) % file.length
  const indexOfZ = (indexOfZero + 3000) % file.length

  return {
    answer2: (mixedFile[indexOfX] + mixedFile[indexOfY] + mixedFile[indexOfZ])
  }
}

const day20: Omit<DayConfig, 'year'> = {
  answer1Text: 'The sum of the grove coordinates is answer.',
  answer2Text: 'The sum of the actual grove coordinates is answer.',
  buttons: [
    {
      label: 'Mix the File',
      onClick: mixIt
    },
    {
      label: 'Decrypt the File',
      onClick: decryptIt
    },
  ],
  id: 20,
  inputs,
  title: 'Grove Positioning System',
}

export default day20
