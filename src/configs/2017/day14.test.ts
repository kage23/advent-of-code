import inputs from '../../inputs/2017/day14'
import { countUsedSquares, findRegions } from './day14'

xdescribe('2017 Day 14', () => {
  describe('Part 1', () => {
    it('should count how many squares are used', () => {
      expect(countUsedSquares(inputs.get('DEMO')!).answer1).toEqual(8108)
    })
  })
  describe('Part 2', () => {
    it('should count the total number of groups', () => {
      expect(findRegions(inputs.get('DEMO')!).answer2).toEqual(1242)
    })
  })
})
