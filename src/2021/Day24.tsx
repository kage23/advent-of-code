import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'

import INPUT from '../Inputs/2021/Day24'

const BUTTONS: IButton[] = [
  {
    label: 'Get the Highest Model',
    onClick: (inputKey: string) => {
      const instructions = INPUT[inputKey].split('\n')
      const modelNumber = '29599469991739'

      const ALU = { w: 0, x: 0, y: 0, z: 0 }

      const getLineValue = (line: number): number => {
        const value = instructions[line].split(' ')[2]
        if (!isNaN(Number(value))) return Number(value)
        return ALU[value as 'w' | 'x' | 'y' | 'z']
      }

      for (let i = 0; i < 14; i++) {
        const n = Number(modelNumber.charAt(i))
        const baseInstructionIndex = i * 18

        ALU.w = n
        ALU.x = (ALU.z) % 26 // set x to prevZ, modded by 26
        const line4value = getLineValue(baseInstructionIndex + 4)
        ALU.z = Math.floor(ALU.z / line4value) // sometimes divide z by 26
        const line5value = getLineValue(baseInstructionIndex + 5)
        ALU.x += line5value // add a value to x
        // if prevZmod26 plus line5value equals current input, set x to 0
        ALU.x = ALU.x === n ? 0 : 1 // if current x equals input, set x to 0. Otherwise, 1.
        ALU.y = (25 * ALU.x) + 1 // set y to 1 or 26
        ALU.z *= ALU.y // multiply z by 1 or 26
        const line15value = getLineValue(baseInstructionIndex + 15)
        ALU.y = (n + line15value) * ALU.x // set y to input plus a value, multiply by x (maybe 0)
        ALU.z += ALU.y // add the y to z
      }

      /**
       * Validation rules:
       * fourth digit       is the    third digit     plus 4
       * eighth digit       is the    seventh digit   plus 3
       * ninth digit        is the    sixth digit     plus 5
       * eleventh digit     is the    tenth digit     minus 8
       * twelfth digit      is the    fifth digit     minus 2
       * thirteenth digit   is the    second digit    minus 6
       * fourteenth digit   is the    first digit     plus 7
       *
       * 1st    =   14th    minus 7
       * 2nd    =   13th    plus 6
       * 3rd    =   4th     minus 4
       * 4th    =   3rd     plus 4
       * 5th    =   12th    plus 2
       * 6th    =   9th     minus 5
       * 7th    =   8th     minus 3
       * 8th    =   7th     plus 3
       * 9th    =   6th     plus 5
       * 10th   =   11th    plus 8
       * 11th   =   10th    minus 8
       * 12th   =   5th     minus 2
       * 13th   =   2nd     minus 6
       * 14th   =   1st     plus 7
       *
       * 1st: 2
       * 2nd: 9
       * 3rd: 5
       * 4th: 9
       * 5th: 9
       * 6th: 4
       * 7th: 6
       * 8th: 9
       * 9th: 9
       * 10th: 9
       * 11th: 1
       * 12th: 7
       * 13th: 3
       * 14th: 9
       */

      return {
        answer1: modelNumber
      }
    }
  },
  {
    label: 'Get the Lowest Model',
    onClick: (inputKey: string) => {
      const instructions = INPUT[inputKey].split('\n')
      const modelNumber = '17153114691118'

      const ALU = { w: 0, x: 0, y: 0, z: 0 }

      const getLineValue = (line: number): number => {
        const value = instructions[line].split(' ')[2]
        if (!isNaN(Number(value))) return Number(value)
        return ALU[value as 'w' | 'x' | 'y' | 'z']
      }

      for (let i = 0; i < 14; i++) {
        const n = Number(modelNumber.charAt(i))
        const baseInstructionIndex = i * 18

        ALU.w = n
        ALU.x = (ALU.z) % 26 // set x to prevZ, modded by 26
        const line4value = getLineValue(baseInstructionIndex + 4)
        ALU.z = Math.floor(ALU.z / line4value) // sometimes divide z by 26
        const line5value = getLineValue(baseInstructionIndex + 5)
        ALU.x += line5value // add a value to x
        // if prevZmod26 plus line5value equals current input, set x to 0
        ALU.x = ALU.x === n ? 0 : 1 // if current x equals input, set x to 0. Otherwise, 1.
        ALU.y = (25 * ALU.x) + 1 // set y to 1 or 26
        ALU.z *= ALU.y // multiply z by 1 or 26
        const line15value = getLineValue(baseInstructionIndex + 15)
        ALU.y = (n + line15value) * ALU.x // set y to input plus a value, multiply by x (maybe 0)
        ALU.z += ALU.y // add the y to z
      }

      /**
       * Validation rules:
       * fourth digit       is the    third digit     plus 4
       * eighth digit       is the    seventh digit   plus 3
       * ninth digit        is the    sixth digit     plus 5
       * eleventh digit     is the    tenth digit     minus 8
       * twelfth digit      is the    fifth digit     minus 2
       * thirteenth digit   is the    second digit    minus 6
       * fourteenth digit   is the    first digit     plus 7
       *
       * 1st    =   14th    minus 7
       * 2nd    =   13th    plus 6
       * 3rd    =   4th     minus 4
       * 4th    =   3rd     plus 4
       * 5th    =   12th    plus 2
       * 6th    =   9th     minus 5
       * 7th    =   8th     minus 3
       * 8th    =   7th     plus 3
       * 9th    =   6th     plus 5
       * 10th   =   11th    plus 8
       * 11th   =   10th    minus 8
       * 12th   =   5th     minus 2
       * 13th   =   2nd     minus 6
       * 14th   =   1st     plus 7
       *
       * 1st: 1
       * 2nd: 7
       * 3rd: 1
       * 4th: 5
       * 5th: 3
       * 6th: 1
       * 7th: 1
       * 8th: 4
       * 9th: 6
       * 10th: 9
       * 11th: 1
       * 12th: 1
       * 13th: 1
       * 14th: 8
       *
       * 17153114691118
       */

      return {
        answer2: modelNumber
      }
    }
  },
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The highest valid model number is <code>{answer}</code>.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      The lowest valid model number is <code>{answer}</code>.
    </span>
  ),
  buttons: BUTTONS,
  day: 24,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Arithmetic Logic Unit'
}

export default config
