import {
  findStrongestBridgeRecursively,
  findStrongestBridge,
  findLongestBridge,
} from './day24'

describe('2017 Day 24', () => {
  describe('Part 1', () => {
    it('should find the strongest bridge you can build', () => {
      expect(findStrongestBridgeRecursively('DEMO')!.answer1).toEqual(31)
      expect(findStrongestBridge('DEMO')!.answer1).toEqual(31)
    })
  })
  describe('Part 2', () => {
    it('should find the strength of the longest bridge you can build', () => {
      expect(findLongestBridge('DEMO')!.answer2).toEqual(19)
    })
  })
})
