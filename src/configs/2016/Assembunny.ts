class Assembunny {
  registers: Map<string, number>

  constructor(registersArray: [string, number][]) {
    this.registers = new Map(registersArray)
  }

  runCode = (instructions: string[]): Map<string, number> => {
    let instructionPointer = 0

    while (instructionPointer < instructions.length) {
      const currentInstruction = instructions[instructionPointer].split(' ')
      switch (currentInstruction[0]) {
        case 'cpy': {
          if (this.registers.has(currentInstruction[2])) {
            if (isNaN(parseInt(currentInstruction[1]))) {
              this.registers.set(
                currentInstruction[2],
                this.registers.get(currentInstruction[1]) || 0
              )
            } else {
              this.registers.set(
                currentInstruction[2],
                parseInt(currentInstruction[1])
              )
            }
          }
          instructionPointer++
          break
        }
        case 'inc': {
          if (this.registers.has(currentInstruction[1])) {
            this.registers.set(
              currentInstruction[1],
              (this.registers.get(currentInstruction[1]) || 0) + 1
            )
          }
          instructionPointer++
          break
        }
        case 'dec': {
          if (this.registers.has(currentInstruction[1])) {
            this.registers.set(
              currentInstruction[1],
              (this.registers.get(currentInstruction[1]) || 0) - 1
            )
          }
          instructionPointer++
          break
        }
        case 'jnz': {
          const parsed = parseInt(currentInstruction[1])
          if (isNaN(parsed)) {
            instructionPointer +=
              this.registers.get(currentInstruction[1]) === 0
                ? 1
                : this.registers.get(currentInstruction[2]) ||
                  parseInt(currentInstruction[2])
          } else {
            instructionPointer +=
              parsed === 0
                ? 1
                : this.registers.get(currentInstruction[2]) ||
                  parseInt(currentInstruction[2])
          }
          break
        }
        case 'tgl': {
          const toToggle =
            instructionPointer +
            (this.registers.get(currentInstruction[1]) || NaN)
          if (!isNaN(toToggle)) {
            const instrToToggle = instructions[toToggle]
            if (instrToToggle) {
              const instrToToggleWords = instrToToggle.split(' ')
              switch (instrToToggleWords.length) {
                case 2: {
                  if (instrToToggleWords[0] === 'inc') {
                    instructions[toToggle] = [
                      'dec',
                      ...instrToToggleWords.slice(1),
                    ].join(' ')
                  } else {
                    instructions[toToggle] = [
                      'inc',
                      ...instrToToggleWords.slice(1),
                    ].join(' ')
                  }
                  break
                }
                case 3: {
                  if (instrToToggleWords[0] === 'jnz') {
                    instructions[toToggle] = [
                      'cpy',
                      ...instrToToggleWords.slice(1),
                    ].join(' ')
                  } else {
                    instructions[toToggle] = [
                      'jnz',
                      ...instrToToggleWords.slice(1),
                    ].join(' ')
                  }
                  break
                }
                default: {
                  break
                }
              }
            }
          }
          instructionPointer++
          break
        }

        case 'mul': {
          const value1 = this.registers.get(currentInstruction[1]) || NaN
          const value2 = this.registers.get(currentInstruction[2]) || NaN
          this.registers.set(currentInstruction[1], value1 * value2)
          instructionPointer++
          break
        }
        case 'out': {
          console.log(this.registers.get(currentInstruction[1]))
          instructionPointer++
          break
        }
        default: {
          instructionPointer++
          break
        }
      }
    }

    return this.registers
  }
}

export default Assembunny
