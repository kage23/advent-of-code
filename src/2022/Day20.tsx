import { defaultRenderDay, IButton, IDayConfig } from '../Config'

import INPUT from '../Inputs/2022/Day20'

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

const BUTTONS: IButton[] = [
  {
    label: 'Mix the File',
    onClick: (inputKey: string) => {
      const timerLabel = 'File mixing'
      console.time(timerLabel)

      const file = INPUT[inputKey].split('\n').map(n => Number(n))

      const mixedFile = mixTheFile(file)

      const indexOfZero = mixedFile.indexOf(0)
      const indexOfX = (indexOfZero + 1000) % file.length
      const indexOfY = (indexOfZero + 2000) % file.length
      const indexOfZ = (indexOfZero + 3000) % file.length

      console.timeEnd(timerLabel)

      return {
        answer1: (mixedFile[indexOfX] + mixedFile[indexOfY] + mixedFile[indexOfZ]).toString()
      }
    },
  },
  {
    label: 'Decrypt the File',
    onClick: (inputKey: string) => {
      const timerLabel = 'File decryption'
      console.time(timerLabel)

      const file = INPUT[inputKey].split('\n').map(n => Number(n) * 811589153)

      const mixedFile = mixTheFile(file, 10)

      const indexOfZero = mixedFile.indexOf(0)
      const indexOfX = (indexOfZero + 1000) % file.length
      const indexOfY = (indexOfZero + 2000) % file.length
      const indexOfZ = (indexOfZero + 3000) % file.length

      console.timeEnd(timerLabel)

      return {
        answer2: (mixedFile[indexOfX] + mixedFile[indexOfY] + mixedFile[indexOfZ]).toString()
      }
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The sum of the grove coordinates is <code>{answer}</code>.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      The actual sum of the grove coordinates is <code>{answer}</code>.
    </span>
  ),
  buttons: BUTTONS,
  day: 20,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Grove Positioning System',
}

export default config
