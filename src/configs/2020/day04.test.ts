import inputs from '../../inputs/2020/day04'
import { properlyValidatePassports, validatePassports } from './day04'

describe('2020 Day 04', () => {
  describe('Part 1', () => {
    it('should validate the passports', () => {
      expect(validatePassports(inputs.get('DEMO_1')!)?.answer1).toEqual(2)
    })
  })
  describe('Part 2', () => {
    it('should properly validate the passports', () => {
      expect(
        properlyValidatePassports(inputs.get('DEMO_2_1')!)?.answer2
      ).toEqual(0)
      expect(
        properlyValidatePassports(inputs.get('DEMO_2_2')!)?.answer2
      ).toEqual(4)
    })
  })
})
