import inputs from '../../inputs/2022/day18'
import { findSurfaceArea, findOuterSurfaceArea } from './day18'

describe('2022 Day 18', () => {
  describe('Part 1', () => {
    it('should find the surface area', () => {
      expect(findSurfaceArea(inputs.get('DEMO_1')!).answer1).toEqual(10)
      expect(findSurfaceArea(inputs.get('DEMO_2')!).answer1).toEqual(64)
    })
  })
  describe('Part 2', () => {
    it('should find the outer surface area', () => {
      expect(findOuterSurfaceArea(inputs.get('DEMO_2')!).answer2).toEqual(58)
    })
  })
})
