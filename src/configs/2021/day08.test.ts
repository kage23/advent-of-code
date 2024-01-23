import inputs from '../../inputs/2021/day08'
import { countSomeNumbers, addThemAllUp } from './day08'

describe('2021 Day 08', () => {
  describe('Part 1', () => {
    it('should count the 1s, 4s, 7s, and 8s', () => {
      expect(countSomeNumbers(inputs.get('DEMO_1')!).answer1).toEqual(0)
      expect(countSomeNumbers(inputs.get('DEMO_2')!).answer1).toEqual(26)
    })
  })
  describe('Part 2', () => {
    it('should add up all the numbers', () => {
      expect(addThemAllUp(inputs.get('DEMO_1')!).answer2).toEqual(5353)
      expect(addThemAllUp(inputs.get('DEMO_2')!).answer2).toEqual(61229)
    })
  })
})
