import inputs from '../../inputs/2016/day02'
import {
  findBathroomCodePhonepadNumbers,
  findBathroomCodeRealButtons,
} from './day02'

describe('2016 Day 02', () => {
  describe('Part 1', () => {
    describe('findBathroomCodePhonepadNumbers', () => {
      it('should determine the bathroom code on phonepad numbers', () => {
        expect(findBathroomCodePhonepadNumbers(inputs.get('DEMO_1')!).answer1).toEqual(
          '1985'
        )
      })
    })
  })
  describe('Part 2', () => {
    describe('findBathroomCodeRealButtons', () => {
      it('should determine the bathroom code on the real buttons', () => {
        expect(findBathroomCodeRealButtons(inputs.get('DEMO_1')!).answer2).toEqual('5DB3')
      })
    })
  })
})
