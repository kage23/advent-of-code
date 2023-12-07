import { findGoodRecipes, findTargetRecipe } from './day14'

describe('2018 Day 14', () => {
  describe('Part 1', () => {
    it('should find the score of the next ten recipes', () => {
      expect(findGoodRecipes('DEMO_1_1')!.answer1).toEqual('5158916779')
      expect(findGoodRecipes('DEMO_1_2')!.answer1).toEqual('0124515891')
      expect(findGoodRecipes('DEMO_1_3')!.answer1).toEqual('9251071085')
      expect(findGoodRecipes('DEMO_1_4')!.answer1).toEqual('5941429882')
    })
  })
  describe('Part 2', () => {
    it('should find how many recipes before the good one', () => {
      expect(findTargetRecipe('DEMO_2_1')!.answer2).toEqual(9)
      expect(findTargetRecipe('DEMO_2_2')!.answer2).toEqual(5)
      expect(findTargetRecipe('DEMO_2_3')!.answer2).toEqual(18)
      expect(findTargetRecipe('DEMO_2_4')!.answer2).toEqual(2018)
    })
  })
})
