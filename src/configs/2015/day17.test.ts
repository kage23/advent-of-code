import inputs from '../../inputs/2015/day17'
import {
  determineContainerCombos,
  determineEfficientContainerCombos,
} from './day17'

describe('2015 Day 17', () => {
  describe('Part 1', () => {
    describe('determineContainerCombos', () => {
      it('should determine how many potential ways there are to store the eggnog', () => {
        expect(determineContainerCombos(inputs.get('DEMO_1')!, 25).answer1).toEqual(4)
      })
    })
  })

  describe('Part 2', () => {
    describe('determineEfficientContainerCombos', () => {
      it('should determine how many different efficient container combos there are to store the nog', () => {
        expect(determineEfficientContainerCombos(inputs.get('DEMO_1')!, 25).answer2).toEqual(3)
      })
    })
  })
})
