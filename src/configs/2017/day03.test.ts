import inputs from '../../inputs/2017/day03'
import { calculateDistance, findLargeValue } from './day03'

describe('2017 Day 03', () => {
  describe('Part 1', () => {
    it('should figure how far the data is carried', () => {
      expect(calculateDistance(inputs.get('DEMO_0')!).answer1).toEqual(0)
      expect(calculateDistance(inputs.get('DEMO_1')!).answer1).toEqual(3)
      expect(calculateDistance(inputs.get('DEMO_2')!).answer1).toEqual(2)
      expect(calculateDistance(inputs.get('DEMO_3')!).answer1).toEqual(31)
    })
  })
  describe('Part 2', () => {
    it('find the first value written larger than the input', () => {
      expect(findLargeValue(inputs.get('DEMO_0')!).answer2).toEqual(2)
      expect(findLargeValue(inputs.get('DEMO_1')!).answer2).toEqual(23)
      expect(findLargeValue(inputs.get('DEMO_2')!).answer2).toEqual(25)
      expect(findLargeValue(inputs.get('DEMO_3')!).answer2).toEqual(1968)
    })
  })
})
