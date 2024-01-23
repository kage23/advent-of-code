import inputs from '../../inputs/2023/day04'
import { scoreScratchcards, winMoreScratchcards } from './day04'

describe('2023 Day 04', () => {
  describe('Part 1', () => {
    it('should score the scratchcards', () => {
      expect(scoreScratchcards(inputs.get('DEMO')!).answer1).toEqual(13)
    })
  })
  describe('Part 2', () => {
    it('should count the final number of scratchcards', () => {
      expect(winMoreScratchcards(inputs.get('DEMO')!).answer2).toEqual(30)
    })
  })
})
