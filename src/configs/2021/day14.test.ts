import inputs from '../../inputs/2021/day14'
import { polymerizeTenTimes, polymerizeFortyTimes } from './day14'

describe('2021 Day 14', () => {
  describe('Part 1', () => {
    it('should polymerize ten times', () => {
      expect(polymerizeTenTimes(inputs.get('DEMO')!).answer1).toEqual(1588)
    })
  })
  describe('Part 2', () => {
    it('should polymerize forty times', () => {
      expect(polymerizeFortyTimes(inputs.get('DEMO')!).answer2).toEqual(2188189693529)
    })
  })
})
