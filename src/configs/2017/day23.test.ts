import { runProgram, solvePart2 } from './day23'

describe('2017 Day 23', () => {
  describe('Part 1', () => {
    it('should count how many times the mul command runs', () => {
      expect(runProgram('REAL')!.answer1).toEqual(3969)
    })
  })
  describe('Part 2', () => {
    it('should do nothing :sweat_smile:', () => {
      expect(solvePart2()!.answer2).toEqual('')
    })
  })
})
