import inputs from '../../inputs/2020/day10'
import { findJoltageDifferences, findPossibleConfigurations } from './day10'

describe('2020 Day 10', () => {
  describe('Part 1', () => {
    it('should find the joltage differences', () => {
      expect(findJoltageDifferences(inputs.get('DEMO_1')!).answer1).toEqual(35)
      expect(findJoltageDifferences(inputs.get('DEMO_2')!).answer1).toEqual(220)
    })
  })
  describe('Part 2', () => {
    it('should find the possible configurations', () => {
      expect(findPossibleConfigurations(inputs.get('DEMO_1')!).answer2).toEqual(
        8
      )
      expect(findPossibleConfigurations(inputs.get('DEMO_2')!).answer2).toEqual(
        19208
      )
    })
  })
})
