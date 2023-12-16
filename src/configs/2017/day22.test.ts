import inputs from '../../inputs/2017/day22'
import { burstToTenThousand, burstToTenMillion } from './day22'

describe('2017 Day 22', () => {
  describe('Part 1', () => {
    it('should count how many bursts cause infection after ten thousand bursts', () => {
      expect(burstToTenThousand(inputs.get('DEMO')!).answer1).toEqual(5587)
    })
  })
  describe('Part 2', () => {
    it('should count how many bursts cause infection after ten million bursts', () => {
      expect(burstToTenMillion(inputs.get('DEMO')!).answer2).toEqual(2511944)
    })
  })
})
