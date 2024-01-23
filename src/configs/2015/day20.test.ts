import { presentsAtHouseNumber } from './day20'

describe('2015 Day 20', () => {
  describe('Part 1', () => {
    describe('presentsAtHouseNumber', () => {
      it('should determine how many presents a given house receives', () => {
        expect(presentsAtHouseNumber(1, 10)).toEqual(10)
        expect(presentsAtHouseNumber(2, 10)).toEqual(30)
        expect(presentsAtHouseNumber(3, 10)).toEqual(40)
        expect(presentsAtHouseNumber(4, 10)).toEqual(70)
        expect(presentsAtHouseNumber(5, 10)).toEqual(60)
        expect(presentsAtHouseNumber(6, 10)).toEqual(120)
        expect(presentsAtHouseNumber(7, 10)).toEqual(80)
        expect(presentsAtHouseNumber(8, 10)).toEqual(150)
        expect(presentsAtHouseNumber(9, 10)).toEqual(130)
      })
    })
  })
})
