import inputs from '../../inputs/2018/day16'
import { threeOrMoreTest, runTheInputCode } from './day16'

describe('2018 Day 16', () => {
  describe('Part 1', () => {
    it('should count how many samples behave like three or more opcodes', () => {
      expect(threeOrMoreTest(inputs.get('DEMO')!).answer1).toEqual(1)
    })
  })
  // There's not a sample for part 2, so we don't run it
  xdescribe('Part 2', () => {
    it('should run the code and find the register 0 value', () => {
      expect(runTheInputCode('').answer2).toEqual(557)
    })
  })
})
