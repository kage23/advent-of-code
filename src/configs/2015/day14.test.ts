import { raceReindeer, raceReindeerV2 } from './day14'

describe('2015 Day 14', () => {
  describe('Part 1', () => {
    it('should find the distance traveled by the winning reindeer', () => {
      expect(raceReindeer('DEMO_1').answer1).toEqual(1120)
    })
  })

  describe('Part 2', () => {
    it('should find the points scored by the winning reindeer', () => {
      expect(raceReindeerV2('DEMO_1').answer2).toEqual(689)
    })
  })
})
