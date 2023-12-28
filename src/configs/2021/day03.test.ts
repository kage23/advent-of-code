import inputs from '../../inputs/2021/day03'
import { findPowerConsumption, findLifeSupportRating } from './day03'

describe('2021 Day 02', () => {
  describe('Part 1', () => {
    it('should find the power consumption of the submarine', () => {
      expect(findPowerConsumption(inputs.get('DEMO')!).answer1).toEqual(198)
    })
  })
  describe('Part 2', () => {
    it('should find the life support rating of the submarine', () => {
      expect(findLifeSupportRating(inputs.get('DEMO')!).answer2).toEqual(230)
    })
  })
})
