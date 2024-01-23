import inputs from '../../inputs/2020/day20'
import { assemblePuzzle, findCorners } from './day20'

describe('2020 Day 20', () => {
  describe('Part 1', () => {
    it('should find the puzzle corners', () => {
      expect(findCorners(inputs.get('DEMO')!).answer1).toEqual(20899048083289)
    })
  })
  describe('Part 2', () => {
    it('should get the roughness of the water', () => {
      expect(assemblePuzzle(inputs.get('DEMO')!).answer2).toEqual(273)
    })
  })
})
