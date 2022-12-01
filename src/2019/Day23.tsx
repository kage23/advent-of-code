import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'
import { intcodeComputer2019 } from '../utils/Various'

import INPUT from '../Inputs/2019/Day23'

interface INICComputer {
  finished: boolean
  idle: boolean
  inputs: number[]
  instructionPointer: number
  maybeIdle: boolean
  outputs: number[]
  relativeBase: number
  program: number[]
}

let computers: INICComputer[] = []

const parseInput = (inputKey: string): number[] =>
  INPUT[inputKey].split(',').map(inputStr => parseInt(inputStr))

const BUTTONS: IButton[] = [
  {
    label: 'Initialize Computers',
    onClick: (inputKey: string) => {
      const program = parseInput(inputKey)
      const computerCount = 50

      computers.length = 0

      for (let i = 0; i < computerCount; i++) {
        computers.push({
          finished: false,
          idle: false,
          inputs: [i],
          instructionPointer: 0,
          maybeIdle: false,
          outputs: [],
          relativeBase: 0,
          program: JSON.parse(JSON.stringify(program))
        })
      }

      return {}
    }
  },
  {
    label: 'Run Network',
    onClick: () => {
      let answer1 = NaN
      let count = 1
      let NATpacket: number[] = []
      let lastYSentFromNAT = NaN

      while (true) {
        for (let i = 0; i < computers.length; i++) {
          const computer = computers[i]
          if (!computer.idle) {
            let result = intcodeComputer2019(
              computer.program,
              computer.inputs,
              true,
              computer.instructionPointer,
              computer.relativeBase,
              true
            )
            if (result.breakWaitingForInput) {
              if (!computer.maybeIdle) {
                computer.maybeIdle = true
                result = intcodeComputer2019(
                  computer.program,
                  [-1],
                  true,
                  computer.instructionPointer,
                  computer.relativeBase,
                  true
                )
              } else {
                computer.idle = true
                continue
              }
            }
            computer.finished = result.finished || false
            computer.instructionPointer = result.instructionPointer
            computer.relativeBase = result.relativeBase
            computer.program = result.program
            computer.outputs.push(...result.outputs)
            if (computer.outputs.length >= 3) {
              const pushToAddress = computer.outputs.shift()
              if (pushToAddress === 255) {
                if (isNaN(answer1)) {
                  answer1 = computer.outputs[1]
                }
                NATpacket = [...computer.outputs]
                computer.outputs = []
              }
              else if (pushToAddress !== undefined) {
                computers[pushToAddress].inputs.push(computer.outputs.shift() || 0)
                computers[pushToAddress].inputs.push(computer.outputs.shift() || 0)
                computers[pushToAddress].maybeIdle = false
                computers[pushToAddress].idle = false
              }
            }
          }
        }
        count++
        if (computers.every(computer => computer.idle)) {
          if (NATpacket[1] === lastYSentFromNAT) {
            return {
              answer1: answer1.toString(),
              answer2: lastYSentFromNAT.toString()
            }
          }
          console.log(`Network is idle on loop ${count}! Sending packet ${JSON.stringify(NATpacket)} to Computer 0 and restarting network...`)
          computers.forEach(computer => {
            computer.idle = false
            computer.maybeIdle = false
          })
          computers[0].inputs = [...NATpacket]
          lastYSentFromNAT = NATpacket[1]
          NATpacket = []
        }
      }
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The Y value first set to address 255 is <code>{answer}</code>.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      The first Y value delivered by the NAT to computer at address 0 twice in a row is <code>{answer}</code>.
    </span>
  ),
  buttons: BUTTONS,
  day: 23,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Category Six'
}

export default config
