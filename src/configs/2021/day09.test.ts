import inputs from '../../inputs/2021/day09'
import { identifyLowPoints, identifyBasins } from './day09'

describe('2021 Day 09', () => {
  describe('Part 1', () => {
    it('should identify the low points', () => {
      expect(identifyLowPoints(inputs.get('DEMO')!).answer1).toEqual(15)
    })
  })
  describe('Part 2', () => {
    it('should identify the basins', () => {
      expect(identifyBasins(inputs.get('DEMO')!).answer2).toEqual(1134)
    })
  })
})
