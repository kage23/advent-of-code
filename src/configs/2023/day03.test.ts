import inputs from '../../inputs/2023/day03'
import { addPartNumbers, addGearRatios } from './day03'

describe('2023 Day 03', () => {
  describe('Part 1', () => {
    it('should add all of the part numbers', () => {
      expect(addPartNumbers(inputs.get('DEMO')!).answer1).toEqual(4361)
    })
  })
  describe('Part 2', () => {
    it('should find the sum of all of the gear ratios', () => {
      expect(addGearRatios(inputs.get('DEMO')!).answer2).toEqual(467835)
    })
  })
})
