import inputs from '../../inputs/2022/day17'
import { getTowerHeight } from './day17'

describe('2022 Day 17', () => {
  describe('Part 1', () => {
    it('should get the tower height after 2022 rocks', () => {
      expect(getTowerHeight(inputs.get('DEMO')!, 2022).answer1).toEqual(3068)
    })
  })
  describe('Part 2', () => {
    it('should get the tower height after one trillion rocks', () => {
      expect(getTowerHeight(inputs.get('DEMO')!, 1000000000000).answer2).toEqual(1514285714288)
    })
  })
})
