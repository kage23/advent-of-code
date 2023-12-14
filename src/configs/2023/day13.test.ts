import inputs from '../../inputs/2023/day13'
import { findReflections, findSmudgedReflections } from './day13'

describe('2023 Day 13', () => {
  describe('Part 1', () => {
    it('should find the reflections', () => {
      expect(findReflections(inputs.get('DEMO')!).answer1).toEqual(405)
    })
  })
  describe('Part 2', () => {
    it('should find the reflections if the mirror is smudged', () => {
      expect(findSmudgedReflections(inputs.get('DEMO')!).answer2).toEqual(400)
    })
  })
})
