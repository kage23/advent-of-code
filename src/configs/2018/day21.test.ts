import { findFirstExitCode, findLastExitCode } from './day21'

describe('2018 Day 21', () => {
  describe('Part 1', () => {
    it('should find the first exit code', () => {
      expect(findFirstExitCode('REAL')!.answer1).toEqual(7224964)
    })
  })
  describe('Part 2', () => {
    // This takes about two minutes to run
    xit('should find the last exit code', () => {
      expect(findLastExitCode('REAL')!.answer2).toEqual(13813247)
    })
  })
})
