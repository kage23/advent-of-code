import { findPaths } from './day09'

describe('2015 Day 09', () => {
  describe('Parts 1 and 2', () => {
    describe('findPaths', () => {
      it('should find the shortest and longest paths', () => {
        const result = findPaths('DEMO_1')
        expect(result.answer1).toEqual(605)
        expect(result.answer2).toEqual(982)
      })
    })
  })
})
