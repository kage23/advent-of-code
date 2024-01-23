import inputs from '../../inputs/2017/day19'
import { followPath } from './day19'

describe('2017 Day 19', () => {
  describe('Part 1', () => {
    it('should find the collected letters', () => {
      expect(followPath(inputs.get('DEMO')!).answer1).toEqual('ABCDEF')
    })
  })
  describe('Part 2', () => {
    it('should count how many steps the packet took', () => {
      expect(followPath(inputs.get('DEMO')!).answer2).toEqual(38)
    })
  })
})
