import inputs from '../../inputs/2015/day12'
import { sumInput, sumInputNoRed } from './day12'

describe('2015 Day 12', () => {
  describe('Part 1', () => {
    describe('sumInput', () => {
      it('should sum the input', () => {
        expect(sumInput(inputs.get('DEMO_1_1')!).answer1).toEqual(6)
        expect(sumInput(inputs.get('DEMO_1_2')!).answer1).toEqual(6)
        expect(sumInput(inputs.get('DEMO_1_3')!).answer1).toEqual(3)
        expect(sumInput(inputs.get('DEMO_1_4')!).answer1).toEqual(3)
        expect(sumInput(inputs.get('DEMO_1_5')!).answer1).toEqual(0)
        expect(sumInput(inputs.get('DEMO_1_6')!).answer1).toEqual(0)
        expect(sumInput(inputs.get('DEMO_1_7')!).answer1).toEqual(0)
        expect(sumInput(inputs.get('DEMO_1_8')!).answer1).toEqual(0)
      })
    })
  })

  describe('Part 2', () => {
    describe('sumInputNoRed', () => {
      it('should sum the input without red', () => {
        expect(sumInputNoRed(inputs.get('DEMO_1_1')!).answer2).toEqual(6)
        expect(sumInputNoRed(inputs.get('DEMO_2_1')!).answer2).toEqual(4)
        expect(sumInputNoRed(inputs.get('DEMO_2_2')!).answer2).toEqual(0)
        expect(sumInputNoRed(inputs.get('DEMO_2_3')!).answer2).toEqual(6)
      })
    })
  })
})
