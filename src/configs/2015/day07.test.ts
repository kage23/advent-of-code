import inputs from '../../inputs/2015/day07'
import { constructCircuit } from './day07'

describe('2015 Day 07', () => {
  describe('Part 1', () => {
    it('should determine the output of the wires at the end', () => {
      const circuit = constructCircuit(inputs.get('DEMO_1')!.split('\n'), 1)
      expect(circuit.get('d')).toEqual(72)
      expect(circuit.get('e')).toEqual(507)
      expect(circuit.get('f')).toEqual(492)
      expect(circuit.get('g')).toEqual(114)
      expect(circuit.get('h')).toEqual(65412)
      expect(circuit.get('i')).toEqual(65079)
      expect(circuit.get('x')).toEqual(123)
      expect(circuit.get('y')).toEqual(456)
    })
  })
})
