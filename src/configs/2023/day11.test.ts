import inputs from '../../inputs/2023/day11'
import { findGalaxyPaths, findExpandedGalaxyPaths } from './day11'

describe('2023 Day 11', () => {
  describe('Part 1', () => {
    it('should find the distances between all the galaxies after a small expansion', () => {
      expect(findGalaxyPaths(inputs.get('DEMO_1')!).answer1).toEqual(374)
    })
  })
  describe('Part 2', () => {
    it('should find the distances between all the galaxies after a big expansion', () => {
      expect(findExpandedGalaxyPaths(inputs.get('DEMO_1')!, 2).answer2).toEqual(
        374
      )
      expect(
        findExpandedGalaxyPaths(inputs.get('DEMO_1')!, 10).answer2
      ).toEqual(1030)
      expect(
        findExpandedGalaxyPaths(inputs.get('DEMO_1')!, 100).answer2
      ).toEqual(8410)
      expect(findExpandedGalaxyPaths(inputs.get('DEMO_1')!).answer2).toEqual(
        82000210
      )
    })
  })
})
