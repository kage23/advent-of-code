import { determineTheActualSue, determineTheSue } from './day16'

describe('2015 Day 16', () => {
  describe('Part 1', () => {
    describe('determineTheSue', () => {
      it('should determine which Sue got you the gift', () => {
        expect(determineTheSue('REAL')?.answer1).toEqual(373)
      })
    })
  })

  describe('Part 2', () => {
    describe('determineTheActualSue', () => {
      it('should determine which Sue actually got you the gift', () => {
        expect(determineTheActualSue('REAL')?.answer2).toEqual(260)
      })
    })
  })
})
