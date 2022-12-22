import { sortThePackages, sortThePackagesWithTheTrunk } from './day24'

describe('2015 Day 24', () => {
  describe('Part 1', () => {
    it('should determine the quantum entanglement of the ideal package configuration', () => {
      expect(sortThePackages('DEMO_1').answer1).toEqual(99)
    })
  })

  describe('Part 2', () => {
    it('should determine the quantum entanglement of the ideal package configuration when using the trunk', () => {
      expect(sortThePackagesWithTheTrunk('DEMO_1').answer2).toEqual(44)
    })
  })
})
