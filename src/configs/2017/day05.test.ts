import inputs from '../../inputs/2017/day05'
import { stepToEnd1, stepToEnd2 } from './day05'

describe('2017 Day 05', () => {
  describe('Part 1', () => {
    it('should count how many steps to the end', () => {
      expect(stepToEnd1(inputs.get('DEMO')!).answer1).toEqual(5)
    })
  })
  describe('Part 2', () => {
    it('should count how many steps to the end', () => {
      expect(stepToEnd2(inputs.get('DEMO')!).answer2).toEqual(10)
    })
  })
})
