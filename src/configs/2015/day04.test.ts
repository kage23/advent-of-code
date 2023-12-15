import { lookForHash, lookForBetterHash } from './day04'
import inputs from '../../inputs/2015/day04'

describe('2015 Day 04', () => {
  describe('Part 1', () => {
    describe('lookForHash', () => {
      it('should find a number that produces a good hash', () => {
        expect(lookForHash(inputs.get('DEMO_1')!).answer1).toEqual(609043)
        expect(lookForHash(inputs.get('DEMO_2')!).answer1).toEqual(1048970)
      })
    })
  })
  // No samples given here, so we don't have a test!
  xdescribe('Part 2', () => {
    describe('lookForBetterHash', () => {
      it('should find a number that produces a better hash', () => {
        expect(lookForBetterHash(inputs.get('')!).answer2).toEqual(1038736)
      })
    })
  })
})
