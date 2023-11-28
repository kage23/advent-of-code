import { findShortestPath, findShortestPathWithReturn } from './day24'

describe('2016 Day 23', () => {
  describe('Part 1', () => {
    it('should find the length of the shortest path', () => {
      expect(findShortestPath('DEMO').answer1).toEqual(14)
    })
  })

  describe('Part 2', () => {
    it('should find the length of the shortest path with return', () => {
      expect(findShortestPathWithReturn('DEMO').answer2).toEqual(20)
    })
  })
})
