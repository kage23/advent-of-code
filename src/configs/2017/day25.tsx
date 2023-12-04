import inputs from '../../inputs/2017/day25'
import { DayConfig } from '../../routes/Day'

interface Instruction {
  write: 0 | 1
  move: -1 | 1
  nextState: string
}

interface State {
  stateID: string
  0: Instruction
  1: Instruction
}

interface TuringMachineStates {
  currentState: string
  stepCountTarget: number
  states: Map<string, State>
}

const parseIf = (input: string): Instruction => {
  const write = input.split('Write the value ')[1].charAt(0) === '0' ? 0 : 1
  const move =
    input.split('Move one slot to the ')[1].charAt(0) === 'r' ? 1 : -1
  const nextState = input.split('Continue with state ')[1].charAt(0)

  return {
    write,
    move,
    nextState,
  }
}

const parseInput = (input: string): TuringMachineStates => {
  const currentState = input.split('Begin in state ')[1].charAt(0)
  const stepCountTarget = parseInt(
    input.split('Perform a diagnostic checksum after ')[1]
  )
  const states = new Map() as Map<string, State>
  const statesRaw = input.split('\n\n')

  statesRaw.shift()

  for (const state of statesRaw) {
    const stateID = state.split('In state ')[1].charAt(0)
    const ifSplit = state.split('If the current value is ')
    const if0 = parseIf(ifSplit[1])
    const if1 = parseIf(ifSplit[2])
    states.set(stateID, {
      stateID,
      0: if0,
      1: if1,
    })
  }

  return {
    currentState,
    stepCountTarget,
    states,
  }
}

export const runProgram = (inputKey: string) => {
  const machine = parseInput(inputs.get(inputKey)!)
  const tape = [0]
  let currentIndex = 0
  let lowestIndex = 0
  let checksum = 0

  for (let i = 0; i < machine.stepCountTarget; i++) {
    const currentState = machine.states.get(machine.currentState)
    if (currentState) {
      if (!tape[currentIndex]) tape[currentIndex] = 0
      const currentValue = tape[currentIndex]
      const instruction = currentValue === 0 ? currentState[0] : currentState[1]
      tape[currentIndex] = instruction.write
      currentIndex += instruction.move
      lowestIndex = Math.min(lowestIndex, currentIndex)
      machine.currentState = instruction.nextState
    }
  }

  for (let j = lowestIndex; j < tape.length; j++) checksum += tape[j]

  return {
    answer1: checksum,
    answer2: '',
  }
}

const day25: Omit<DayConfig, 'year'> = {
  answer1Text: 'The checksum is answer.',
  answer2Text: 'You did it!',
  buttons: [
    {
      label: 'Run Program',
      onClick: runProgram,
    },
  ],
  id: 25,
  inputs,
  title: 'The Halting Problem',
}

export default day25
