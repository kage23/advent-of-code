import inputs from '../../inputs/2021/day18'
import { sumNumbers, findLargestMagnitude } from './day18'

describe('2021 Day 18', () => {
  describe('Part 1', () => {
    it('should sum the numbers', () => {
      expect(sumNumbers(inputs.get('DEMO_6')!).answer1).toEqual(143)
      expect(sumNumbers(inputs.get('DEMO_7')!).answer1).toEqual(1384)
      expect(sumNumbers(inputs.get('DEMO_8')!).answer1).toEqual(445)
      expect(sumNumbers(inputs.get('DEMO_9')!).answer1).toEqual(791)
      expect(sumNumbers(inputs.get('DEMO_10')!).answer1).toEqual(1137)
      expect(sumNumbers(inputs.get('DEMO_11')!).answer1).toEqual(3488)
      expect(sumNumbers(inputs.get('DEMO_12')!).answer1).toEqual(4140)
    })
  })
  describe('Part 2', () => {
    it('should find the largest magnitude', () => {
      expect(findLargestMagnitude(inputs.get('DEMO_12')!).answer2).toEqual(3993)
    })
  })
})
