import inputs from '../../inputs/2021/day06'
import { simulateXDays } from './day06'

describe('2021 Day 06', () => {
  describe('Part 1', () => {
    it('should count fish after 80 days', () => {
      expect(simulateXDays(inputs.get('DEMO')!, 80).answer1).toEqual(5934)
    })
  })
  describe('Part 2', () => {
    it('should count fish after 256 days', () => {
      expect(simulateXDays(inputs.get('DEMO')!, 256).answer2).toEqual(26984457539)
    })
  })
})
