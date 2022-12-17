import inputs from '../../inputs/2015/day02'
import { getWrappingPaperSize, getRibbon } from './day02'

describe('2015 Day 02', () => {
  describe('Part 1', () => {
    describe('getWrappingPaperSize', () => {
      it('should calculate how much wrapping paper we need', () => {
        expect(getWrappingPaperSize(inputs.get('DEMO_1')!)).toEqual(58)
        expect(getWrappingPaperSize(inputs.get('DEMO_2')!)).toEqual(43)
      })
    })
  })
  describe('Part 2', () => {
    describe('getRibbon', () => {
      it('should calculate how much ribbon we need', () => {
        expect(getRibbon(inputs.get('DEMO_1')!)).toEqual(34)
        expect(getRibbon(inputs.get('DEMO_2')!)).toEqual(14)
      })
    })
  })
})
