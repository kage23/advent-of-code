import inputs from '../../inputs/2015/day25'
import { DayConfig } from '../../routes/Day'

export const getCodeFromCodeNumber = (codeNumber: number): number => {
  let code = 20151125
  for (let i = 1; i < codeNumber; i++) code = getCodeFromPreviousCode(code)
  return code
}

const getCodeFromPreviousCode = (previousCode: number): number => (previousCode * 252533) % 33554393

export const getCodeNumberAtGridPosition = (row: number, col: number): number => {
  let countRow = 1
  let countCol = 1
  let number = 1
  while (!(countRow === row && countCol === col)) {
    number++
    if (countRow === 1) {
      countRow = countCol + 1
      countCol = 1
    } else {
      countRow--
      countCol++
    }
  }
  return number
}

export const getTheDesignatedCode = (inputKey: string) => {
  const row = parseInt(inputs.get(inputKey)!.split(' at row ')[1])
  const col = parseInt(inputs.get(inputKey)!.split(', column ')[1])
  return {
    answer1: getCodeFromCodeNumber(getCodeNumberAtGridPosition(row, col))
  }
}

const day25: Omit<DayConfig, 'year'> = {
  answer1Text: 'The designated code is answer.',
  answer2Text: '',
  buttons: [
    {
      label: 'Get the Designated Code',
      onClick: getTheDesignatedCode
    }
  ],
  id: 25,
  inputs,
  title: 'Let It Snow',
}

export default day25
