import inputs from '../../inputs/2020/day02'
import { analyzePasswords, properlyAnalyzePasswords } from './day02'

describe('2020 Day 02', () => {
  describe('Part 1', () => {
    it('should check for valid passwords', () => {
      expect(analyzePasswords(inputs.get('DEMO')!)?.answer1).toEqual(2)
    })
  })
  describe('Part 2', () => {
    it('should ACTUALLY check for valid passwords', () => {
      expect(properlyAnalyzePasswords(inputs.get('DEMO')!)?.answer2).toEqual(1)
    })
  })
})
