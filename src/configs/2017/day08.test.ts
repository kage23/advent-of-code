import inputs from '../../inputs/2017/day08'
import { runProcess } from './day08'

describe('2017 Day 08', () => {
  describe('Part 1', () => {
    it('should find the current largest value', () => {
      expect(runProcess(inputs.get('DEMO')!)!.answer1).toEqual(1)
    })
  })
  describe('Part 2', () => {
    it('should find the largest ever value', () => {
      expect(runProcess(inputs.get('DEMO')!)!.answer2).toEqual(10)
    })
  })
})
