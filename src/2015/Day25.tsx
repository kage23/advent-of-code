import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'

import INPUT from '../Inputs/2015/Day25'

const getCodeFromCodeNumber = (codeNumber: number): number => {
  let code = 20151125
  for (let i = 1; i < codeNumber; i++) code = getCodeFromPreviousCode(code)
  return code
}

const getCodeFromPreviousCode = (previousCode: number): number => (previousCode * 252533) % 33554393

const getCodeNumberAtGridPosition = (row: number, col: number): number => {
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

const BUTTONS: IButton[] = [
  {
    label: 'Get the Designated Code',
    onClick: () => ({
      answer1: getCodeFromCodeNumber(getCodeNumberAtGridPosition(2981, 3075)).toString()
    })
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The designated code is <code>{answer}</code>.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      {/* In the ideal configuration (including the trunk), the first group of packages{' '} */}
      {/* has a quantum entanglement of <code>{answer}</code>. */}
    </span>
  ),
  buttons: BUTTONS,
  day: 25,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Let It Snow'
}

export default config