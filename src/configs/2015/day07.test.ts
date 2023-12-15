import inputs from '../../inputs/2015/day07'
import { constructTheCircuit } from './day07'

describe('2015 Day 07', () => {
  describe('Part 1', () => {
    it('should determine the output of the wires at the end', () => {
      expect(constructTheCircuit(inputs.get('DEMO')!, 1).answer1).toEqual(undefined)
    })
  })
  describe('Part 2', () => {
    it('should determine the output of the wires at the end', () => {
      expect(constructTheCircuit(inputs.get('DEMO')!, 2).answer2).toEqual(undefined)
    })
  })
})
