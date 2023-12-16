import inputs from '../../inputs/2016/day18'
import { countSafeTiles, countSafeTilesInHugeField } from './day18'

describe('2016 Day 18', () => {
  describe('Part 1', () => {
    describe('countSafeTiles', () => {
      it('should determine how many safe tiles are in the smaller grid', () => {
        expect(countSafeTiles(inputs.get('DEMO_1')!, 3).answer1).toEqual(6)
        expect(countSafeTiles(inputs.get('DEMO_2')!, 10).answer1).toEqual(38)
      })
    })
  })

  describe('Part 2', () => {
    describe('countSafeTilesInHugeField', () => {
      it('should determine how many safe tiles are in the smaller grid', () => {
        expect(countSafeTilesInHugeField(inputs.get('DEMO_1')!).answer2).toEqual(600001)
        expect(countSafeTilesInHugeField(inputs.get('DEMO_2')!).answer2).toEqual(1935478)
      })
    })
  })
})
