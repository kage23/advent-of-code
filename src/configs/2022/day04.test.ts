import inputs from '../../inputs/2022/day04'
import { findRedundantPairs, findOverlappingPairs } from './day04'

describe('2022 Day 04', () => {
  describe('Part 1', () => {
    it('should find redundant pairs', () => {
      expect(findRedundantPairs(inputs.get('DEMO')!).answer1).toEqual(2)
    })
  })
  describe('Part 2', () => {
    it('should find overlapping pairs', () => {
      expect(findOverlappingPairs(inputs.get('DEMO')!).answer2).toEqual(4)
    })
  })
})
