import {
  determineContainerCombos,
  determineEfficientContainerCombos,
} from './day17'

describe('2015 Day 17', () => {
  describe('Part 1', () => {
    it('should determine how many potential ways there are to store the eggnog', () => {
      expect(determineContainerCombos('DEMO_1').answer1).toEqual(4)
    })
  })

  describe('Part 2', () => {
    it('should determine how many different efficient container combos there are to store the nog', () => {
      expect(determineEfficientContainerCombos('DEMO_1').answer2).toEqual(3)
    })
  })
})
