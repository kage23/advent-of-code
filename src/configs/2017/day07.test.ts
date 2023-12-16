import inputs from '../../inputs/2017/day07'
import { findBottomProgram, balanceTower } from './day07'

describe('2017 Day 07', () => {
  describe('Part 1', () => {
    it('should find the name of the bottom program', () => {
      expect(findBottomProgram(inputs.get('DEMO')!)!.answer1).toEqual('tknk')
    })
  })
  describe('Part 2', () => {
    it('should determine the correct weight of the incorrect one', () => {
      expect(balanceTower(inputs.get('DEMO')!)!.answer2).toEqual(60)
    })
  })
})
