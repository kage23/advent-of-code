import inputs from '../../inputs/2017/day10'
import { oneTwist, fullTwists } from './day10'

describe('2017 Day 10', () => {
  describe('Part 1', () => {
    it('should find the checksum', () => {
      expect(oneTwist(inputs.get('DEMO_1')!, 5)!.answer1).toEqual(12)
    })
  })
  describe('Part 2', () => {
    it('should find the final hash', () => {
      expect(fullTwists(inputs.get('DEMO_2_1')!)!.answer2).toEqual(
        'a2582a3a0e66e6e86e3812dcb672a272'
      )
      expect(fullTwists(inputs.get('DEMO_2_2')!)!.answer2).toEqual(
        '33efeb34ea91902bb2f59c9920caa6cd'
      )
      expect(fullTwists(inputs.get('DEMO_2_3')!)!.answer2).toEqual(
        '3efbe78a8d82f29979031a4aa0b16a9d'
      )
      expect(fullTwists(inputs.get('DEMO_2_4')!)!.answer2).toEqual(
        '63960835bcdc130f0b66d7ff4f6a5a8e'
      )
    })
  })
})
