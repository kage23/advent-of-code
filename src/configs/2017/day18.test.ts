import inputs from '../../inputs/2017/day18'
import { findFrequencyPart1, runBothPrograms } from './day18'

describe('2017 Day 18', () => {
  describe('Part 1', () => {
    it('should find the first recovered non-zero frequency', () => {
      expect(findFrequencyPart1(inputs.get('DEMO_1')!).answer1).toEqual(4)
    })
  })
  describe('Part 2', () => {
    it('should find how many times Program 1 sent a value', () => {
      expect(runBothPrograms(inputs.get('DEMO_2')!).answer2).toEqual(3)
    })
  })
})
