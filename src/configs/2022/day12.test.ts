import inputs from '../../inputs/2022/day12'
import { findAPath, findShortestPath } from './day12'

describe('2022 Day 12', () => {
  describe('Part 1', () => {
    it('should find a path', () => {
      expect(findAPath(inputs.get('DEMO')!).answer1).toEqual(31)
    })
  })
  describe('Part 2', () => {
    it('should find the shortest path from any start', () => {
      expect(findShortestPath(inputs.get('DEMO')!).answer2).toEqual(29)
    })
  })
})
