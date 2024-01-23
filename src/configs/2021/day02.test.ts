import inputs from '../../inputs/2021/day02'
import { findFinalLocation, findFinalLocationCorrectly } from './day02'

describe('2021 Day 02', () => {
  describe('Part 1', () => {
    it('should find the final location', () => {
      expect(findFinalLocation(inputs.get('DEMO')!).answer1).toEqual(150)
    })
  })
  describe('Part 2', () => {
    it('should find the final location correctly', () => {
      expect(findFinalLocationCorrectly(inputs.get('DEMO')!).answer2).toEqual(900)
    })
  })
})
