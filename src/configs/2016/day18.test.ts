import { countSafeTiles, countSafeTilesInHugeField } from './day18'

describe('2016 Day 18', () => {
  describe('Part 1', () => {
    describe('countSafeTiles', () => {
      it('should determine how many safe tiles are in the smaller grid', () => {
        expect(countSafeTiles('DEMO_1').answer1).toEqual(6)
        expect(countSafeTiles('DEMO_2').answer1).toEqual(38)
      })
    })
  })

  describe('Part 2', () => {
    describe('countSafeTilesInHugeField', () => {
      it('should determine how many safe tiles are in the smaller grid', () => {
        expect(countSafeTilesInHugeField('DEMO_1').answer2).toEqual(600001)
        expect(countSafeTilesInHugeField('DEMO_2').answer2).toEqual(1935478)
      })
    })
  })
})
