import inputs from '../../inputs/2019/day10'
import { locateMonitoringStation, vaporizeAsteroids } from './day10'

describe('2019 Day 10', () => {
  describe('Part 1', () => {
    it('should count how many asteroids are visible from the best one', () => {
      expect(locateMonitoringStation(inputs.get('DEMO_1_1')!).answer1).toEqual(
        8
      )
      expect(locateMonitoringStation(inputs.get('DEMO_1_2')!).answer1).toEqual(
        33
      )
      expect(locateMonitoringStation(inputs.get('DEMO_1_3')!).answer1).toEqual(
        35
      )
      expect(locateMonitoringStation(inputs.get('DEMO_1_4')!).answer1).toEqual(
        41
      )
      expect(locateMonitoringStation(inputs.get('DEMO_1_5')!).answer1).toEqual(
        210
      )
    })
  })
  describe('Part 2', () => {
    it('should report the 200th asteroid vaporized', () => {
      expect(
        vaporizeAsteroids(inputs.get('DEMO_1_5')!, '11,13').answer2
      ).toEqual(802)
    })
  })
})
