import {
  IButton,
  IDayConfig
} from '../Config'
import { intcodeComputer2019, IIntcodeComputerResults } from '../utils/Various'

import INPUT from '../Inputs/2019/Day21'

let program: number[] = []
let intcodeComputerResults: IIntcodeComputerResults = {
  finished: false,
  instructionPointer: 0,
  outputs: [],
  relativeBase: 0,
  program
}

let parsedOutput: string = ''

const parseInput = (inputKey: string): number[] =>
  INPUT[inputKey].split(',').map(inputStr => parseInt(inputStr))

const parseOutput = (outputs: number[]): string => outputs.map(x => String.fromCharCode(x)).join('') + '\n'

const renderDay = (dayConfig: IDayConfig, inputKey: string) => {
  return (
    <div>
      <h3>Puzzle Input: {dayConfig.INPUT[inputKey]}</h3>
      <p>
        This is totally functional, but it is left as an exercise to the
        reader to figure out how to program the springscript!
      </p>
      <div className="render-box render-box--no-wrap">
        <div style={{ width: '350px', flexGrow: 0 }}>
          <p>Intcode computer ASCII input: <textarea rows={5} cols={50} id="intcodeInput" /></p>
          <h3>Output:</h3>
          <pre className="render-box--pre-wrap">{parsedOutput}</pre>
        </div>
        <div className="render-box--left-margin">
          <h3>Program:</h3>
          <pre className="render-box--pre-wrap">{program.join(',')}</pre>
        </div>
      </div>
    </div>
  )
}

const BUTTONS: IButton[] = [
  {
    label: 'Initialize/Reset Program (Click Me First)',
    onClick: (inputKey: string) => {
      program = parseInput(inputKey)

      intcodeComputerResults = {
        finished: false,
        instructionPointer: 0,
        outputs: [],
        relativeBase: 0,
        program
      }

      parsedOutput = ''

      return {}
    }
  },
  {
    label: 'Run Program',
    onClick: () => {
      const { value } = document.getElementById('intcodeInput') as HTMLInputElement

      const input = value
        ? `${value.trim()}\n`.split('').map(x => x.charCodeAt(0))
        : []

      intcodeComputerResults = intcodeComputer2019(
        intcodeComputerResults.program,
        input,
        false,
        intcodeComputerResults.instructionPointer,
        intcodeComputerResults.relativeBase
      )

      parsedOutput += parseOutput(intcodeComputerResults.outputs)

      return {
        answer1: intcodeComputerResults.outputs[intcodeComputerResults.outputs.length - 1].toString()
      }
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The hull has taken <code>{answer}</code> damage.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      {/* The robot vacuumed up <code>{answer}</code> dust. */}
    </span>
  ),
  buttons: BUTTONS,
  day: 21,
  INPUT,
  renderDay: (dayConfig, inputKey) => renderDay(dayConfig, inputKey),
  title: 'Springdroid Adventure'
}

export default config

/*

Here's a good springscript for Part 1:

NOT A J
NOT B T
OR T J
NOT C T
OR T J
AND D J
WALK

Here's a good springscript for Part 2 (but it takes a while to run):

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

*/