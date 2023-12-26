import inputs from '../../inputs/2023/day24'
import { lookForCrossingPaths, throwTheRock, throwTheRockDemo } from './day24'

describe('2023 Day 24', () => {
  describe('Part 1', () => {
    it('should count how many paths cross in the xy plane', () => {
      expect(
        lookForCrossingPaths(inputs.get('DEMO')!, [7, 27]).answer1
      ).toEqual(2)
    })
  })
  describe('Part 2', () => {
    it('should find the starting coords for the rock', () => {
      expect(throwTheRockDemo(inputs.get('DEMO')!).answer2).toEqual(47)
      expect(throwTheRock(inputs.get('DEMO')!)?.answer2).toEqual(47)
    })
  })
})
