import { fightFullCombat, findTheBoost } from './day24'

describe('2018 Day 24', () => {
  describe('Part 1', () => {
    it('should count remaining units of the combat winner', () => {
      expect(fightFullCombat('DEMO')!.answer1).toEqual(5216)
    })
  })
  describe('Part 2', () => {
    it('should count remaining units if the immune system is boosted to win', () => {
      expect(findTheBoost('DEMO')!.answer2).toEqual(51)
    })
  })
})
