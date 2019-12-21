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

export const intcodeComputer2019 = (program: number[], input?: number): {
  output: number | undefined
  result: number[]
} => {
  interface IOPCODE {
    method: (program: number[], instructionPointer: number, parameterModes: ('position' | 'immediate')[], input?: number) => {
      instructionPointerOffset?: number
      output?: number
      program: number[]
    }
    numOfParameters: number
  }

  const OPCODES: {
    [key:number]: IOPCODE
  } = {
    // Addition
    1: {
      method: (program: number[], instructionPointer: number, parameterModes: ('position' | 'immediate')[]) => {
        const resultProgram = program.map(num => num)
        const parameter1 = parameterModes[0] === 'position' || parameterModes[0] === undefined
          ? program[program[instructionPointer + 1]]
          : program[instructionPointer + 1]
        const parameter2 = parameterModes[1] === 'position' || parameterModes[1] === undefined
          ? program[program[instructionPointer + 2]]
          : program[instructionPointer + 2]
        resultProgram[program[instructionPointer + 3]] = parameter1 + parameter2
        return {
          instructionPointerOffset: 4,
          program: resultProgram
        }
      },
      numOfParameters: 3
    },
    // Multiplication
    2: {
      method: (program: number[], instructionPointer: number, parameterModes: ('position' | 'immediate')[]) => {
        const resultProgram = program.map(num => num)
        const parameter1 = parameterModes[0] === 'position' || parameterModes[0] === undefined
          ? program[program[instructionPointer + 1]]
          : program[instructionPointer + 1]
        const parameter2 = parameterModes[1] === 'position' || parameterModes[1] === undefined
          ? program[program[instructionPointer + 2]]
          : program[instructionPointer + 2]

        resultProgram[program[instructionPointer + 3]] = parameter1 * parameter2
        return {
          instructionPointerOffset: 4,
          program: resultProgram
        }
      },
      numOfParameters: 3
    },
    // Write input to parameter address
    3: {
      method: (program: number[], instructionPointer: number, parameterModes: ('position' | 'immediate')[], input?: number) => {
        const resultProgram = program.map(num => num)
        resultProgram[program[instructionPointer + 1]] = typeof input === 'number' ? input : NaN
        return {
          instructionPointerOffset: 2,
          program: resultProgram
        }
      },
      numOfParameters: 1
    },
    // Output from parameter address
    4: {
      method: (program: number[], instructionPointer: number, parameterModes: ('position' | 'immediate')[]) => {
        const parameter1 = parameterModes[0] === 'position' || parameterModes[0] === undefined
          ? program[program[instructionPointer + 1]]
          : program[instructionPointer + 1]
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
      method: (program: number[], instructionPointer: number, parameterModes: ('position' | 'immediate')[]) => {
        const parameter1 = parameterModes[0] === 'position' || parameterModes[0] === undefined
          ? program[program[instructionPointer + 1]]
          : program[instructionPointer + 1]
        const parameter2 = parameterModes[1] === 'position' || parameterModes[1] === undefined
          ? program[program[instructionPointer + 2]]
          : program[instructionPointer + 2]

        return {
          instructionPointerOffset: parameter1 !== 0 ? parameter2 - instructionPointer : 3,
          program
        }
      },
      numOfParameters: 2
    },
    // Jump if false
    6: {
      method: (program: number[], instructionPointer: number, parameterModes: ('position' | 'immediate')[]) => {
        const parameter1 = parameterModes[0] === 'position' || parameterModes[0] === undefined
          ? program[program[instructionPointer + 1]]
          : program[instructionPointer + 1]
        const parameter2 = parameterModes[1] === 'position' || parameterModes[1] === undefined
          ? program[program[instructionPointer + 2]]
          : program[instructionPointer + 2]

        return {
          instructionPointerOffset: parameter1 === 0 ? parameter2 - instructionPointer : 3,
          program
        }
      },
      numOfParameters: 2
    },
    // Less than
    7: {
      method: (program: number[], instructionPointer: number, parameterModes: ('position' | 'immediate')[]) => {
        const resultProgram = program.map(num => num)
        const parameter1 = parameterModes[0] === 'position' || parameterModes[0] === undefined
          ? program[program[instructionPointer + 1]]
          : program[instructionPointer + 1]
        const parameter2 = parameterModes[1] === 'position' || parameterModes[1] === undefined
          ? program[program[instructionPointer + 2]]
          : program[instructionPointer + 2]

        resultProgram[program[instructionPointer + 3]] = parameter1 < parameter2 ? 1 : 0

        return {
          instructionPointerOffset: 4,
          program: resultProgram
        }
      },
      numOfParameters: 3
    },
    // Equals
    8: {
      method: (program: number[], instructionPointer: number, parameterModes: ('position' | 'immediate')[]) => {
        const resultProgram = program.map(num => num)
        const parameter1 = parameterModes[0] === 'position' || parameterModes[0] === undefined
          ? program[program[instructionPointer + 1]]
          : program[instructionPointer + 1]
        const parameter2 = parameterModes[1] === 'position' || parameterModes[1] === undefined
          ? program[program[instructionPointer + 2]]
          : program[instructionPointer + 2]

        resultProgram[program[instructionPointer + 3]] = parameter1 === parameter2 ? 1 : 0

        return {
          instructionPointerOffset: 4,
          program: resultProgram
        }
      },
      numOfParameters: 3
    },
    99: {
      method: (program: number[]) => ({ program }),
      numOfParameters: 0
    }
  }

  const getOpcode = (number: number): number => parseInt(number.toString().slice(-2))
  const getParameterModes = (program: number[], instructionPointer: number): ('position' | 'immediate')[] => {
    const PARAMETER_MODES: {
      [key:number]: 'position' | 'immediate'
    } = {
      0: 'position',
      1: 'immediate'
    }

    const number = program[instructionPointer]
    const opcode = getOpcode(number)
    const { numOfParameters } = OPCODES[opcode]
    return number
        .toString()
        .slice(0, -2)
        .split('')
        .map(x => PARAMETER_MODES[parseInt(x)])
        .reverse()
  }

  let result = JSON.parse(JSON.stringify(program))
  let instructionPointer = 0
  let opcode = getOpcode(result[instructionPointer])
  let parameterModes = getParameterModes(result, instructionPointer)
  let output: number | undefined = undefined

  while (opcode !== 99) {
    const { method } = OPCODES[opcode]
    const methodOutput = method(result, instructionPointer, parameterModes, input)
    result = methodOutput.program
    output = methodOutput.output || output
    if (output) console.log('output', output)
    instructionPointer += methodOutput.instructionPointerOffset || 0
    opcode = getOpcode(result[instructionPointer])
    parameterModes = getParameterModes(result, instructionPointer)
  }

  return { output, result }
}
