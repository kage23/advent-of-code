import inputs from '../../inputs/2020/day17'
import { advanceSixGenerations, advanceSixHyperGenerations } from './day17'

describe('2020 Day 17', () => {
  describe('Part 1', () => {
    it('should count cubes after six generations', () => {
      expect(advanceSixGenerations(inputs.get('DEMO')!).answer1).toEqual(112)
    })
  })
  describe('Part 2', () => {
    it('should count cubes after six hyper-generations', () => {
      expect(advanceSixHyperGenerations(inputs.get('DEMO')!).answer2).toEqual(848)
    })
  })
})
