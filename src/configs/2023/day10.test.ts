import inputs from '../../inputs/2023/day10'
import { findFarthestPoint, findInnerArea } from './day10'

describe('2023 Day 10', () => {
  describe('Part 1', () => {
    it('should find how many steps away is the farthest point from the start', () => {
      expect(findFarthestPoint(inputs.get('DEMO_1_1')!).answer1).toEqual(4)
      expect(findFarthestPoint(inputs.get('DEMO_1_2')!).answer1).toEqual(8)
    })
  })
  describe('Part 2', () => {
    it('should count how many inner squares there are', () => {
      expect(findInnerArea(inputs.get('DEMO_2_1')!).answer2).toEqual(4)
      expect(findInnerArea(inputs.get('DEMO_2_2')!).answer2).toEqual(8)
      expect(findInnerArea(inputs.get('DEMO_2_3')!).answer2).toEqual(10)
    })
  })
})
