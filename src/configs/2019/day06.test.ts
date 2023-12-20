import inputs from '../../inputs/2019/day06'
import { countOrbits, findSanta } from './day06'

describe('2019 Day 06', () => {
  describe('Part 1', () => {
    it('should count the total number of orbits', () => {
      expect(countOrbits(inputs.get('DEMO_1')!).answer1).toEqual(42)
    })
  })
  describe('Part 2', () => {
    it('should report the number of orbital transfers to find Santa', () => {
      expect(findSanta(inputs.get('DEMO_2')!).answer2).toEqual(4)
    })
  })
})
