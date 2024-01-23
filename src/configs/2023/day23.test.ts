import inputs from '../../inputs/2023/day23'
import { findDryLongHike, findLongHike } from './day23'

describe('2023 Day 23', () => {
  describe('Part 1', () => {
    it('should find the longest hike', () => {
      expect(findLongHike(inputs.get('DEMO')!).answer1).toEqual(94)
    })
  })
  describe('Part 2', () => {
    it('should find the longest dry hike', () => {
      expect(findDryLongHike(inputs.get('DEMO')!).answer2).toEqual(154)
    })
  })
})
