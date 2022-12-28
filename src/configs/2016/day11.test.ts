import { takeEverythingToFourthFloor, takeObjectsToFourthFloor } from './day11'

describe('2016 Day 11', () => {
  describe('Part 1', () => {
    describe('takeObjectsToFourthFloor', () => {
      it('should determine how many steps it will take to take everything to the fourth floor', () => {
        expect(takeObjectsToFourthFloor('DEMO_1').answer1).toEqual(11)
      })
    })
  })

  describe('Part 2', () => {
    describe('takeEverythingToFourthFloor', () => {
      it('should determine how many steps it will take to take everything to the fourth floor', () => {
        // I guess we'll test it with the real input because we don't have a demo answer.
        expect(takeEverythingToFourthFloor('REAL').answer2).toEqual(61)
      })
    })
  })
})
