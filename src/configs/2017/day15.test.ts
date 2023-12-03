import { solvePart1, solvePart2 } from './day15'

xdescribe('2017 Day 15', () => {
  describe('Part 1', () => {
    it('should count pairs that meet the criteria', () => {
      expect(solvePart1('DEMO')!.answer1).toEqual(588)
    })
  })
  describe('Part 2', () => {
    it('should count new pairs that meet the criteria', () => {
      expect(solvePart2('DEMO')!.answer2).toEqual(309)
    })
  })
})
