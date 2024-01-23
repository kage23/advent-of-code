import inputs from '../../inputs/2022/day08'
import { countTrees, findTheBestTree } from './day08'

describe('2022 Day 08', () => {
  describe('Part 1', () => {
    it('should count visible trees', () => {
      expect(countTrees(inputs.get('DEMO')!).answer1).toEqual(21)
    })
  })
  describe('Part 2', () => {
    it('should find the best tree', () => {
      expect(findTheBestTree(inputs.get('DEMO')!).answer2).toEqual(8)
    })
  })
})
