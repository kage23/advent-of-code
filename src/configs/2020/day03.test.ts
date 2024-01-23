import inputs from '../../inputs/2020/day03'
import { checkSleddingPath, checkVariousPaths } from './day03'

describe('2020 Day 03', () => {
  describe('Part 1', () => {
    it('should count trees on the path', () => {
      expect(checkSleddingPath(inputs.get('DEMO')!)?.answer1).toEqual(7)
    })
  })
  describe('Part 2', () => {
    it('should get the product of various paths', () => {
      expect(checkVariousPaths(inputs.get('DEMO')!)?.answer2).toEqual(336)
    })
  })
})
