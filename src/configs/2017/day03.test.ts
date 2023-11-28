import { calculateDistance, findLargeValue } from './day03'

describe('2017 Day 03', () => {
  describe('Part 1', () => {
    it('should figure how far the data is carried', () => {
      expect(calculateDistance('DEMO_0').answer1).toEqual(0)
      expect(calculateDistance('DEMO_1').answer1).toEqual(3)
      expect(calculateDistance('DEMO_2').answer1).toEqual(2)
      expect(calculateDistance('DEMO_3').answer1).toEqual(31)
    })
  })
  describe('Part 2', () => {
    it('find the first value written larger than the input', () => {
      expect(findLargeValue('DEMO_0').answer2).toEqual(2)
      expect(findLargeValue('DEMO_1').answer2).toEqual(23)
      expect(findLargeValue('DEMO_2').answer2).toEqual(25)
      expect(findLargeValue('DEMO_3').answer2).toEqual(1968)
    })
  })
})
