import inputs from '../../inputs/2016/day22'
import { accessData, findViablePairs } from './day22'

describe('2016 Day 22', () => {
  describe('Part 1', () => {
    describe('findViablePairs', () => {
      it('should count how many viable pairs there are', () => {
        expect(findViablePairs(inputs.get('DEMO_1')!, true).answer1).toEqual(7)
      })
    })
  })

  describe('Part 2', () => {
    describe('accessData', () => {
      it('should determine how many steps it will take to access the data', () => {
        expect(accessData(inputs.get('DEMO_1')!, true).answer2).toEqual(7)
      })
    })
  })
})
