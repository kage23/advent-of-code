import inputs from '../../inputs/2022/day15'
import { checkForBeacons, findDistressBeacon } from './day15'

describe('2022 Day 15', () => {
  describe('Part 1', () => {
    it('should count spaces without a beacon on the row', () => {
      expect(checkForBeacons(inputs.get('DEMO')!, 10).answer1).toEqual(26)
    })
  })
  describe('Part 2', () => {
    it('should find the tuning frequency of the distress beacon', () => {
      expect(findDistressBeacon(inputs.get('DEMO')!, 10).answer2).toEqual(56000011)
    })
  })
})
