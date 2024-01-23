import { calculateWrappingPaper, calculateRibbon } from './day02'
import inputs from '../../inputs/2015/day02'

describe('2015 Day 02', () => {
  describe('Part 1', () => {
    describe('getWrappingPaperSize', () => {
      it('should calculate how much wrapping paper we need', () => {
        expect(calculateWrappingPaper(inputs.get('DEMO_1')!).answer1).toEqual(
          58
        )
        expect(calculateWrappingPaper(inputs.get('DEMO_2')!).answer1).toEqual(
          43
        )
      })
    })
  })
  describe('Part 2', () => {
    describe('getRibbon', () => {
      it('should calculate how much ribbon we need', () => {
        expect(calculateRibbon(inputs.get('DEMO_1')!).answer2).toEqual(34)
        expect(calculateRibbon(inputs.get('DEMO_2')!).answer2).toEqual(14)
      })
    })
  })
})
