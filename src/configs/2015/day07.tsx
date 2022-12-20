import inputs from '../../inputs/2015/day07'
import { DayConfig } from '../../routes/Day'

export const constructCircuit = (instructions: string[], part: 1 | 2): Map<string, number> => {
  const circuit: Map<string, number> = new Map()

  const outputs = instructions.map(instruction => instruction.split(' -> ')[1])

  while (outputs.some(output => circuit.get(output) === undefined)) {
    instructions.forEach(instruction => {
      const [input, output] = instruction.split(' -> ')
      if (circuit.get(output) === undefined) {
        if (output === 'b' && part === 2) {
          circuit.set(output, 3176)
        } else {
          const inputWords = input.split(' ')
          if (inputWords.length === 1) {
            // Just setting a direct number
            const myNumber = isNaN(parseInt(inputWords[0]))
              ? circuit.get(inputWords[0])
              : parseInt(inputWords[0])
            if (myNumber !== undefined) {
              circuit.set(output, myNumber)
            }
          } else if (inputWords.length === 2) {
            // This must be a NOT
            const inputNode = circuit.get(inputWords[1])
            if (inputNode !== undefined) {
              circuit.set(output, 65536 + ~inputNode)
            }
          } else if (inputWords.length === 3) {
            const node1 = isNaN(parseInt(inputWords[0]))
              ? circuit.get(inputWords[0])
              : parseInt(inputWords[0])
            const node2 = isNaN(parseInt(inputWords[2]))
              ? circuit.get(inputWords[2])
              : parseInt(inputWords[2])
            if (node1 !== undefined && node2 !== undefined) {
              switch (inputWords[1]) {
                case 'AND':
                  circuit.set(output, node1 & node2)
                  break

                case 'OR':
                  circuit.set(output, node1 | node2)
                  break

                case 'LSHIFT':
                  circuit.set(output, node1 << node2)
                  break

                case 'RSHIFT':
                  circuit.set(output, node1 >> node2)
                  break
              }
            }
          }
        }
      }
    })
  }

  return circuit
}

export const constructTheCircuit = (inputKey: string, part: 1 | 2) => {
  const circuit = constructCircuit(inputs.get(inputKey)!.split('\n'), part)

  return {
    answer1: part === 1 ? circuit.get('a') : undefined,
    answer2: part === 2 ? circuit.get('a') : undefined
  }
}

const day06: Omit<DayConfig, 'year'> = {
  answer1Text: 'The output on wire A is answer.',
  answer2Text: 'The output on wire A is answer.',
  buttons: [
    {
      label: 'Construct the Circuit',
      onClick: (inputKey) => constructTheCircuit(inputKey, 1)
    },
    {
      label: 'Construct Circuit with Override',
      onClick: (inputKey) => constructTheCircuit(inputKey, 2)
    }
  ],
  id: 7,
  inputs,
  title: `Some Assembly Required`,
}

export default day06
