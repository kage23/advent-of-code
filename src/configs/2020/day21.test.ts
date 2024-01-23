import inputs from '../../inputs/2020/day21'
import { analyzeRecipes, continueAnalysis } from './day21'

describe('2020 Day 21', () => {
  describe('Part 1', () => {
    it('should find the non-allergens', () => {
      expect(analyzeRecipes(inputs.get('DEMO')!).answer1).toEqual(5)
    })
  })
  describe('Part 2', () => {
    it('should find the danger list', () => {
      expect(continueAnalysis(inputs.get('DEMO')!).answer2).toEqual('mxmxvkd,sqjhc,fvjkl')
    })
  })
})
