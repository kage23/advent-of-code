import { advance20Generations, advance50Billion } from './day12'

describe('2018 Day 11', () => {
  describe('Part 1', () => {
    it('should find all plant-containing pots', () => {
      expect(advance20Generations('DEMO')!.answer1).toEqual(325)
    })
  })
  describe('Part 2', () => {
    it('should find all plant-containing pots after 50 billion generations', () => {
      expect(advance50Billion('DEMO')!.answer2).toEqual(999999999374)
    })
  })
})
