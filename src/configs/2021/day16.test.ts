import inputs from '../../inputs/2021/day16'
import { findPacketSum, getActualValue } from './day16'

describe('2021 Day 16', () => {
  describe('Part 1', () => {
    it('should find the packet sum', () => {
      expect(findPacketSum(inputs.get('DEMO_1_1')!).answer1).toEqual(6)
      expect(findPacketSum(inputs.get('DEMO_1_2')!).answer1).toEqual(9)
      expect(findPacketSum(inputs.get('DEMO_1_3')!).answer1).toEqual(14)
      expect(findPacketSum(inputs.get('DEMO_1_4')!).answer1).toEqual(16)
      expect(findPacketSum(inputs.get('DEMO_1_5')!).answer1).toEqual(12)
      expect(findPacketSum(inputs.get('DEMO_1_6')!).answer1).toEqual(23)
      expect(findPacketSum(inputs.get('DEMO_1_7')!).answer1).toEqual(31)
    })
  })
  describe('Part 2', () => {
    it('should find the actual value', () => {
      expect(getActualValue(inputs.get('DEMO_2_1')!).answer2).toEqual(3)
      expect(getActualValue(inputs.get('DEMO_2_2')!).answer2).toEqual(54)
      expect(getActualValue(inputs.get('DEMO_2_3')!).answer2).toEqual(7)
      expect(getActualValue(inputs.get('DEMO_2_4')!).answer2).toEqual(9)
      expect(getActualValue(inputs.get('DEMO_2_5')!).answer2).toEqual(1)
      expect(getActualValue(inputs.get('DEMO_2_6')!).answer2).toEqual(0)
      expect(getActualValue(inputs.get('DEMO_2_7')!).answer2).toEqual(0)
      expect(getActualValue(inputs.get('DEMO_2_8')!).answer2).toEqual(1)
    })
  })
})
