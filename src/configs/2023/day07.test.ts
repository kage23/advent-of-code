import inputs from '../../inputs/2023/day07'
import { playWithJokers, scoreTheHands } from './day07'

describe('2023 Day 07', () => {
  describe('Part 1', () => {
    it('should find the total score for all hands', () => {
      expect(scoreTheHands(inputs.get('DEMO')!).answer1).toEqual(6440)
    })
  })
  describe('Part 2', () => {
    it('should find the total score for all hands playing with Jokers', () => {
      expect(playWithJokers(inputs.get('DEMO')!).answer2).toEqual(5905)
    })
  })
})
