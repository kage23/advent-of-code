import inputs from '../../inputs/2020/day14'
import { runInitializer, runInitializer2 } from './day14'

describe('2020 Day 14', () => {
  describe('Part 1', () => {
    it('should sum the memory values', () => {
      expect(runInitializer(inputs.get('DEMO_1')!).answer1).toEqual(165)
    })
  })
  describe('Part 2', () => {
    it('should sum the memory values, v2', () => {
      expect(runInitializer2(inputs.get('DEMO_2')!).answer2).toEqual(208)
    })
  })
})
