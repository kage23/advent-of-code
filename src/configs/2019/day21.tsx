import inputs from '../../inputs/2019/day21'
import { DayConfig } from '../../routes/Day'
import intcodeComputer, { IntcodeComputerResults } from './Intcode'

let program: number[] = []
let intcodeComputerResults: IntcodeComputerResults = {
  finished: false,
  instructionPointer: 0,
  outputs: [],
  relativeBase: 0,
  program
}
let parsedOutput = ''

const parseInput = (input: string): number[] =>
  input.split(',').map(inputStr => parseInt(inputStr))

const parseOutput = (outputs: number[]): string => outputs.map(x => String.fromCharCode(x)).join('') + '\n'

const reset = (input: string) => {
  program = parseInput(input)

  intcodeComputerResults = {
    finished: false,
    instructionPointer: 0,
    outputs: [],
    relativeBase: 0,
    program
  }

  parsedOutput = ''
}

const runProgram = () => {
  const { value } = document.getElementById('intcodeInput') as HTMLInputElement

  const input = value
    ? `${value.trim()}\n`.split('').map(x => x.charCodeAt(0))
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
    answer1: intcodeComputerResults.outputs[intcodeComputerResults.outputs.length - 1],
    answer2: intcodeComputerResults.outputs[intcodeComputerResults.outputs.length - 1],
    specialRender: parsedOutput
  }
}

const day21: Omit<DayConfig, 'year'> = {
  answer1Text: 'The hull has taken answer damage.',
  answer2Text: 'The hull has taken answer damage.',
  buttons: [
    {
      label: 'Reset',
      onClick: reset
    },
    {
      label: 'Run Program',
      onClick: runProgram
    },
  ],
  extra: () => <p>Intcode computer ASCII input: <textarea rows={5} cols={50} id="intcodeInput" /></p>,
  id: 21,
  inputs,
  title: 'Springdroid Adventure',
}

export default day21

/*

Here's a good springscript for Part 1:

NOT A J
NOT B T
OR T J
NOT C T
OR T J
AND D J
WALK

Here's a good springscript for Part 2:

NOT E T
NOT H J
AND T J
NOT J T
NOT A J
NOT J J
AND B J
AND C J
NOT J J
AND D J
AND T J
RUN

*/
