import inputs from '../../inputs/2018/day23'
import { countInRangeNanobots, findBestLocation } from './day23'

describe('2018 Day 23', () => {
  describe('Part 1', () => {
    it('should count how many nanobots are in range', () => {
      expect(countInRangeNanobots(inputs.get('DEMO_1')!).answer1).toEqual(7)
    })
  })
  describe('Part 2', () => {
    it('should find the distance to the best location', () => {
      expect(findBestLocation(inputs.get('DEMO_2')!).answer2).toEqual(36)
    })
  })
})
