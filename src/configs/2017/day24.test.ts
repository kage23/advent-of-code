import inputs from '../../inputs/2017/day24'
import {
  findStrongestBridgeRecursively,
  findStrongestBridge,
  findLongestBridge,
} from './day24'

describe('2017 Day 24', () => {
  describe('Part 1', () => {
    it('should find the strongest bridge you can build', () => {
      expect(
        findStrongestBridgeRecursively(inputs.get('DEMO')!).answer1
      ).toEqual(31)
      expect(findStrongestBridge(inputs.get('DEMO')!).answer1).toEqual(31)
    })
  })
  describe('Part 2', () => {
    it('should find the strength of the longest bridge you can build', () => {
      expect(findLongestBridge(inputs.get('DEMO')!).answer2).toEqual(19)
    })
  })
})
