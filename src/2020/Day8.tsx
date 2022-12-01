import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'

import INPUT from '../Inputs/2020/Day8'

import GamingSystem, { IInstruction } from './GamingSystem'

const BUTTONS: IButton[] = [
  {
    label: 'Run Until Loop Or Terminate',
    onClick: (inputKey: string) => {
      const gamingSystem = new GamingSystem(INPUT[inputKey])
      return {
        answer1: gamingSystem.runUntilLoopOrTerminate().accumulator.toString()
      }
    }
  },
  {
    label: 'Permute and Fix Code',
    onClick: (inputKey: string) => {
      const corruptedSystem = new GamingSystem(INPUT[inputKey])
      for (let i = 0; i < corruptedSystem.instructions.length; i++) {
        const newInstructions = JSON.parse(JSON.stringify(corruptedSystem.instructions)) as IInstruction[]
        if (corruptedSystem.instructions[i].command === 'nop') {
          newInstructions[i].command = 'jmp'
          const result = new GamingSystem(newInstructions.join('\n')).runUntilLoopOrTerminate()
          if (result.result === 'terminate') {
            return {
              answer2: result.accumulator.toString()
            }
          }
        } else if (corruptedSystem.instructions[i].command === 'jmp') {
          newInstructions[i].command = 'nop'
          const newInstructionsString = newInstructions.map(({ amount, command }) => `${command} ${amount}`).join('\n')
          const result = new GamingSystem(newInstructionsString).runUntilLoopOrTerminate()
          if (result.result === 'terminate') {
            return {
              answer2: result.accumulator.toString()
            }
          }
        }
      }
      throw new Error('answer not found')
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The <code>accumulator</code> when a loop is detected is <code>{answer}</code>.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      The <code>accumulator</code> when the corrected code terminates is <code>{answer}</code>.
    </span>
  ),
  buttons: BUTTONS,
  day: 8,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Handheld Halting'
}

export default config