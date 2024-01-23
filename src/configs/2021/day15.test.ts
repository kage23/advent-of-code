import inputs from '../../inputs/2021/day15'
import { findLowestRiskPath, findLowestRiskPathBigMap } from './day15'

describe('2021 Day 15', () => {
  describe('Part 1', () => {
    it('should find the lowest-risk path', () => {
      expect(findLowestRiskPath(inputs.get('DEMO')!).answer1).toEqual(40)
    })
  })
  describe('Part 2', () => {
    it('should find the lowest-risk path through the big map', () => {
      expect(findLowestRiskPathBigMap(inputs.get('DEMO')!).answer2).toEqual(315)
    })
  })
})
