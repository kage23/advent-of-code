import inputs from '../../inputs/2019/day20'
import { findShortestPath, findShortestPathRecursive } from './day20'

describe('2019 Day 20', () => {
  describe('Part 1', () => {
    it('should find the shortest path', () => {
      expect(findShortestPath(inputs.get('DEMO_1_1')!).answer1).toEqual(23)
      expect(findShortestPath(inputs.get('DEMO_1_2')!).answer1).toEqual(58)
    })
  })
  describe('Part 2', () => {
    it('should find the shortest path in the recursive maze', () => {
      expect(findShortestPathRecursive(inputs.get('DEMO_2_1')!).answer2).toEqual(396)
    })
  })
})
