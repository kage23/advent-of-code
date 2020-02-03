import DLL from './DLL'

export const detectPrime = (x: number): boolean => {
  for (let i = 2; i < x; i++) {
    if ((x / i) === Math.floor(x / i)) return false
  }
  return true
}

export const generateKnotHash = (input: string, listSize: number, readAsNumbers?: boolean): string => {
  const list = new DLL()
  let currentPosition = 0
  let skipSize = 0
  for (let i = 0; i < listSize; i++) list.push(i)

  const twistAndAdvance = (length: number): void => {
    let startOfTwist = list.head
    const listToReverse: number[] = []

    // Select starting node for twist
    for (let i = 0; i < currentPosition; i++) {
      startOfTwist = startOfTwist ? startOfTwist.next : startOfTwist
    }
    let currentNode = startOfTwist

    // Get values to be reversed
    while (listToReverse.length < length && currentNode) {
      listToReverse.push(currentNode.value)
      currentNode = currentNode.next
    }

    currentNode = startOfTwist
    while (listToReverse.length && currentNode) {
      currentNode.value = listToReverse.pop() || 0
      currentNode = currentNode.next
    }

    currentPosition += (length + skipSize)
    skipSize++
  }

  const lengths = (
    readAsNumbers
      ? input.split(',').map(x => parseInt(x))
      : input.split('').map(x => x.charCodeAt(0))
    ).concat(17, 31, 73, 47, 23)

  const runs = 64
  for (let i = 0; i < runs; i++) {
    lengths.forEach(x => twistAndAdvance(x))
  }

  // Now you should have the sparse hash; make the dense hash
  let currentNode = list.head
  const denseHashArray = []
  let currentSubHash = 0
  for (let count = 0; count < list.length; count++) {
    if (currentNode) {
      currentSubHash = currentSubHash ^ currentNode.value
      currentNode = currentNode.next
    }
    if (count % 16 === 15) {
      denseHashArray.push(currentSubHash)
      currentSubHash = 0
    }
  }

  // Now use the dense hash to make the hex string
  let result = ''
  denseHashArray.forEach(x => {
    let hexStr = x.toString(16)
    if (hexStr.length % 2) hexStr = `0${hexStr}`
    result += hexStr
  })

  return result
}

export const manhattanDistance = (a: number[], b: number[], dimensions?: number): number => {
  if (!dimensions && a.length !== b.length)
    throw new Error('The coords must be in the same dimensions!')
  if (dimensions && (a.length < dimensions || b.length < dimensions))
    throw new Error('The coords must be of a large-enough dimension!')
  const dimensionCount = dimensions || a.length
  return a.reduce((distance, currentCoord, currentIndex) => (
    distance + (
      currentIndex < dimensionCount
        ? Math.abs(currentCoord - b[currentIndex])
        : 0
    )
  ), 0)
}

export const numArrEq = (a: number[], b: number[]): boolean => {
  if (a.length !== b.length) return false
  const len = a.length
  for (let i = 0; i < len; i++) {
    if (a[i] !== b[i]) return false
  }
  return true
}

export const randInt = (min: number, max: number): number => Math.floor(Math.random() * max) + min

export interface IIntcodeComputerResults {
  breakWaitingForInput?: boolean
  finished?: boolean
  instructionPointer: number
  outputs: number[]
  program: number[]
  relativeBase: number
}
export const intcodeComputer2019 = (
  program: number[],
  input?: number[],
  chainedMode?: boolean,
  initialInstructionPointer?: number,
  initialRelativeBase?: number,
  stepMode?: boolean
): IIntcodeComputerResults => {
  interface IOPCODE {
    method: (program: number[], instructionPointer: number, relativeBase: number, parameterModes: ('position' | 'immediate' | 'relative')[], input?: number[]) => {
      breakWaitingForInput?: boolean
      instructionPointerOffset?: number
      output?: number
      program: number[]
      relativeBaseOffset?: number
    }
    numOfParameters: number
  }

  const OPCODES: {
    [key:number]: IOPCODE
  } = {
    // Addition
    1: {
      method: (program: number[], instructionPointer: number, relativeBase: number, parameterModes: ('position' | 'immediate' | 'relative')[]) => {
        const resultProgram = program.map(num => num)
        const parameter1 = parameterModes[0] === 'position' || parameterModes[0] === undefined
          ? program[program[instructionPointer + 1]] || 0
          : parameterModes[0] === 'immediate'
          ? program[instructionPointer + 1] || 0
          : parameterModes[0] === 'relative'
          ? program[program[instructionPointer + 1] + relativeBase] || 0
          : NaN
        const parameter2 = parameterModes[1] === 'position' || parameterModes[1] === undefined
          ? program[program[instructionPointer + 2]] || 0
          : parameterModes[1] === 'immediate'
          ? program[instructionPointer + 2] || 0
          : parameterModes[1] === 'relative'
          ? program[program[instructionPointer + 2] + relativeBase] || 0
          : NaN
        const parameter3 = parameterModes[2] === 'position' || parameterModes[2] === undefined
          ? program[instructionPointer + 3] || 0
          : parameterModes[2] === 'immediate'
          ? instructionPointer + 3
          : program[instructionPointer + 3] + relativeBase

        resultProgram[parameter3] = parameter1 + parameter2
        return {
          instructionPointerOffset: 4,
          program: resultProgram
        }
      },
      numOfParameters: 3
    },
    // Multiplication
    2: {
      method: (program: number[], instructionPointer: number, relativeBase: number, parameterModes: ('position' | 'immediate' | 'relative')[]) => {
        const resultProgram = program.map(num => num)
        const parameter1 = parameterModes[0] === 'position' || parameterModes[0] === undefined
          ? program[program[instructionPointer + 1]] || 0
          : parameterModes[0] === 'immediate'
          ? program[instructionPointer + 1] || 0
          : parameterModes[0] === 'relative'
          ? program[program[instructionPointer + 1] + relativeBase] || 0
          : NaN
        const parameter2 = parameterModes[1] === 'position' || parameterModes[1] === undefined
          ? program[program[instructionPointer + 2]] || 0
          : parameterModes[1] === 'immediate'
          ? program[instructionPointer + 2] || 0
          : parameterModes[1] === 'relative'
          ? program[program[instructionPointer + 2] + relativeBase] || 0
          : NaN
        const parameter3 = parameterModes[2] === 'position' || parameterModes[2] === undefined
          ? program[instructionPointer + 3] || 0
          : parameterModes[2] === 'immediate'
          ? instructionPointer + 3
          : program[instructionPointer + 3] + relativeBase

        resultProgram[parameter3] = parameter1 * parameter2
        return {
          instructionPointerOffset: 4,
          program: resultProgram
        }
      },
      numOfParameters: 3
    },
    // Write input to parameter address
    3: {
      method: (program: number[], instructionPointer: number, relativeBase: number, parameterModes: ('position' | 'immediate' | 'relative')[], input?: number[]) => {
        const resultProgram = program.map(num => num)
        const inputNumber = Array.isArray(input) && input.length >= 1
          ? input.shift()
          : NaN

        if (inputNumber === undefined || isNaN(inputNumber)) {
          return { breakWaitingForInput: true, program }
        }

        const writeAddress = parameterModes[0] === 'position' || parameterModes[0] === undefined
          ? program[instructionPointer + 1] || 0
          : parameterModes[0] === 'immediate'
          ? instructionPointer + 1 || 0
          : parameterModes[0] === 'relative'
          ? program[instructionPointer + 1] + relativeBase || 0
          : NaN
        resultProgram[writeAddress] = inputNumber !== undefined ? inputNumber : NaN
        return {
          instructionPointerOffset: 2,
          program: resultProgram
        }
      },
      numOfParameters: 1
    },
    // Output from parameter address
    4: {
      method: (program: number[], instructionPointer: number, relativeBase: number, parameterModes: ('position' | 'immediate' | 'relative')[]) => {
        const parameter1 = parameterModes[0] === 'position' || parameterModes[0] === undefined
          ? program[program[instructionPointer + 1]] || 0
          : parameterModes[0] === 'immediate'
          ? program[instructionPointer + 1] || 0
          : parameterModes[0] === 'relative'
          ? program[program[instructionPointer + 1] + relativeBase] || 0
          : NaN
        return {
          instructionPointerOffset: 2,
          output: parameter1,
          program
        }
      },
      numOfParameters: 1
    },
    // Jump if true
    5: {
      method: (program: number[], instructionPointer: number, relativeBase: number, parameterModes: ('position' | 'immediate' | 'relative')[]) => {
        const parameter1 = parameterModes[0] === 'position' || parameterModes[0] === undefined
          ? program[program[instructionPointer + 1]] || 0
          : parameterModes[0] === 'immediate'
          ? program[instructionPointer + 1] || 0
          : parameterModes[0] === 'relative'
          ? program[program[instructionPointer + 1] + relativeBase] || 0
          : NaN
        const parameter2 = parameterModes[1] === 'position' || parameterModes[1] === undefined
          ? program[program[instructionPointer + 2]] || 0
          : parameterModes[1] === 'immediate'
          ? program[instructionPointer + 2] || 0
          : parameterModes[1] === 'relative'
          ? program[program[instructionPointer + 2] + relativeBase] || 0
          : NaN

        return {
          instructionPointerOffset: parameter1 !== 0 ? parameter2 - instructionPointer : 3,
          program
        }
      },
      numOfParameters: 2
    },
    // Jump if false
    6: {
      method: (program: number[], instructionPointer: number, relativeBase: number, parameterModes: ('position' | 'immediate' | 'relative')[]) => {
        const parameter1 = parameterModes[0] === 'position' || parameterModes[0] === undefined
          ? program[program[instructionPointer + 1]] || 0
          : parameterModes[0] === 'immediate'
          ? program[instructionPointer + 1] || 0
          : parameterModes[0] === 'relative'
          ? program[program[instructionPointer + 1] + relativeBase] || 0
          : NaN
        const parameter2 = parameterModes[1] === 'position' || parameterModes[1] === undefined
          ? program[program[instructionPointer + 2]] || 0
          : parameterModes[1] === 'immediate'
          ? program[instructionPointer + 2] || 0
          : parameterModes[1] === 'relative'
          ? program[program[instructionPointer + 2] + relativeBase] || 0
          : NaN

        return {
          instructionPointerOffset: parameter1 === 0 ? parameter2 - instructionPointer : 3,
          program
        }
      },
      numOfParameters: 2
    },
    // Less than
    7: {
      method: (program: number[], instructionPointer: number, relativeBase: number, parameterModes: ('position' | 'immediate' | 'relative')[]) => {
        const resultProgram = program.map(num => num)
        const parameter1 = parameterModes[0] === 'position' || parameterModes[0] === undefined
          ? program[program[instructionPointer + 1]] || 0
          : parameterModes[0] === 'immediate'
          ? program[instructionPointer + 1] || 0
          : parameterModes[0] === 'relative'
          ? program[program[instructionPointer + 1] + relativeBase] || 0
          : NaN
        const parameter2 = parameterModes[1] === 'position' || parameterModes[1] === undefined
          ? program[program[instructionPointer + 2]] || 0
          : parameterModes[1] === 'immediate'
          ? program[instructionPointer + 2] || 0
          : parameterModes[1] === 'relative'
          ? program[program[instructionPointer + 2] + relativeBase] || 0
          : NaN
        const parameter3 = parameterModes[2] === 'position' || parameterModes[2] === undefined
          ? program[instructionPointer + 3] || 0
          : parameterModes[2] === 'immediate'
          ? instructionPointer + 3
          : program[instructionPointer + 3] + relativeBase

        resultProgram[parameter3] = parameter1 < parameter2 ? 1 : 0

        return {
          instructionPointerOffset: 4,
          program: resultProgram
        }
      },
      numOfParameters: 3
    },
    // Equals
    8: {
      method: (program: number[], instructionPointer: number, relativeBase: number, parameterModes: ('position' | 'immediate' | 'relative')[]) => {
        const resultProgram = program.map(num => num)
        const parameter1 = parameterModes[0] === 'position' || parameterModes[0] === undefined
          ? program[program[instructionPointer + 1]] || 0
          : parameterModes[0] === 'immediate'
          ? program[instructionPointer + 1] || 0
          : parameterModes[0] === 'relative'
          ? program[program[instructionPointer + 1] + relativeBase] || 0
          : NaN
        const parameter2 = parameterModes[1] === 'position' || parameterModes[1] === undefined
          ? program[program[instructionPointer + 2]] || 0
          : parameterModes[1] === 'immediate'
          ? program[instructionPointer + 2] || 0
          : parameterModes[1] === 'relative'
          ? program[program[instructionPointer + 2] + relativeBase] || 0
          : NaN
        const parameter3 = parameterModes[2] === 'position' || parameterModes[2] === undefined
          ? program[instructionPointer + 3] || 0
          : parameterModes[2] === 'immediate'
          ? instructionPointer + 3
          : program[instructionPointer + 3] + relativeBase

        resultProgram[parameter3] = parameter1 === parameter2 ? 1 : 0

        return {
          instructionPointerOffset: 4,
          program: resultProgram
        }
      },
      numOfParameters: 3
    },
    // Adjust the relative base
    9: {
      method: (program: number[], instructionPointer: number, relativeBase: number, parameterModes: ('position' | 'immediate' | 'relative')[]) => {
        const parameter1 = parameterModes[0] === 'position' || parameterModes[0] === undefined
          ? program[program[instructionPointer + 1]] || 0
          : parameterModes[0] === 'immediate'
          ? program[instructionPointer + 1] || 0
          : parameterModes[0] === 'relative'
          ? program[program[instructionPointer + 1] + relativeBase] || 0
          : NaN

        return {
          instructionPointerOffset: 2,
          program,
          relativeBaseOffset: parameter1
        }
      },
      numOfParameters: 1
    },
    99: {
      method: (program: number[]) => ({ program }),
      numOfParameters: 0
    }
  }

  const getOpcode = (number: number): number => parseInt(number.toString().slice(-2))
  const getParameterModes = (program: number[], instructionPointer: number): ('position' | 'immediate' | 'relative')[] => {
    const PARAMETER_MODES: {
      [key:number]: 'position' | 'immediate' | 'relative'
    } = {
      0: 'position',
      1: 'immediate',
      2: 'relative'
    }

    const number = program[instructionPointer]
    return number
      .toString()
      .slice(0, -2)
      .split('')
      .map(x => PARAMETER_MODES[parseInt(x)])
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
    const methodOutput = method(result, instructionPointer, relativeBase, parameterModes, input)
    if (methodOutput.breakWaitingForInput) {
      // console.log('BREAK: Waiting for input. Intcode did not run.')
      return { breakWaitingForInput: true, finished: false, instructionPointer, outputs, relativeBase, program: result }
    }
    result = methodOutput.program
    if (typeof methodOutput.output === 'number') outputs.push(methodOutput.output)
    instructionPointer += methodOutput.instructionPointerOffset || 0
    relativeBase += methodOutput.relativeBaseOffset || 0
    // if (typeof methodOutput.output === 'number') console.log('output', methodOutput.output)
    if (
      (typeof methodOutput.output === 'number' && chainedMode)
      || stepMode
    ) {
      return { finished: false, instructionPointer, outputs, relativeBase, program: result }
    }
    opcode = getOpcode(result[instructionPointer])
    parameterModes = getParameterModes(result, instructionPointer)
  }

  return { finished: true, instructionPointer, outputs, relativeBase, program: result }
}

export const gcdTwoNumbers = (x: number, y: number): number => {
  x = Math.abs(x)
  y = Math.abs(y)
  while(y) {
    const t = y
    y = x % y
    x = t
  }
  return x
}

export const gcdMoreThanTwoNumbers = (input: number[]): number => {
  const { length } = input
  let a = 0
  let b = 0

  if (!length) return NaN
  a = input[0]

  for (let i = 1; i < length; i++ ) {
    b = input[i]
    a = gcdTwoNumbers(a, b)
  }

  return a
}

export const lcmTwoNumbers = (x: number, y: number): number =>
  (!x || !y) ? 0 : Math.abs((x * y) / gcdTwoNumbers(x, y))

// Reduce a fraction by finding the Greatest Common Divisor and dividing by it.
export const reduce = (numerator: number, denominator: number) => {
  const gcdFunc = (a: number, b: number): number => {
    return b ? gcdFunc(b, a % b) : a
  }
  const gcd = gcdFunc(numerator, denominator);
  return [numerator/gcd, denominator/gcd];
}

export const isPrime = (num: number): boolean => {
  for (let i = 2; i < num; i++) {
    if (num % i === 0) return false
  }
  return num > 1
}
