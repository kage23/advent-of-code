import inputs from '../../inputs/2023/day05'
import { getSeedLocations, getMoreSeedLocations } from './day05'

describe('2023 Day 05', () => {
  describe('Part 1', () => {
    it('should find the lowest seed location', () => {
      expect(getSeedLocations(inputs.get('DEMO')!).answer1).toEqual(35)
    })
  })
  describe('Part 2', () => {
    it('should find the lowest seed location with more seeds', () => {
      expect(getMoreSeedLocations(inputs.get('DEMO')!).answer2).toEqual(46)
    })
  })
})
