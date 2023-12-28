import inputs from '../../inputs/2021/day04'
import { playBingo, playAndLose } from './day04'

describe('2021 Day 04', () => {
  describe('Part 1', () => {
    it('should find the score of the first winning card', () => {
      expect(playBingo(inputs.get('DEMO')!)?.answer1).toEqual(4512)
    })
  })
  describe('Part 2', () => {
    it('should find the score of the last winning card', () => {
      expect(playAndLose(inputs.get('DEMO')!)?.answer2).toEqual(1924)
    })
  })
})
