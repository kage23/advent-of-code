import inputs from '../../inputs/2020/day22'
import { playGame, playRecursively } from './day22'

describe('2020 Day 22', () => {
  describe('Part 1', () => {
    it('should find the score of the winning deck', () => {
      expect(playGame(inputs.get('DEMO_1')!).answer1).toEqual(306)
    })
  })
  describe('Part 2', () => {
    it('should find the score of the winning deck in the recursive game', () => {
      expect(playRecursively(inputs.get('DEMO_1')!).answer2).toEqual(291)
    })
  })
})
