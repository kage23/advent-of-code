import { calculateWrappingPaper, calculateRibbon } from './day02'

describe('2015 Day 02', () => {
  describe('Part 1', () => {
    describe('calculateWrappingPaper', () => {
      it('should calculate how much wrapping paper we need', () => {
        expect(calculateWrappingPaper('DEMO_1').answer1).toEqual(58)
        expect(calculateWrappingPaper('DEMO_2').answer1).toEqual(43)
      })
    })
  })
  describe('Part 2', () => {
    describe('calculateRibbon', () => {
      it('should calculate how much ribbon we need', () => {
        expect(calculateRibbon('DEMO_1').answer2).toEqual(34)
        expect(calculateRibbon('DEMO_2').answer2).toEqual(14)
      })
    })
  })
})
