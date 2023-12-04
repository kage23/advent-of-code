import { runProgram } from './day25'

describe('2017 Day 25', () => {
  describe('Part 1', () => {
    it('should find the checksum of the program', () => {
      expect(runProgram('DEMO')!.answer1).toEqual(3)
    })
  })
})
