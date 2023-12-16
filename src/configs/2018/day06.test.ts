import inputs from '../../inputs/2018/day06'
import { findLargestNonInfinite, findAreaClosestToMost } from './day06'

describe('2018 Day 06', () => {
  describe('Part 1', () => {
    it('should determine the size of the largest non-infinite area', () => {
      expect(findLargestNonInfinite(inputs.get('DEMO')!).answer1).toEqual(17)
    })
  })
  describe('Part 2', () => {
    it('should determine the region with closest locations', () => {
      expect(findAreaClosestToMost(inputs.get('DEMO')!, 32)!.answer2).toEqual(
        16
      )
    })
  })
})
