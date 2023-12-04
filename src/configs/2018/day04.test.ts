import { strategy1, strategy2 } from './day04'

describe('2018 Day 04', () => {
  describe('Part 1', () => {
    it('should determine the sleepiest guard/minute', () => {
      expect(strategy1('DEMO')!.answer1).toEqual(240)
    })
  })
  describe('Part 2', () => {
    it('should determine the sleepiest guard/minute', () => {
      expect(strategy2('DEMO')!.answer2).toEqual(4455)
    })
  })
})
