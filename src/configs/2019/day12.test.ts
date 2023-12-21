import inputs from '../../inputs/2019/day12'
import { runUntilRepeat, takeTimeSteps } from './day12'

describe('2019 Day 12', () => {
  describe('Part 1', () => {
    it('should calculate the energy in the system after the given steps', () => {
      expect(takeTimeSteps(inputs.get('DEMO_1')!, 10).answer1).toEqual(179)
      expect(takeTimeSteps(inputs.get('DEMO_2')!, 100).answer1).toEqual(1940)
    })
  })
  describe('Part 2', () => {
    it('should calculate how long until the universe repeats', () => {
      expect(runUntilRepeat(inputs.get('DEMO_1')!).answer2).toEqual(2772)
      expect(runUntilRepeat(inputs.get('DEMO_2')!).answer2).toEqual(4686774924)
    })
  })
})
