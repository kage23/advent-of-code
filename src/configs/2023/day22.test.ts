import inputs from '../../inputs/2023/day22'
import { chooseChainReactionBrick, pickOneBrickToDisintegrate } from './day22'

describe('2023 Day 22', () => {
  describe('Part 1', () => {
    it('should count how many bricks can be disintegrated', () => {
      expect(pickOneBrickToDisintegrate(inputs.get('DEMO')!).answer1).toEqual(5)
    })
  })
  describe('Part 2', () => {
    it('should how many total would fall from disintegrating', () => {
      expect(chooseChainReactionBrick(inputs.get('DEMO')!).answer2).toEqual(7)
    })
  })
})
