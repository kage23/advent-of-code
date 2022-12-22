import { findEndOfPath, findFirstRepeatLocation } from './day01'

describe('2016 Day 01', () => {
  describe('Part 1', () => {
    describe('findEndOfPath', () => {
      it('should determine how far away the Easter Bunny HQ is', () => {
        expect(findEndOfPath('DEMO_1_1').answer1).toEqual(5)
        expect(findEndOfPath('DEMO_1_2').answer1).toEqual(2)
        expect(findEndOfPath('DEMO_1_3').answer1).toEqual(12)
      })
    })
  })
  describe('Part 2', () => {
    describe('findFirstRepeatLocation', () => {
      it('should find the distance to the first location I visited twice', () => {
        expect(findFirstRepeatLocation('DEMO_2_1').answer2).toEqual(4)
      })
    })
  })
})
