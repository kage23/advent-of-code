import inputs from '../../inputs/2017/day12'
import { findConnectedToZero, countGroups } from './day12'

describe('2017 Day 12', () => {
  describe('Part 1', () => {
    it('should find how many are in the group with program ID 0', () => {
      expect(findConnectedToZero(inputs.get('DEMO')!).answer1).toEqual(6)
    })
  })
  describe('Part 2', () => {
    it('should count the total number of groups', () => {
      expect(countGroups(inputs.get('DEMO')!).answer2).toEqual(2)
    })
  })
})
