import inputs from '../../inputs/2023/day12'
import { findMoreSpringArrangements, findSpringArrangements } from './day12'

describe('2023 Day 12', () => {
  describe('Part 1', () => {
    it('should sum the different spring arrangements', () => {
      expect(findSpringArrangements(inputs.get('DEMO_1')!).answer1).toEqual(21)
    })
  })
  describe('Part 2', () => {
    xit('should sum the different spring arrangements after unfolding', () => {
      expect(findMoreSpringArrangements(inputs.get('DEMO_1')!).answer2).toEqual(
        82000210
      )
    })
  })
})
