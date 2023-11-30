import { findDistance, findFurthestDistance } from './day11'

describe('2017 Day 10', () => {
  describe('Part 1', () => {
    it('should find the distance to the end', () => {
      expect(findDistance('DEMO_1')!.answer1).toEqual(3)
      expect(findDistance('DEMO_2')!.answer1).toEqual(0)
      expect(findDistance('DEMO_3')!.answer1).toEqual(2)
      expect(findDistance('DEMO_4')!.answer1).toEqual(3)
    })
  })
  describe('Part 2', () => {
    it('should find the distance to the furthest position visited', () => {
      expect(findFurthestDistance('DEMO_1')!.answer2).toEqual(3)
      expect(findFurthestDistance('DEMO_2')!.answer2).toEqual(2)
      expect(findFurthestDistance('DEMO_3')!.answer2).toEqual(2)
      expect(findFurthestDistance('DEMO_4')!.answer2).toEqual(3)
    })
  })
})
