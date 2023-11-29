import { runProcess } from './day08'

describe('2017 Day 08', () => {
  describe('Part 1', () => {
    it('should find the current largest value', () => {
      expect(runProcess('DEMO')!.answer1).toEqual(1)
    })
  })
  describe('Part 2', () => {
    it('should find the largest ever value', () => {
      expect(runProcess('DEMO')!.answer2).toEqual(10)
    })
  })
})
