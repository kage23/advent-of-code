import inputs from '../../inputs/2015/day05'
import { areStringsNice, areStringsNice__v2 } from './day05'

describe('2015 Day 05', () => {
  describe('Part 1', () => {
    it('should determine if a string is nice', () => {
      expect(areStringsNice(inputs.get('DEMO_1_1')!).answer1).toEqual(1)
      expect(areStringsNice(inputs.get('DEMO_1_2')!).answer1).toEqual(1)
      expect(areStringsNice(inputs.get('DEMO_1_3')!).answer1).toEqual(0)
      expect(areStringsNice(inputs.get('DEMO_1_4')!).answer1).toEqual(0)
      expect(areStringsNice(inputs.get('DEMO_1_5')!).answer1).toEqual(0)
    })
  })
  describe('Part 2', () => {
    it('should determine if a string is nice', () => {
      expect(areStringsNice__v2(inputs.get('DEMO_2_1')!).answer2).toEqual(1)
      expect(areStringsNice__v2(inputs.get('DEMO_2_2')!).answer2).toEqual(1)
      expect(areStringsNice__v2(inputs.get('DEMO_2_3')!).answer2).toEqual(0)
      expect(areStringsNice__v2(inputs.get('DEMO_2_4')!).answer2).toEqual(0)
    })
  })
})
