export interface IOperation {
  code: number
  inputA: number
  inputB: number
  outputC: number
}

const OPERATIONS: {
  [key:string]: (operation: IOperation, registers: number[]) => number[]
} = {
  addr: (operation: IOperation, registers: number[]): number[] => {
    let newRegisters = registers.slice(0)

    newRegisters[operation.outputC] = registers[operation.inputA] + registers[operation.inputB]

    return newRegisters
  },
  addi: (operation: IOperation, registers: number[]): number[] => {
    let newRegisters = registers.slice(0)

    newRegisters[operation.outputC] = registers[operation.inputA] + operation.inputB

    return newRegisters
  },

  mulr: (operation: IOperation, registers: number[]): number[] => {
    let newRegisters = registers.slice(0)

    newRegisters[operation.outputC] = registers[operation.inputA] * registers[operation.inputB]

    return newRegisters
  },
  muli: (operation: IOperation, registers: number[]): number[] => {
    let newRegisters = registers.slice(0)

    newRegisters[operation.outputC] = registers[operation.inputA] * operation.inputB

    return newRegisters
  },

  banr: (operation: IOperation, registers: number[]): number[] => {
    let newRegisters = registers.slice(0)

    newRegisters[operation.outputC] = registers[operation.inputA] & registers[operation.inputB]

    return newRegisters
  },
  bani: (operation: IOperation, registers: number[]): number[] => {
    let newRegisters = registers.slice(0)

    newRegisters[operation.outputC] = registers[operation.inputA] & operation.inputB

    return newRegisters
  },

  borr: (operation: IOperation, registers: number[]): number[] => {
    let newRegisters = registers.slice(0)

    newRegisters[operation.outputC] = registers[operation.inputA] | registers[operation.inputB]

    return newRegisters
  },
  bori: (operation: IOperation, registers: number[]): number[] => {
    let newRegisters = registers.slice(0)

    newRegisters[operation.outputC] = registers[operation.inputA] | operation.inputB

    return newRegisters
  },

  setr: (operation: IOperation, registers: number[]): number[] => {
    let newRegisters = registers.slice(0)

    newRegisters[operation.outputC] = registers[operation.inputA]

    return newRegisters
  },
  seti: (operation: IOperation, registers: number[]): number[] => {
    let newRegisters = registers.slice(0)

    newRegisters[operation.outputC] = operation.inputA

    return newRegisters
  },

  gtir: (operation: IOperation, registers: number[]): number[] => {
    let newRegisters = registers.slice(0)

    newRegisters[operation.outputC] = operation.inputA > registers[operation.inputB] ? 1 : 0

    return newRegisters
  },
  gtri: (operation: IOperation, registers: number[]): number[] => {
    let newRegisters = registers.slice(0)

    newRegisters[operation.outputC] = registers[operation.inputA] > operation.inputB ? 1 : 0

    return newRegisters
  },
  gtrr: (operation: IOperation, registers: number[]): number[] => {
    let newRegisters = registers.slice(0)

    newRegisters[operation.outputC] = registers[operation.inputA] > registers[operation.inputB] ? 1 : 0

    return newRegisters
  },

  eqir: (operation: IOperation, registers: number[]): number[] => {
    let newRegisters = registers.slice(0)

    newRegisters[operation.outputC] = operation.inputA === registers[operation.inputB] ? 1 : 0

    return newRegisters
  },
  eqri: (operation: IOperation, registers: number[]): number[] => {
    let newRegisters = registers.slice(0)

    newRegisters[operation.outputC] = registers[operation.inputA] === operation.inputB ? 1 : 0

    return newRegisters
  },
  eqrr: (operation: IOperation, registers: number[]): number[] => {
    let newRegisters = registers.slice(0)

    newRegisters[operation.outputC] = registers[operation.inputA] === registers[operation.inputB] ? 1 : 0

    return newRegisters
  }
}

export default OPERATIONS