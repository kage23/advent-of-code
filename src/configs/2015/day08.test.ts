import inputs from '../../inputs/2015/day08'
import { examineStringConversions, examineStringEncodings } from './day08'

describe('2015 Day 08', () => {
  describe('Part 1', () => {
    describe('examineStringConversions', () => {
      it('should determine the difference in code vs memory for strings or whatever', () => {
        expect(examineStringConversions(inputs.get('DEMO_1')!).answer1).toEqual(
          12
        )
      })
    })
  })
  describe('Part 2', () => {
    describe('examineStringEncodings', () => {
      it('should determine the difference in encoded string vs string literals', () => {
        expect(examineStringEncodings(inputs.get('DEMO_1')!).answer2).toEqual(
          19
        )
      })
    })
  })
})
