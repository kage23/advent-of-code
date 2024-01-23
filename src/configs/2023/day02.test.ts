import inputs from '../../inputs/2023/day02'
import { determineGamePowers, determinePossibleGames } from './day02'

describe('2023 Day 02', () => {
  describe('Part 1', () => {
    it('should determine which games are possible with the give cube count', () => {
      expect(determinePossibleGames(inputs.get('DEMO')!).answer1).toEqual(8)
    })
  })
  describe('Part 2', () => {
    it('should find the minimum power of each game', () => {
      expect(determineGamePowers(inputs.get('DEMO')!).answer2).toEqual(2286)
    })
  })
})
