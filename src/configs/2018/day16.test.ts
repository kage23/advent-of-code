import { threeOrMoreTest, runTheInputCode } from './day16'

describe('2018 Day 16', () => {
  describe('Part 1', () => {
    it('should count how many samples behave like three or more opcodes', () => {
      expect(threeOrMoreTest('DEMO')!.answer1).toEqual(1)
    })
  })
  describe('Part 2', () => {
    it('should run the code and find the register 0 value', () => {
      // There's not a sample for part 2, so I guess we test on the real input
      expect(runTheInputCode('REAL')!.answer2).toEqual(557)
    })
  })
})
