import inputs from '../../inputs/2019/day05'
import { runACDiagnostic } from './day05'
import intcodeComputer from './Intcode'

describe('2019 Day 05', () => {
  describe('Part 1', () => {
    it('intcode computer should function correctly', () => {
      expect(
        intcodeComputer(inputs.get('DEMO_1')!.split(',').map(Number)).program
      ).toEqual([1002, 4, 3, 4, 99])
    })
  })
  describe('Part 2', () => {
    it('intcode computer should function correctly', () => {
      expect(
        intcodeComputer(inputs.get('DEMO_2')!.split(',').map(Number), [8])
          .outputs[0]
      ).toEqual(1)
      expect(
        intcodeComputer(inputs.get('DEMO_2')!.split(',').map(Number), [7])
          .outputs[0]
      ).toEqual(0)
      expect(
        intcodeComputer(inputs.get('DEMO_3')!.split(',').map(Number), [8])
          .outputs[0]
      ).toEqual(0)
      expect(
        intcodeComputer(inputs.get('DEMO_3')!.split(',').map(Number), [7])
          .outputs[0]
      ).toEqual(1)
      expect(
        intcodeComputer(inputs.get('DEMO_4')!.split(',').map(Number), [8])
          .outputs[0]
      ).toEqual(1)
      expect(
        intcodeComputer(inputs.get('DEMO_4')!.split(',').map(Number), [7])
          .outputs[0]
      ).toEqual(0)
      expect(
        intcodeComputer(inputs.get('DEMO_5')!.split(',').map(Number), [8])
          .outputs[0]
      ).toEqual(0)
      expect(
        intcodeComputer(inputs.get('DEMO_5')!.split(',').map(Number), [7])
          .outputs[0]
      ).toEqual(1)
      expect(
        intcodeComputer(inputs.get('DEMO_6')!.split(',').map(Number), [0])
          .outputs[0]
      ).toEqual(0)
      expect(
        intcodeComputer(inputs.get('DEMO_6')!.split(',').map(Number), [7])
          .outputs[0]
      ).toEqual(1)
      expect(
        intcodeComputer(inputs.get('DEMO_7')!.split(',').map(Number), [0])
          .outputs[0]
      ).toEqual(0)
      expect(
        intcodeComputer(inputs.get('DEMO_7')!.split(',').map(Number), [7])
          .outputs[0]
      ).toEqual(1)
      expect(
        intcodeComputer(inputs.get('DEMO_8')!.split(',').map(Number), [7])
          .outputs[0]
      ).toEqual(999)
      expect(
        intcodeComputer(inputs.get('DEMO_8')!.split(',').map(Number), [8])
          .outputs[0]
      ).toEqual(1000)
      expect(
        intcodeComputer(inputs.get('DEMO_8')!.split(',').map(Number), [9])
          .outputs[0]
      ).toEqual(1001)
    })
  })
})
