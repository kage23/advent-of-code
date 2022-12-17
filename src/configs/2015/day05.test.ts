import inputs from '../../inputs/2015/day05'
import { isStringNice, isStringNice__v2 } from './day05'

describe('2015 Day 04', () => {
  describe('Part 1', () => {
    describe('isStringNice', () => {
      it('should determine if a string is nice', () => {
        expect(isStringNice(inputs.get('DEMO_1_1')!)).toBeTruthy()
        expect(isStringNice(inputs.get('DEMO_1_2')!)).toBeTruthy()
        expect(isStringNice(inputs.get('DEMO_1_3')!)).toBeFalsy()
        expect(isStringNice(inputs.get('DEMO_1_4')!)).toBeFalsy()
        expect(isStringNice(inputs.get('DEMO_1_5')!)).toBeFalsy()
      })
    })
  })
  describe('Part 2', () => {
    describe('isStringNice__v2', () => {
      it('should determine if a string is nice', () => {
        expect(isStringNice__v2(inputs.get('DEMO_2_1')!)).toBeTruthy()
        expect(isStringNice__v2(inputs.get('DEMO_2_2')!)).toBeTruthy()
        expect(isStringNice__v2(inputs.get('DEMO_2_3')!)).toBeFalsy()
        expect(isStringNice__v2(inputs.get('DEMO_2_4')!)).toBeFalsy()
      })
    })
  })
})
