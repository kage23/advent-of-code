import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'

import INPUT from '../Inputs/2017/Day25'

interface ITuringMachineStates {
  currentState: string
  stepCountTarget: number
  states: Map<string, IState>
}

interface IState {
  stateID: string
  0: IInstruction
  1: IInstruction
}

interface IInstruction {
  write: 0 | 1
  move: -1 | 1
  nextState: string
}

const parseInput = (input: string): ITuringMachineStates => {
  const currentState = input.split('Begin in state ')[1].charAt(0)
  const stepCountTarget = parseInt(input.split('Perform a diagnostic checksum after ')[1])
  const states = new Map() as Map<string, IState>
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
      1: if1
    })
  }

  return {
    currentState,
    stepCountTarget,
    states
  }
}

const parseIf = (input: string): IInstruction => {
  const write = input.split('Write the value ')[1].charAt(0) === '0' ? 0 : 1
  const move = input.split('Move one slot to the ')[1].charAt(0) === 'r' ? 1 : -1
  const nextState = input.split('Continue with state ')[1].charAt(0)

  return {
    write,
    move,
    nextState
  }
}

const BUTTONS: IButton[] = [
  {
    label: 'Run Program',
    onClick: (inputKey) => {
      const machine = parseInput(INPUT[inputKey])
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
        answer1: checksum.toString()
      }
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The checksum is{' '}
      <code>{answer}</code>.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      <code>{answer}</code>
    </span>
  ),
  buttons: BUTTONS,
  day: 25,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'The Halting Problem'
}

export default config