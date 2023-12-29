import inputs from '../../inputs/2021/day12'
import { countPaths, countPaths2 } from './day12'

describe('2021 Day 12', () => {
  describe('Part 1', () => {
    it('should count possible paths', () => {
      expect(countPaths(inputs.get('DEMO_1')!).answer1).toEqual(10)
      expect(countPaths(inputs.get('DEMO_2')!).answer1).toEqual(19)
      expect(countPaths(inputs.get('DEMO_3')!).answer1).toEqual(226)
    })
  })
  describe('Part 2', () => {
    it('should count possible paths under the new rules', () => {
      expect(countPaths2(inputs.get('DEMO_1')!).answer2).toEqual(36)
      expect(countPaths2(inputs.get('DEMO_2')!).answer2).toEqual(103)
      expect(countPaths2(inputs.get('DEMO_3')!).answer2).toEqual(3509)
    })
  })
})
