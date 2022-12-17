import { lookForHash, lookForBetterHash } from './day04'

describe('2015 Day 04', () => {
  describe('Part 1', () => {
    describe('lookForHash', () => {
      it('should find a number that produces a good hash', () => {
        expect(lookForHash('DEMO_1').answer1).toEqual(609043)
        expect(lookForHash('DEMO_2').answer1).toEqual(1048970)
      })
    })
  })
  describe('Part 2', () => {
    describe('lookForBetterHash', () => {
      it('should find a number that produces a better hash', () => {
        // No samples given here, so we have to use the real thing
        expect(lookForBetterHash('REAL').answer2).toEqual(1038736)
      })
    })
  })
})
