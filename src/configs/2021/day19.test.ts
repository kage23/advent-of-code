import inputs from '../../inputs/2021/day19'
import { countBeacons, findLargestDistance } from './day19'

describe('2021 Day 19', () => {
  describe('Part 1', () => {
    it('should count the beacons', () => {
      expect(countBeacons(inputs.get('DEMO')!).answer1).toEqual(79)
    })
  })
  describe('Part 2', () => {
    it('should find the largest distance between scanners', () => {
      expect(findLargestDistance(inputs.get('DEMO')!).answer2).toEqual(3621)
    })
  })
})
