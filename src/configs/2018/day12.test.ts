import inputs from '../../inputs/2018/day12'
import { advance20Generations, advance50Billion } from './day12'

describe('2018 Day 12', () => {
  describe('Part 1', () => {
    it('should find all plant-containing pots', () => {
      expect(advance20Generations(inputs.get('DEMO')!).answer1).toEqual(325)
    })
  })
  describe('Part 2', () => {
    it('should find all plant-containing pots after 50 billion generations', () => {
      expect(advance50Billion(inputs.get('DEMO')!).answer2).toEqual(
        999999999374
      )
    })
  })
})
