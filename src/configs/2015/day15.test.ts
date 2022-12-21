import { findBestLowCalRecipe, findBestRecipe } from './day15'

describe('2015 Day 15', () => {
  describe('Part 1', () => {
    it('should find the score of the best cookie you can make', () => {
      expect(findBestRecipe('DEMO_1').answer1).toEqual(62842880)
    })
  })

  describe('Part 2', () => {
    it('should find the score of the best 500-calorie cookie you can make', () => {
      expect(findBestLowCalRecipe('DEMO_1').answer2).toEqual(57600000)
    })
  })
})
