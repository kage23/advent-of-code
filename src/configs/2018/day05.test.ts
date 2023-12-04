import { part1, part2 } from './day05'

describe('2018 Day 04', () => {
  describe('Part 1', () => {
    it('should determine the length of the polymer', () => {
      expect(part1('DEMO_1')!.answer1).toEqual(0)
      expect(part1('DEMO_2')!.answer1).toEqual(0)
      expect(part1('DEMO_3')!.answer1).toEqual(4)
      expect(part1('DEMO_4')!.answer1).toEqual(6)
      expect(part1('DEMO_5')!.answer1).toEqual(10)
    })
  })
  describe('Part 2', () => {
    it('should determine the length of the filtered polymer', () => {
      expect(part2('DEMO_5')!.answer2).toEqual(4)
    })
  })
})
