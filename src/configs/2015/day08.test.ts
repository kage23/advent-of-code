import { examineStringConversions, examineStringEncodings } from './day08'

describe('2015 Day 08', () => {
  describe('Part 1', () => {
    it('should determine the difference in code vs memory for strings or whatever', () => {
      expect(examineStringConversions('DEMO_1').answer1).toEqual(12)
    })
  })
  describe('Part 2', () => {
    it('should determine the difference in encoded string vs string literals', () => {
      expect(examineStringEncodings('DEMO_1').answer2).toEqual(19)
    })
  })
})