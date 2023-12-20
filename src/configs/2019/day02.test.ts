import inputs from '../../inputs/2019/day02'
import intcodeComputer from './Intcode'

describe('2019 Day 01', () => {
  describe('Part 1', () => {
    it('intcode computer should run properly', () => {
      expect(
        intcodeComputer(inputs.get('DEMO_1')!.split(',').map(Number)).program[0]
      ).toEqual(3500)
      expect(
        intcodeComputer(inputs.get('DEMO_2')!.split(',').map(Number)).program[0]
      ).toEqual(2)
      expect(
        intcodeComputer(inputs.get('DEMO_3')!.split(',').map(Number)).program[0]
      ).toEqual(2)
      expect(
        intcodeComputer(inputs.get('DEMO_4')!.split(',').map(Number)).program[0]
      ).toEqual(2)
      expect(
        intcodeComputer(inputs.get('DEMO_5')!.split(',').map(Number)).program[0]
      ).toEqual(30)
    })
  })
  // No demo, so no tests
  xdescribe('Part 2', () => {})
})
