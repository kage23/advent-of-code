import inputs from '../../inputs/2021/day10'
import { scoreSyntaxErrors, completeIncompleteLines } from './day10'

describe('2021 Day 10', () => {
  describe('Part 1', () => {
    it('should score the syntax errors', () => {
      expect(scoreSyntaxErrors(inputs.get('DEMO')!).answer1).toEqual(26397)
    })
  })
  describe('Part 2', () => {
    it('should complete the incomplete lines', () => {
      expect(completeIncompleteLines(inputs.get('DEMO')!).answer2).toEqual(288957)
    })
  })
})
