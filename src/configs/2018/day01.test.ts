import inputs from '../../inputs/2018/day01'
import { findFrequency, findRepeatedFrequency } from './day01'

describe('2018 Day 01', () => {
  describe('Part 1', () => {
    it('should find the resulting frequency', () => {
      expect(findFrequency(inputs.get('DEMO_1')!).answer1).toEqual(3)
    })
  })
  describe('Part 2', () => {
    it('should find the first repeated frequency', () => {
      expect(findRepeatedFrequency(inputs.get('DEMO_1')!).answer2).toEqual(2)
      expect(findRepeatedFrequency(inputs.get('DEMO_2')!).answer2).toEqual(0)
      expect(findRepeatedFrequency(inputs.get('DEMO_3')!).answer2).toEqual(10)
      expect(findRepeatedFrequency(inputs.get('DEMO_4')!).answer2).toEqual(5)
      expect(findRepeatedFrequency(inputs.get('DEMO_5')!).answer2).toEqual(14)
    })
  })
})
