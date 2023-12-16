import inputs from '../../inputs/2018/day18'
import { advanceTenMinutes, skipToMinuteOneBillion } from './day18'

describe('2018 Day 18', () => {
  describe('Part 1', () => {
    it('should get the resource value after ten minutes', () => {
      expect(advanceTenMinutes(inputs.get('DEMO')!).answer1).toEqual(1147)
    })
  })
  describe('Part 2', () => {
    it('should get the resource value after one billion minutes', () => {
      expect(skipToMinuteOneBillion(inputs.get('DEMO')!).answer2).toEqual(0)
    })
  })
})
