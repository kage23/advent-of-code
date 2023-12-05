import { findLargestNonInfinite, findAreaClosestToMost } from './day06'

describe('2018 Day 06', () => {
  describe('Part 1', () => {
    it('should determine the size of the largest non-infinite area', () => {
      expect(findLargestNonInfinite('DEMO')!.answer1).toEqual(17)
    })
  })
  describe('Part 2', () => {
    it('should determine the region with closest locations', () => {
      expect(findAreaClosestToMost('DEMO')!.answer2).toEqual(16)
    })
  })
})
