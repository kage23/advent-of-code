import inputs from '../../inputs/2022/day06'
import { findStartOfPacketMarker, findStartOfMessageMarker } from './day06'

describe('2022 Day 06', () => {
  describe('Part 1', () => {
    it('should find the start of packet marker', () => {
      expect(findStartOfPacketMarker(inputs.get('DEMO_1')!)?.answer1).toEqual(7)
      expect(findStartOfPacketMarker(inputs.get('DEMO_2')!)?.answer1).toEqual(5)
      expect(findStartOfPacketMarker(inputs.get('DEMO_3')!)?.answer1).toEqual(6)
      expect(findStartOfPacketMarker(inputs.get('DEMO_4')!)?.answer1).toEqual(10)
      expect(findStartOfPacketMarker(inputs.get('DEMO_5')!)?.answer1).toEqual(11)
    })
  })
  describe('Part 2', () => {
    it('should find the start of message marker', () => {
      expect(findStartOfMessageMarker(inputs.get('DEMO_1')!)?.answer2).toEqual(19)
      expect(findStartOfMessageMarker(inputs.get('DEMO_2')!)?.answer2).toEqual(23)
      expect(findStartOfMessageMarker(inputs.get('DEMO_3')!)?.answer2).toEqual(23)
      expect(findStartOfMessageMarker(inputs.get('DEMO_4')!)?.answer2).toEqual(29)
      expect(findStartOfMessageMarker(inputs.get('DEMO_5')!)?.answer2).toEqual(26)
    })
  })
})
