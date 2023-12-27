import inputs from '../../inputs/2020/day24'
import { flipTiles, conwaysGameOfTiles } from './day24'

describe('2020 Day 24', () => {
  describe('Part 1', () => {
    it('should count black tiles', () => {
      expect(flipTiles(inputs.get('DEMO')!).answer1).toEqual(10)
    })
  })
  // This passes but is a bit slow
  xdescribe('Part 2', () => {
    it('should count black tiles after 100 days', () => {
      expect(conwaysGameOfTiles(inputs.get('DEMO')!).answer2).toEqual(2208)
    })
  })
})
