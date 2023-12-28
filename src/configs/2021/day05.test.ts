import inputs from '../../inputs/2021/day05'
import { checkVents, checkAllVents } from './day05'

describe('2021 Day 05', () => {
  describe('Part 1', () => {
    it('should find intersections', () => {
      expect(checkVents(inputs.get('DEMO')!).answer1).toEqual(5)
    })
  })
  describe('Part 2', () => {
    it('should find all intersections', () => {
      expect(checkAllVents(inputs.get('DEMO')!).answer2).toEqual(12)
    })
  })
})
