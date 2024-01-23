export interface IntcodeComputerResults {
  breakWaitingForInput?: boolean
  finished?: boolean
  instructionPointer: number
  outputs: number[]
  program: number[]
  relativeBase: number
}
const intcodeComputer = (
  program: number[],
  input?: number[],
  chainedMode?: boolean,
  initialInstructionPointer?: number,
  initialRelativeBase?: number,
  stepMode?: boolean
): IntcodeComputerResults => {
  interface IOPCODE {
    method: (
      program: number[],
      instructionPointer: number,
      relativeBase: number,
      parameterModes: ('position' | 'immediate' | 'relative')[],
      input?: number[]
    ) => {
      breakWaitingForInput?: boolean
      instructionPointerOffset?: number
      output?: number
      program: number[]
      relativeBaseOffset?: number
    }
    numOfParameters: number
  }

  const OPCODES: {
    [key: number]: IOPCODE
  } = {
    // Addition
    1: {
      method: (
        program: number[],
        instructionPointer: number,
        relativeBase: number,
        parameterModes: ('position' | 'immediate' | 'relative')[]
      ) => {
        const resultProgram = program.map((num) => num)
        const parameter1 =
          parameterModes[0] === 'position' || parameterModes[0] === undefined
            ? program[program[instructionPointer + 1]] || 0
            : parameterModes[0] === 'immediate'
            ? program[instructionPointer + 1] || 0
            : parameterModes[0] === 'relative'
            ? program[program[instructionPointer + 1] + relativeBase] || 0
            : NaN
        const parameter2 =
          parameterModes[1] === 'position' || parameterModes[1] === undefined
            ? program[program[instructionPointer + 2]] || 0
            : parameterModes[1] === 'immediate'
            ? program[instructionPointer + 2] || 0
            : parameterModes[1] === 'relative'
            ? program[program[instructionPointer + 2] + relativeBase] || 0
            : NaN
        const parameter3 =
          parameterModes[2] === 'position' || parameterModes[2] === undefined
            ? program[instructionPointer + 3] || 0
            : parameterModes[2] === 'immediate'
            ? instructionPointer + 3
            : program[instructionPointer + 3] + relativeBase

        resultProgram[parameter3] = parameter1 + parameter2
        return {
          instructionPointerOffset: 4,
          program: resultProgram,
        }
      },
      numOfParameters: 3,
    },
    // Multiplication
    2: {
      method: (
        program: number[],
        instructionPointer: number,
        relativeBase: number,
        parameterModes: ('position' | 'immediate' | 'relative')[]
      ) => {
        const resultProgram = program.map((num) => num)
        const parameter1 =
          parameterModes[0] === 'position' || parameterModes[0] === undefined
            ? program[program[instructionPointer + 1]] || 0
            : parameterModes[0] === 'immediate'
            ? program[instructionPointer + 1] || 0
            : parameterModes[0] === 'relative'
            ? program[program[instructionPointer + 1] + relativeBase] || 0
            : NaN
        const parameter2 =
          parameterModes[1] === 'position' || parameterModes[1] === undefined
            ? program[program[instructionPointer + 2]] || 0
            : parameterModes[1] === 'immediate'
            ? program[instructionPointer + 2] || 0
            : parameterModes[1] === 'relative'
            ? program[program[instructionPointer + 2] + relativeBase] || 0
            : NaN
        const parameter3 =
          parameterModes[2] === 'position' || parameterModes[2] === undefined
            ? program[instructionPointer + 3] || 0
            : parameterModes[2] === 'immediate'
            ? instructionPointer + 3
            : program[instructionPointer + 3] + relativeBase

        resultProgram[parameter3] = parameter1 * parameter2
        return {
          instructionPointerOffset: 4,
          program: resultProgram,
        }
      },
      numOfParameters: 3,
    },
    // Write input to parameter address
    3: {
      method: (
        program: number[],
        instructionPointer: number,
        relativeBase: number,
        parameterModes: ('position' | 'immediate' | 'relative')[],
        input?: number[]
      ) => {
        const resultProgram = program.map((num) => num)
        const inputNumber =
          Array.isArray(input) && input.length >= 1 ? input.shift() : NaN

        if (inputNumber === undefined || isNaN(inputNumber)) {
          return { breakWaitingForInput: true, program }
        }

        const writeAddress =
          parameterModes[0] === 'position' || parameterModes[0] === undefined
            ? program[instructionPointer + 1] || 0
            : parameterModes[0] === 'immediate'
            ? instructionPointer + 1 || 0
            : parameterModes[0] === 'relative'
            ? program[instructionPointer + 1] + relativeBase || 0
            : NaN
        resultProgram[writeAddress] =
          inputNumber !== undefined ? inputNumber : NaN
        return {
          instructionPointerOffset: 2,
          program: resultProgram,
        }
      },
      numOfParameters: 1,
    },
    // Output from parameter address
    4: {
      method: (
        program: number[],
        instructionPointer: number,
        relativeBase: number,
        parameterModes: ('position' | 'immediate' | 'relative')[]
      ) => {
        const parameter1 =
          parameterModes[0] === 'position' || parameterModes[0] === undefined
            ? program[program[instructionPointer + 1]] || 0
            : parameterModes[0] === 'immediate'
            ? program[instructionPointer + 1] || 0
            : parameterModes[0] === 'relative'
            ? program[program[instructionPointer + 1] + relativeBase] || 0
            : NaN
        return {
          instructionPointerOffset: 2,
          output: parameter1,
          program,
        }
      },
      numOfParameters: 1,
    },
    // Jump if true
    5: {
      method: (
        program: number[],
        instructionPointer: number,
        relativeBase: number,
        parameterModes: ('position' | 'immediate' | 'relative')[]
      ) => {
        const parameter1 =
          parameterModes[0] === 'position' || parameterModes[0] === undefined
            ? program[program[instructionPointer + 1]] || 0
            : parameterModes[0] === 'immediate'
            ? program[instructionPointer + 1] || 0
            : parameterModes[0] === 'relative'
            ? program[program[instructionPointer + 1] + relativeBase] || 0
            : NaN
        const parameter2 =
          parameterModes[1] === 'position' || parameterModes[1] === undefined
            ? program[program[instructionPointer + 2]] || 0
            : parameterModes[1] === 'immediate'
            ? program[instructionPointer + 2] || 0
            : parameterModes[1] === 'relative'
            ? program[program[instructionPointer + 2] + relativeBase] || 0
            : NaN

        return {
          instructionPointerOffset:
            parameter1 !== 0 ? parameter2 - instructionPointer : 3,
          program,
        }
      },
      numOfParameters: 2,
    },
    // Jump if false
    6: {
      method: (
        program: number[],
        instructionPointer: number,
        relativeBase: number,
        parameterModes: ('position' | 'immediate' | 'relative')[]
      ) => {
        const parameter1 =
          parameterModes[0] === 'position' || parameterModes[0] === undefined
            ? program[program[instructionPointer + 1]] || 0
            : parameterModes[0] === 'immediate'
            ? program[instructionPointer + 1] || 0
            : parameterModes[0] === 'relative'
            ? program[program[instructionPointer + 1] + relativeBase] || 0
            : NaN
        const parameter2 =
          parameterModes[1] === 'position' || parameterModes[1] === undefined
            ? program[program[instructionPointer + 2]] || 0
            : parameterModes[1] === 'immediate'
            ? program[instructionPointer + 2] || 0
            : parameterModes[1] === 'relative'
            ? program[program[instructionPointer + 2] + relativeBase] || 0
            : NaN

        return {
          instructionPointerOffset:
            parameter1 === 0 ? parameter2 - instructionPointer : 3,
          program,
        }
      },
      numOfParameters: 2,
    },
    // Less than
    7: {
      method: (
        program: number[],
        instructionPointer: number,
        relativeBase: number,
        parameterModes: ('position' | 'immediate' | 'relative')[]
      ) => {
        const resultProgram = program.map((num) => num)
        const parameter1 =
          parameterModes[0] === 'position' || parameterModes[0] === undefined
            ? program[program[instructionPointer + 1]] || 0
            : parameterModes[0] === 'immediate'
            ? program[instructionPointer + 1] || 0
            : parameterModes[0] === 'relative'
            ? program[program[instructionPointer + 1] + relativeBase] || 0
            : NaN
        const parameter2 =
          parameterModes[1] === 'position' || parameterModes[1] === undefined
            ? program[program[instructionPointer + 2]] || 0
            : parameterModes[1] === 'immediate'
            ? program[instructionPointer + 2] || 0
            : parameterModes[1] === 'relative'
            ? program[program[instructionPointer + 2] + relativeBase] || 0
            : NaN
        const parameter3 =
          parameterModes[2] === 'position' || parameterModes[2] === undefined
            ? program[instructionPointer + 3] || 0
            : parameterModes[2] === 'immediate'
            ? instructionPointer + 3
            : program[instructionPointer + 3] + relativeBase

        resultProgram[parameter3] = parameter1 < parameter2 ? 1 : 0

        return {
          instructionPointerOffset: 4,
          program: resultProgram,
        }
      },
      numOfParameters: 3,
    },
    // Equals
    8: {
      method: (
        program: number[],
        instructionPointer: number,
        relativeBase: number,
        parameterModes: ('position' | 'immediate' | 'relative')[]
      ) => {
        const resultProgram = program.map((num) => num)
        const parameter1 =
          parameterModes[0] === 'position' || parameterModes[0] === undefined
            ? program[program[instructionPointer + 1]] || 0
            : parameterModes[0] === 'immediate'
            ? program[instructionPointer + 1] || 0
            : parameterModes[0] === 'relative'
            ? program[program[instructionPointer + 1] + relativeBase] || 0
            : NaN
        const parameter2 =
          parameterModes[1] === 'position' || parameterModes[1] === undefined
            ? program[program[instructionPointer + 2]] || 0
            : parameterModes[1] === 'immediate'
            ? program[instructionPointer + 2] || 0
            : parameterModes[1] === 'relative'
            ? program[program[instructionPointer + 2] + relativeBase] || 0
            : NaN
        const parameter3 =
          parameterModes[2] === 'position' || parameterModes[2] === undefined
            ? program[instructionPointer + 3] || 0
            : parameterModes[2] === 'immediate'
            ? instructionPointer + 3
            : program[instructionPointer + 3] + relativeBase

        resultProgram[parameter3] = parameter1 === parameter2 ? 1 : 0

        return {
          instructionPointerOffset: 4,
          program: resultProgram,
        }
      },
      numOfParameters: 3,
    },
    // Adjust the relative base
    9: {
      method: (
        program: number[],
        instructionPointer: number,
        relativeBase: number,
        parameterModes: ('position' | 'immediate' | 'relative')[]
      ) => {
        const parameter1 =
          parameterModes[0] === 'position' || parameterModes[0] === undefined
            ? program[program[instructionPointer + 1]] || 0
            : parameterModes[0] === 'immediate'
            ? program[instructionPointer + 1] || 0
            : parameterModes[0] === 'relative'
            ? program[program[instructionPointer + 1] + relativeBase] || 0
            : NaN

        return {
          instructionPointerOffset: 2,
          program,
          relativeBaseOffset: parameter1,
        }
      },
      numOfParameters: 1,
    },
    99: {
      method: (program: number[]) => ({ program }),
      numOfParameters: 0,
    },
  }

  const getOpcode = (number: number): number =>
    parseInt(number.toString().slice(-2))
  const getParameterModes = (
    program: number[],
    instructionPointer: number
  ): ('position' | 'immediate' | 'relative')[] => {
    const PARAMETER_MODES: {
      [key: number]: 'position' | 'immediate' | 'relative'
    } = {
      0: 'position',
      1: 'immediate',
      2: 'relative',
    }

    const number = program[instructionPointer]
    return number
      .toString()
      .slice(0, -2)
      .split('')
      .map((x) => PARAMETER_MODES[parseInt(x)])
      .reverse()
  }

  let result = JSON.parse(JSON.stringify(program))
  let instructionPointer = initialInstructionPointer || 0
  let relativeBase = initialRelativeBase || 0
  let opcode = getOpcode(result[instructionPointer])
  let parameterModes = getParameterModes(result, instructionPointer)
  const outputs: number[] = []

  while (opcode !== 99) {
    const { method } = OPCODES[opcode]
    const methodOutput = method(
      result,
      instructionPointer,
      relativeBase,
      parameterModes,
      input
    )
    if (methodOutput.breakWaitingForInput) {
      // console.log('BREAK: Waiting for input. Intcode did not run.')
      return {
        breakWaitingForInput: true,
        finished: false,
        instructionPointer,
        outputs,
        relativeBase,
        program: result,
      }
    }
    result = methodOutput.program
    if (typeof methodOutput.output === 'number')
      outputs.push(methodOutput.output)
    instructionPointer += methodOutput.instructionPointerOffset || 0
    relativeBase += methodOutput.relativeBaseOffset || 0
    // if (typeof methodOutput.output === 'number') console.log('output', methodOutput.output)
    if ((typeof methodOutput.output === 'number' && chainedMode) || stepMode) {
      return {
        finished: false,
        instructionPointer,
        outputs,
        relativeBase,
        program: result,
      }
    }
    opcode = getOpcode(result[instructionPointer])
    parameterModes = getParameterModes(result, instructionPointer)
  }

  return {
    finished: true,
    instructionPointer,
    outputs,
    relativeBase,
    program: result,
  }
}

export default intcodeComputer
