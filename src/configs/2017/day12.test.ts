import { findConnectedToZero, countGroups } from './day12'

describe('2017 Day 12', () => {
  describe('Part 1', () => {
    it('should find how many are in the group with program ID 0', () => {
      expect(findConnectedToZero('DEMO')!.answer1).toEqual(6)
    })
  })
  describe('Part 2', () => {
    it('should count the total number of groups', () => {
      expect(countGroups('DEMO')!.answer2).toEqual(2)
    })
  })
})
