import inputs from '../../inputs/2020/day08'
import { runUntilLoopOrTerminate, permuteAndFixCode } from './day08'

describe('2020 Day 08', () => {
  describe('Part 1', () => {
    it('should find a loop or termination and report the accumulator', () => {
      expect(runUntilLoopOrTerminate(inputs.get('DEMO')!).answer1).toEqual(5)
    })
  })
  describe('Part 2', () => {
    it('should fix the code and then do it', () => {
      expect(permuteAndFixCode(inputs.get('DEMO')!).answer2).toEqual(8)
    })
  })
})
