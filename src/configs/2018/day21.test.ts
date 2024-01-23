import { findFirstExitCode, findLastExitCode } from './day21'

// There's no sample data so we don't run it
xdescribe('2018 Day 21', () => {
  describe('Part 1', () => {
    it('should find the first exit code', () => {
      expect(findFirstExitCode('')!.answer1).toEqual(7224964)
    })
  })
  describe('Part 2', () => {
    // This takes about two minutes to run
    xit('should find the last exit code', () => {
      expect(findLastExitCode('')!.answer2).toEqual(13813247)
    })
  })
})
