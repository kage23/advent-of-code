import inputs from '../../inputs/2021/day21'
import { playPracticeGame, playRealGame } from './day21'

describe('2021 Day 21', () => {
  describe('Part 1', () => {
    it('should hash the game', () => {
      expect(playPracticeGame(inputs.get('DEMO')!).answer1).toEqual(739785)
    })
  })
  describe('Part 2', () => {
    it('should count winning universes for the winner', () => {
      expect(playRealGame(inputs.get('DEMO')!).answer2).toEqual(444356092776315)
    })
  })
})
