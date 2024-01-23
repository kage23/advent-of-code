import inputs from '../../inputs/2015/day13'
import {
  findOptimalSeatingArrangement,
  findOptimalSeatingArrangementWithYou,
} from './day13'

describe('2015 Day 13', () => {
  describe('Part 1', () => {
    describe('findOptimalSeatingArrangement', () => {
      it('should find the happiness of the optimal seating arrangement', () => {
        expect(
          findOptimalSeatingArrangement(inputs.get('DEMO_1')!).answer1
        ).toEqual(330)
      })
    })
  })

  describe('Part 2', () => {
    describe('findOptimalSeatingArrangementWithYou', () => {
      it('should find the happiness of the optimal seating arrangement with you included', () => {
        expect(
          findOptimalSeatingArrangementWithYou(inputs.get('DEMO_1')!).answer2
        ).toEqual(286)
      })
    })
  })
})
