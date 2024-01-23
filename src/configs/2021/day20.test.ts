import inputs from '../../inputs/2021/day20'
import { enhanceTwice, enhanceFiftyTimes } from './day20'

describe('2021 Day 20', () => {
  describe('Part 1', () => {
    it('should count pixels after two enhancements', () => {
      expect(enhanceTwice(inputs.get('DEMO')!, true).answer1).toEqual(35)
    })
  })
  describe('Part 2', () => {
    it('should count pixels after fifty enhancements', () => {
      expect(enhanceFiftyTimes(inputs.get('DEMO')!, true).answer2).toEqual(3351)
    })
  })
})
