import inputs from '../../inputs/2019/day03'
import { findClosestIntersection, findFewestSteps } from './day03'

describe('2019 Day 03', () => {
  describe('Part 1', () => {
    it('should find the closest intersection', () => {
      expect(findClosestIntersection(inputs.get('DEMO_1')!).answer1).toEqual(6)
      expect(findClosestIntersection(inputs.get('DEMO_2')!).answer1).toEqual(
        159
      )
      expect(findClosestIntersection(inputs.get('DEMO_3')!).answer1).toEqual(
        135
      )
    })
  })
  describe('Part 2', () => {
    it('should find the intersection that is fewest steps away', () => {
      expect(findFewestSteps(inputs.get('DEMO_1')!).answer2).toEqual(30)
      expect(findFewestSteps(inputs.get('DEMO_2')!).answer2).toEqual(610)
      expect(findFewestSteps(inputs.get('DEMO_3')!).answer2).toEqual(410)
    })
  })
})
