import inputs from '../../inputs/2015/day14'
import { raceReindeer, raceReindeerV2 } from './day14'

describe('2015 Day 14', () => {
  describe('Part 1', () => {
    describe('raceReindeer', () => {
      it('should find the distance traveled by the winning reindeer', () => {
        expect(raceReindeer(inputs.get('DEMO_1')!, 1000).answer1).toEqual(1120)
      })
    })
  })

  describe('Part 2', () => {
    describe('raceReindeerV2', () => {
      it('should find the points scored by the winning reindeer', () => {
        expect(raceReindeerV2(inputs.get('DEMO_1')!, 1000).answer2).toEqual(689)
      })
    })
  })
})
