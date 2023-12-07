import { findCollision, goToEnd } from './day13'

describe('2018 Day 13', () => {
  describe('Part 1', () => {
    it('should find the location of the first collision', () => {
      expect(findCollision('DEMO_1')!.answer1).toEqual('0,3')
      expect(findCollision('DEMO_2')!.answer1).toEqual('7,3')
    })
  })
  describe('Part 2', () => {
    it('should find the location of the last remaining cart', () => {
      expect(goToEnd('DEMO_3')!.answer2).toEqual('6,4')
    })
  })
})
