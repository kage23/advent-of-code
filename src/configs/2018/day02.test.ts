import inputs from '../../inputs/2018/day02'
import { findChecksum, findCommonLetters } from './day02'

describe('2018 Day 02', () => {
  describe('Part 1', () => {
    it('should find the checksum', () => {
      expect(findChecksum(inputs.get('DEMO_1')!).answer1).toEqual(12)
    })
  })
  describe('Part 2', () => {
    it('should find the common letters', () => {
      expect(findCommonLetters(inputs.get('DEMO_2')!)?.answer2).toEqual('fgij')
    })
  })
})
