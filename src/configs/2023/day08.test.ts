import inputs from '../../inputs/2023/day08'
import { navigateTheDesert, navigateAsGhosts } from './day08'

describe('2023 Day 08', () => {
  describe('Part 1', () => {
    it('should find the number of steps to the end', () => {
      expect(navigateTheDesert(inputs.get('DEMO_1_1')!).answer1).toEqual(2)
      expect(navigateTheDesert(inputs.get('DEMO_1_2')!).answer1).toEqual(6)
    })
  })
  describe('Part 2', () => {
    it('should find the number of steps for all ghosts to reach the end', () => {
      expect(navigateAsGhosts(inputs.get('DEMO_2_1')!).answer2).toEqual(6)
    })
  })
})
