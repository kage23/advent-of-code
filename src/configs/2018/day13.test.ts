import inputs from '../../inputs/2018/day13'
import { findCollision, goToEnd } from './day13'

describe('2018 Day 13', () => {
  describe('Part 1', () => {
    it('should find the location of the first collision', () => {
      expect(findCollision(inputs.get('DEMO_1')!).answer1).toEqual('0,3')
      expect(findCollision(inputs.get('DEMO_2')!).answer1).toEqual('7,3')
    })
  })
  describe('Part 2', () => {
    it('should find the location of the last remaining cart', () => {
      expect(goToEnd(inputs.get('DEMO_3')!).answer2).toEqual('6,4')
    })
  })
})
