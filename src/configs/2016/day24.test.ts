import inputs from '../../inputs/2016/day24'
import { findShortestPath, findShortestPathWithReturn } from './day24'

describe('2016 Day 24', () => {
  describe('Part 1', () => {
    it('should find the length of the shortest path', () => {
      expect(findShortestPath(inputs.get('DEMO')!).answer1).toEqual(14)
    })
  })

  describe('Part 2', () => {
    it('should find the length of the shortest path with return', () => {
      expect(findShortestPathWithReturn(inputs.get('DEMO')!).answer2).toEqual(
        20
      )
    })
  })
})
