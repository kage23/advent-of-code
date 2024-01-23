import inputs from '../../inputs/2023/day06'
import { winTheRaces, winTheBigRace } from './day06'

describe('2023 Day 06', () => {
  describe('Part 1', () => {
    it('should multiply the ways to win all the races', () => {
      expect(winTheRaces(inputs.get('DEMO')!).answer1).toEqual(288)
    })
  })
  describe('Part 2', () => {
    it('should count the ways to win the big race', () => {
      expect(winTheBigRace(inputs.get('DEMO')!).answer2).toEqual(71503)
    })
  })
})
