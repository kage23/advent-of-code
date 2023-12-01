import inputs from '../../inputs/2023/day01'
import { DayConfig } from '../../routes/Day'

export const findCalibrationValues = (input: string) => {
  const lines = input.split('\n')
  const answer1 = lines.reduce((cValue, line) => {
    let newCValue = ''
    for (let i = 0; i < line.length; i++) {
      const char = line.charAt(i)
      if (!isNaN(Number(char))) {
        newCValue += char
        break
      }
    }
    for (let j = line.length - 1; j >= 0; j--) {
      const char = line.charAt(j)
      if (!isNaN(Number(char))) {
        newCValue += char
        break
      }
    }
    return cValue + Number(newCValue)
  }, 0)

  return { answer1 }
}

export const findCalibrationValuesSpelled = (input: string) => {
  const lines = input.split('\n')
  const answer2 = lines.reduce((cValue, line) => {
    let newCValue = ''
    for (let i = 0; i < line.length; i++) {
      const char = line.charAt(i)
      if (!isNaN(Number(char))) {
        newCValue += char
        break
      }
      const nextThree = line.substring(i, i + 3)
      const nextFour = line.substring(i, i + 4)
      const nextFive = line.substring(i, i + 5)
      if (nextThree === 'one') {
        newCValue += '1'
        break
      }
      if (nextThree === 'two') {
        newCValue += '2'
        break
      }
      if (nextFive === 'three') {
        newCValue += '3'
        break
      }
      if (nextFour === 'four') {
        newCValue += '4'
        break
      }
      if (nextFour === 'five') {
        newCValue += '5'
        break
      }
      if (nextThree === 'six') {
        newCValue += '6'
        break
      }
      if (nextFive === 'seven') {
        newCValue += '7'
        break
      }
      if (nextFive === 'eight') {
        newCValue += '8'
        break
      }
      if (nextFour === 'nine') {
        newCValue += '9'
        break
      }
    }
    for (let j = line.length - 1; j >= 0; j--) {
      const char = line.charAt(j)
      if (!isNaN(Number(char))) {
        newCValue += char
        break
      }
      const prevThree = line.substring(j - 2, j + 1)
      const prevFour = line.substring(j - 3, j + 1)
      const prevFive = line.substring(j - 4, j + 1)
      if (prevThree === 'one') {
        newCValue += '1'
        break
      }
      if (prevThree === 'two') {
        newCValue += '2'
        break
      }
      if (prevFive === 'three') {
        newCValue += '3'
        break
      }
      if (prevFour === 'four') {
        newCValue += '4'
        break
      }
      if (prevFour === 'five') {
        newCValue += '5'
        break
      }
      if (prevThree === 'six') {
        newCValue += '6'
        break
      }
      if (prevFive === 'seven') {
        newCValue += '7'
        break
      }
      if (prevFive === 'eight') {
        newCValue += '8'
        break
      }
      if (prevFour === 'nine') {
        newCValue += '9'
        break
      }
    }
    return cValue + Number(newCValue)
  }, 0)

  return { answer2 }
}

const day01: Omit<DayConfig, 'year'> = {
  answer1Text: 'The calibration sum is answer.',
  answer2Text: 'The true calibration sum is answer.',
  buttons: [
    {
      label: 'Find the Calibration Values',
      onClick: findCalibrationValues,
    },
    {
      label: 'Find the Calibration Values (Spelled Out)',
      onClick: findCalibrationValuesSpelled,
    },
  ],
  id: 1,
  inputs,
  title: 'Trebuchet?!',
}

export default day01
