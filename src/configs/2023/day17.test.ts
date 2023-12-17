import inputs from '../../inputs/2023/day17'
import { findPath, findUltraCruciblePath } from './day17'

describe('2023 Day 17', () => {
  describe('Part 1', () => {
    it('should find the path of least heat loss', () => {
      expect(findPath(inputs.get('DEMO_1')!).answer1).toEqual(102)
    })
  })
  describe('Part 2', () => {
    it('should find the path of least heat loss for ultra crucibles', () => {
      expect(findUltraCruciblePath(inputs.get('DEMO_1')!).answer2).toEqual(94)
      expect(findUltraCruciblePath(inputs.get('DEMO_2')!).answer2).toEqual(71)
    })
  })
})
