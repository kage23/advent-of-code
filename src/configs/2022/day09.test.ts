import inputs from '../../inputs/2022/day09'
import { trackTheRopeTail, trackTheLongTail } from './day09'

describe('2022 Day 09', () => {
  describe('Part 1', () => {
    it('should count locations visited by the tail', () => {
      expect(trackTheRopeTail(inputs.get('DEMO_1')!).answer1).toEqual(13)
    })
  })
  describe('Part 2', () => {
    it('should count locations visited by the long tail', () => {
      expect(trackTheLongTail(inputs.get('DEMO_2')!).answer2).toEqual(36)
    })
  })
})
