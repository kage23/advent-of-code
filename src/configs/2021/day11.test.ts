import inputs from '../../inputs/2021/day11'
import { watchOctopuses, waitForSynchronizedFlash } from './day11'

describe('2021 Day 11', () => {
  describe('Part 1', () => {
    it('should count flashes', () => {
      expect(watchOctopuses(inputs.get('DEMO_2')!).answer1).toEqual(1656)
    })
  })
  describe('Part 2', () => {
    it('should find the step when the octopuses all synchronize', () => {
      expect(waitForSynchronizedFlash(inputs.get('DEMO_2')!).answer2).toEqual(195)
    })
  })
})
