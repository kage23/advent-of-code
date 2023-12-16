import inputs from '../../inputs/2018/day03'
import { determineFabricOverlap, determineClaimOverlap } from './day03'

describe('2018 Day 03', () => {
  describe('Part 1', () => {
    it('should determine overlapping fabric', () => {
      expect(determineFabricOverlap(inputs.get('DEMO')!).answer1).toEqual(4)
    })
  })
  describe('Part 2', () => {
    it('determine the non-overlapping claim', () => {
      expect(determineClaimOverlap(inputs.get('DEMO')!).answer2).toEqual(3)
    })
  })
})
