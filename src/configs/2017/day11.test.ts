import inputs from '../../inputs/2017/day11'
import { findDistance, findFurthestDistance } from './day11'

describe('2017 Day 11', () => {
  describe('Part 1', () => {
    it('should find the distance to the end', () => {
      expect(findDistance(inputs.get('DEMO_1')!)!.answer1).toEqual(3)
      expect(findDistance(inputs.get('DEMO_2')!)!.answer1).toEqual(0)
      expect(findDistance(inputs.get('DEMO_3')!)!.answer1).toEqual(2)
      expect(findDistance(inputs.get('DEMO_4')!)!.answer1).toEqual(3)
    })
  })
  describe('Part 2', () => {
    it('should find the distance to the furthest position visited', () => {
      expect(findFurthestDistance(inputs.get('DEMO_1')!).answer2).toEqual(3)
      expect(findFurthestDistance(inputs.get('DEMO_2')!).answer2).toEqual(2)
      expect(findFurthestDistance(inputs.get('DEMO_3')!).answer2).toEqual(2)
      expect(findFurthestDistance(inputs.get('DEMO_4')!).answer2).toEqual(3)
    })
  })
})
