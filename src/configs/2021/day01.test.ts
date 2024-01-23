import inputs from '../../inputs/2021/day01'
import { checkDepthIncreases, checkSummedDepthIncreases } from './day01'

describe('2021 Day 01', () => {
  describe('Part 1', () => {
    it('should count the number of depth increases', () => {
      expect(checkDepthIncreases(inputs.get('DEMO')!).answer1).toEqual(7)
    })
  })
  describe('Part 2', () => {
    it('should count the number of increases in sliding windows', () => {
      expect(checkSummedDepthIncreases(inputs.get('DEMO')!).answer2).toEqual(5)
    })
  })
})
