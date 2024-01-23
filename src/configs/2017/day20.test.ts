import inputs from '../../inputs/2017/day20'
import { findClosestParticle, runSimulation } from './day20'

describe('2017 Day 20', () => {
  describe('Part 1', () => {
    it('should find the particle closest to 0,0,0', () => {
      expect(findClosestParticle(inputs.get('DEMO_1')!).answer1).toEqual(0)
    })
  })
  describe('Part 2', () => {
    it('should count remaining particles after collisions', () => {
      expect(runSimulation(inputs.get('DEMO_2')!).answer2).toEqual(1)
    })
  })
})
