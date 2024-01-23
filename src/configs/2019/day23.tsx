import inputs from '../../inputs/2019/day23'
import { DayConfig } from '../../routes/Day'
import intcodeComputer from './Intcode'

interface NICComputer {
  finished: boolean
  idle: boolean
  inputs: number[]
  instructionPointer: number
  maybeIdle: boolean
  outputs: number[]
  relativeBase: number
  program: number[]
}

const computers: NICComputer[] = []

const parseInput = (input: string): number[] =>
  input.split(',').map(inputStr => parseInt(inputStr))

const initializeComputers = (input: string) => {
  const program = parseInput(input)
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
}

const runNetwork = () => {
  let answer1 = NaN
  // let count = 1
  let NATpacket: number[] = []
  let lastYSentFromNAT = NaN

  // eslint-disable-next-line no-constant-condition
  while (true) {
    for (let i = 0; i < computers.length; i++) {
      const computer = computers[i]
      if (!computer.idle) {
        let result = intcodeComputer(
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
            result = intcodeComputer(
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
    // count++
    if (computers.every(computer => computer.idle)) {
      if (NATpacket[1] === lastYSentFromNAT) {
        return {
          answer1: answer1,
          answer2: lastYSentFromNAT
        }
      }
      // console.log(`Network is idle on loop ${count}! Sending packet ${JSON.stringify(NATpacket)} to Computer 0 and restarting network...`)
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

const day23: Omit<DayConfig, 'year'> = {
  answer1Text: 'The Y value first set to address 255 is answer.',
  answer2Text: 'The first Y value delivered by the NAT to computer at address 0 twice in a row is answer.',
  buttons: [
    {
      label: 'Initialize Computers',
      onClick: initializeComputers
    },
    {
      label: 'Run Network',
      onClick: runNetwork
    },
  ],
  id: 23,
  inputs,
  title: 'Category Six',
}

export default day23
