import inputs from '../../inputs/2017/day06'
import { findLoop } from './day06'

describe('2017 Day 06', () => {
  describe('Part 1', () => {
    it('should count how many cycles it takes to detect a loop', () => {
      expect(findLoop(inputs.get('DEMO')!).answer1).toEqual(5)
    })
  })
  describe('Part 2', () => {
    it('should determine how long the loop is', () => {
      expect(findLoop(inputs.get('DEMO')!).answer2).toEqual(4)
    })
  })
})
