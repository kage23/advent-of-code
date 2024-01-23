import inputs from '../../inputs/2023/day12'
import {
  findSpringArrangements,
  findSpringArrangementsBetter,
  findMoreSpringArrangements,
} from './day12'

describe('2023 Day 12', () => {
  describe('Part 1', () => {
    it('should count how many different spring arrangements there are', () => {
      expect(findSpringArrangements(inputs.get('DEMO_1')!).answer1).toEqual(21)
      expect(
        findSpringArrangementsBetter(inputs.get('DEMO_1')!).answer1
      ).toEqual(21)
    })
  })
  describe('Part 2', () => {
    it('should count how many different spring arrangements there are after unfolding', () => {
      expect(findMoreSpringArrangements(inputs.get('DEMO_1')!).answer2).toEqual(
        525152
      )
    })
  })
})
