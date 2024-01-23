import inputs from '../../inputs/2022/day02'
import { checkStrategyGuide, correctlyDecryptStrategyGuide } from './day02'

describe('2022 Day 02', () => {
  describe('Part 1', () => {
    it('should find your score if you follow the strategy guide', () => {
      expect(checkStrategyGuide(inputs.get('DEMO')!).answer1).toEqual(15)
    })
  })
  describe('Part 2', () => {
    it('should find your score if you follow the strategy guide correctly', () => {
      expect(correctlyDecryptStrategyGuide(inputs.get('DEMO')!).answer2).toEqual(12)
    })
  })
})
