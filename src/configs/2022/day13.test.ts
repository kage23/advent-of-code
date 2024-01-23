import inputs from '../../inputs/2022/day13'
import { examinePairs, sortPackets } from './day13'

describe('2022 Day 13', () => {
  describe('Part 1', () => {
    it('should sum the sorted indices', () => {
      expect(examinePairs(inputs.get('DEMO')!).answer1).toEqual(13)
    })
  })
  describe('Part 2', () => {
    it('should find the decoder key', () => {
      expect(sortPackets(inputs.get('DEMO')!).answer2).toEqual(140)
    })
  })
})
