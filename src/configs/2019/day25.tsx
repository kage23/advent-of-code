import inputs from '../../inputs/2019/day25'
import { DayConfig } from '../../routes/Day'
import intcodeComputer, { IntcodeComputerResults } from './Intcode'

let program: number[] = []
let parsedOutput = ''
let intcodeComputerResults: IntcodeComputerResults = {
  finished: false,
  instructionPointer: 0,
  outputs: [],
  relativeBase: 0,
  program,
}

const parseInput = (input: string): number[] =>
  input.split(',').map((inputStr) => parseInt(inputStr))

const initialize = (input: string) => {
  program = parseInput(input)

  intcodeComputerResults = {
    finished: false,
    instructionPointer: 0,
    outputs: [],
    relativeBase: 0,
    program,
  }

  parsedOutput = ''
}

const parseOutput = (outputs: number[]): string =>
  outputs.map((x) => String.fromCharCode(x)).join('') + '\n'

const runProgram = () => {
  const { value } = document.getElementById('intcodeInput') as HTMLInputElement

  const input = value
    ? `${value.trim()}\n`.split('').map((x) => x.charCodeAt(0))
    : []

  intcodeComputerResults = intcodeComputer(
    intcodeComputerResults.program,
    input,
    false,
    intcodeComputerResults.instructionPointer,
    intcodeComputerResults.relativeBase
  )

  parsedOutput += parseOutput(intcodeComputerResults.outputs)

  return {
    answer1: '',
    specialRender: parsedOutput,
  }
}

const day25: Omit<DayConfig, 'year'> = {
  answer1Text:
    'Have fun playing the text adventure and working it out yourself!',
  answer2Text: '',
  buttons: [
    {
      label: 'Initialize/Reset Program (Click Me First)',
      onClick: initialize,
    },
    {
      label: 'Run Program',
      onClick: runProgram,
    },
  ],
  extra: () => (
    <>
      <p>Commands are: north/south/east/west/take/drop/inv</p>
      <p>
        Intcode computer ASCII input:{' '}
        <input type="text" size={50} id="intcodeInput" />
      </p>
    </>
  ),
  id: 25,
  inputs,
  title: 'Cryostasis',
}

export default day25
