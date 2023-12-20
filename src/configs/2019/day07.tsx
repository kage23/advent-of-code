import inputs from '../../inputs/2019/day07'
import { DayConfig } from '../../routes/Day'
import intcodeComputer, { IntcodeComputerResults } from './Intcode'

const parseInput = (input: string): number[] =>
  input.split(',').map((inputStr) => parseInt(inputStr))

const runAmplifiersOnce = (
  program: number[],
  phaseSettingSequence: string
): {
  output: number
  result: number[]
} => {
  let resultProgram = program.map((num) => num)
  const phaseSettings = phaseSettingSequence.split('').map((x) => parseInt(x))
  let input = 0

  // Amp A
  let phaseSetting = phaseSettings.shift()
  if (phaseSetting === undefined)
    throw new Error('You ran out of phase settings!')
  let results = intcodeComputer(resultProgram, [phaseSetting, input])
  resultProgram = results.program
  if (results.outputs[0] === undefined) throw new Error('Undefined output')
  input = results.outputs[0]

  // Amp B
  phaseSetting = phaseSettings.shift()
  if (phaseSetting === undefined)
    throw new Error('You ran out of phase settings!')
  results = intcodeComputer(resultProgram, [phaseSetting, input])
  resultProgram = results.program
  if (results.outputs[0] === undefined) throw new Error('Undefined output')
  input = results.outputs[0]

  // Amp C
  phaseSetting = phaseSettings.shift()
  if (phaseSetting === undefined)
    throw new Error('You ran out of phase settings!')
  results = intcodeComputer(resultProgram, [phaseSetting, input])
  resultProgram = results.program
  if (results.outputs[0] === undefined) throw new Error('Undefined output')
  input = results.outputs[0]

  // Amp D
  phaseSetting = phaseSettings.shift()
  if (phaseSetting === undefined)
    throw new Error('You ran out of phase settings!')
  results = intcodeComputer(resultProgram, [phaseSetting, input])
  resultProgram = results.program
  if (results.outputs[0] === undefined) throw new Error('Undefined output')
  input = results.outputs[0]

  // Amp E
  phaseSetting = phaseSettings.shift()
  if (phaseSetting === undefined)
    throw new Error('You ran out of phase settings!')
  results = intcodeComputer(resultProgram, [phaseSetting, input])
  resultProgram = results.program
  if (results.outputs[0] === undefined) throw new Error('Undefined output')
  input = results.outputs[0]

  return {
    output: input,
    result: results.program,
  }
}

const runAmplifiers = (
  program: number[],
  phaseSettingSequence: string
): {
  output: number
  result: number[]
} => {
  interface Amplifier {
    inputs: number[]
    instructionPointer: number
    program: number[]
  }

  const phaseSettings = phaseSettingSequence.split('').map((x) => parseInt(x))

  let ampA: Amplifier = {
    inputs: [phaseSettings[0], 0],
    instructionPointer: 0,
    program: JSON.parse(JSON.stringify(program)),
  }
  let ampB: Amplifier = {
    inputs: [phaseSettings[1]],
    instructionPointer: 0,
    program: JSON.parse(JSON.stringify(program)),
  }
  let ampC: Amplifier = {
    inputs: [phaseSettings[2]],
    instructionPointer: 0,
    program: JSON.parse(JSON.stringify(program)),
  }
  let ampD: Amplifier = {
    inputs: [phaseSettings[3]],
    instructionPointer: 0,
    program: JSON.parse(JSON.stringify(program)),
  }
  let ampE: Amplifier = {
    inputs: [phaseSettings[4]],
    instructionPointer: 0,
    program: JSON.parse(JSON.stringify(program)),
  }

  let resultsA: IntcodeComputerResults = {
    instructionPointer: 0,
    outputs: [],
    relativeBase: 0,
    program: JSON.parse(JSON.stringify(program)),
  }
  let resultsB: IntcodeComputerResults = {
    instructionPointer: 0,
    outputs: [],
    relativeBase: 0,
    program: JSON.parse(JSON.stringify(program)),
  }
  let resultsC: IntcodeComputerResults = {
    instructionPointer: 0,
    outputs: [],
    relativeBase: 0,
    program: JSON.parse(JSON.stringify(program)),
  }
  let resultsD: IntcodeComputerResults = {
    instructionPointer: 0,
    outputs: [],
    relativeBase: 0,
    program: JSON.parse(JSON.stringify(program)),
  }
  let resultsE: IntcodeComputerResults = {
    instructionPointer: 0,
    outputs: [],
    relativeBase: 0,
    program: JSON.parse(JSON.stringify(program)),
  }

  while (!resultsE.finished) {
    if (!resultsA.finished) {
      resultsA = intcodeComputer(
        ampA.program,
        ampA.inputs,
        true,
        ampA.instructionPointer
      )
      ampA.instructionPointer = resultsA.instructionPointer
      if (typeof resultsA.outputs[0] === 'number')
        ampB.inputs.push(resultsA.outputs[0])
      ampA.program = resultsA.program
    }

    if (!resultsB.finished) {
      resultsB = intcodeComputer(
        ampB.program,
        ampB.inputs,
        true,
        ampB.instructionPointer
      )
      ampB.instructionPointer = resultsB.instructionPointer
      if (typeof resultsB.outputs[0] === 'number')
        ampC.inputs.push(resultsB.outputs[0])
      ampB.program = resultsB.program
    }

    if (!resultsC.finished) {
      resultsC = intcodeComputer(
        ampC.program,
        ampC.inputs,
        true,
        ampC.instructionPointer
      )
      ampC.instructionPointer = resultsC.instructionPointer
      if (typeof resultsC.outputs[0] === 'number')
        ampD.inputs.push(resultsC.outputs[0])
      ampC.program = resultsC.program
    }

    if (!resultsD.finished) {
      resultsD = intcodeComputer(
        ampD.program,
        ampD.inputs,
        true,
        ampD.instructionPointer
      )
      ampD.instructionPointer = resultsD.instructionPointer
      if (typeof resultsD.outputs[0] === 'number')
        ampE.inputs.push(resultsD.outputs[0])
      ampD.program = resultsD.program
    }

    resultsE = intcodeComputer(
      ampE.program,
      ampE.inputs,
      true,
      ampE.instructionPointer
    )
    ampE.instructionPointer = resultsE.instructionPointer
    if (typeof resultsE.outputs[0] === 'number')
      ampA.inputs.push(resultsE.outputs[0])
    ampE.program = resultsE.program
  }

  return {
    output: ampA.inputs[0],
    result: resultsE.program,
  }
}

export const findMaxAmpSignal = (input: string) => {
  const inputProgram = parseInput(input)

  let ampSignal = ''
  let maxThrusterSignal = Number.MIN_SAFE_INTEGER
  for (let a = 0; a <= 4; a++) {
    for (let b = 0; b <= 4; b++) {
      for (let c = 0; c <= 4; c++) {
        for (let d = 0; d <= 4; d++) {
          for (let e = 0; e <= 4; e++) {
            ampSignal = [a, b, c, d, e]
              .filter((x, i, self) => self.indexOf(x) === i)
              .join('')
            if (ampSignal.length === 5) {
              const result = runAmplifiersOnce(inputProgram, ampSignal)
              maxThrusterSignal = Math.max(maxThrusterSignal, result.output)
            }
          }
        }
      }
    }
  }

  return {
    answer1: maxThrusterSignal,
  }
}

export const findMaxAmpSignal2 = (input: string) => {
  const inputProgram = parseInput(input)

  let ampSignal = ''
  let maxThrusterSignal = Number.MIN_SAFE_INTEGER
  for (let a = 5; a <= 9; a++) {
    for (let b = 5; b <= 9; b++) {
      for (let c = 5; c <= 9; c++) {
        for (let d = 5; d <= 9; d++) {
          for (let e = 5; e <= 9; e++) {
            ampSignal = [a, b, c, d, e]
              .filter((x, i, self) => self.indexOf(x) === i)
              .join('')
            if (ampSignal.length === 5) {
              const result = runAmplifiers(inputProgram, ampSignal)
              maxThrusterSignal = Math.max(maxThrusterSignal, result.output)
            }
          }
        }
      }
    }
  }

  return {
    answer2: maxThrusterSignal,
  }
}

const day07: Omit<DayConfig, 'year'> = {
  answer1Text:
    'The highest signal that can be sent to the thrusters is answer.',
  answer2Text:
    'The highest signal that can be sent to the thrusters is answer.',
  buttons: [
    {
      label: 'Find Max Amplifier Signal',
      onClick: findMaxAmpSignal,
    },
    {
      label: 'Find Max Amplifier Signal (Part 2)',
      onClick: findMaxAmpSignal2,
    },
  ],
  id: 7,
  inputs,
  title: 'Amplification Circuit',
}

export default day07
