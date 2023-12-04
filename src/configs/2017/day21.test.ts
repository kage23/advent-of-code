import { iterateFiveTimes, iterateEighteenTimes } from './day21'

describe('2017 Day 21', () => {
  describe('Part 1', () => {
    it('should count the pixels after five iterations', () => {
      expect(iterateFiveTimes('DEMO')!.answer1).toEqual(23)
    })
  })
  describe('Part 2', () => {
    it('should count the pixels after eighteen iterations', () => {
      expect(iterateEighteenTimes('DEMO')!.answer2).toEqual(23)
    })
  })
})
