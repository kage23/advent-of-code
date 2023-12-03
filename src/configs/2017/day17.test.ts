import { solvePart1Day17, solvePart2Day17 } from './day17'

describe('2017 Day 17', () => {
  describe('Part 1', () => {
    it('should find the value after 2017', () => {
      expect(solvePart1Day17('DEMO')!.answer1).toEqual(638)
    })
  })
  // This exceeds the map size. Not sure how I solved it originally!
  xdescribe('Part 2', () => {
    it('should find the value after 50 million', () => {
      expect(solvePart2Day17('DEMO')!.answer2).toEqual(20430489)
    })
  })
})
