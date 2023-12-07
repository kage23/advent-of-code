import inputs from '../../inputs/2018/day16'
import { DayConfig } from '../../routes/Day'

interface Operation {
  code: number
  inputA: number
  inputB: number
  outputC: number
}

interface Sample {
  before: number[]
  operation: Operation
  after: number[]
}

interface State {
  opCodes: string[]
  registers: number[]
  resultsTested: boolean
  samples: Sample[]
  testResults: number
  code: string
}

const Operations: {
  [key:string]: (operation: Operation, registers: number[]) => number[]
} = {
  // Add Register
  addr: (operation: Operation, registers: number[]): number[] => {
    const newRegisters = [...registers]

    newRegisters[operation.outputC] = registers[operation.inputA] + registers[operation.inputB]

    return newRegisters
  },
  // Add Immediate
  addi: (operation: Operation, registers: number[]): number[] => {
    const newRegisters = [...registers]

    newRegisters[operation.outputC] = registers[operation.inputA] + operation.inputB

    return newRegisters
  },

  // Multiply Register
  mulr: (operation: Operation, registers: number[]): number[] => {
    const newRegisters = [...registers]

    newRegisters[operation.outputC] = registers[operation.inputA] * registers[operation.inputB]

    return newRegisters
  },
  // Multiply Immediate
  muli: (operation: Operation, registers: number[]): number[] => {
    const newRegisters = [...registers]

    newRegisters[operation.outputC] = registers[operation.inputA] * operation.inputB

    return newRegisters
  },

  // Bitwise And Register
  banr: (operation: Operation, registers: number[]): number[] => {
    const newRegisters = [...registers]

    newRegisters[operation.outputC] = registers[operation.inputA] & registers[operation.inputB]

    return newRegisters
  },
  // Bitwise And Immediate
  bani: (operation: Operation, registers: number[]): number[] => {
    const newRegisters = [...registers]

    newRegisters[operation.outputC] = registers[operation.inputA] & operation.inputB

    return newRegisters
  },

  // Bitwise Or Register
  borr: (operation: Operation, registers: number[]): number[] => {
    const newRegisters = [...registers]

    newRegisters[operation.outputC] = registers[operation.inputA] | registers[operation.inputB]

    return newRegisters
  },
  // Bitwise Or Immediate
  bori: (operation: Operation, registers: number[]): number[] => {
    const newRegisters = [...registers]

    newRegisters[operation.outputC] = registers[operation.inputA] | operation.inputB

    return newRegisters
  },

  // Set Register
  setr: (operation: Operation, registers: number[]): number[] => {
    const newRegisters = [...registers]

    newRegisters[operation.outputC] = registers[operation.inputA]

    return newRegisters
  },
  // Set Immediate
  seti: (operation: Operation, registers: number[]): number[] => {
    const newRegisters = [...registers]

    newRegisters[operation.outputC] = operation.inputA

    return newRegisters
  },

  // Greater-than Immediate/Register
  gtir: (operation: Operation, registers: number[]): number[] => {
    const newRegisters = [...registers]

    newRegisters[operation.outputC] = operation.inputA > registers[operation.inputB] ? 1 : 0

    return newRegisters
  },
  // Greater-than Register/Immediate
  gtri: (operation: Operation, registers: number[]): number[] => {
    const newRegisters = [...registers]

    newRegisters[operation.outputC] = registers[operation.inputA] > operation.inputB ? 1 : 0

    return newRegisters
  },
  // Greater-than Register/Register
  gtrr: (operation: Operation, registers: number[]): number[] => {
    const newRegisters = [...registers]

    newRegisters[operation.outputC] = registers[operation.inputA] > registers[operation.inputB] ? 1 : 0

    return newRegisters
  },

  // Equal Immediate/Register
  eqir: (operation: Operation, registers: number[]): number[] => {
    const newRegisters = [...registers]

    newRegisters[operation.outputC] = operation.inputA === registers[operation.inputB] ? 1 : 0

    return newRegisters
  },
  // Equal Register/Immediate
  eqri: (operation: Operation, registers: number[]): number[] => {
    const newRegisters = [...registers]

    newRegisters[operation.outputC] = registers[operation.inputA] === operation.inputB ? 1 : 0

    return newRegisters
  },
  // Equal Register/Register
  eqrr: (operation: Operation, registers: number[]): number[] => {
    const newRegisters = [...registers]

    newRegisters[operation.outputC] = registers[operation.inputA] === registers[operation.inputB] ? 1 : 0

    return newRegisters
  }
}

const state: State = {
  opCodes: [],
  registers: [0, 0, 0, 0],
  resultsTested: false,
  samples: [],
  testResults: 0,
  code: ''
}

const parseInputSamples = (input: string): Sample[] => {
  return input.split('\n\n')
    .map((sample: string) => {
      const sampleArr = sample.split('\n')
      const [
        code,
        inputA,
        inputB,
        outputC
      ] = sampleArr[1].split(' ').map(x => parseInt(x))

      return {
        before: JSON.parse(sampleArr[0].slice(8)),
        operation: {
          code,
          inputA,
          inputB,
          outputC
        },
        after: JSON.parse(sampleArr[2].slice(8))
      }
    })
}

const reset = (inputKey: string) => {
  const [
    samplesRaw,
    codeRaw
  ] = inputs.get(inputKey)!.split('\n\n\n\n')
  state.samples = parseInputSamples(samplesRaw)
  state.code = codeRaw
}

const numArrEq = (a: number[], b: number[]): boolean => {
  if (a.length !== b.length) return false
  const len = a.length
  for (let i = 0; i < len; i++) {
    if (a[i] !== b[i]) return false
  }
  return true
}

const threeOrMoreOps = (sample: Sample): boolean => {
  let matchCount = 0

  for (const operation in Operations) {
    if (
      numArrEq(sample.after, Operations[operation](sample.operation, sample.before))
    ) matchCount++
    if (matchCount >= 3) return true
  }

  return false
}

const matchingOps = (sample: Sample): string[] => {
  const result = []

  for (const method in Operations) {
    if (
      numArrEq(sample.after, Operations[method](sample.operation, sample.before))
    ) result.push(method)
  }

  return result
}

const figureOutOpCodes = (samples: Sample[]): string[] => {
  const opCodes: string[] = []
  let currentSample = samples.shift()

  const filterOp = (op: string) => currentSample && !(opCodes.indexOf(op) !== -1 && opCodes.indexOf(op) !== currentSample.operation.code)
  while (currentSample !== undefined) {
    const whichMatchingOps = matchingOps(currentSample)
      .filter(filterOp)

    if (whichMatchingOps.length === 1 && currentSample.operation.code !== undefined) {
      opCodes[currentSample.operation.code] = whichMatchingOps[0]
    }

    currentSample = samples.shift()
  }

  return opCodes
}

export const threeOrMoreTest = (inputKey: string) => {
  reset(inputKey)

  const { samples } = state

  const testResults = samples.map(sample => threeOrMoreOps(sample)).filter(sample => sample).length

  return {
    answer1: testResults
  }
}

export const runTheInputCode = (inputKey: string) => {
  reset(inputKey)
  state.opCodes = figureOutOpCodes(state.samples)

  const instructions: Operation[] = state.code.split('\n')
    .map(line => line.split(' '))
    .map(line => ({
      code: Number(line[0]),
      inputA: Number(line[1]),
      inputB: Number(line[2]),
      outputC: Number(line[3])
    }))

  state.registers = [0, 0, 0, 0]

  for (const op of instructions)
    state.registers = Operations[state.opCodes[op.code]](op, state.registers)

  return {
    answer2: state.registers[0]
  }
}

const day16: Omit<DayConfig, 'year'> = {
  answer1Text: 'answer samples behave like three or more opcodes.',
  answer2Text: 'The final register values are answer.',
  buttons: [
    {
      label: 'Three or More Test',
      onClick: threeOrMoreTest
    },
    {
      label: 'Run the Input Code!',
      onClick: runTheInputCode
    },
  ],
  id: 16,
  inputs,
  title: 'Chronal Classification',
}

export default day16
